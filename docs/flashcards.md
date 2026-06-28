# Flashcard & Spaced Repetition

## Tổng quan

Flashcard là trái tim của SynapCode. Mỗi thẻ kết hợp giữa **từ vựng tiếng Anh kỹ thuật** với **khái niệm lập trình**, tạo ra trải nghiệm học kép.

## Cấu trúc Flashcard

```
┌─────────────────────────────────────┐
│  frontContent: "function"           │
│  pronunciation: "/ˈfʌŋk.ʃən/"      │
├─────────────────────────────────────┤
│  backContent:                       │
│  "hàm — một khối code có thể        │
│   tái sử dụng, thực hiện một tác vụ"│
│                                     │
│  exampleSentence:                   │
│  "A function takes an input and     │
│   returns an output."               │
│                                     │
│  exampleCode:                       │
│  function add(a, b) { return a+b; } │
└─────────────────────────────────────┘
```

## Content Sources

| Source | Cách hoạt động | Quality Control |
|--------|----------------|-----------------|
| **AI Generated** | User nhập từ khoá → Gemini sinh nội dung | Review trước khi save |
| **User Created** | User tự điền thông tin | Private mặc định |
| **System Seed** | 50 từ cốt lõi có sẵn | Đã kiểm duyệt |
| **Community** | User publish card công khai | Vote + admin approve |

## AI Generation Flow

```
User gõ: "Promise"
    ↓
POST /api/flashcards/generate { term: "Promise" }
    ↓
Cache check (đã generate term này chưa?)
    ↓
if cache miss:
    Gemini prompt: generate tech term card
    Response JSON: { definition, pronunciation, example, code }
    ↓
Save to cache + return to user
    ↓
User xem, edit → Save as flashcard
```

### Gemini Prompt Template

```
You are an English-for-developers tutor. Given a technical term, generate a 
flashcard in JSON format. Return ONLY valid JSON, no markdown.

Term: "{{term}}"

{
  "pronunciation": "IPA string or null",
  "definition_vi": "Vietnamese definition - ngắn gọn, dễ hiểu",
  "definition_en": "English definition",
  "exampleSentence": "Natural English sentence using this term in tech context",
  "exampleCode": "Code example demonstrating the concept (or null)",
  "relatedTerms": ["term1", "term2", "term3"],
  "difficulty": "beginner|intermediate|advanced"
}
```

## Spaced Repetition (SM-2)

### Thuật toán

```
Input: Rating (0 = Again, 1 = Hard, 2 = Good, 3 = Easy)

Nếu rating == Again (0):
    repetitions = 0
    interval = 1 (ngày)
    lapses += 1

Nếu rating >= Hard (1):
    Nếu repetitions == 0:
        interval = 1
    Nếu repetitions == 1:
        interval = 3
    Nếu repetitions >= 2:
        interval = ceil(interval × ease)
    repetitions += 1

Cập nhật ease factor:
    ease = ease + (0.1 - (3 - rating) × (0.08 + (3 - rating) × 0.02))
    ease = max(1.3, ease)

nextReviewDate = today + interval (ngày)
```

### Review Intervals

| Rating | Lần 1 | Lần 2 | Lần 3 | Lần 4+ |
|--------|-------|-------|-------|--------|
| Again | 1d | 1d | 1d | 1d |
| Hard | 1d | 2d | 4d | 8d |
| Good | 1d | 3d | 7d | 14d+ |
| Easy | 1d | 4d | 12d | 30d+ |

*Base ease = 2.5, effienc tăng/giảm theo lịch sử review*

## Review Session Flow

```
GET /api/flashcards/review?limit=20
    ↓
Returns cards with nextReviewDate <= today
    ↓
User sees card front → click "Flip" → sees back
    ↓
User rates: Again | Hard | Good | Easy
    ↓
POST /api/flashcards/:id/review { rating: 2 }
    ↓
Update ease, interval, nextReviewDate
    ↓
Tính XP: +5/card nếu rating >= Good
```

## API Endpoints

| Method | Path | Mô tả |
|--------|------|-------|
| GET | /api/flashcards | List flashcards (search, filter) |
| GET | /api/flashcards/:id | Get one flashcard |
| POST | /api/flashcards | Create user flashcard |
| POST | /api/flashcards/generate | AI generate từ term |
| POST | /api/flashcards/:id/add-to-mine | Add system card to my deck |
| GET | /api/flashcards/my | My deck |
| GET | /api/flashcards/review | Cards due for review |
| POST | /api/flashcards/:id/review | Submit rating |

## User Deck Management

```
Khi user đăng ký:
  Tự động thêm 10 card phổ biến nhất vào deck

Khi user học lesson:
  Flashcards trong lesson đó tự động thêm vào deck

User có thể:
  - Search flashcards → "Add to my deck"
  - Xoá card khỏi deck
  - Tạo card mới (manual / AI)
  - Share card với bạn bè (after MVP)
```
