# 🎨 Ultimate UI/UX Component & Interaction Generation Prompt (2025)
## Production-Ready for Cursor & VS Code

**Last Updated:** November 2025  
**Target IDEs:** Cursor, VS Code with AI Extensions (GitHub Copilot, Continue.dev)  
**Use Cases:** React, Vue, Angular, Web Components, Tailwind CSS, Shadcn/ui, MUI, Chakra UI

---

## 📋 Quick Start for IDE Usage

### For Cursor/VS Code Copilot:
Copy the **Core Directive** below into your comment or prompt window and add your specific component request.

```
// [PASTE CORE DIRECTIVE BELOW] + Your Component Request
```

### For Continue.dev:
Use the full prompt in chat mode or save as `.cursor-rules` for consistent enforcement.

---

## 🎯 Core Directive (Copy-Paste Ready)

```
ROLE: Expert UI/UX Designer + Full-Stack Developer
CONTEXT: Generate production-ready, innovative, market-tested UI components and micro-interactions
STANDARDS: WCAG 2.2, modern UX laws, accessibility-first, conversion-optimized, modern design systems

REQUIREMENTS:
1. DIAGNOSE: Identify outdated/problematic patterns in standard implementations
2. INNOVATE: Implement cutting-edge interactions, smart features, and micro-interactions
3. JUSTIFY: Explain every decision using UX laws, psychology, accessibility, and business impact
4. STYLE: Theme with modern aesthetics (dark/light, color psychology, contrast, spacing)
5. VALIDATE: Keyboard nav, ARIA tags, responsive (mobile/tablet/desktop), RTL support
6. DOCUMENT: Provide code, reasoning, alternatives, and modern library references

DO NOT output: Browser defaults, plain styled components, unthemed designs, or accessibility gaps.
```

---

## 🧠 Foundation: Core UX Laws & Psychology

Apply these principles to every component:

| Law | Definition | Implementation |
|-----|-----------|-----------------|
| **Fitts' Law** | Time to target ∝ distance/size | Larger CTAs, strategic placement, hover zones |
| **Hick's Law** | Decision time ∝ choices | Simplify options, group related actions, progressive disclosure |
| **Jakob's Law** | Users prefer familiar patterns | Use design system conventions, mental models |
| **Miller's Law** | Cognitive load = ~7 chunks | Limit visual clutter, group information, lazy load |
| **Gestalt Principles** | Humans see groupings, not individual elements | Use proximity, similarity, continuity for visual hierarchy |
| **Law of Proximity** | Closer items seem related | Strategic spacing, visual grouping |
| **Law of Similarity** | Similar-looking items are grouped | Consistent styling, color coding, iconography |
| **Peak-End Rule** | Users remember peaks + endings | Delightful micro-interactions, satisfying completion states |
| **Cognitive Load Theory** | Mental effort impacts UX | Simplify workflows, context-aware help, progressive onboarding |

**Always Reference in Comments:**
```javascript
// Fitts' Law: CTA width 48px, positioned at screen edge for larger hit area
// Hick's Law: 3 primary actions max per section, secondary actions in menu
// Miller's Law: 7 items per list, paginated or infinite-scroll for overflow
```

---

## 🛠️ Component Generation Template

Use this structure for EVERY component request:

### Step 1: Diagnose Existing Problems
```
DIAGNOSE:
- Default browser input: No visual feedback, poor mobile UX, accessibility gaps
- Standard select: No search, no grouping, limited keyboard nav, poor theming
- Generic date picker: No year/month jump, poor mobile UX, no time-zone support
- Basic table: No sorting, filtering, grouping, poor performance with large data
```

### Step 2: Identify Modern Solutions
```
INNOVATE:
- Add fuzzy search, predictive text, smart suggestions
- Implement multi-select with batch operations
- Add infinite scrolling, virtual scrolling for performance
- Include micro-interactions: animations, haptic feedback, loading states
- Smart empty states: contextual messaging, next-step guidance
- Adaptive layouts: mobile-first, touch-friendly, gesture support
```

