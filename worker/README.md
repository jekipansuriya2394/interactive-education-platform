# Cloudflare Worker Backend

This Cloudflare Worker acts as the secure API bridge for the GitOps CMS. It handles authentication, validates user sessions, and interacts securely with the GitHub API on behalf of the frontend, ensuring sensitive tokens like the GitHub PAT are never exposed to the client.

## API Endpoints

### `POST /api/login`
Authenticates a user and returns a JWT.
- **Request Body:** `{ "username": "admin", "password": "mypassword" }`
- **Response:** `{ "token": "<jwt_token>", "user": { "username": "admin", "role": "Super Admin" } }`

### `GET /api/content/:path`
Retrieves content from the GitHub repository.
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Response:** File contents from GitHub.

### `PUT /api/content/:path`
Updates content in the GitHub repository.
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Request Body:** `{ "content": "<base64_encoded_content>", "message": "Commit message" }`
- **Response:** GitHub API commit response.

## Generating a Secure `JWT_SECRET`

Generate a secure random string using OpenSSL:
```bash
openssl rand -hex 32
```

## Configuring `ADMIN_USERS`

The `ADMIN_USERS` secret requires a JSON string containing users and their hashed passwords.

**Node.js script to generate a SHA-256 hash:**
```javascript
const crypto = require('crypto');
const password = 'your_password_here';
const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log(hash);
```

**JSON Format Example:**
```json
[
  {
    "username": "admin",
    "hash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "role": "Super Admin"
  }
]
```

## Wrangler CLI Commands

- **Deploy:** `npx wrangler deploy`
- **Tail Logs:** `npx wrangler tail`
- **Update Secrets:** `npx wrangler secret put <SECRET_NAME>`

## CORS Configuration

The worker is configured with permissive CORS for the frontend origins. Ensure that `Access-Control-Allow-Origin` and related headers are configured appropriately for production domains in `wrangler.toml` or worker code.

## Rate Limiting

The worker employs basic rate limiting via Cloudflare's platform to protect the authentication endpoints from brute-force attacks and prevent excessive API calls to GitHub.
