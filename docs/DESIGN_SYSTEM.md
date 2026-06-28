# SynapCode Design System

> Tài liệu này PHẢI được đọc trước khi thực hiện bất kỳ công việc UI/UX nào.

## 1. Color Palette

### Dark Theme (Mặc định cho Coding Playground)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#0F1117` | Page background |
| `--color-surface` | `#1A1D27` | Cards, modals, sidebar |
| `--color-surface-hover` | `#23273A` | Hover state surfaces |
| `--color-border` | `#2D3148` | Borders, dividers |
| `--color-text` | `#E8E9ED` | Primary text |
| `--color-text-secondary` | `#9CA0B0` | Secondary text |
| `--color-text-disabled` | `#555A6E` | Disabled text |

### Light Theme (Mặc định cho Reading, Dashboard)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#FAFBFC` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, modals, sidebar |
| `--color-surface-hover` | `#F3F4F6` | Hover state surfaces |
| `--color-border` | `#E5E7EB` | Borders, dividers |
| `--color-text` | `#111827` | Primary text |
| `--color-text-secondary` | `#6B7280` | Secondary text |
| `--color-text-disabled` | `#D1D5DB` | Disabled text |

### Brand (Green/Emerald — Học tập, Phát triển)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#059669` | Buttons, links, active states |
| `--color-primary-light` | `#10B981` | Hover states |
| `--color-primary-dark` | `#047857` | Active/pressed states |
| `--color-primary-subtle` | `#ECFDF5` | Subtle backgrounds (light) |
| `--color-primary-subtle-dark` | `#064E3B` | Subtle backgrounds (dark) |

### Accent (Code Highlight — cho syntax highlighting, code blocks)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-code-keyword` | `#C586C0` | Keywords (function, const, let) |
| `--color-code-string` | `#CE9178` | Strings |
| `--color-code-number` | `#B5CEA8` | Numbers |
| `--color-code-function` | `#DCDCAA` | Function names |
| `--color-code-variable` | `#9CDCFE` | Variables |
| `--color-code-comment` | `#6A9955` | Comments |

### Semantic
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#10B981` | Correct answer, completed, pass |
| `--color-warning` | `#F59E0B` | Hard review, almost correct |
| `--color-error` | `#EF4444` | Wrong answer, error, fail |
| `--color-info` | `#3B82F6` | Tips, information |

### Spaced Repetition Ratings
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-again` | `#EF4444` | Again (0) — review immediately |
| `--color-hard` | `#F59E0B` | Hard (1) — review sooner |
| `--color-good` | `#10B981` | Good (2) — normal interval |
| `--color-easy` | `#3B82F6` | Easy (3) — skip ahead |

## 2. Typography

### Font Family
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale
| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `--text-xs` | 0.75rem (12px) | 400 | 1.5 | Captions, meta, code line numbers |
| `--text-sm` | 0.875rem (14px) | 400 | 1.5 | Body secondary, code |
| `--text-base` | 1rem (16px) | 400 | 1.6 | Body primary, flashcards front |
| `--text-lg` | 1.125rem (18px) | 500 | 1.5 | Section headers, flashcards back |
| `--text-xl` | 1.25rem (20px) | 600 | 1.4 | Page titles, lesson titles |
| `--text-2xl` | 1.5rem (24px) | 700 | 1.3 | Hero titles, quiz score |
| `--text-3xl` | 2rem (32px) | 700 | 1.2 | Display, level number |

### Code Specific
```css
--text-code: 0.875rem;
--text-code-line-height: 1.7;
```

## 3. Spacing

Base unit: **4px**

```css
--space-1: 4px;    --space-2: 8px;
--space-3: 12px;   --space-4: 16px;
--space-5: 20px;   --space-6: 24px;
--space-8: 32px;   --space-10: 40px;
--space-12: 48px;  --space-16: 64px;
--space-20: 80px;
```

## 4. Border Radius

