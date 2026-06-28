# Coding Playground & Bilingual Mode

## Tổng quan

Coding Playground là **tính năng đột phá** của SynapCode. Nó không chỉ là code editor thông thường mà còn có **Bilingual Coach** — trợ lý kiểm tra và hướng dẫn viết code bằng English.

## Architecture

```
┌─────────────────────────────────────────────────┐
│              Monaco Editor                       │
│  ┌───────────────────────────────────────────┐   │
│  │  function calculateTotal(prices) {        │   │
│  │    let sum = 0;  ← OK                     │   │
│  │    for (let i = 0; i < prices.length; i++)│   │
│  │      sum += prices[i];                    │   │
│  │    return sum;                            │   │
│  │  }                                        │   │
│  └───────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│  Bilingual Coach Panel                          │
│  ✅ No issues found. Score: 100/100             │
├─────────────────────────────────────────────────┤
│  [▶ Run] [✓ Submit] [💡 Explain]                │
└─────────────────────────────────────────────────┘
```

## Components

### 1. Language Coach

Kiểm tra code real-time khi user gõ:

| Rule | Ví dụ lỗi | Gợi ý |
|------|-----------|-------|
| **Variable name must be English** | `let tong = 0` | → `total`, `sum` |
| **Function name must be verb in English** | `function xuLy() {}` | → `handle`, `process` |
| **No Vietnamese characters** | `let tổng = 0` | → `let total = 0` |
| **camelCase for variables** | `let total_price` | → `totalPrice` |
| **Comments in English** | `// tính tổng` | → `// calculate total` |
| **PascalCase for classes** | `class userService` | → `class UserService` |

### 2. Code Runner (Judge0)

```
User click "Run"
    ↓
POST /api/exercises/:id/run { code, language }
    ↓
Send code to Judge0 API
    ↓
Judge0 compiles + runs + returns output
    ↓
Return stdout, stderr, time, memory
    ↓
Display in output panel
```

### 3. AI Explain

```
User selects code → click "Explain"
    ↓
POST /api/playground/explain { code: "const x = arr.map(fn)" }
    ↓
Gemini explains: what it does, key terms
    ↓
Show explanation panel (bilingual: English + Vietnamese)
```

### 4. Coding Exercise

```
User mở coding exercise:
  - Đề bài bằng English
  - Starter code (optional)
  - Test cases (hidden khi đang code)
  
User viết code:
  - Coach chạy ngầm, highlight issues
  - Score cập nhật real-time
  
User click "Submit":
  - Chạy tất cả test cases
  - Nếu pass → nhận XP + đánh dấu hoàn thành
  - Nếu fail → hiển thị test case failed
```

## User Flow

```
1. User chọn Coding lesson
2. Thấy đề bài: "Write a function named calculateAverage that..."
3. User gõ code, Coach chạy ngầm
4. User viết "function tinhTrungBinh()" → Coach báo lỗi ngay
5. User sửa thành "function calculateAverage(arr)" → OK
6. User click "Run" → thấy output
7. User click "Submit" → pass test cases → +30 XP
```

## API Endpoints

| Method | Path | Mô tả |
|--------|------|-------|
| GET | /api/exercises/:id | Get exercise detail |
| POST | /api/exercises/:id/run | Run code (Judge0) |
| POST | /api/exercises/:id/submit | Submit solution + run test cases |
| POST | /api/playground/check | Check code for language issues |
| POST | /api/playground/explain | AI giải thích code snippet |
| POST | /api/playground/ai-review | Full AI code review |

## Bilingual Coach Response Format

```typescript
interface CoachResponse {
  score: number;                    // 0-100
  issues: CoachIssue[];
  suggestions: string[];
}

interface CoachIssue {
  line: number;
  column: number;
  length: number;
  type: 'variable_name' | 'function_name' | 'comment_language' 
      | 'naming_convention' | 'vietnamese_char';
  message: string;                  // Mô tả lỗi
  suggestion: string;               // Gợi ý sửa
  severity: 'error' | 'warning' | 'info';
}
```

## Judge0 Integration

### Request
```json
POST /api/exercises/:id/run
{
  "language": "javascript",
  "code": "console.log('Hello')",
  "stdin": ""
}
```

### Judge0 Config (tự host hoặc RapidAPI)
```
Judge0 URL: https://api.judge0.com
Language IDs: JavaScript(63), Python(71), TypeScript(74)
```

### Response
```json
{
  "stdout": "Hello\n",
  "stderr": "",
  "time": "0.032",
  "memory": "8900",
  "status": "Accepted"
}
```

## Exercise Types

| Type | Mô tả | Test dạng |
|------|-------|-----------|
| Function | Viết function theo spec | Input → Expected output |
| Bug Fix | Fix code có sẵn | So sánh output |
| Refactor | Refactor code cho đúng convention | Naming check + output |
| Fill Blank | Điền vào chỗ trống | Match expected |

## Supported Languages (MVP)

- JavaScript (Node.js)
- TypeScript
- Python
- HTML/CSS (no sandbox, chỉ preview)
