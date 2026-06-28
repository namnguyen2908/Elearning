# Progress / XP / Streak / Achievements

## Tổng quan

Hệ thống gamification giúp người dùng duy trì động lực học tập thông qua XP, Level, Streak và Achievements.

## XP System

### XP Sources

| Hành động | XP | Giới hạn |
|-----------|-----|---------|
| Hoàn thành lesson | +10 | Mỗi lesson 1 lần |
| Quiz score ≥80% | +20 | Mỗi quiz 1 lần |
| Coding exercise pass | +30 | Mỗi exercise 1 lần |
| Review flashcard (rating ≥ Good) | +5 | 10 card/ngày |
| Streak bonus | +5 × streak_level | 1 lần/ngày |
| Tạo flashcard | +5 | 5 card/ngày |
| Daily challenge | +30 | 1 lần/ngày |

### XP → Level Formula

```typescript
function getLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100));
}
// Level 1: 100 XP
// Level 2: 400 XP
// Level 3: 900 XP
// Level 10: 10,000 XP
// Level 20: 40,000 XP
// Level 50: 250,000 XP
```

### Level Titles

| Level | Title |
|-------|-------|
| 1-5 | Novice Coder |
| 6-10 | Apprentice |
| 11-20 | Journeyman |
| 21-30 | Artisan |
| 31-40 | Expert |
| 41-50 | Master |

## Streak System

### Cách hoạt động

- User học ít nhất 1 lesson hoặc review 5 flashcards trong ngày
- `lastActiveAt` được cập nhật
- Nếu `now - lastActiveAt > 24h` → streak reset về 0
- Cron job chạy 0h mỗi ngày kiểm tra và reset

### Streak Rewards

| Streak | Bonus XP/ngày |
|--------|--------------|
| 1-6 | +5 |
| 7-13 | +10 |
| 14-29 | +15 |
| 30+ | +20 |

## Achievement System

### Achievement List

| Key | Name | Criteria | XP |
|-----|------|----------|-----|
| first_lesson | First Commit | Complete first lesson | 50 |
| streak_7 | 7-Day Streak | Maintain 7-day streak | 100 |
| streak_30 | 30-Day Streak | Maintain 30-day streak | 500 |
| vocab_50 | Vocabulary Starter | Learn 50 flashcards | 100 |
| vocab_200 | Word Collector | Learn 200 flashcards | 300 |
| quiz_perfect | Perfect Score | Get 100% on any quiz | 100 |
| quiz_master | Quiz Master | Get 100% on 10 quizzes | 500 |
| code_first | First Code | Submit first coding exercise | 100 |
| code_10 | Code Warrior | Complete 10 coding exercises | 300 |
| course_complete | Course Graduate | Complete a full course | 500 |
| level_5 | Level Up! | Reach level 5 | 100 |
| level_10 | Double Digits | Reach level 10 | 300 |
| contributor | Community Helper | Create 10 public flashcards | 100 |

### Achievement Check Flow

```
User hoàn thành lesson
    ↓
ProgressService.completeLesson()
    ↓
Update XP, level, streak
    ↓
AchievementService.check()
    ↓
Kiểm tra tất cả achievements chưa unlock
    ↓
Nếu đạt criteria → unlock → thông báo
```

## Dashboard API

```json
GET /api/progress/dashboard

{
  "user": {
    "level": 12,
    "xp": 3240,
    "xpToNextLevel": 760,
    "streak": 15,
    "totalStudyTime": 54000,
    "completedLessons": 45,
    "reviewedCards": 230
  },
  "recentActivity": [
    { "type": "lesson", "name": "Git vocabulary", "xp": 10, "date": "2026-06-28" }
  ],
  "dueReviews": 12,
  "achievements": {
    "total": 15,
    "unlocked": 8,
    "recent": { "name": "7-Day Streak", "date": "2026-06-25" }
  },
  "courseProgress": [
    { "courseId": "uuid", "title": "Tech Vocabulary", "progress": 65 }
  ]
}
```

## API Endpoints

| Method | Path | Mô tả |
|--------|------|-------|
| GET | /api/progress/dashboard | Dashboard tổng quan |
| GET | /api/progress/courses | Progress từng course |
| GET | /api/progress/streak | Streak info + history |
| GET | /api/achievements | All achievements |
| GET | /api/achievements/mine | My unlocked achievements |
