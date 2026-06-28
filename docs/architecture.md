# Kiến trúc tổng thể

## Kiến trúc hệ thống

```
[Browser] ←→ [Next.js Frontend] ←→ [NestJS Backend] ←→ [PostgreSQL]
                  ↕                        ↕
          [Monaco Editor]          [Gemini AI Service]
                  ↕                        ↕
          [Judge0 API]             [OAuth Providers]
```

## Backend Architecture (NestJS)

### Cấu trúc thư mục

```
src/
├── main.ts                     # Entry point
├── app.module.ts               # Root module (import tất cả modules)
├── app.controller.ts           # Health check
│
├── common/                     # Shared utilities (dùng chung toàn bộ project)
│   ├── decorators/
│   │   ├── current-user.decorator.ts
│   │   └── public.decorator.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── interceptors/
│   │   └── response-transform.interceptor.ts
│   ├── interfaces/
│   │   └── api-response.interface.ts
│   └── constants/
│       └── index.ts
│
├── config/                     # Configuration
│   └── typeorm.config.ts
│
├── modules/                    # Feature modules
│   ├── auth/                   # OAuth (Google, Facebook, GitHub) + JWT
│   ├── users/                  # User CRUD, profile
│   ├── flashcards/             # Flashcard + SM-2 Spaced Repetition
│   ├── courses/                # Course + Module
│   ├── lessons/                # Lesson content
│   ├── exercises/              # Coding exercises
│   ├── quizzes/                # Quiz + Questions
│   ├── playground/             # Code runner + Bilingual Coach
│   ├── ai/                     # Gemini AI integration
│   ├── progress/               # XP, Level, Streak
│   ├── achievements/           # Achievement system
│   ├── notes/                  # User notes
│   ├── bookmarks/              # Bookmarks
│   └── mail/                   # Email service
│
└── database/                   # Seeds, migrations
    └── seeds/
```

Mỗi module trong `modules/` có cấu trúc chuẩn:

```
module-name/
├── controllers/    # Route handlers
├── services/       # Business logic
├── entities/       # TypeORM entities
├── dto/            # Validation DTOs
└── module-name.module.ts  # Module definition
```

### Module dependency graph

```
AuthModule ──> UsersModule
                   │
    ┌──────────────┼──────────────┐
    ↓              ↓              ↓
CourseModule  FlashcardModule  ProgressModule
    ↓                             ↑
LessonModule ────────────────────┘
    │
    ├── ExerciseModule
    └── QuizModule
```

### Request lifecycle

```
HTTP Request
    ↓
JwtAuthGuard (global, verify JWT — skip if @Public())
    ↓
Controller (route handler — validate DTOs)
    ↓
Service (business logic — gọi repository + các service khác)
    ↓
TypeORM Repository (database operations)
    ↓
ResponseTransformInterceptor (wrap response: { data, meta })
    ↓
HTTP Response
```

### Nguyên tắc thiết kế

1. **Feature-based** — tổ chức theo domain, không theo technical layer
2. **Module độc lập** — mỗi module có entities, services, controllers riêng
3. **Shared common** — decorators, guards, filters dùng chung đặt trong `common/`
4. **Global pipes/interceptors** — validation, transform response ở global level
5. **Thêm module mới** — chỉ cần tạo folder trong `modules/` + import trong `app.module.ts`

## Frontend Architecture (Next.js)

### Cấu trúc thư mục

