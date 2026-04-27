---
name: Kinetic High-Performance
colors:
  surface: '#0c160e'
  surface-dim: '#0c160e'
  surface-bright: '#313c32'
  surface-container-lowest: '#071009'
  surface-container-low: '#141e16'
  surface-container: '#182219'
  surface-container-high: '#222c24'
  surface-container-highest: '#2d372e'
  on-surface: '#dae6d8'
  on-surface-variant: '#b9cbb9'
  inverse-surface: '#dae6d8'
  inverse-on-surface: '#29332a'
  outline: '#849584'
  outline-variant: '#3b4b3d'
  surface-tint: '#00e476'
  primary: '#f0ffee'
  on-primary: '#003919'
  primary-container: '#00ff85'
  on-primary-container: '#007137'
  inverse-primary: '#006d35'
  secondary: '#a6e6ff'
  on-secondary: '#003543'
  secondary-container: '#14d1ff'
  on-secondary-container: '#00566b'
  tertiary: '#fffaf7'
  on-tertiary: '#3d2f00'
  tertiary-container: '#ffdb79'
  on-tertiary-container: '#795f01'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#61ff97'
  primary-fixed-dim: '#00e476'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005227'
  secondary-fixed: '#b7eaff'
  secondary-fixed-dim: '#4cd6ff'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e60'
  tertiary-fixed: '#ffe08d'
  tertiary-fixed-dim: '#e5c364'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#584400'
  background: '#0c160e'
  on-background: '#dae6d8'
  surface-variant: '#2d372e'
typography:
  display-xl:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-padding: 16px
---

## Brand & Style

This design system is built on a foundation of high-performance athleticism and premium precision. It employs a **High-Contrast / Bold** aesthetic, utilizing deep blacks and electric neons to evoke the focused atmosphere of a high-end, late-night training facility. The visual language emphasizes energy and movement through glowing accents and sharp, technical details. 

The target audience consists of dedicated fitness enthusiasts who demand data clarity and a sophisticated, non-distracting environment. The UI should feel urgent yet controlled, providing a "dark mode" cockpit for personal physical evolution.

## Colors

The color palette is anchored by a "Deep Charcoal" base to eliminate visual noise and reduce eye strain during early morning or late-night workouts. The "Electric Green" primary accent is the functional focal point, used exclusively for primary actions, progress indicators, and active states. 

A secondary teal tone is introduced for gradients, providing a professional, "tech-heavy" look for data visualization and progress bars. Surfaces use a layered approach to create hierarchy, with a slightly lighter secondary surface to lift interactive components off the background.

## Typography

This design system uses **Lexend** for all headings to leverage its athletic and motivating character. Headings are set with tight tracking and heavy weights to command attention. 

For functional text and readability, **Manrope** is used as the body typeface. Its modern, balanced proportions ensure that workout metrics and coaching advice are legible at a glance during high-intensity activity. High-level labels and data points use uppercase Manrope with increased letter spacing to provide a technical, instrument-panel feel.

## Layout & Spacing

The layout follows a strict **8px base spacing grid**, ensuring mathematical harmony across all mobile screens. It utilizes a fluid grid for internal card elements but maintains fixed 16px horizontal margins for the main container to ensure content remains centered and readable.

The mobile-first navigation is anchored by a persistent bottom tab bar. Content should be grouped into logical "modules" or "strips" that allow for easy vertical scanning. Elements within a group use 8px spacing, while distinct sections are separated by 24px or 32px to create clear visual breathing room.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Luminescent Accents** rather than traditional shadows. 
- **Level 0 (Background):** Deep charcoal (#0F0F0F) for the canvas.
- **Level 1 (Cards/Surfaces):** Secondary surface (#1A1D23) with a 1px border (#2A2D35).
- **Level 2 (Interactive):** Elements with a "Neon Glow" effect—a drop shadow using the Electric Green color with high blur and low opacity (e.g., `0px 4px 20px rgba(0, 255, 133, 0.15)`).

Glassmorphism is used sparingly for the bottom navigation bar and top headers to maintain context of the scroll position, utilizing a backdrop blur of 12px and 80% opacity on the surface color.

## Shapes

The design system employs a "soft-geometric" approach. Standard buttons and input fields utilize an 8px radius, providing a disciplined, modern look. Larger containers and cards utilize a 12px radius (`rounded-lg`) to differentiate structural elements from interactive ones. Icons and small badges should remain sharp or utilize very minimal rounding to maintain the technical, athletic aesthetic.

## Components

### Buttons
- **Primary:** 48px height, Electric Green background, Black text (Lexend Bold), 8px radius. Apply a 15px Electric Green outer glow on hover or active states.
- **Secondary:** 48px height, 1px Electric Green border, transparent background, Green text.

### Cards
- **Structure:** 12px radius, 1px border (#2A2D35), Secondary Surface fill.
- **Visuals:** Apply a subtle green-tinted shadow (5% opacity) to signify priority or "active workout" cards.

### Inputs
- **Style:** 48px height, #1A1D23 fill, no border by default.
- **Focus State:** 1px solid Electric Green border with a subtle inner glow. Text should be Light Gray, transitioning to Pure White on focus.

### Navigation
- **Bottom Tab Bar:** 64px height, background blur, #1A1D23 at 90% opacity. Icons are 24px, outlined. Active icons utilize the Electric Green color with a small glow dot underneath.

### Progress & Charts
- **Gradients:** All progress bars must use a linear gradient from Electric Green (#00FF85) to Teal (#00D1FF) from left to right.
- **Data Points:** Outlined circles with a 2px Electric Green stroke.

### AI Coach Interactions
- Use a distinct gradient border (Green to Teal) for any message or component generated by the AI to distinguish it from manual tracking data.