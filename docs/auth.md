# Authentication Module

## Tổng quan

SynapCode sử dụng **Social Login exclusively** — không có đăng ký bằng email/password. Người dùng đăng nhập qua Google, Facebook, hoặc GitHub.

## Luồng OAuth

```
Browser                          Backend                        Provider
   │                                │                              │
   │  GET /api/auth/google          │                              │
   │───────────────────────────────>│                              │
   │                                │  Redirect to Google          │
   │<───────────────────────────────│                              │
   │  User consents                 │                              │
   │──────────────────────────────────────────────────────────────>│
   │                                │                              │
   │  Callback /api/auth/google/cb  │                              │
   │<───────────────────────────────│                              │
   │  (kèm code)                    │                              │
   │                                │  Exchange code for token     │
   │──────────────────────────────────────────────────────────────>│
   │                                │  Get user info               │
   │<──────────────────────────────────────────────────────────────│
   │                                │  Find or create user         │
   │                                │  Generate JWT + Refresh      │
   │  Redirect to frontend          │                              │
   │<───────────────────────────────│                              │
   │  (kèm access_token + refresh)  │                              │
```

## OAuth Provider Configuration

### Google OAuth

```typescript
// Google API Console: https://console.cloud.google.com/apis/credentials
// Redirect URI: /api/auth/google/callback
// Scopes: email, profile
{
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${API_URL}/api/auth/google/callback`,
  scope: ['email', 'profile'],
}
```

### Facebook OAuth

```typescript
// Facebook Developers: https://developers.facebook.com/
// Redirect URI: /api/auth/facebook/callback
// Scopes: email, public_profile
{
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${API_URL}/api/auth/facebook/callback`,
  scope: ['email', 'public_profile'],
  profileFields: ['id', 'emails', 'name', 'photos'],
}
```

### GitHub OAuth

```typescript
// GitHub Settings: https://github.com/settings/developers
// Redirect URI: /api/auth/github/callback
// Scopes: user:email, read:user
{
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${API_URL}/api/auth/github/callback`,
  scope: ['user:email', 'read:user'],
}
```

## API Endpoints

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| GET | /api/auth/google | Public | Redirect to Google OAuth |
| GET | /api/auth/google/callback | Public | Google OAuth callback |
| GET | /api/auth/facebook | Public | Redirect to Facebook OAuth |
| GET | /api/auth/facebook/callback | Public | Facebook OAuth callback |
| GET | /api/auth/github | Public | Redirect to GitHub OAuth |
| GET | /api/auth/github/callback | Public | GitHub OAuth callback |
| POST | /api/auth/refresh | Public | Refresh JWT token |
| GET | /api/auth/me | JWT | Get current user info |
| POST | /api/auth/logout | JWT | Clear refresh token |

## Token Design

### Access Token (JWT)
- **Duration:** 15 phút
- **Payload:**
  ```json
  {
    "sub": "user-uuid",
    "email": "user@example.com",
    "iat": 1680000000,
    "exp": 1680000900
  }
  ```

### Refresh Token
- **Duration:** 7 ngày
- **Storage:** Lưu trong DB (users.refresh_token)
- **Rotation:** Cấp refresh token mới mỗi lần refresh

### Frontend Storage Strategy

```
Access Token  → In-memory (hoặc httpOnly cookie)
Refresh Token → localStorage
```

## User Creation Logic

```
findOrCreateUser(provider, profile):
    user = findUserByProviderId(profile.id)
    if user:
        update profile if needed (name, avatar)
        return user
    
    user = createUser({
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0].value,
        googleId/facebookId/githubId: profile.id,
        authProvider: provider,
    })
    return user
```

## Error Handling

| Error | HTTP Status | Frontend Action |
|-------|-------------|-----------------|
| Invalid OAuth token | 401 | Redirect to login |
| Email not provided by provider | 400 | Show "need email" message |
| Token expired | 401 | Try refresh, then redirect |
| Refresh token invalid | 401 | Clear storage, redirect login |

## Environment Variables

```
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
FACEBOOK_APP_ID=xxx
FACEBOOK_APP_SECRET=xxx
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
JWT_SECRET=xxx
JWT_REFRESH_SECRET=xxx
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```