### Step 3: Justify Design Decisions
```
JUSTIFY:
- Why: Uses Gestalt proximity for visual grouping (improve scanning 40%)
- Why: Keyboard navigation (WCAG 2.1 A compliance + 25% users rely on keyboard)
- Why: Dark mode support (reduce eye strain, 60% user preference in 2025)
- Why: Haptic feedback (tactile confirmation, 35% increase in confidence)
- Why: Progressive disclosure (reduce cognitive load, simplified onboarding)
```

### Step 4: Output with Full Context
```
DELIVER:
1. Code (React/Vue/Web Component)
2. Styling (Tailwind, CSS-in-JS, or design tokens)
3. Micro-interactions (Framer Motion, CSS animations)
4. Accessibility (ARIA, keyboard nav, focus management)
5. Reasoning for each choice
6. Alternative patterns or enhancements
7. Library/framework references
```

---

## 📱 Smart Component Checklist

Before generating output, verify:

### ✅ Component Architecture
- [ ] Smart embedded features (search, filter, sort, batch ops)
- [ ] Micro-interactions (load states, transitions, feedback)
- [ ] Empty states with contextual messaging
- [ ] Error states with clear recovery paths
- [ ] Success/completion celebrations
- [ ] Skeleton screens or progressive loading
- [ ] Inline validation with real-time feedback

### ✅ Styling & Theming
- [ ] Consistent design tokens (spacing, typography, shadows, borders)
- [ ] Dark/light mode with auto-detection
- [ ] Color psychology (CTAs: contrasting, trust colors: blues/greens)
- [ ] Accessible contrast ratios (WCAG AA 4.5:1 text, AAA 7:1 preferred)
- [ ] Hover/active/focus/disabled states distinct
- [ ] Responsive breakpoints (mobile 320px, tablet 768px, desktop 1280px+)
- [ ] Consistent border radius, shadow depth, animation timing

### ✅ Accessibility
- [ ] Full keyboard navigation (Tab, Enter, Escape, Arrow keys)
- [ ] ARIA roles, labels, live regions
- [ ] Focus visible with custom focus ring (min 3px outline)
- [ ] Color not the only indicator (icons, patterns, text)
- [ ] Text alternatives for icons
- [ ] Semantic HTML (`<button>`, `<label>`, `<form>`)
- [ ] Screen reader tested

### ✅ Responsiveness & Performance
- [ ] Mobile-first design (touch targets 48px+ min)
- [ ] Gesture support (swipe, pinch, long-press)
- [ ] Virtual scrolling for large lists (100+ items)
- [ ] Lazy loading for images/components
- [ ] Smooth 60fps animations (GPU-accelerated)
- [ ] LTR/RTL support
- [ ] Progressive enhancement (works without JS)

### ✅ Marketing & Conversion
- [ ] Clear visual hierarchy (primary → secondary → tertiary actions)
- [ ] CTAs trigger psychological prompts (scarcity, urgency, social proof)
- [ ] Inline help/onboarding tooltips
- [ ] Reduced friction (auto-complete, defaults, one-click actions)
- [ ] Delight moments (confetti, badges, celebratory animations)
- [ ] Sharing/referral widgets
- [ ] Analytics tracking hooks
- [ ] A/B test variants documented

---

## 🎨 Advanced Component Patterns

### 1. Data Table (Enterprise Standard)
**Smart Features:**
- Multi-mode search (global, column-specific, fuzzy)
- In-table sorting, filtering, grouping, column reordering
- Batch operations (select all, bulk delete, export)
- Inline editing with validation
- Virtual scrolling (10K+ rows performance)
- Sticky headers/footers
- Adaptive columns (mobile: collapse, tablet: prioritize)
- Empty state with sample data or CTA
- Export (CSV, JSON, PDF)
- Row expansion/detail view
- Keyboard shortcuts (Ctrl+K search, Ctrl+E export)

**Micro-interactions:**
- Row hover highlight
- Smooth column resize animation
- Loading skeleton during fetch
- Staggered row animations on load
- Confirmation toast before bulk operations
- Success animation after action

