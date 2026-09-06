# Software Requirements Specification
## ULTRABULB IT Hybrid Corporate Website

**Version:** 1.0  
**Date:** 2026-09-04  
**Project:** ULTRABULB IT Company Site  
**Reference direction:** IT Lab Solutions-style corporate IT website  
**Primary requirement:** Preserve ULTRABULB IT content, logo, color identity, admin features, and data while upgrading the visual system into a polished corporate IT-company experience.

---

## 1. Purpose

This document defines the requirements for improving the existing ULTRABULB IT website into a professional, responsive, content-managed IT company website.

The site should combine:

- ULTRABULB IT's existing content and functionality.
- ULTRABULB IT's own logo and navy/cyan color system.
- A clean, spacious, corporate IT-company presentation inspired by modern IT service websites.
- Strong service, project, trust, testimonial, career, and contact storytelling.
- Manual website management through the existing admin panel.

The reference website is used only for high-level design direction such as information hierarchy, spacing, section rhythm, navigation clarity, and corporate presentation. Do not copy its exact layout, text, assets, code, routes, or proprietary visual implementation.

---

## 2. Existing Project Baseline

### 2.1 Technology

- Next.js 16 application.
- React 19.
- TypeScript.
- Tailwind CSS v4.
- shadcn/ui-style components.
- Framer Motion for animation.
- Prisma ORM.
- SQLite database at `db/custom.db`.
- Next Themes for light/dark mode.
- Lucide React icons.
- Sonner for notifications.

### 2.2 Existing public routes

- `/` - Main one-page company website.
- `/schedule` - Dedicated call scheduling page.
- `/review` - Dedicated review submission page.
- `/admin` - Admin login and dashboard.

The public homepage currently contains these sections:

- Home / Hero
- About
- Products and Projects
- Careers
- Gallery
- Reviews and Awards
- Contact
- Footer

The homepage section anchors are:

- `/#home`
- `/#about`
- `/#products`
- `/#career`
- `/#gallery`
- `/#reviews`
- `/#contact`

### 2.3 Existing API areas

Public APIs:

- `/api/content`
- `/api/products`
- `/api/vacancies`
- `/api/gallery`
- `/api/reviews`
- `/api/awards`
- `/api/contact`
- `/api/schedule`
- `/api/time-slots`

Admin APIs:

- `/api/admin/login`
- `/api/admin/logout`
- `/api/admin/session`
- `/api/admin/content`
- `/api/admin/products`
- `/api/admin/vacancies`
- `/api/admin/gallery`
- `/api/admin/awards`
- `/api/admin/reviews`
- `/api/admin/calls`
- `/api/admin/messages`
- `/api/admin/time-slots`
- `/api/admin/upload`

### 2.4 Existing database entities

- `AdminUser`
- `SiteContent`
- `Product`
- `Vacancy`
- `GalleryImage`
- `Review`
- `Award`
- `ScheduledCall`
- `TimeSlot`
- `ContactMessage`

Do not remove or rename these entities without a migration plan.

---

## 3. Product Vision

ULTRABULB IT should feel like a reliable, capable technology partner for startups, SMEs, and established businesses.

The visual impression should be:

- Professional.
- Clear.
- Spacious.
- Confident.
- Technology-focused.
- Human and approachable.
- Fast to scan.
- Strong on mobile and desktop.

The website must not feel like:

- A generic SaaS template.
- A marketing landing page with oversized empty hero space.
- A dark-mode-only developer portfolio.
- A direct copy of another company's website.
- A page where content is hidden behind excessive animation.

---

## 4. Brand Requirements

### 4.1 Logo

Use the supplied ULTRABULB logo from:

- Source: `asset/logo.png`
- Public browser asset: `public/logo.png`

The logo must remain visible in:

- Desktop navbar.
- Mobile navigation.
- Hero visual area.
- Footer.
- Admin login.
- Admin sidebar.

The logo should have adequate contrast in both light and dark modes. Avoid applying aggressive inversion or filters that distort the original mark.

### 4.2 Color system

Primary brand colors:

