# SynapCode UI Principles

> Tài liệu này PHẢI được đọc trước khi thực hiện bất kỳ công việc UI/UX nào.

## 1. Design Philosophy: "Bilingual Clarity"

SynapCode là nền tảng dạy English cho developer — giao diện phải phản ánh điều đó:
- **Song ngữ** (bilingual): UI hỗ trợ cả English và Tiếng Việt. Code luôn bằng English, UI text song ngữ rõ ràng.
- **Rõ ràng** (clarity): Mỗi màn hình có một mục đích duy nhất. Không gây nhầm lẫn giữa "đang học code" và "đang học English".
- **Tập trung** (focus): Tối thiểu distraction, tối đa không gian cho nội dung học.

## 2. Code First, UI Second

- Code là trung tâm của mọi bài học coding. Editor phải chiếm không gian chính.
- UI chrome (sidebar, header, nav) phải thu gọn được để nhường chỗ cho code.
- Trên Coding Playground: editor panel chiếm 60-70% không gian, coach panel có thể thu gọn.
- Syntax highlighting phải rõ ràng, dễ đọc — chọn theme phù hợp với môi trường code thực tế.

## 3. The Bilingual Layer

Đây là tính năng cốt lõi của SynapCode, UI phải thể hiện được sự song ngữ:

- **Flashcard:** Mặt trước = English term, Mặt sau = English definition + Vietnamese translation + code example
- **Code Editor Comments:** Tooltip hover vào comment English → hiện translate Tiếng Việt
- **Quiz:** Câu hỏi bằng English, explanation bằng Tiếng Việt (để đảm bảo hiểu bài)
- **Lesson Content:** English text chính, glossary tooltip cho từ khoá (click → hiện nghĩa Tiếng Việt)
- **Navigation:** UI labels song ngữ (Ví dụ: "Dashboard / Bảng điều khiển")

## 4. Learning Flow Should Feel Like a Path

- Course → Module → Lesson là một đường dẫn rõ ràng (progress bar luôn hiển thị)
- Breadcrumb luôn visible: `Course > Module > Lesson`
- Nút "Next Lesson" / "Previous Lesson" ở cuối mỗi lesson
- Khi hoàn thành: animation nhẹ (checkmark + XP counter) — không quá phô trương
- Daily Streak: hiển thị flame icon + số ngày ở vị trí dễ thấy (header/dashboard)

## 5. Flashcard Review is a Ritual

- Màn hình review tối giản: chỉ card + 4 nút rating (Again/Hard/Good/Easy)
- Card flip animation: 3D flip (300ms) — mặt trước English, mặt sau đầy đủ
- Không interruption trong lúc review — không popup, không sidebar
- Sau khi review xong: summary screen (thống kê: đã review bao nhiêu, time, streak)
- Progress bar ở đầu màn hình: `Card 12 / 25`

## 6. Spaced Repetition Rating Buttons

4 nút rating phải phân biệt rõ ràng bằng màu sắc + text:

| Nút | Màu | Ý nghĩa | Interval |
|-----|-----|---------|----------|
| **Again** | 🔴 Red | Chưa thuộc | 1 phút |
| **Hard** | 🟡 Yellow | Còn lúng túng | 1 ngày |
| **Good** | 🟢 Green | Nhớ tốt | 3-7 ngày |
| **Easy** | 🔵 Blue | Quá dễ | 30 ngày |

- Nút "Again" cần dễ bấm (to hơn hoặc ở vị trí dễ với tay) vì đây là hành động chính khi học.
- Shortcut key: 1=Again, 2=Hard, 3=Good, 4=Easy

## 7. Progress Should Be Visible Everywhere

- **Header/Global:** Level badge (luôn thấy), XP bar nhỏ, Streak flame
- **Course Card:** Progress % + thanh progress
- **Lesson Item:** Checkmark (completed) / Lock (locked) / Play (in progress)
- **Flashcard:** Số lượng đã học / tổng số, due count
- **Dashboard:** Biểu đồ đơn giản (XP theo tuần, streak calendar, course completion pie)

