/**
 * Noble Education GitOps CMS Cloudflare Worker
 * 
 * Provides API endpoints for Git-based CMS operations:
 * - Authentication (JWT via Web Crypto)
 * - Single/Batch Commits (GitHub REST/Tree APIs)
 * - Media Uploads
 * - GitHub Status & Logs
 */

/**
 * TextEncoder and TextDecoder
 */
const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Base64 Encoding/Decoding utilities for URL-safe operations
 */
const base64UrlEncode = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

const base64UrlDecode = (str) => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padLength = (4 - (base64.length % 4)) % 4;
  base64 += '='.repeat(padLength);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

/**
 * String to Base64 (standard)
 */
const toBase64 = (str) => {
  return btoa(unescape(encodeURIComponent(str)));
};

/**
 * Hash a string using SHA-256
 * @param {string} text 
 * @returns {Promise<string>} Hex representation of hash
 */
async function hashPassword(text) {
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Import HMAC key for JWT signing
 * @param {string} secret 
 * @returns {Promise<CryptoKey>}
 */
async function importKey(secret) {
  return await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Sign a JWT token
 * @param {Object} payload 
 * @param {string} secret 
 * @returns {Promise<string>}
 */
async function signJWT(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const headerEncoded = base64UrlEncode(encoder.encode(JSON.stringify(header)));
  const payloadEncoded = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const dataToSign = `${headerEncoded}.${payloadEncoded}`;
  
  const key = await importKey(secret);
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(dataToSign)
  );
  const signatureEncoded = base64UrlEncode(signatureBuffer);
  return `${dataToSign}.${signatureEncoded}`;
}

/**
 * Verify a JWT token
 * @param {string} token 
 * @param {string} secret 
 * @returns {Promise<Object|null>} Payload if valid, null otherwise
 */
async function verifyJWT(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [headerEncoded, payloadEncoded, signatureEncoded] = parts;
    const dataToSign = `${headerEncoded}.${payloadEncoded}`;
    const signatureBuffer = base64UrlDecode(signatureEncoded);
    
    const key = await importKey(secret);
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBuffer,
      encoder.encode(dataToSign)
    );
    
    if (!isValid) return null;
    
    const payload = JSON.parse(decoder.decode(base64UrlDecode(payloadEncoded)));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return payload;
  } catch (e) {
    return null;
  }
}

/**
 * GitHub API Request Helper
 * @param {string} path 
 * @param {Object} options 
 * @param {Object} env 
 * @returns {Promise<Object>}
 */
async function githubRequest(path, options, env) {
  const url = `https://api.github.com${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${env.GH_PAT}`,
      'User-Agent': 'Noble-CMS-Worker/1.0',
      ...(options.headers || {})
    }
  });
  
  if (!response.ok && response.status !== 404) {
    const errorBody = await response.text();
    console.error('GitHub API Error:', response.status, errorBody);
    throw new Error(`GitHub API Error ${response.status}: ${errorBody}`);
  }
  
  return response;
}

/**
 * Set CORS headers
 * @param {Request} request 
 * @param {Object} env 
 * @returns {Object}
 */
function getCorsHeaders(request, env) {
  const reqOrigin = request ? request.headers?.get('Origin') : null;
  const allowed = [
    'https://www.nobleedu.in',
    'https://nobleedu.in',
    'https://jekipansuriya2394.github.io',
    'http://localhost:5173',
    'http://localhost:3000'
  ];
  let origin = '*';
  if (reqOrigin && (allowed.includes(reqOrigin) || reqOrigin.endsWith('.nobleedu.in') || reqOrigin.includes('github.io') || reqOrigin.includes('localhost'))) {
    origin = reqOrigin;
  } else if (env && env.CORS_ORIGIN) {
    origin = env.CORS_ORIGIN;
  }
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

/**
 * Build JSON Response
 */
function jsonResponse(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  });
}

/**
 * Error Response
 */
function errorResponse(message, status = 400, headers = {}) {
  return jsonResponse({ error: message }, status, headers);
}

// Simple in-memory rate limiting map (best effort)
const rateLimits = new Map();

/**
 * Rate Limiting Middleware
 * @param {Request} request 
 * @returns {boolean} true if allowed, false if limited
 */
function checkRateLimit(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 100;

  const current = rateLimits.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > current.resetTime) {
    current.count = 1;
    current.resetTime = now + windowMs;
  } else {
    current.count++;
  }
  
  rateLimits.set(ip, current);

  // Clean up occasionally
  if (Math.random() < 0.01) {
    for (const [key, val] of rateLimits.entries()) {
      if (now > val.resetTime) rateLimits.delete(key);
    }
  }

  return current.count <= maxRequests;
}