- Deep navy: `#102943`
- Dark navy: `#0D2F54`
- Cyan: `#1ABCCF`
- Pale cyan: `#E7F7FA`
- Light background: `#F4FBFC`

Supporting colors may be used for status states, validation, success, warnings, and charts, but the public visual identity must remain navy/cyan-led.

Avoid making purple, violet, amber, or orange dominant brand colors.

### 4.3 Typography

- Use a clear, modern sans-serif system.
- Maintain strong heading hierarchy.
- Keep body text comfortable to read.
- Avoid excessively tight letter spacing.
- Avoid using oversized display text in compact cards or navigation.

---

## 5. Information Architecture

The website should remain content-compatible with the current application while adopting a more corporate IT-company hierarchy.

### 5.1 Main navigation

The navbar must include:

- Home.
- About dropdown.
- Products dropdown.
- Career dropdown.
- Gallery dropdown.
- Reviews dropdown.
- Contact dropdown.
- Theme toggle.
- Schedule a Call CTA.

The desktop navigation should be clean, evenly distributed, and not overcrowded.

The mobile navigation should use a structured drawer with grouped sections.

### 5.2 Dropdown groups

About:

- Our Story -> `/#about`
- Vision and Mission -> `/#about`
- What We Do -> `/#about`

Products:

- All Projects -> `/#products`
- Featured Work -> `/#products`
- Start a Project -> `/schedule`

Career:

- Open Positions -> `/#career`
- How We Hire -> `/#career`
- Join Our Team -> `/#career`

Gallery:

- Our Journey -> `/#gallery`
- Events and Moments -> `/#gallery`

Reviews:

- Client Reviews -> `/#reviews`
- Awards and Recognition -> `/#reviews`
- Submit a Review -> `/review`

Contact:

- Contact Us -> `/#contact`
- Schedule a Call -> `/schedule`
- Send a Message -> `/#contact`

All section links must work from every route. Use `/#section`, not only `#section`.

---

## 6. Page and Section Requirements

### 6.1 Homepage hero

The hero must:

- Use the existing editable hero content from `SiteContent`.
- Present ULTRABULB IT as a software development agency.
- Feature a strong headline, supporting description, and two CTAs.
- Use the ULTRABULB logo as the main brand visual.
- Show a professional technology-focused composition.
- Avoid excessive empty vertical space.
- Keep the first meaningful content visible on normal laptop screens.
- Support light and dark themes.
- Use Framer Motion for restrained entrance animation.
- Respect `prefers-reduced-motion` where practical.

Existing hero actions:

- Explore Our Work -> `/#products`
- Schedule a Call -> `/schedule`

### 6.2 About section

Must preserve:

- About badge.
- About title.
- About description.
- Vision.
- Mission.
- Field of work.
- Dynamic service fields.

Recommended presentation:

- Strong editorial two-column structure.
- Compact vision and mission blocks.
- Responsive service grid.
- Existing card hover behavior retained.

### 6.3 Products and projects

Must preserve dynamic product data:

- Title.
- Description.
- Image.
- Category.
- Tags.
- Optional external link.
- Featured state.

Presentation requirements:

- Equal-height cards.
- Consistent image ratio.
- One column on narrow mobile.
- Two columns on tablet.
- Three columns on desktop.
- Keep card hover lift and image hover effects.
- Avoid very large alternating full-width rows unless specifically justified.

### 6.4 Careers

Must preserve:

- Career introduction.
- Hiring process.
- Requirements.
- Mission and vision copy.
- Vacancy listings.
- Hiring status.

The section must remain readable and actionable on mobile.

### 6.5 Gallery

Must preserve:

- Dynamic gallery images.
- Categories.
- Category filtering.
- Image lightbox.
- Image titles.

Presentation requirements:

- Responsive image grid.
- Stable tile dimensions.
- Clear hover state.
- Keyboard-accessible lightbox trigger.
- No layout jumps while filtering.

### 6.6 Reviews and awards

Must preserve:

- Approved review display.
- Star ratings.
- Awards display.
- Awards metadata.
- Link to dedicated review submission page.

The `Submit Your Review` action must route to `/review`, not reveal the full form inline on the homepage.

### 6.7 Review page

The review page must:

- Use the shared navbar and footer.
- Display the review form in the first viewport where possible.
- Provide name, email, role, company, rating, and review message fields.
- Validate required fields.
- Submit to `/api/reviews`.
- Show success and error notifications.
- Provide a back-to-reviews link.
- Work in light and dark themes.

### 6.8 Schedule page

Must preserve the existing scheduling workflow:

- Content loaded from the database.
- Date selection.
- Available time slots.
- Topic selection.
- Contact details.
- Message.
- Confirmation state.
- Submission to the existing API.

Do not break the scheduling data contract.

### 6.9 Contact section

Must preserve:

- Email.
- Phone.
- Address.
- Map embed if configured.
- Contact form.
- Existing API submission behavior.

The contact CTA must be prominent without being visually oversized.

### 6.10 Footer

The footer should be a complete corporate footer containing:

- ULTRABULB IT logo.
- Brand tagline.
- Social links.
- Company section links.
- Contact information.
- Schedule a Call CTA.
- Admin Login link.
- Copyright.

Footer links to homepage sections must use `/#section` so they work from every page.

---

## 7. Responsive Requirements

The site must be tested at minimum at:

- 320px.
- 360px.
- 390px.
- 768px.
- 1024px.
- 1280px.
- 1440px.

### 7.1 Mobile

- No horizontal scrolling.
- Navbar uses drawer navigation.
- Logo remains readable but does not dominate the header.
- Buttons fit within the viewport.
- Cards use one-column layout where needed.
- Long text wraps cleanly.
- Form controls are full width.
- Hero visual remains available in a compact form.

### 7.2 Tablet

- Navbar switches to mobile/grouped navigation before links become cramped.
- Two-column grids may be used where content allows.
- Hero content must not collide with the navbar.
- Cards maintain stable dimensions.

### 7.3 Desktop

- Content max width should be approximately 1200px to 1280px.
- Navbar should be visually balanced across wide screens.
- Hero should use a clear two-column composition.
- Product and service grids should use consistent gaps.
- Avoid excessive unused space.

---

## 8. Interaction and Motion

Use Framer Motion where it improves hierarchy or feedback:

- Navbar entrance.
- Hero content reveal.
- Section reveal on scroll.
- Card hover lift.
- Product image hover scale.
- Dropdown entrance.
- Gallery filtering.
- Form success transition.

Motion must be:

- Subtle.
- Fast enough for repeated use.
- Non-blocking.
- Disabled or reduced for users who prefer reduced motion where practical.

Do not use continuous flashing, strobing, or intense brightness pulsing on the logo. The logo may have a calm hover glow or lift effect, but it must be clearly visible at rest.

---

## 9. Admin Requirements

The admin panel must remain functional and content-driven.

### 9.1 Manual content editing

Admins must be able to edit website content without coding or Markdown.

The interface should use:

- Human-readable labels.
- Normal text inputs.
- Textareas for longer copy.
- Add/remove controls for lists.
- Switches for boolean settings.
- Number inputs where appropriate.
- Save and discard actions.
- Unsaved change indicators.

Avoid exposing raw database keys or raw JSON unless an advanced fallback is genuinely necessary.

### 9.2 Manual image uploads

Admins must be able to:

- Select an image from their computer.
- Upload JPG, PNG, WebP, or GIF files.
- See an image preview.
- Replace an existing image.
- Clear an image.
- Optionally paste an image URL.

Upload requirements:

- Maximum size: 8 MB.
- Store files under `public/uploads` in the current local implementation.
- Require an authenticated admin session.
- Return a public URL used by existing imageUrl fields.

### 9.3 Admin security

- Keep admin routes protected by session authentication.
- Do not display demo credentials in production.
- Do not commit production secrets.
- Add login rate limiting before production deployment.
- Preserve secure cookie behavior.

### 9.4 Admin collections

The admin must support manual CRUD for:

- Products.
- Vacancies.
- Gallery images.
- Awards.
- Time slots.
- Reviews.
- Scheduled calls.
- Messages.
- Site content.

---

## 10. Data and API Compatibility

Do not change public API response shapes without updating all consumers.

Required compatibility rules:

