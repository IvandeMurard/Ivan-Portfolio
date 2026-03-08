

## Implement 6 Subpage UX/UI Improvements

After auditing all subpages, here's what needs to be done. Note: **Improvement #3 (Scroll-to-top) is already implemented globally** via `ScrollToTop` in `App.tsx`, so we skip it.

---

### 1. Reading progress bar on all case studies

Add `ScrollProgressBar` import to 4 case study pages. The component already exists with spring animation and configurable colors.

**Files to edit:**
- `src/pages/Sonor.tsx` -- add `import { ScrollProgressBar }` + render `<ScrollProgressBar />` after `<Navigation />`
- `src/pages/cases/wttj-case-study.tsx` -- same
- `src/pages/cases/FBAgentCaseStudy.tsx` -- same
- `src/pages/cases/AgentsEval.tsx` -- same

---

### 2. Breadcrumb navigation on all case studies

Create a minimal sticky breadcrumb component that appears on scroll, showing `Home / [Project Name]`.

**New file:** `src/components/case-study/CaseBreadcrumb.tsx`
- Props: `projectName: string`
- Sticky below nav (top-[56px]), appears after 100px scroll with fade-in
- Uses `Link` from react-router-dom for Home
- Minimal styling: small text, muted colors, glassmorphic background

**Files to edit:** Import and render in all 4 case study pages after Navigation.

---

### 3. Mobile section navigation

The `ProgressIndicator` is `hidden lg:block` -- invisible on mobile. Add a compact mobile bar.

**Edit:** `src/components/ProgressIndicator.tsx`
- Add a mobile-only (`lg:hidden`) fixed bottom bar showing current section label
- Tapping it opens a simple dropdown/sheet with all sections
- Uses existing `activeSection` state and `scrollToSection` logic
- Styled as a slim glassmorphic bar at the bottom of the viewport

---

### 4. CV page polish

**Edit:** `src/pages/CV.tsx`
- Add a subtle gradient/accent stripe at top of hero section
- Add `<Separator />` dividers between major sections for visual rhythm
- Consistent section spacing: ensure all sections use `space-y-16` or `py-16`
- Add a fixed bottom download bar on mobile (`md:hidden`) with the PDF download button
- Refine the hero with slightly larger tagline text

---

### 5. Case study hero consistency

**Edit:** `src/components/case-study/CaseStudyHero.tsx`
- Change `h-[40vh] min-h-[350px]` to `h-[45vh] min-h-[400px]`
- Add a default subtitle fallback when none provided (empty string, no visual change)
- Normalize tool icon containers from `w-12 h-12` / `w-7 h-7` to `w-10 h-10` / `w-6 h-6` for a tighter, more refined look

---

### Summary of files changed

| # | File | Action |
|---|------|--------|
| 1 | `src/components/case-study/CaseBreadcrumb.tsx` | **New** |
| 2 | `src/components/ProgressIndicator.tsx` | Edit (add mobile nav) |
| 3 | `src/components/case-study/CaseStudyHero.tsx` | Edit (height + icon sizing) |
| 4 | `src/pages/CV.tsx` | Edit (polish + mobile download) |
| 5 | `src/pages/Sonor.tsx` | Edit (add progress bar + breadcrumb) |
| 6 | `src/pages/cases/wttj-case-study.tsx` | Edit (add progress bar + breadcrumb) |
| 7 | `src/pages/cases/FBAgentCaseStudy.tsx` | Edit (add progress bar + breadcrumb) |
| 8 | `src/pages/cases/AgentsEval.tsx` | Edit (add progress bar + breadcrumb) |