export default {
  async fetch(request, env, ctx) {
    const corsHeaders = getCorsHeaders(request, env);
    
    // Handle OPTIONS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (!checkRateLimit(request)) {
      return errorResponse('Too Many Requests', 429, corsHeaders);
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // 9. GET /api/health
      if (path === '/api/health' && request.method === 'GET') {
        return jsonResponse({
          ok: true,
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        }, 200, corsHeaders);
      }

      // 1. POST /api/auth/login
      if (path === '/api/auth/login' && request.method === 'POST') {
        let body;
        try {
          body = await request.json();
        } catch(e) {
          return errorResponse('Invalid JSON', 400, corsHeaders);
        }
        const { username, password } = body;
        
        let adminUsers = [];
        try {
          adminUsers = JSON.parse(env.ADMIN_USERS || '[]');
        } catch(e) {
          console.error("ADMIN_USERS parsing failed");
        }
        
        const user = adminUsers.find(u => u.username === username);
        if (!user) {
          return errorResponse('Invalid credentials', 401, corsHeaders);
        }

        const hashedPw = await hashPassword(password);
        if (user.passwordHash !== hashedPw) {
          return errorResponse('Invalid credentials', 401, corsHeaders);
        }

        const now = Math.floor(Date.now() / 1000);
        const payload = {
          sub: user.username,
          role: user.role,
          iat: now,
          exp: now + (30 * 60) // 30 mins
        };
        
        const token = await signJWT(payload, env.JWT_SECRET);
        return jsonResponse({
          success: true,
          token,
          user: { username: user.username, role: user.role }
        }, 200, corsHeaders);
      }

      // Authentication Middleware for protected routes
      let user = null;
      if (path.startsWith('/api/auth/verify') || path.startsWith('/api/git/') || path.startsWith('/api/media/')) {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return errorResponse('Missing or invalid Authorization header', 401, corsHeaders);
        }
        
        const token = authHeader.substring(7);
        user = await verifyJWT(token, env.JWT_SECRET);
        if (!user) {
          return errorResponse('Invalid or expired token', 401, corsHeaders);
        }
      }

      // 2. GET /api/auth/verify
      if (path === '/api/auth/verify' && request.method === 'GET') {
        return jsonResponse({
          valid: true,
          user: { username: user.sub, role: user.role }
        }, 200, corsHeaders);
      }

      // Helper vars for GitHub API
      const owner = env.GH_OWNER;
      const repo = env.GH_REPO;
      const branch = env.GH_BRANCH || 'main';

      // 3. POST /api/git/commit
      if (path === '/api/git/commit' && request.method === 'POST') {
        const { filePath, content, commitMessage, isBase64 } = await request.json();
        if (!filePath || !content || !commitMessage) {
          return errorResponse('Missing required fields', 400, corsHeaders);
        }

        const fileData = isBase64 ? content : toBase64(content);
        
        // Get existing file SHA if any
        let sha = undefined;
        const getRes = await githubRequest(`/repos/${owner}/${repo}/contents/${filePath}`, {}, env);
        if (getRes.status === 200) {
          const getData = await getRes.json();
          sha = getData.sha;
        }

        const putBody = {
          message: commitMessage,
          content: fileData,
          branch: branch,
        };
        if (sha) putBody.sha = sha;

        const putRes = await githubRequest(`/repos/${owner}/${repo}/contents/${filePath}`, {
          method: 'PUT',
          body: JSON.stringify(putBody)
        }, env);

        const data = await putRes.json();
        return jsonResponse({
          success: true,
          commit: {
            sha: data.commit.sha,
            message: data.commit.message,
            url: data.commit.html_url
          }
        }, 200, corsHeaders);
      }

      // 4. POST /api/git/batch-commit
      if (path === '/api/git/batch-commit' && request.method === 'POST') {
        if (user.role !== 'superadmin' && user.role !== 'admin') {
          return errorResponse('Forbidden', 403, corsHeaders);
        }

        const { files, commitMessage } = await request.json();
        if (!files || !Array.isArray(files) || !commitMessage) {
          return errorResponse('Invalid payload', 400, corsHeaders);
        }

        // a. Get latest SHA
        const refRes = await githubRequest(`/repos/${owner}/${repo}/git/refs/heads/${branch}`, {}, env);
        const refData = await refRes.json();
        const latestCommitSha = refData.object.sha;

        // b. Get tree SHA
        const commitRes = await githubRequest(`/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, {}, env);
        const commitData = await commitRes.json();
        const baseTreeSha = commitData.tree.sha;

        // c. Create blob for each file
        const treeItems = [];
        for (const file of files) {
          const blobRes = await githubRequest(`/repos/${owner}/${repo}/git/blobs`, {
            method: 'POST',
            body: JSON.stringify({
              content: file.content,
              encoding: 'utf-8' // Or base64 if needed, but assuming utf-8 for JSON data
            })
          }, env);
          const blobData = await blobRes.json();
          treeItems.push({
            path: file.path,
            mode: '100644',
            type: 'blob',
            sha: blobData.sha
          });
        }

        // d. Create new tree
        const treeRes = await githubRequest(`/repos/${owner}/${repo}/git/trees`, {
          method: 'POST',
          body: JSON.stringify({
            base_tree: baseTreeSha,
            tree: treeItems
          })
        }, env);
        const newTreeData = await treeRes.json();

        // e. Create commit
        const newCommitRes = await githubRequest(`/repos/${owner}/${repo}/git/commits`, {
          method: 'POST',
          body: JSON.stringify({
            message: commitMessage,
            tree: newTreeData.sha,
            parents: [latestCommitSha]
          })
        }, env);
        const newCommitData = await newCommitRes.json();

        // f. Update ref
        await githubRequest(`/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
          method: 'PATCH',
          body: JSON.stringify({
            sha: newCommitData.sha
          })
        }, env);

        return jsonResponse({
          success: true,
          commit: {
            sha: newCommitData.sha,
            message: commitMessage
          }
        }, 200, corsHeaders);
      }

      // 5. DELETE /api/git/delete
      if (path === '/api/git/delete' && request.method === 'DELETE') {
        if (user.role !== 'superadmin') {
          return errorResponse('Forbidden', 403, corsHeaders);
        }

        const { filePath, commitMessage } = await request.json();
        
        let sha = undefined;
        const getRes = await githubRequest(`/repos/${owner}/${repo}/contents/${filePath}`, {}, env);
        if (getRes.status === 200) {
          const getData = await getRes.json();
          sha = getData.sha;
        } else {
          return errorResponse('File not found', 404, corsHeaders);
        }

        await githubRequest(`/repos/${owner}/${repo}/contents/${filePath}`, {
          method: 'DELETE',
          body: JSON.stringify({
            message: commitMessage || `Delete ${filePath}`,
            sha,
            branch
          })
        }, env);

        return jsonResponse({ success: true }, 200, corsHeaders);
      }

      // 6. GET /api/git/status
      if (path === '/api/git/status' && request.method === 'GET') {
        const runsRes = await githubRequest(`/repos/${owner}/${repo}/actions/runs?per_page=5`, {}, env);
        const runsData = await runsRes.json();
        
        const runs = (runsData.workflow_runs || []).map(r => ({
          id: r.id,
          status: r.status,
          conclusion: r.conclusion,
          name: r.name,
          created_at: r.created_at,
          updated_at: r.updated_at,
          html_url: r.html_url
        }));

        return jsonResponse({ success: true, runs }, 200, corsHeaders);
      }

      // 7. GET /api/git/log
      if (path === '/api/git/log' && request.method === 'GET') {
        const commitsRes = await githubRequest(`/repos/${owner}/${repo}/commits?per_page=10`, {}, env);
        const commitsData = await commitsRes.json();

        const commits = commitsData.map(c => ({
          sha: c.sha,
          message: c.commit.message,
          author: c.commit.author,
          date: c.commit.author.date,
          url: c.html_url
        }));

        return jsonResponse({ success: true, commits }, 200, corsHeaders);
      }

      // 8. POST /api/media/upload
      if (path === '/api/media/upload' && request.method === 'POST') {
        if (!['superadmin', 'admin', 'editor'].includes(user.role)) {
          return errorResponse('Forbidden', 403, corsHeaders);
        }

        const { folderPath, fileName, base64Content, mimeType } = await request.json();
        
        // Basic validation of base64
        const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        if (!base64Regex.test(base64Content.replace(/\s/g, ''))) {
           return errorResponse('Invalid base64 content', 400, corsHeaders);
        }

        const repoPath = `public/images/${folderPath}/${fileName}`.replace(/\/+/g, '/');
        
        const putBody = {
          message: `Upload media: ${fileName}`,
          content: base64Content,
          branch: branch,
        };

        const putRes = await githubRequest(`/repos/${owner}/${repo}/contents/${repoPath}`, {
          method: 'PUT',
          body: JSON.stringify(putBody)
        }, env);

        if (putRes.status !== 201) {
          throw new Error('Upload failed');
        }

        return jsonResponse({
          success: true,
          path: `/images/${folderPath}/${fileName}`.replace(/\/+/g, '/')
        }, 200, corsHeaders);
      }

      return errorResponse('Not Found', 404, corsHeaders);

    } catch (err) {
      console.error(err);
      return errorResponse(err.message || 'Internal Server Error', 500, corsHeaders);
    }
  }
};