**Accessibility:**
- ARIA table roles
- Keyboard nav: Tab through cells, Arrow keys navigate, Enter edits
- Column header announcements
- Sort order announced
- Live region for operation feedback

### 2. Select/Dropdown (Fuzzy Search Enhanced)
**Smart Features:**
- Fuzzy search with real-time filtering
- Grouped options with headers
- Custom rendering (icons, avatars, descriptions)
- Multi-select with tags
- Virtual scrolling for 100+ options
- Keyboard shortcuts (↓↑ navigate, Enter select, Escape close, Backspace delete)
- Async/remote data loading
- Create new option inline
- Custom item templates
- Search highlighting

**Micro-interactions:**
- Smooth open/close animation
- Highlight match text in bold
- Smooth scroll to selected item
- Loading spinner during async fetch
- Staggered option animations
- Confetti or badge on select

**Styling:**
- Match brand colors and design tokens
- Dark mode support with sufficient contrast
- Touch-friendly (48px min item height on mobile)
- Clear disabled state visual

### 3. Date Picker (Intelligent & Adaptive)
**Smart Features:**
- Year/month jump navigation
- Infinite scroll through years/months
- Keyboard input (natural language: "tomorrow", "next monday", "Dec 25")
- Time-zone support
- Range selection with preset shortcuts ("Last 7 days", "This month")
- Mobile: date picker → time picker flow
- Adaptive layout (calendar view on desktop, native picker on mobile)
- Disabled dates/ranges
- Localization (multilingual months, LTR/RTL)
- Week number support
- Today button

**Micro-interactions:**
- Animated month transitions
- Smooth keyboard navigation
- Loading state for async data
- Success animation on selection
- Hover highlight day cells
- Smooth open/close transitions

### 4. Form Input (Contextual & Validated)
**Smart Features:**
- Real-time validation with inline feedback
- Smart error messages (not "Invalid format" but "Use format: MM/DD/YYYY")
- Contextual help via tooltip on focus
- Password strength meter
- Auto-complete suggestions
- Mask patterns (phone, credit card, date)
- Character counter for text areas
- Inline expand for larger inputs
- Copy-to-clipboard buttons
- Smart placeholders (examples, instructions)

**Micro-interactions:**
- Smooth label animation (floating label)
- Subtle error icon with tooltip on hover
- Success checkmark on valid input
- Loading spinner for async validation
- Shake animation on invalid submit
- Focus border color change
- Character counter animated color change (warning at 80%, error at 100%)

### 5. Notification/Toast (Context-Aware)
**Smart Features:**
- Severity levels: info, success, warning, error, urgent
- Auto-dismiss based on severity (5s info, persistent error)
- Action buttons (dismiss, undo, retry)
- Stacked notifications with collapse
- Rich content support (links, descriptions)
- Sound + visual feedback option
- Do Not Disturb mode respect
- Toast grouping (deduplicate)
- Keyboard accessible (Tab to dismiss, Escape close all)

**Micro-interactions:**
- Slide-in animation from bottom/top-right
- Icon animation based on severity
- Progress bar countdown to auto-dismiss
- Smooth stagger stack animation
- Haptic feedback on action
- Celebration animation for success
- Shake animation for errors

