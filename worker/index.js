/**
 * Cloudflare Worker Backend API Bridge for Noble Education Headless GitOps CMS
 * 
 * Handles JWT Auth, GitHub REST API commit pushes, and deployment status tracking.
 * NEVER exposes GitHub Personal Access Token to the client.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS Headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // ─── AUTH ROUTE ────────────────────────────────────────────────────────
      if (url.pathname === '/api/auth/login' && request.method === 'POST') {
        const { username, password } = await request.json();
        
        // SuperAdmin Check
        const validUser = (env.ADMIN_USER || 'admin');
        const validPass = (env.ADMIN_PASS || 'admin123');

        if (username === validUser && password === validPass) {
          const token = btoa(JSON.stringify({
            sub: username,
            role: 'superadmin',
            iat: Date.now(),
            exp: Date.now() + (24 * 60 * 60 * 1000)
          }));

          return new Response(JSON.stringify({
            success: true,
            token,
            user: { username, role: 'superadmin' }
          }), { headers: corsHeaders });
        }

        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid credentials'
        }), { status: 401, headers: corsHeaders });
      }

      // ─── AUTHENTICATION CHECK FOR CMS ROUTES ──────────────────────────────
      const authHeader = request.headers.get('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
      }

      const repoOwner = env.GH_OWNER || 'jekipansuriya2394';
      const repoName = env.GH_REPO || 'interactive-education-platform';
      const ghToken = env.GH_PAT;

      if (!ghToken) {
        return new Response(JSON.stringify({
          error: 'GitHub Personal Access Token (GH_PAT) is not configured in Worker secrets.'
        }), { status: 500, headers: corsHeaders });
      }

      // ─── GIT COMMIT ROUTE ──────────────────────────────────────────────────
      if (url.pathname === '/api/git/commit' && request.method === 'POST') {
        const { filePath, content, commitMessage, isBase64 } = await request.json();

        if (!filePath || content === undefined) {
          return new Response(JSON.stringify({ error: 'filePath and content are required' }), { status: 400, headers: corsHeaders });
        }

        // 1. Check if file already exists in repository to get its SHA blob
        const getFileUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
        const getRes = await fetch(getFileUrl, {
          headers: {
            'User-Agent': 'Noble-CMS-Worker',
            'Authorization': `token ${ghToken}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        let sha = null;
        if (getRes.ok) {
          const fileData = await getRes.json();
          sha = fileData.sha;
        }

        // 2. Prepare Base64 content
        let encodedContent = content;
        if (!isBase64) {
          const stringContent = typeof content === 'object' ? JSON.stringify(content, null, 2) : String(content);
          encodedContent = btoa(unescape(encodeURIComponent(stringContent)));
        }

        // 3. Commit file via GitHub REST API
        const putRes = await fetch(getFileUrl, {
          method: 'PUT',
          headers: {
            'User-Agent': 'Noble-CMS-Worker',
            'Authorization': `token ${ghToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: commitMessage || `cms: update ${filePath} via admin panel`,
            content: encodedContent,
            sha: sha || undefined
          })
        });

        const putData = await putRes.json();

        if (putRes.ok) {
          return new Response(JSON.stringify({
            success: true,
            commit: putData.commit,
            content: putData.content
          }), { headers: corsHeaders });
        } else {
          return new Response(JSON.stringify({
            success: false,
            error: putData.message || 'GitHub API commit failed'
          }), { status: putRes.status, headers: corsHeaders });
        }
      }

      // ─── DEPLOYMENT STATUS ROUTE ───────────────────────────────────────────
      if (url.pathname === '/api/git/status' && request.method === 'GET') {
        const runsUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/actions/runs?per_page=5`;
        const res = await fetch(runsUrl, {
          headers: {
            'User-Agent': 'Noble-CMS-Worker',
            'Authorization': `token ${ghToken}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        if (res.ok) {
          const data = await res.json();
          const latestRun = data.workflow_runs?.[0] || null;
          return new Response(JSON.stringify({
            success: true,
            status: latestRun ? latestRun.status : 'unknown',
            conclusion: latestRun ? latestRun.conclusion : 'unknown',
            latestRun
          }), { headers: corsHeaders });
        }

        return new Response(JSON.stringify({ success: false, status: 'idle' }), { headers: corsHeaders });
      }

      return new Response(JSON.stringify({ error: 'Endpoint not found' }), { status: 404, headers: corsHeaders });

    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
    }
  }
};
