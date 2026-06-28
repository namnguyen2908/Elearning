# Database Schema

## Entity Relationship Diagram

```
users ──────< user_course_progress >────── courses
  │                                          │
  │──────< user_lesson_progress >──────┐     │
  │                                    │     │
  │──────< user_flashcards >──────┐    │     │
  │                               │    │     ↓
  │                              flashcards modules
  │                               ↑       │
  │──────< user_achievements >────┐       │
  │                               ↓       ↓
  │                              achievements lessons
  │                                        │
  │──────< notes >─────────────────────────┘    │
  │                                             │
  │──────< bookmarks >──────────────────────────┘
                                                    │
                                               exercises
                                               quizzes ──< questions
```

## Tables

### users
```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           VARCHAR(255),
  name            VARCHAR(255),
  avatar          VARCHAR(500),
  google_id       VARCHAR(255) UNIQUE,
  facebook_id     VARCHAR(255) UNIQUE,
  github_id       VARCHAR(255) UNIQUE,
  auth_provider   VARCHAR(50) NOT NULL,
  level           INTEGER DEFAULT 1,
  xp              INTEGER DEFAULT 0,
  streak          INTEGER DEFAULT 0,
  last_active_at  TIMESTAMP,
  total_study_time INTEGER DEFAULT 0,
  refresh_token   TEXT,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);
```

### courses
```sql
CREATE TABLE courses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           VARCHAR(255) NOT NULL,
  slug            VARCHAR(255) UNIQUE NOT NULL,
  description     TEXT,
  image           VARCHAR(500),
  category        VARCHAR(50) NOT NULL,
  difficulty      VARCHAR(20) NOT NULL,
  total_modules   INTEGER DEFAULT 0,
  is_published    BOOLEAN DEFAULT true,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);
```

### modules
```sql
CREATE TABLE modules (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           VARCHAR(255) NOT NULL,
  description     TEXT,
  "order"         INTEGER NOT NULL,
  image           VARCHAR(500),
  course_id       UUID REFERENCES courses(id) ON DELETE CASCADE,
  created_at      TIMESTAMP DEFAULT NOW()
);
```

### lessons
```sql
CREATE TABLE lessons (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           VARCHAR(255) NOT NULL,
  content         TEXT,
  type            VARCHAR(20) NOT NULL,
  "order"         INTEGER DEFAULT 0,
  xp_reward       INTEGER DEFAULT 10,
  video_url       VARCHAR(500),
  reading_content TEXT,
  duration        INTEGER,
  module_id       UUID REFERENCES modules(id) ON DELETE CASCADE,
  created_at      TIMESTAMP DEFAULT NOW()
);
```

### exercises
```sql
CREATE TABLE exercises (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           VARCHAR(255) NOT NULL,
  instructions    TEXT NOT NULL,
  type            VARCHAR(20) NOT NULL,
  language        VARCHAR(50),
  starter_code    TEXT,
  expected_output TEXT,
  test_cases      JSONB,
  solution        TEXT,
  xp_reward       INTEGER DEFAULT 10,
  "order"         INTEGER DEFAULT 0,
  lesson_id       UUID REFERENCES lessons(id) ON DELETE CASCADE,
  created_at      TIMESTAMP DEFAULT NOW()
);
```

### quizzes
```sql
CREATE TABLE quizzes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           VARCHAR(255) NOT NULL,
  description     TEXT,
  xp_reward       INTEGER DEFAULT 10,
  time_limit      INTEGER DEFAULT 0,
  is_timed        BOOLEAN DEFAULT false,
  lesson_id       UUID REFERENCES lessons(id) ON DELETE CASCADE,
  created_at      TIMESTAMP DEFAULT NOW()
);
```

### questions
```sql
CREATE TABLE questions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text   TEXT NOT NULL,
  type            VARCHAR(20) NOT NULL,
  options         JSONB NOT NULL,
  correct_answers TEXT[] NOT NULL,
  explanation     TEXT,
  "order"         INTEGER DEFAULT 0,
  points          INTEGER DEFAULT 1,
  quiz_id         UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  created_at      TIMESTAMP DEFAULT NOW()
);
```