## 8. Dark/Light Theme Coexistence

- Mặc định: Light cho reading/dashboard, Dark cho coding playground
- User có thể toggle theme bằng nút ở header (icon sun/moon)
- Theme preference lưu trong localStorage + sync lên server
- Transition khi đổi theme: 200ms ease (mượt, không giật)
- Code editor ALWAYS dark (giống VS Code) — bất kể theme hệ thống

## 9. Coding Playground — Zero Distraction Mode

- Khi vào Coding Playground: sidebar tự động thu gọn, header thu nhỏ (chỉ logo + theme toggle)
- Editor full-height (viewport), coach panel có thể kéo thả resize
- Output panel có thể collapse
- Fullscreen mode (F11) — ẩn hoàn toàn browser chrome
- Focus mode: chỉ editor + đề bài, ẩn coach và output

## 10. Responsive Design

- **Mobile:** Flashcards + Quiz + Reading lessons PHẢI hoạt động tốt
- **Desktop:** Coding Playground — full tính năng
- **Tablet:** Hybrid — có thể xoay ngang để code
- Flashcard Review trên mobile: card full-width, nút rating ở dưới (dễ bấm bằng ngón cái)
- Dashboard trên mobile: stack layout, 1 cột, ẩn sidebar

## 11. Accessibility

- Tất cả interactive element phải có focus state (outline rõ ràng)
- Color contrast tối thiểu: 4.5:1 (text), 3:1 (large text)
- Keyboard navigation: Tab order hợp lý
- Có thể dùng phím tắt cho hầu hết actions
- Rating buttons: phím 1-2-3-4, không cần dùng chuột
- Code Editor: Tab, Shift+Tab, Ctrl+S, Ctrl+Enter
- Flashcards: Space=Flip, 1-4=Rate, ←/→=Navigate

## 12. Micro-interactions

- Card hover → elevation tăng nhẹ (shadow md → lg)
- Button click → scale 0.97 trong 100ms
- Sidebar toggle → smooth slide 200ms ease
- Flashcard flip → 3D transform 300ms
- Quiz option select → background transition 150ms
- Progress bar → width transition 500ms ease-out
- XP earned → number count-up animation (500ms)
- Streak flame → subtle pulse animation
- Rating buttons → slide up + fade in (200ms stagger)
- Error shake → translateX oscillation 300ms

## 13. Loading & Empty States

- **Loading:** Skeleton screens matching content shape (card skeleton, list skeleton, editor skeleton)
- **Empty state:** Illustration + message + CTA (không để màn hình trắng)
  - "No courses yet" → illustration + "Browse courses"
  - "No flashcards due" → illustration + "Take a break!" hoặc "Create new cards"
  - "No search results" → "Try different keywords"
- **Error state:** Message thân thiện + nút "Retry" (không chỉ là "Error 500")
- **API loading:** Skeleton cho list, spinner cho inline actions

## 14. Consistency Rules

- 1 action = 1 button (không multi-button cho cùng hành động)
- Confirm trước khi xoá (modal "Bạn có chắc?")
- Tooltip cho icon buttons (không để user đoán)
- Ngôn ngữ nhất quán: trên 1 trang chỉ dùng 1 ngôn ngữ UI (English hoặc Tiếng Việt, không trộn)
- Nhưng nội dung học (code, flashcard front, đề bài) luôn bằng English bất kể UI language
- Tất cả external links mở trong tab mới
- Loading state không quá 2 giây → nếu lâu hơn, hiển thị progress

## 15. Data Hierarchy

- Dashboard: Streak (trên cùng, thu hút), Due reviews, Continue learning, Recommended
- Course detail: Progress bar, Modules (dạng timeline), Each module expandable
- Lesson: Breadcrumb → Title → Content → Actions (Complete/Next)
- Flashcard Review: Progress counter → Card → Rating buttons
- Profile: Avatar + Level + XP → Streak → Achievements → Stats