```
src/
├── app/                    # App Router (routing, layout, pages)
│   ├── layout.tsx
│   ├── page.tsx            # Landing page
│   ├── (auth)/             # Auth route group (login, callback)
│   ├── dashboard/          # Dashboard page
│   ├── courses/            # Course pages
│   ├── flashcards/         # Flashcard pages
│   ├── playground/         # Coding playground pages
│   └── quiz/               # Quiz pages
│
├── features/               # Feature-based modules
│   ├── auth/
│   │   ├── components/     # Form, buttons, callback handler
│   │   ├── hooks.ts        # useLogin, useAuthCallback
│   │   ├── schema.ts       # Zod schemas cho auth
│   │   └── api.ts          # Auth service calls
│   ├── course/
│   │   ├── components/     # CourseCard, CourseList, CourseDetail
│   │   ├── hooks.ts        # useCourses, useCourseDetail
│   │   ├── schema.ts       # Course validation
│   │   └── api.ts          # Course API calls
│   ├── lesson/
│   │   ├── components/     # LessonViewer, ContentRenderer
│   │   ├── hooks.ts        # useLesson, useCompleteLesson
│   │   └── api.ts
│   ├── flashcard/
│   │   ├── components/     # FlashcardDeck, ReviewSession, CreateForm
│   │   ├── hooks.ts        # useFlashcards, useReviewSession
│   │   ├── schema.ts       # Flashcard validation
│   │   └── api.ts
│   ├── playground/
│   │   ├── components/     # CodeEditor, CoachPanel, OutputPanel
│   │   ├── hooks.ts        # useExercise, useCodeRunner
│   │   └── api.ts
│   ├── quiz/
│   │   ├── components/     # QuizQuestion, QuizResult
│   │   ├── hooks.ts        # useQuiz, useSubmitQuiz
│   │   └── api.ts
│   └── profile/
│       └── components/     # ProfileCard, Settings
│
├── components/             # Shared components
│   ├── ui/                 # shadcn/ui components (button, input, card...)
│   ├── common/             # Common components (Loading, Error, Empty...)
│   └── layout/             # Navbar, Sidebar, Footer
│
├── services/               # HTTP layer
│   ├── http.ts             # Axios instance (baseURL, interceptors)
│   ├── auth.service.ts     # Auth API
│   ├── course.service.ts   # Course API
│   ├── flashcard.service.ts
│   └── user.service.ts
│
├── providers/              # React context providers
│   ├── query-provider.tsx  # TanStack Query
│   ├── auth-provider.tsx   # Auth context
│   └── theme-provider.tsx  # Theme
│
├── hooks/                  # Custom hooks dùng chung
│   ├── use-debounce.ts
│   └── use-media-query.ts
│
├── schemas/                # Zod schemas dùng chung
│   ├── auth.schema.ts
│   └── common.schema.ts
│
├── types/                  # TypeScript types
│   ├── api.ts              # API response types
│   ├── user.ts
│   └── flashcard.ts
│
├── lib/                    # Utilities
│   ├── utils.ts            # cn(), formatDate(), etc.
│   └── constants.ts
│
├── store/                  # Zustand (chỉ khi cần client state)
│
└── middleware.ts           # Next.js middleware (auth guard, redirect)

```

### Công nghệ & Vai trò

| Công nghệ | Vị trí | Mục đích |
|-----------|--------|----------|
| Next.js App Router | `app/` | Routing, layout, pages |
| Tailwind CSS | `app/globals.css` | Styling (inline classes) |
| shadcn/ui | `components/ui/` | UI components (button, input...) |
| Axios | `services/http.ts` | HTTP client instance |
| TanStack Query | `providers/query-provider.tsx` | Server state management |
| React Hook Form | Bên trong từng feature | Form handling |
| Zod | `schemas/` hoặc `features/*/schema.ts` | Validation |
| Zustand | `store/` | Client state (optional) |
| Next.js Middleware | `middleware.ts` | Route protection, redirect |

### Data flow pattern

```
Page (app/page.tsx)
    ↓
Feature Hook (features/*/hooks.ts)
    ↓
Service (services/*.service.ts)
    ↓
Axios (services/http.ts) → Backend API
    ↓
Response → Hook (với TanStack Query)
    ↓
Component renders data
```

## Database connection

- TypeORM với PostgreSQL
- `synchronize: true` cho development (sẽ chuyển sang migrations cho production)
- Entity auto-discovery qua glob pattern
