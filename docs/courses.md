# Course / Module / Lesson

## Tổng quan

Hệ thống khoá học có cấu trúc phân cấp 3 tầng:
```
Course (VD: "Tech Vocabulary Fundamentals")
  └── Module (VD: "Git & GitHub")
        └── Lesson (VD: "What is a repository?")
```

## Course Structure

### Course Categories

| Category | Mô tả | Ví dụ |
|----------|-------|-------|
| tech_vocab | Từ vựng kỹ thuật theo chủ đề | Git terms, Web dev terms |
| reading_docs | Kỹ năng đọc tài liệu | Reading MDN, Reading Stack Overflow |
| coding_english | Viết code bằng English | Variable naming, Clean comments |
| grammar_for_dev | Ngữ pháp cho developer | Technical writing, Passive voice |
| interview_prep | Chuẩn bị phỏng vấn | Behavioral questions, System design vocab |

### Difficulty Levels

- **beginner** — cho sinh viên, intern
- **intermediate** — cho junior dev
- **advanced** — cho senior dev, chủ đề chuyên sâu

### Lesson Types

| Type | Mô tả | Hiển thị Frontend |
|------|-------|-------------------|
| READING | Nội dung text + vocab highlight | Markdown renderer |
| CODING | Coding exercise | Monaco Editor + Judge0 |
| QUIZ | Kiểm tra kiến thức | Quiz component |
| FLASHCARD | Ôn tập từ vựng | Flashcard deck |
| VIDEO | Video bài giảng | Video player + transcript |

## Seed Courses (MVP)

### Course 1: "Tech Vocabulary Fundamentals"

| Module | Lessons |
|--------|---------|
| Git & GitHub | What is a repository?, Common Git commands, Pull Request vocabulary |
| Web Development | Frontend vs Backend, API terminology, Database vocabulary |
| JavaScript | Variables & Types, Functions & Scope, Async & Promises |
| Programming Paradigms | OOP terms, Functional programming terms, Design patterns |

### Course 2: "Reading Developer Documentation"

| Module | Lessons |
|--------|---------|
| MDN Web Docs | How to read MDN, Understanding API docs, Reading specification |
| Stack Overflow | How to ask questions, Reading answers, Understanding code snippets |
| Technical Blogs | Following tutorials, Understanding architecture diagrams |

### Course 3: "Coding in English"

| Module | Lessons |
|--------|---------|
| Variable Naming | Meaningful names, Booleans naming, Constants naming |
| Comments & Docs | Writing clear comments, JSDoc best practices |
| Code Review | Giving feedback, Receiving feedback, Common phrases |

## Lesson Content Structure

### READING Lesson
```json
{
  "type": "reading",
  "content": "# What is a Repository?\n\nA **repository** (or \"repo\") is...",
  "vocabulary": [
    {"word": "repository", "definition": "kho lưu trữ code"},
    {"word": "commit", "definition": "lưu lại thay đổi"}
  ]
}
```

### CODING Lesson
```json
{
  "type": "coding",
  "exerciseId": "uuid",
  "instructions": "Write a function that calculates...",
  "vocabulary": ["calculate", "return", "parameter"]
}
```

### QUIZ Lesson
```json
{
  "type": "quiz",
  "quizId": "uuid",
  "description": "Test your knowledge of Git vocabulary"
}
```

### FLASHCARD Lesson
```json
{
  "type": "flashcard",
  "flashcardIds": ["uuid1", "uuid2"],
  "description": "Review key terms from this module"
}
```

## Progress Tracking

Khi user hoàn thành lesson:
1. `user_lesson_progress` được tạo với `completed = true`
2. `user_course_progress.completedLessons` tăng lên
3. User nhận XP (`user.xp += lesson.xpReward`)
4. Kiểm tra streak update
5. Kiểm tra achievement unlock

## API Endpoints

| Method | Path | Mô tả |
|--------|------|-------|
| GET | /api/courses | Danh sách courses (filter by category/difficulty) |
| GET | /api/courses/:slug | Chi tiết course + modules |
| GET | /api/modules/:id/lessons | Lessons trong module |
| GET | /api/lessons/:id | Chi tiết lesson + nội dung |
| POST | /api/lessons/:id/complete | Đánh dấu lesson hoàn thành |
| GET | /api/lessons/:id/flashcards | Flashcards trong lesson |
