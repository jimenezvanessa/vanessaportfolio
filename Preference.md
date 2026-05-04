

## 1. Design Philosophy

I want my portfolio to feel **modern, minimal, sophisticated, and interactive**—while still maintaining a professional, client-ready appearance.

Interactivity should be **purpose-driven**, not decorative. Every animation, hover, or transition must enhance usability and communicate technical precision.

The overall aesthetic should reflect a **PRD-driven system** with a clean, structured, and responsive interface.

---

## 2. Color System

The color palette should be **neat, calm, and premium-looking**.

### Primary Palette

* **Base:** Deep Neutral (e.g., #0F172A)
* **Surface:** Soft White / Off-White (e.g., #F8FAFC)
* **Accent:** Muted Indigo / Blue (e.g., #6366F1)
* **Interactive Highlight:** Soft Cyan / Teal

### Interaction Behavior

* Hover states subtly brighten or shift color
* Active states use accent color for clarity
* Focus states must be visible (accessibility)

---

## 3. Typography

Typography should reflect **clarity and technical professionalism**.

* **Primary Font:** Clean sans-serif (Inter / Geist)
* **Code Sections:** Monospace

### Interaction Enhancements

* Links have subtle underline animations on hover
* Headings can include slight fade/slide-in on load
* Maintain readability above all

---

## 4. Layout & Structure

The layout should follow a **structured, grid-based system** with responsive behavior.

### Interactive Layout Features

* Sections reveal smoothly on scroll (fade/slide)
* Sticky navigation with active section highlighting
* Smooth scrolling between sections

### Key Feel

* Modular “Lego-style” UI
* Clean, predictable navigation
* No overwhelming motion

---

## 5. UI Components Style

### Buttons

* Smooth hover transitions (color + slight scale)
* Micro-interactions on click (tap feedback)
* Clear CTA hierarchy

### Cards (Projects / Logs)

* Hover:

  * Slight elevation (translateY)
  * Soft shadow increase
  * Optional border glow
* Click:

  * Opens detailed view or route transition

### Badges / Tags

* Interactive filtering triggers
* Hover highlights related items

---

## 6. Interactivity System (Core Feature)

### Work Page (Filter System)

* Real-time filtering (no reload)
* Multi-filter support:

  * Tech stack
  * Category
* Smooth transitions when filtering (fade/scale)

### Logs Experience

* Expandable previews
* Smooth page transitions
* Reading progress indicator

### Timeline (Home Page)

* Interactive internship timeline:

  * Hover to preview activity
  * Click to navigate to full log/project
* Animated progression indicator

---

## 7. Motion & Animation Principles

* Use **Framer Motion or CSS transitions**
* Keep animations:

  * Fast (200–400ms)
  * Smooth (ease-in-out)
  * Subtle (no distractions)

### Allowed Animations

* Fade in / slide up
* Scale on hover
* Skeleton loading states
* Page transitions

### Avoid

* Overly bouncy effects
* Long delays
* Distracting motion

---

## 8. Feedback & Responsiveness

* Immediate feedback on user actions
* Loading states for async content
* Hover + focus + active states for all interactives

### Accessibility

* Keyboard navigable
* Visible focus outlines
* Motion reduced for users who prefer it

---

## 9. Content Presentation

Content should remain **structured and data-driven**, even with interactivity.

* Projects:

  * Interactive cards
  * Click → detailed view
* Logs:

  * Clean reading experience
  * Scroll-based enhancements

---

## 10. Performance Considerations

* Interactions must NOT affect performance
* Maintain:

  * 90+ Lighthouse score
  * No layout shifts (CLS)
* Use optimized animation techniques (transform, opacity)

---

## 11. Overall Experience Goal

The portfolio should feel like:

> A **modern SaaS product with interactive UX**, not just a static portfolio.

It should communicate:

* Strong frontend engineering skills
* Attention to UX details
* Ability to build dynamic, scalable interfaces

---

## 12. Inspiration Keywords

* Interactive but minimal
* Smooth UX
* Developer-grade UI
* SaaS-style interface
* Clean animations
* Structured and responsive

---