### 6. Modal/Dialog (Smart & Accessible)
**Smart Features:**
- Scroll position preservation (don't lose place in background)
- Keyboard trap (Tab cycles within modal)
- Backdrop click handling (clear intent: close on backdrop)
- Header, body, footer semantic sections
- Responsive sizing (mobile full-screen, tablet centered)
- Nested modals (rare, but supported)
- Smart focus management (autofocus first input, restore focus on close)
- Animated backdrop blur
- Customizable animations

**Micro-interactions:**
- Smooth fade-in/zoom animation
- Header shadow on scroll (indicates more content)
- Smooth transitions between modal states
- Button feedback (disable on submit, show loading)
- Success animation before auto-close

### 7. Tooltip (Context-Aware & Smart)
**Smart Features:**
- Smart positioning (avoid viewport edges, auto-flip)
- Keyboard accessible (focus trigger, Escape close)
- Touch-friendly (tap to show, tap outside to dismiss)
- Rich content (text, icons, interactive elements)
- Delay on hover (300ms before show)
- Animated arrow pointing to trigger
- Character limit with ellipsis or expansion
- Tooltip groups (one visible at a time)
- Learn more links
- Context-aware content (personalized based on user state)

**Micro-interactions:**
- Smooth fade-in/out
- Arrow animation
- Subtle bounce entrance
- Tooltip follows cursor on move
- Quick hide/show on rapid hover

---

## 🎯 Micro-Interaction Library

### Loading States
```
PATTERN: Animated skeleton screen → progressive content reveal
PSYCHOLOGY: Perceived performance increases 40% with loading animation
IMPLEMENTATION: Framer Motion staggered animations, content skeleton matching layout
TIMING: 300-500ms fade-in for each row/element
```

### Hover Feedback
```
PATTERN: Color shift + subtle shadow lift + scale 102%
PSYCHOLOGY: Fitts' Law compliance + tactile feedback
IMPLEMENTATION: CSS transition 200ms ease-out, transform scale
ACCESSIBILITY: Not reliant on hover (mobile users can't hover)
```

### Error States
```
PATTERN: Shake animation + color to error red + icon + contextual message
PSYCHOLOGY: Immediate feedback, clear path to recovery
IMPLEMENTATION: Keyframe shake (3 axis), toast notification, form highlight
TIMING: 400ms shake, 3s dismiss or manual
```

### Success Celebration
```
PATTERN: Confetti/fireworks + checkmark animation + positive tone message
PSYCHOLOGY: Peak-end rule, user delight, memory peak
IMPLEMENTATION: Canvas confetti library or CSS animation, haptic feedback
TIMING: 1s animation, 2s celebration
```

### Focus Ring (Accessible)
```
PATTERN: 3px solid outline, 4px offset, visible on all interactive elements
PSYCHOLOGY: Clear navigation path, accessibility compliance
IMPLEMENTATION: :focus-visible pseudo-selector, custom outline-color (not blue)
TIMING: Instant visible
WCAG: WCAG 2.1 AA required
```

---

## 🎨 Color Psychology & Component Placement

### Color Usage by Component Type
| Component | Primary Color | Usage Psychology | Contrast |
|-----------|--------------|------------------|----------|
| Primary CTA | Brand/High contrast | Action, trust, call-to-action | WCAG AAA (7:1) |
| Secondary Action | Neutral/Gray | Less prominent, safe action | WCAG AA (4.5:1) |
| Success | Green/Teal | Positive feedback, completion | WCAG AA minimum |
| Warning | Amber/Orange | Caution, attention needed | WCAG AA minimum |
| Error | Red/Rose | Critical, requires action | WCAG AA minimum |
| Info | Blue | Informational, helpful | WCAG AA minimum |
| Disabled | Gray/Desaturated | Inactive, not clickable | Sufficient contrast |

### Placement Psychology
```
TOP-LEFT: Logo, navigation (Western reading pattern)
TOP-CENTER: Brand messaging, logo alternative
TOP-RIGHT: Account, notifications, search (right-rail behavior)
CENTER: Primary CTA, hero image (attention focus)
LEFT-SIDEBAR: Navigation, filters (progressive disclosure)
RIGHT-SIDEBAR: Ads, secondary info (lower priority)
BOTTOM-CENTER: Footer, copyright
BOTTOM-RIGHT: Chat widget, sticky CTA (corner awareness)
FLOATING: Critical notifications, persistent helpers
```

### Spacing Units (8px Grid)
```
xs: 4px   (tight, small gaps)
sm: 8px   (default spacing)
md: 16px  (medium spacing, card padding)
lg: 24px  (large spacing, section gaps)
xl: 32px  (extra large, hero sections)
xxl: 48px (massive gaps, major sections)
```

---

## ♿ Accessibility Quick Reference

### Keyboard Navigation Requirements
```javascript
// TAB: Move forward through interactive elements
// SHIFT+TAB: Move backward
// ENTER: Activate button, submit form, open menu
// SPACE: Toggle checkbox, activate button (alternative to Enter)
// ESCAPE: Close modal, cancel operation, close menu
// ARROW KEYS: Navigate within components (select, radio, tabs, tree)
// HOME/END: First/last item in list
// ALT+KEY: Keyboard shortcuts for important actions
```

### ARIA Essentials
```html
<!-- Buttons with icons only -->
<button aria-label="Close dialog">✕</button>

<!-- Live regions for updates -->
<div aria-live="polite" aria-atomic="true">
  3 results found
</div>

<!-- Form labels -->
<label for="email">Email</label>
<input id="email" type="email" />

<!-- Semantic HTML over divs -->
<button> instead of <div onclick>
<nav> for navigation
<main> for main content
<article>, <section>, <header>, <footer>

<!-- ARIA roles only when semantic HTML unavailable -->
<div role="button" tabindex="0" @click="action">Action</div>
```

### Color Contrast (WCAG 2.1)
```
AA (Standard): 4.5:1 for text, 3:1 for components
AAA (Enhanced): 7:1 for text, 3:1 for components

Use: https://www.tpgi.com/color-contrast-checker
Chrome DevTools: Lighthouse → Accessibility audit
```

### Mobile Accessibility
```
- Touch targets: 48px minimum (44px acceptable)
- No hover-only interactions
- Logical tap order
- Readable text (16px minimum)
- Sufficient color contrast
- Support landscape + portrait
```

---

## 🚀 Modern Design System References

### React Component Libraries
| Library | Best For | Learning Curve |
|---------|----------|-----------------|
| **shadcn/ui** | Customizable, copy-paste components | Low (Radix + Tailwind) |
| **Radix UI** | Unstyled accessible primitives | Medium (headless) |
| **MUI (Material-UI)** | Enterprise, comprehensive | Medium (opinionated) |
| **Chakra UI** | DX-focused, flexible theming | Low (prop-based) |
| **Ant Design** | Complex UIs, enterprise tables | Medium (feature-rich) |
| **HeadlessUI** | Tailwind-native unstyled | Low (minimal styling) |

### Animation Libraries
| Library | Best For | Bundle Size |
|---------|----------|-------------|
| **Framer Motion** | Complex animations, layouts | 25kb |
| **React Spring** | Physics-based animations | 16kb |
| **AutoAnimate** | Zero-config auto animations | 3kb |
| **CSS Animations** | Simple, performant | 0kb (native) |
| **Lottie** | Complex vector animations | 50kb+ |

### Styling Solutions
| Solution | Best For | Performance |
|----------|----------|-------------|
| **Tailwind CSS** | Utility-first, responsive | 20-50kb (production) |
| **CSS Modules** | Scoped, zero-runtime | 0kb (native) |
| **CSS-in-JS (Emotion/Styled)** | Dynamic theming, component-scoped | 15-30kb |
| **BEM** | Large teams, maintainability | 0kb (methodology) |

### Accessibility Testing Tools
```
- WAVE: Browser extension for accessibility audit
- Lighthouse: Chrome DevTools built-in
- Axe DevTools: Comprehensive testing
- NVDA/JAWS: Screen reader testing (free/paid)
- Color Contrast Analyzer: WCAG compliance check
- Keyboard Testing: Tab, Enter, Arrow keys, Escape
- Mobile Testing: iOS VoiceOver, Android TalkBack
```

---

## 📝 Prompt Examples for IDE Usage

### Example 1: Advanced Data Table
```
Generate a React data table component using React hooks + Tailwind CSS with:
- Fuzzy search, column filtering, multi-sort
- Batch selection with delete confirmation
- Virtual scrolling for 10K+ rows
- Inline editing with validation
- Dark/light mode support
- Full keyboard navigation (Tab, Arrow keys, Ctrl+K search)
- Mobile-responsive (collapse non-essential columns on mobile)
- Export to CSV
- Loading skeleton screen during fetch
- Empty state with contextual CTA

Justify each design choice using Fitts' Law, Miller's Law, WCAG accessibility.
Reference shadcn/ui or Radix UI patterns.
Include alternate patterns (infinite scroll vs pagination).
```

### Example 2: Smart Date Picker
```
Create a date range picker component with:
- Calendar view (desktop) + native picker (mobile)
- Year/month jump with keyboard shortcuts
- Preset ranges ("Last 7 days", "This month", "This year")
- Time zone support
- Natural language input ("next Friday", "Dec 25")
- Keyboard navigation (Arrow keys, Home/End for month jump)
- ARIA labels and focus management
- Dark mode
- Animated transitions (Framer Motion)
- Smooth mobile scrolling

Explain UX decisions, accessibility, animation timing.
Show implementation in React + TypeScript.
```

### Example 3: Form with Smart Validation
```
Build a registration form with:
- Real-time validation (email, password strength, phone)
- Contextual help tooltips on focus
- Password strength meter (visual + text)
- Auto-complete for country/state
- Error recovery hints ("Did you mean xyz@gmail.com?")
- Inline submission with loading state
- Success celebration animation
- Mobile-optimized keyboard (email keyboard for email, number for phone)
- Progressive disclosure (optional fields hidden by default)
- Accessibility: ARIA labels, error live regions, keyboard navigation

Justify design choices. Reference modern form UX patterns.
Include Figma design token structure.
```

---

## 🔍 IDE Setup & Integration

### For Cursor
1. Create `.cursor-rules` file in project root:
```
# UI/UX Component Generation Rules
When generating UI components or interactions:
- Reference core UX laws (Fitts, Hick, Jakob, Miller, Gestalt)
- Diagnose common problems and suggest modern solutions
- Include micro-interactions and smart features
- Ensure WCAG 2.1 AA accessibility minimum
- Support dark/light theming
- Justify every design decision
- Reference modern libraries (shadcn/ui, Radix, Chakra, Framer Motion)
- Provide complete TypeScript implementation
- Include alternative patterns and enhancements
```

2. In Cursor settings, set custom rules file:
```json
{
  "rules": ".cursor-rules",
  "language": "markdown"
}
```

### For VS Code + GitHub Copilot
1. Add to VS Code settings (`.vscode/settings.json`):
```json
{
  "github.copilot.enable": {
    "markdown": false,
    "plaintext": true,
    "yaml": true
  }
}
```

2. Create a code snippet (`.vscode/ui-ux.code-snippets`):
```json
{
  "UI/UX Component Prompt": {
    "prefix": "uiux",
    "body": [
      "/**",
      " * COMPONENT: ${1:ComponentName}",
      " * REQUIREMENTS:",
      " * - Smart features: ${2:feature1, feature2}",
      " * - Micro-interactions: ${3:animation1, animation2}",
      " * - Accessibility: Keyboard nav, ARIA, focus visible",
      " * - Responsiveness: Mobile-first, 48px touch targets",
      " * - Theming: Dark/light mode, design tokens",
      " * - Psychology: ${4:Fitts' Law, Hick's Law}",
      " * REFERENCE: ${5:shadcn/ui, Radix, Framer Motion}",
      " */"
    ]
  }
}
```

### For Continue.dev
1. Add to `.continue/config.json`:
```json
{
  "models": [
    {
      "title": "GPT-4",
      "provider": "openai",
      "model": "gpt-4"
    }
  ],
  "systemMessage": "You are an expert UI/UX designer. Follow the 2025 UI/UX Generation Prompt. For each component: diagnose issues, innovate with smart features, justify using UX laws, ensure accessibility, theme with modern aesthetics, and provide complete implementation with reasoning."
}
```

2. Use in Continue chat:
```
@docs ui-ux-prompt-2025.md

Generate a [component] with [requirements]
```

---

## ✅ Pre-Generation Checklist

Before requesting component generation, verify:

- [ ] Component type clearly defined
- [ ] Target framework specified (React, Vue, Web Components)
- [ ] Styling solution chosen (Tailwind, CSS-in-JS, CSS Modules)
- [ ] Accessibility level defined (AA minimum, AAA preferred)
- [ ] Theme/branding context provided
- [ ] Smart features listed (search, filter, batch ops, etc.)
- [ ] Micro-interactions desired (animations, feedback, haptics)
- [ ] Responsive breakpoints identified
- [ ] Performance constraints known (# of items, rendering target)
- [ ] Browser support requirements
- [ ] Library preferences (shadcn, MUI, Chakra, etc.)
- [ ] Alternative patterns to explore

---

## 🎓 Learning Resources

### Core UI/UX References
- **Laws of UX:** https://lawsofux.com
- **Nielsen Norman Group:** Research-backed UX principles
- **A11y Project:** Accessibility best practices
- **Web.dev:** Performance, accessibility, best practices
- **WCAG 2.1 Guidelines:** Official accessibility standard

### Design System Documentation
- **Radix UI Docs:** Accessible component primitives
- **shadcn/ui:** Copy-paste React components
- **Material Design 3:** Comprehensive design system
- **Chakra UI:** Styled system fundamentals

### Animation & Performance
- **Framer Motion Docs:** React animation library
- **Web Animations API:** Native animations
- **CSS-Tricks:** Animation techniques
- **MDN Web Docs:** Web standards reference

---

## 🎯 Quick Copy-Paste Prompts

### Minimal Component Request
```
Generate [COMPONENT] with:
✓ Smart features: [FEATURES]
✓ Micro-interactions: [ANIMATIONS]
✓ Accessibility: Full keyboard nav + ARIA
✓ Responsive: Mobile-first (48px targets)
✓ Theme: Dark/light support
✓ Justify using UX laws
✓ Framework: React + TypeScript
✓ Styling: Tailwind CSS
```

### Full-Featured Request
```
🎨 COMPONENT: [NAME]

REQUIREMENTS:
- Smart features: [LIST]
- Micro-interactions: [ANIMATIONS]
- Accessibility: WCAG 2.1 AA minimum
- Responsive: Mobile (320px), Tablet (768px), Desktop (1280px+)
- Performance: Virtual scroll [ITEMS]
- Theming: Dark/light auto-detect
- Framework: React 18+
- Styling: Tailwind CSS v3

PSYCHOLOGY:
- Apply [LAW1], [LAW2] principles
- Design for [CONVERSION/DELIGHT/CLARITY]

DELIVER:
1. TypeScript implementation
2. Styling tokens
3. Micro-interaction details
4. Accessibility checklist
5. Design reasoning
6. Alternative patterns
7. Modern library references
```

---

## 📊 Component Audit Template

Use this to evaluate generated components:

```
COMPONENT AUDIT CHECKLIST

[ ] UX Laws Applied
  [ ] Fitts' Law: Target size + position optimized
  [ ] Hick's Law: Choice count minimized
  [ ] Miller's Law: 7± items per view
  [ ] Jakob's Law: Familiar patterns used

[ ] Smart Features
  [ ] Embedded search/filter/sort
  [ ] Batch operations supported
  [ ] Inline editing/validation
  [ ] Empty state messaging
  [ ] Loading states (skeleton/spinner)
  [ ] Error recovery hints

[ ] Micro-Interactions
  [ ] Hover feedback (visual change)
  [ ] Focus state (3px outline visible)
  [ ] Loading animation (60fps, <500ms)
  [ ] Error animation (shake/color change)
  [ ] Success celebration (confetti/badge)
  [ ] Smooth transitions (200-400ms)

[ ] Accessibility
  [ ] Keyboard navigation: Tab, Enter, Escape, Arrows
  [ ] ARIA: Labels, roles, live regions
  [ ] Color contrast: WCAG AA (4.5:1 text)
  [ ] Focus visible: Always visible outline
  [ ] Semantic HTML: Proper tags used
  [ ] Screen reader tested

[ ] Responsive & Performance
  [ ] Mobile: 320px+ (48px touch targets)
  [ ] Tablet: 768px+ (flexible layout)
  [ ] Desktop: 1280px+ (optimized spacing)
  [ ] Performance: Virtual scroll for 100+ items
  [ ] GPU-accelerated animations
  [ ] Bundle size reasonable

[ ] Theming & Aesthetics
  [ ] Dark mode supported
  [ ] Design tokens applied (spacing, colors, typography)
  [ ] Color psychology aligned with action
  [ ] Consistent border radius + shadows
  [ ] Brand colors integrated
  [ ] Hover/active/disabled states clear

[ ] Marketing & Conversion
  [ ] CTA prominence optimized
  [ ] Visual hierarchy clear (primary → secondary)
  [ ] Friction reduced (auto-complete, defaults)
  [ ] Delight moments included
  [ ] Onboarding/help integrated
  [ ] Analytics hooks present

[ ] Code Quality
  [ ] TypeScript types complete
  [ ] Component props well-documented
  [ ] Reusable and composable
  [ ] Error handling robust
  [ ] Performance optimized
  [ ] Accessibility utilities included
```

---

## 🚀 Advanced Techniques

### Compound Components Pattern (React)
```typescript
// Flexible, composable component structure
const Select = ({ children }) => ...
Select.Trigger = ({ children }) => ...
Select.Content = ({ children }) => ...
Select.Item = ({ value, children }) => ...

// Usage:
<Select value={selected} onChange={setSelected}>
  <Select.Trigger>Open</Select.Trigger>
  <Select.Content>
    <Select.Item value="a">Option A</Select.Item>
  </Select.Content>
</Select>
```

### Render Props for Flexibility
```typescript
// Give users complete control over rendering
<Tooltip content="Help text">
  {(props) => (
    <button {...props}>
      {/* Custom content */}
    </button>
  )}
</Tooltip>
```

### Headless Components (Radix UI Pattern)
```typescript
// Unstyled, fully accessible primitives
// Users bring styling (Tailwind, emotion, etc.)
<Select.Root>
  <Select.Trigger />
  <Select.Content>
    <Select.Item />
  </Select.Content>
</Select.Root>
```

### Design Tokens System
```typescript
// Centralized, scalable theme
const tokens = {
  colors: {
    primary: '#007AFF',
    error: '#FF3B30',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
  },
  typography: {
    heading: '32px bold',
    body: '16px regular',
  },
}
```

---

## 📞 Support & Maintenance

### Common Issues & Solutions

**Problem:** Component not accessible
**Solution:** 
1. Add ARIA labels to all interactive elements
2. Test with keyboard (Tab, Enter, Escape)
3. Use `aria-live="polite"` for dynamic updates
4. Ensure 4.5:1 color contrast minimum
5. Visible focus indicator (3px outline)

**Problem:** Animation stuttering on mobile
**Solution:**
1. Use `will-change` CSS property sparingly
2. Prefer `transform` and `opacity` (GPU-accelerated)
3. Test on real device (not simulator)
4. Reduce animation complexity on mobile
5. Use `prefers-reduced-motion` media query

**Problem:** Performance degradation with many items
**Solution:**
1. Implement virtual scrolling (windowing)
2. Lazy load content below fold
3. Use React.memo() for list items
4. Pagination instead of loading all data
5. Debounce search/filter input (300ms)

**Problem:** Dark mode colors look wrong
**Solution:**
1. Use CSS custom properties (CSS variables)
2. Increase contrast for dark backgrounds
3. Test with actual dark mode color palette
4. Use `prefers-color-scheme` media query
5. Support manual theme toggle

---

## 🎬 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 2025 | Initial comprehensive prompt for Cursor/VS Code |

---

**Remember:** Every component is an opportunity to delight users, remove friction, and drive business results. Apply these principles consistently, test with real users, and iterate based on feedback.

**Last tip:** Save this file to your project and reference it in your IDE's AI assistant configuration for consistent, high-quality component generation across all projects.
