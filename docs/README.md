# SynapCode

> **English for Developers** — Nền tảng giúp lập trình viên Việt Nam thành thạo tiếng Anh thông qua ngữ cảnh lập trình thực tế.

## Tầm nhìn

Lập trình viên Việt cần tiếng Anh để đọc tài liệu, viết code sạch, đi phỏng vấn nước ngoài và làm việc remote. Các nền tảng hiện tại (Duolingo, ELSA, TOEIC) quá chung chung — không có từ vựng kỹ thuật, không có ngữ cảnh code.

SynapCode giải quyết vấn đề này bằng cách **dạy tiếng Anh qua chính công việc hàng ngày của developer**: đọc doc, viết code, và giao tiếp kỹ thuật.

## Công nghệ

| Layer | Công nghệ |
|-------|-----------|
| Backend | NestJS + TypeORM + PostgreSQL |
| Frontend | Next.js 16 (App Router) + Tailwind CSS |
| Code Editor | Monaco Editor |
| Code Runner | Judge0 API |
| AI | Google Gemini 2.0 Flash |
| Auth | Google OAuth, Facebook OAuth, GitHub OAuth |

## Tính năng chính

### Phase 1 — Authentication
- Đăng nhập bằng Google / Facebook / GitHub
- JWT + Refresh Token
- Profile tự động tạo từ thông tin social

### Phase 2 — Học tập
- **Flashcard kỹ thuật** — học từ vựng lập trình với AI sinh nội dung
- **Spaced Repetition** — ôn tập theo thuật toán SM-2
- **Course/Module/Lesson** — lộ trình học có cấu trúc
- **Quiz** — kiểm tra kiến thức (MCQ, True/False, Fill Blank)

### Phase 3 — Coding Playground 🚀
- Viết code trực tiếp trên trình duyệt (Monaco Editor)
- **Bilingual Coach** — kiểm tra tên biến, comment bằng English
- AI giải thích code theo yêu cầu
- Chạy thử code qua Judge0 API

### Phase 4 — Gamification
- XP, Level, Streak học liên tục
- Achievement, Leaderboard
- Daily Challenge

### Phase 5 — Cộng đồng
- User-generated flashcards
- AI sinh content tự động theo từ khoá
- Notes, Bookmark, Search

## Cấu trúc thư mục

```
E:\Learning\
├── backend/                  # NestJS API
│   └── src/
│       ├── auth/             # Auth module (OAuth strategies)
│       ├── users/            # User profile
│       ├── flashcards/       # Flashcard + SM-2
│       ├── courses/          # Course/Module
│       ├── lessons/          # Lesson
│       ├── exercises/        # Coding exercises
│       ├── quizzes/          # Quiz system
│       ├── playground/       # Coding playground
│       ├── progress/         # XP/Streak/Progress
│       ├── ai/               # Gemini integration
│       ├── notes/            # User notes
│       ├── bookmarks/        # Bookmarks
│       ├── achievements/     # Achievement system
│       └── common/           # Guards, decorators, filters
├── frontend/                 # Next.js App
│   └── src/
│       ├── app/              # App Router (pages, layout)
│       ├── features/         # Feature modules
│       │   ├── auth/         #   Auth (login, OAuth callback)
│       │   ├── course/       #   Course listing, detail
│       │   ├── lesson/       #   Lesson viewer
│       │   ├── flashcard/    #   Flashcard deck, review, create
│       │   ├── playground/   #   Coding playground
│       │   ├── quiz/         #   Quiz
│       │   └── profile/      #   User profile
│       ├── components/       # Shared components
│       │   ├── ui/           #   shadcn/ui components
│       │   ├── common/       #   Common components
│       │   └── layout/       #   Layout components
│       ├── services/         # Axios instance + feature services
│       ├── hooks/            # Custom hooks (dùng chung)
│       ├── providers/        # React Query, Theme, Auth providers
│       ├── schemas/          # Zod validation schemas
│       ├── types/            # TypeScript types/interfaces
│       ├── lib/              # Utilities, helpers
│       ├── store/            # Zustand (nếu cần)
│       └── middleware.ts     # Next.js middleware (auth guard)
└── docs/                     # Documentation
```