### flashcards
```sql
CREATE TABLE flashcards (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  front_content     TEXT NOT NULL,
  back_content      TEXT NOT NULL,
  example_sentence  TEXT,
  example_code      TEXT,
  pronunciation     VARCHAR(100),
  audio_url         VARCHAR(500),
  category          VARCHAR(20) NOT NULL,
  source            VARCHAR(20) DEFAULT 'system',
  created_by        UUID REFERENCES users(id),
  is_approved       BOOLEAN DEFAULT false,
  votes             INTEGER DEFAULT 0,
  lesson_id         UUID,
  created_at        TIMESTAMP DEFAULT NOW()
);
```

### user_flashcards
```sql
CREATE TABLE user_flashcards (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES users(id) ON DELETE CASCADE,
  flashcard_id      UUID REFERENCES flashcards(id) ON DELETE CASCADE,
  ease              FLOAT DEFAULT 2.5,
  interval          INTEGER DEFAULT 0,
  repetitions       INTEGER DEFAULT 0,
  lapses            INTEGER DEFAULT 0,
  next_review_date  DATE,
  last_review_date  DATE,
  review_history    TEXT[],
  created_at        TIMESTAMP DEFAULT NOW(),
  updated_at        TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, flashcard_id)
);
```

### achievements
```sql
CREATE TABLE achievements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key             VARCHAR(100) UNIQUE NOT NULL,
  name            VARCHAR(255) NOT NULL,
  description     TEXT NOT NULL,
  icon            VARCHAR(500),
  criteria        JSONB NOT NULL,
  xp_reward       INTEGER DEFAULT 0,
  created_at      TIMESTAMP DEFAULT NOW()
);
```

### user_achievements
```sql
CREATE TABLE user_achievements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id  UUID REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at     TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);
```

### user_course_progress
```sql
CREATE TABLE user_course_progress (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id         UUID REFERENCES courses(id) ON DELETE CASCADE,
  progress          FLOAT DEFAULT 0,
  completed         BOOLEAN DEFAULT false,
  completed_lessons INTEGER DEFAULT 0,
  total_lessons     INTEGER DEFAULT 0,
  completed_at      TIMESTAMP,
  created_at        TIMESTAMP DEFAULT NOW(),
  updated_at        TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);
```

### user_lesson_progress
```sql
CREATE TABLE user_lesson_progress (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id       UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed       BOOLEAN DEFAULT false,
  score           INTEGER,
  time_spent      INTEGER,
  completed_at    TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);
```

### notes
```sql
CREATE TABLE notes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content         TEXT NOT NULL,
  highlights      JSONB,
  is_public       BOOLEAN DEFAULT false,
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id       UUID REFERENCES lessons(id) ON DELETE CASCADE,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);
```

### bookmarks
```sql
CREATE TABLE bookmarks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type            VARCHAR(20) NOT NULL,
  ref_id          UUID NOT NULL,
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id       UUID REFERENCES lessons(id) ON DELETE SET NULL,
  created_at      TIMESTAMP DEFAULT NOW()
);
```

## Indexes

```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_github_id ON users(github_id);
CREATE INDEX idx_users_facebook_id ON users(facebook_id);

-- Flashcards
CREATE INDEX idx_user_flashcards_next_review ON user_flashcards(user_id, next_review_date);
CREATE INDEX idx_flashcards_category ON flashcards(category);
CREATE INDEX idx_flashcards_source ON flashcards(source);

-- Progress
CREATE INDEX idx_user_course_progress_user ON user_course_progress(user_id);
CREATE INDEX idx_user_lesson_progress_user ON user_lesson_progress(user_id);

-- Search
CREATE INDEX idx_flashcards_search ON flashcards USING gin(to_tsvector('english', front_content || ' ' || back_content));
CREATE INDEX idx_courses_slug ON courses(slug);
```
