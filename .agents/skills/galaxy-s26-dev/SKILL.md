# Galaxy S26 Landing & Admin Development

This skill documents the technical implementation, architecture, and maintenance of the Galaxy S26 landing page and admin dashboard.

## Project Structure

The project is split into two versions to balance deployment speed and long-term scalability:

- **`/galaxy-s26-landing/` (Vanilla)**: The production-ready landing page built with pure HTML5, CSS3, and Vanilla JS. It features the complete lead management system and admin dashboard.
- **`/galaxy-s26-nextjs/` (Next.js)**: A modern React-based version using Next.js 15+ and Tailwind-free vanilla CSS modules, optimized for component reusability and SEO.

## Core Features & Optimizations

### 1. Optimized Hero Section
The Hero section is designed for a "Premium Tech" feel using modern CSS techniques:
- **Responsive Typography**: Uses `clamp(2rem, 6vw, 3.8rem)` for the main title, ensuring it fits on single lines across devices while maintaining impact.
- **Font Stack**: 
    - **English**: `Bricolage Grotesque` (vibrant, futuristic).
    - **Korean**: `Pretendard Variable` (clean, high readability).
- **Neon-Glassmorphism**: Combines `backdrop-filter: blur(40px)` with high-contrast neon accents (`--primary: #0055FF`, `--accent: #FF3B30`) for a 2026 flagship aesthetic.
- **Layered Visuals**: Utilizes `z-index` layering with massive transparent overlay text (e.g., "S26") behind product images to create depth.

### 2. Admin Security & Session Management
A lightweight secure access system is implemented for the lead management dashboard:
- **Authentication**: Demo credentials `umjc25` / `kl33550!` are used for static environment stability.
- **Session Guard**: A script in `admin_login.html` and `admin_dashboard.html` validates `sessionStorage.getItem('isAdmin') === 'true'`.
- **Automatic Redirection**: Any attempt to access `/admin/` routes without an active session redirects to the login page.

### 3. Lead Management Logic
The lead collection system is built for real-time interaction without a backend dependency:
- **Data Persistence**: Leads are stored in `localStorage` under the key `galaxy_leads`.
- **Custom Modals**: Replaced native `confirm()` with a premium, animated CSS/JS modal (`confirmModal`) for delete and clear-all actions to maintain the high-end UI consistency.
- **Real-time Sync**: Uses the `window.addEventListener('storage')` hook to synchronize administrative changes across multiple open tabs.

### 4. Responsive & Semantic Architecture
- **Grid Layouts**: Leverages `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` for fluid response to any screen size.
- **SEO Best Practices**: Proper `<main>`, `<nav>`, `<header>`, and hierarchy of `<h1>`-`<h3>` tags are strictly used for search engine indexing.

## Maintenance Commands

- **Local Vanilla Server**: `npx -y http-server` (recommended) or `python -m http.server`.
- **Next.js Dev Server**: `npm run dev` in the `galaxy-s26-nextjs` directory.
