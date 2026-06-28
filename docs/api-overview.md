# API Overview

## Base URL

```
Development: http://localhost:4000/api
Production:  https://api.synapcode.com/api
```

## Authentication

Hầu hết endpoints yêu cầu **Bearer Token** trong header:

```
Authorization: Bearer <access_token>
```

Lấy token qua OAuth login. Token hết hạn sau 15 phút → dùng refresh token.

## Response Format

### Success
```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Error
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "timestamp": "2026-06-28T12:00:00.000Z"
}
```

## Authentication

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| GET | /auth/google | - | Redirect to Google OAuth |
| GET | /auth/google/callback | - | Google OAuth callback |
| GET | /auth/facebook | - | Redirect to Facebook OAuth |
| GET | /auth/facebook/callback | - | Facebook OAuth callback |
| GET | /auth/github | - | Redirect to GitHub OAuth |
| GET | /auth/github/callback | - | GitHub OAuth callback |
| POST | /auth/refresh | - | Refresh JWT |
| GET | /auth/me | JWT | Current user info |
| POST | /auth/logout | JWT | Logout |

## Flashcards

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| GET | /flashcards | JWT | List/search flashcards |
| GET | /flashcards/my | JWT | My deck |
| GET | /flashcards/review | JWT | Cards due for review |
| GET | /flashcards/:id | JWT | Get one flashcard |
| POST | /flashcards | JWT | Create flashcard |
| POST | /flashcards/generate | JWT | AI generate from term |
| POST | /flashcards/:id/add-to-mine | JWT | Add to my deck |
| POST | /flashcards/:id/review | JWT | Submit review rating |
| DELETE | /flashcards/:id | JWT | Remove from my deck |

## Courses

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| GET | /courses | JWT | List courses |
| GET | /courses/:slug | JWT | Course detail |
| GET | /modules/:id/lessons | JWT | Module lessons |
| GET | /lessons/:id | JWT | Lesson detail |
| POST | /lessons/:id/complete | JWT | Complete lesson |

## Exercises & Playground

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| GET | /exercises/:id | JWT | Exercise detail |
| POST | /exercises/:id/run | JWT | Run code |
| POST | /exercises/:id/submit | JWT | Submit solution |
| POST | /playground/check | JWT | Bilingual code check |
| POST | /playground/explain | JWT | AI explain code |
| POST | /playground/ai-review | JWT | Full AI code review |

## Quizzes

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| GET | /quizzes/:id | JWT | Get quiz |
| POST | /quizzes/:id/submit | JWT | Submit answers |
| GET | /quizzes/:id/result | JWT | Get result |

## Progress

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| GET | /progress/dashboard | JWT | Dashboard data |
| GET | /progress/courses | JWT | Course progress |
| GET | /progress/streak | JWT | Streak info |

## Achievements

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| GET | /achievements | JWT | All achievements |
| GET | /achievements/mine | JWT | My unlocked achievements |

## Notes

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| GET | /notes | JWT | My notes |
| GET | /notes/:id | JWT | Get note |
| POST | /notes | JWT | Create note |
| PUT | /notes/:id | JWT | Update note |
| DELETE | /notes/:id | JWT | Delete note |

## Bookmarks

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| GET | /bookmarks | JWT | My bookmarks |
| POST | /bookmarks | JWT | Add bookmark |
| DELETE | /bookmarks/:id | JWT | Remove bookmark |

## Search

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| GET | /search?q=&type= | JWT | Search flashcards, courses |

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