```css
--radius-sm: 4px;     /* Inputs, small badges */
--radius-md: 8px;     /* Cards, buttons, flashcard */
--radius-lg: 12px;    /* Modals, dropdowns, code editor */
--radius-xl: 16px;    /* Large cards, dashboard sections */
--radius-full: 9999px;/* Pills, avatars, XP badges */
```

## 5. Shadows

### Light Theme
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.16);
```

### Dark Theme
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
```

## 6. Component Patterns

### Flashcard
```css
.flashcard {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  min-height: 240px;
  cursor: pointer;
  perspective: 1000px;
  transition: transform 0.3s ease;
}
.flashcard-front {
  font-size: var(--text-xl);
  font-weight: 600;
}
.flashcard-back {
  font-size: var(--text-base);
  line-height: 1.6;
}
.flashcard-pronunciation {
  font-family: var(--font-sans);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}
.flashcard-example-code {
  font-family: var(--font-mono);
  font-size: var(--text-code);
  background: var(--color-bg);
  border-radius: var(--radius-sm);
  padding: var(--space-3);
}
```

### Code Editor (Monaco Wrapper)
```css
.code-editor {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.code-editor-header {
  background: var(--color-surface);
  padding: var(--space-2) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--text-sm);
}
.code-editor-output {
  background: var(--color-bg);
  padding: var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--text-code);
  min-height: 100px;
}
```

### Quiz Question Card
```css
.quiz-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}
.quiz-option {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.15s ease;
}
.quiz-option:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-subtle);
}
.quiz-option--correct {
  border-color: var(--color-success);
  background: var(--color-primary-subtle);
}
.quiz-option--wrong {
  border-color: var(--color-error);
  background: #FEF2F2;
}
```

### Buttons
```css
.btn-primary {
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-6);
  font-weight: 500;
  transition: background 0.15s ease;
}
.btn-primary:hover {
  background: var(--color-primary-light);
}
.btn-ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-6);
}
.btn-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Progress Bar
```css
.progress-bar {
  height: 8px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
}
```

### XP Badge / Level Badge
```css
.badge-level {
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: 700;
}
.badge-streak {
  background: #FFF3E0;
  color: #C9913D;
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
}
```

### Bilingual Coach Panel
```css
.coach-panel {
  background: var(--color-surface);
  border-left: 4px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  font-size: var(--text-sm);
}
.coach-issue {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--color-border);
}
.coach-issue:last-child { border-bottom: none; }
.coach-issue--warning { border-left-color: var(--color-warning); }
.coach-issue--error { border-left-color: var(--color-error); }
```

## 7. Layout

- Max content width: **1200px** (centered)
- Sidebar width: **280px** (dashboard layouts)
- Dashboard layout: Sidebar (collapsible) + main content area
- Lesson layout: Header breadcrumb + content area (full-width)
- Coding Playground layout: Editor (left 60%) + Coach panel + Output (right 40%)
- Flashcard review: Centered card (max 600px) + rating buttons below

## 8. Responsive Breakpoints

```css
--bp-sm: 640px;   /* Mobile */
--bp-md: 768px;   /* Tablet */
--bp-lg: 1024px;  /* Desktop */
--bp-xl: 1280px;  /* Wide */
```

### Theme Toggle Rules

| Page Type | Default Theme | User Can Toggle? |
|-----------|---------------|------------------|
| Dashboard | Light | ✅ Yes |
| Course listing | Light | ✅ Yes |
| Lesson (READING) | Light | ✅ Yes |
| Coding Playground | Dark | ✅ Yes (khuyên dùng Dark) |
| Flashcard Review | Light | ✅ Yes |
| Quiz | Light | ✅ Yes |
| Profile | Light | ✅ Yes |

## 9. Z-Index Scale

```css
--z-dropdown: 100;
--z-sticky: 200;
--z-navbar: 300;
--z-sidebar: 400;
--z-modal-backdrop: 500;
--z-modal: 600;
--z-popover: 700;
--z-toast: 800;
--z-tooltip: 900;
```
