# Development Plan

## Ước tính thời gian

| Phase | Module | Thời gian |
|-------|--------|-----------|
| 1 | Auth (Google/Facebook/GitHub OAuth) | 2 ngày |
| 2 | Gemini AI Service + Caching | 1 ngày |
| 3 | Flashcard + Spaced Repetition | 2 ngày |
| 4 | Course/Module/Lesson + Quiz | 3 ngày |
| 5 | Coding Playground + Bilingual Coach | 4 ngày |
| 6 | Progress/XP/Streak/Achievement | 2 ngày |
| 7 | Notes + Bookmarks + Search | 1 ngày |
| 8 | Frontend Foundation + Auth pages | 3 ngày |
| 9 | Dashboard + Course UI | 2 ngày |
| 10 | Flashcards UI + Review Session | 2 ngày |
| 11 | Coding Playground UI | 3 ngày |
| 12 | Polish + Testing | 3 ngày |

**Total: ~28 ngày cho MVP**

## Thứ tự build

### Phase 1: Backend Foundation

```
Day 1-2: Auth module
  - Google OAuth strategy
  - Facebook OAuth strategy  
  - GitHub OAuth strategy
  - JWT + Refresh Token
  - User entity

Day 3: AI Service
  - Gemini integration
  - Cache system
  - generateFlashcard function

Day 4-5: Flashcards
  - Flashcard entity + CRUD
  - UserFlashcard + SM-2
  - Review session logic
  - AI generate endpoint

Day 6-8: Courses + Lessons + Quiz
  - Course/Module/Lesson entities
  - Lesson content API
  - Quiz CRUD
  - Submit + grading

Day 9-12: Coding Playground
  - Exercise entity
  - Judge0 integration
  - Bilingual Coach logic
  - AI explain

Day 13-14: Progress + Gamification
  - XP/Level/Streak logic
  - Achievement system
  - Dashboard API
  - Notes + Bookmarks
```

### Phase 2: Frontend (Feature-based structure)

```
Day 15-17: Foundation
  - Scaffold src/ structure (features/, components/, services/, ...)
  - services/http.ts (Axios instance + interceptors)
  - providers/ (QueryProvider, AuthProvider, ThemeProvider)
  - components/layout/ (Navbar, Sidebar, Footer)
  - components/ui/ (shadcn/ui: button, input, card, dialog...)
  - app/ layout + middleware.ts (auth guard)

Day 18-20: Auth + Dashboard
  - features/auth/ (components, hooks, api)
  - Login page + OAuth callback page
  - Dashboard page + progress cards

Day 21-22: Course + Lesson
  - features/course/ + features/lesson/
  - Course listing + detail page
  - Lesson viewer (READING, VIDEO, FLASHCARD types)

Day 23-24: Flashcards
  - features/flashcard/
  - Flashcard deck UI, Review session, Create form
  - Kết nối AI generate

Day 25-27: Coding Playground
  - features/playground/ (Monaco Editor, Coach Panel)
  - Exercise page + Run/Submit flow
  - features/quiz/ (QuizQuestion, QuizResult)

Day 28: Polish
  - Loading, error, empty states
  - Responsive, final testing
```

## Priority Matrix

```
High Impact / Low Effort → DO FIRST:
- Auth (social login) — không thể thiếu
- Gemini AI service — core differentiation
- Flashcard CRUD + SM-2 — core feature

High Impact / High Effort → PLAN CAREFULLY:
- Coding Playground — điểm nhấn nhưng phức tạp
- Bilingual Coach — AI integration cần tuning

Low Impact / Low Effort → QUICK WINS:
- Notes + Bookmarks
- Search
- Basic profile

Low Impact / High Effort → DEFER:
- Leaderboard (real-time phức tạp)
- AI Tutor (chat feature)
- Community features (sharing, voting)
```

## Tools & Services

### Free Tier / Low Cost

| Service | Usage | Cost |
|---------|-------|------|
| Google Gemini 2.0 Flash | AI content generation | Free (60 req/min) |
| PostgreSQL (local) | Database | Free |
| Judge0 Community | Code execution | Free (self-host) |
| Next.js + NestJS | Framework | Free |
| GitHub Pages | Documentation | Free |

### Paid (Production)

| Service | Usage | Estimated Cost |
|---------|-------|----------------|
| VPS (Railway/Fly.io) | Hosting | ~$10-20/month |
| PostgreSQL (cloud) | Database | ~$10/month |
| Cloudinary | Image upload | Free tier first |
| Judge0 (RapidAPI) | Code execution | ~$0.01/request |