- Existing database records must continue rendering.
- Missing content must use safe fallbacks.
- API failures must show useful UI states.
- Loading states must not cause layout collapse.
- Empty collection states must be intentional and readable.
- Protected APIs must continue returning `401` for unauthenticated requests.

The current SQLite environment uses:

```env
DATABASE_URL=file:../db/custom.db
```

The path is relative to the Prisma schema directory. Do not change it to `file:./db/custom.db`.

After dependency installation or schema changes, generate Prisma Client:

```powershell
node node_modules\prisma\build\index.js generate
```

If npm command shims are unavailable, start development with:

```powershell
node node_modules\next\dist\bin\next dev -p 3000
```

---

## 11. Accessibility Requirements

- Use semantic headings in order.
- All meaningful images need useful alt text.
- Decorative images must use empty alt text.
- Icon-only controls need accessible labels.
- Dropdowns must be keyboard accessible.
- Mobile drawer must be keyboard accessible.
- Focus states must remain visible in both themes.
- Form errors must be associated with their fields.
- Color must not be the only status indicator.
- Contrast must meet WCAG AA for normal text where practical.

---

## 12. Performance Requirements

- Use optimized image rendering where practical.
- Lazy-load below-the-fold images.
- Avoid unnecessarily large client bundles.
- Avoid repeated API requests where shared caching is possible.
- Keep first contentful render useful during API loading.
- Avoid blocking the page on non-critical animation.
- Keep image uploads bounded by type and size.

---

## 13. Visual Acceptance Criteria

The implementation is accepted when:

1. The website clearly reads as ULTRABULB IT, not the reference company.
2. The supplied ULTRABULB logo is visible in light and dark themes.
3. The public palette is consistently navy/cyan.
4. The navbar is clean, spacious, responsive, and not overcrowded.
5. Desktop navigation contains useful grouped dropdowns.
6. Mobile navigation contains the same destinations in a usable drawer.
7. Existing homepage content remains available.
8. Existing card hover effects remain active.
9. Product cards have stable dimensions and responsive columns.
10. The hero is visually strong without excessive empty height.
11. The review CTA routes to `/review`.
12. The review form is visible early on the review page.
13. The schedule flow remains functional.
14. Contact information and contact submission remain functional.
15. The admin panel supports manual text editing without code or Markdown.
16. Admin image upload and preview work.
17. Public section links work from every route.
18. Dark mode has readable text, controls, cards, and navbar.
19. No horizontal overflow occurs at 320px width.
20. Homepage, schedule, review, and admin routes return successful responses.
21. No new TypeScript or editor diagnostics exist in touched application files.

---

## 14. Suggested Implementation Order

1. Audit current visual components and preserve public API contracts.
2. Establish shared layout tokens and responsive container utilities.
3. Finalize navbar proportions, dropdown behavior, and mobile drawer.
4. Refine hero composition using the ULTRABULB logo and brand colors.
5. Refine service, product, gallery, review, and award presentation.
6. Refine contact and footer into a corporate closing experience.
7. Complete admin manual editing and upload workflows.
8. Validate light mode and dark mode.
9. Test all required viewport widths.
10. Test every route and API workflow.
11. Fix only regressions introduced by the implementation.

---

## 15. Explicit Constraints for the Next Agent

- Keep the current ULTRABULB IT information and database-driven content.
- Keep the existing admin panel and authentication behavior.
- Keep the existing schedule and review APIs.
- Keep the existing card hover effects unless improving their timing or accessibility.
- Use the supplied ULTRABULB logo, not reference-site assets.
- Do not copy the reference site's exact page, code, assets, text, or proprietary implementation.
- Do not replace the project with a different framework.
- Do not introduce Markdown as a required admin editing format.
- Do not expose raw JSON as the primary admin workflow.
- Do not remove functional sections merely to simplify the design.
- Do not use continuous flashing or strobing animations.
- Do not change unrelated files or revert user changes.

---

## 16. Definition of Done

The next agent is finished when the site feels like a polished, original corporate IT website with the clarity and confidence of the reference direction, while still being unmistakably ULTRABULB IT and fully manageable through the admin panel.
