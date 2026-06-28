# Quiz System

## Tổng quan

Quiz giúp kiểm tra kiến thức sau mỗi bài học. SynapCode hỗ trợ các dạng câu hỏi phổ biến, tập trung vào ngữ cảnh tiếng Anh cho developer.

## Question Types

### 1. Multiple Choice

```json
{
  "type": "multiple_choice",
  "question": "What does 'API' stand for?",
  "options": [
    "Application Programming Interface",
    "Application Program Integration",
    "Automated Program Interface",
    "Advanced Programming Interface"
  ],
  "correctAnswer": 0,
  "explanation": "API stands for Application Programming Interface..."
}
```

### 2. True / False

```json
{
  "type": "true_false",
  "question": "'A function can only return one value' — is this true or false?",
  "options": ["True", "False"],
  "correctAnswer": 0,
  "explanation": "In JavaScript, a function can only return one value..."
}
```

### 3. Fill in the Blank

```json
{
  "type": "fill_blank",
  "question": "A ______ is a block of code designed to perform a particular task.",
  "options": ["function", "variable", "loop", "array"],
  "correctAnswer": 0,
  "explanation": "A function is a reusable block of code..."
}
```

## Quiz Flow

```
User mở quiz lesson
    ↓
GET /api/quizzes/:id
    ↓
Hiển thị lần lượt từng question
    ↓
User chọn đáp án → highlight correct/incorrect ngay
    ↓
Hiển thị explanation
    ↓
Câu tiếp theo
    ↓
Sau câu cuối → Submit
    ↓
POST /api/quizzes/:id/submit { answers: [...] }
    ↓
Server tính điểm:
  - score = (số câu đúng / tổng câu) × 100
  - XP = score / 100 × quiz.xpReward
  - Lưu kết quả vào user_lesson_progress
    ↓
GET /api/quizzes/:id/result
    ↓
Hiển thị: Score, Correct/Wrong, Time, Review answers
```

## API Endpoints

| Method | Path | Mô tả |
|--------|------|-------|
| GET | /api/quizzes/:id | Get quiz + questions |
| POST | /api/quizzes/:id/submit | Submit answers |
| GET | /api/quizzes/:id/result | Get result |

## Submit Request

```json
POST /api/quizzes/:id/submit
{
  "answers": [
    { "questionId": "uuid", "selectedAnswer": 2 },
    { "questionId": "uuid", "selectedAnswer": 1 }
  ],
  "timeSpent": 120
}
```

## Submit Response

```json
{
  "score": 80,
  "totalQuestions": 10,
  "correctCount": 8,
  "wrongCount": 2,
  "xpEarned": 16,
  "answers": [
    {
      "questionId": "uuid",
      "correct": true,
      "correctAnswer": 2,
      "explanation": "..."
    }
  ]
}
```

## Quiz Design Guidelines

- 5-10 câu hỏi mỗi quiz
- Câu hỏi liên quan đến vocabulary trong bài học
- Explanation bằng tiếng Việt để dễ hiểu
- Từ 1-2 câu hỏi "đọc hiểu code" mỗi quiz
