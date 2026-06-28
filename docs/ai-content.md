# AI Content Generation (Gemini)

## Tổng quan

SynapCode sử dụng **Google Gemini 2.0 Flash** (free tier) để sinh nội dung học tập tự động. AI đóng vai trò:

1. **Sinh flashcard** từ từ khoá
2. **Sinh quiz question** từ bài học
3. **Giải thích code** khi user yêu cầu
4. **Bilingual Coach** — kiểm tra code variable naming

## Gemini Setup

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash',
  generationConfig: {
    temperature: 0.3,      // Thấp = output consistent hơn
    topP: 0.8,
    topK: 40,
  },
});
```

## AI Functions

### 1. generateFlashcard

```
Input:  { term: "closure" }
Output: {
  pronunciation: string,
  definition_vi: string,
  definition_en: string,
  exampleSentence: string,
  exampleCode: string | null,
  relatedTerms: string[],
  difficulty: string
}
```

### 2. generateQuizQuestion

```
Input:  { topic: "JavaScript closures", type: "multiple_choice" }
Output: {
  question: string,
  options: string[],
  correctAnswer: number,
  explanation: string
}
```

### 3. explainCode

```
Input:  { code: "const x = arr.map(fn);" }
Output: {
  explanation_vi: string,
  explanation_en: string,
  keyTerms: Array<{ term: string, definition: string }>
}
```

### 4. bilingualCodeReview

```
Input:  { code: "function tinhTong(a, b) { ... }" }
Output: {
  issues: Array<{
    line: number,
    type: "variable_name" | "comment_language" | "convention",
    message: string,
    suggestion: string
  }>,
  score: number
}
```

## Cost Optimization

### Cache Strategy

```
User request → Hash(term) → Cache check (DB) → Hit → Return cached
                                                  Miss → Call Gemini → Save → Return
```

- Cache key: MD5 hash của term (lowercase, trim)
- Cache duration: 30 ngày (content ít thay đổi)
- Cache table:
  ```sql
  CREATE TABLE ai_cache (
    key VARCHAR(64) PRIMARY KEY,
    response JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );
  ```

### Rate Limiting

Gemini free tier: **60 requests/minute, 1,000 requests/day**

- Queue mechanism cho batch generation
- Retry với exponential backoff nếu rate limited
- Hiển thị "AI generation temporarily unavailable" nếu hết quota

## Prompt Engineering

### Best Practices

1. **System prompt** — luôn đặt ngữ cảnh "You are an English-for-developers tutor"
2. **JSON mode** — yêu cầu output strict JSON
3. **Temperature** — 0.2-0.3 cho factual content, 0.7 cho creative
4. **Few-shot examples** — cho 1-2 example trong prompt

### Prompt Template (generateFlashcard)

```
Bạn là gia sư tiếng Anh chuyên ngành lập trình. 
Sinh flashcard cho từ kỹ thuật sau.

YÊU CẦU:
- Trả về JSON hợp lệ, KHÔNG markdown
- definition_vi: ngắn gọn, dễ hiểu, đúng chuyên môn
- exampleSentence: câu tiếng Anh tự nhiên, có ngữ cảnh lập trình
- exampleCode: code minh hoạ (hoặc null nếu không phù hợp)

TERM: "{{term}}"

FORMAT:
{
  "pronunciation": "...",
  "definition_vi": "...",
  "definition_en": "...",
  "exampleSentence": "...",
  "exampleCode": "...",
  "relatedTerms": ["..."],
  "difficulty": "beginner|intermediate|advanced"
}
```

## Error Handling

| Error | Cause | Handling |
|-------|-------|----------|
| 429 Too Many Requests | Rate limit | Retry sau 1s, queue |
| 400 Bad Request | Invalid prompt | Log prompt, fallback message |
| 500 Internal | Gemini down | Return cached, fallback |
| Empty response | Content filter | Retry với prompt khác |

## Future AI Features

- **AI Tutor** — chat với Gemini để hỏi về code
- **Auto Lesson Generator** — nhập topic, AI sinh cả lesson
- **Smart Review** — AI đề xuất card yếu cần ôn
- **Code Translation** — dịch code comment sang English
