# Galaxy S26 Project Development Rules

All contributions to the Galaxy S26 project must adhere to the following architectural and design standards.

## 1. Design Ethics & Visual Standards
- **Aesthetic**: Modern, Neon, Glassmorphism. Every element should feel futuristic and premium.
- **Theme**: Dark Mode is the mandatory default. Use deep blacks (`#000000`, `#050505`) and high-contrast neon accents (`--primary: #0055FF`, `--accent: #FF3B30`).
- **Typography**: English elements must use `Bricolage Grotesque`. Korean text must use `Pretendard Variable`.
- **Interactions**: No basic browser defaults. Use custom hover transitions, smooth scroll, and CSS/JS-based confirmation modals.

## 2. Tech Stack Consistency
- **Marketing Landing Pages**: Use Vanilla HTML/CSS/JS for maximum control over aesthetics and zero-build deployment speed.
- **Scalable Application/UI**: Use Next.js 15+ and React 19+ for component-based features, ensuring all styles are kept in modular CSS files.
- **Styling**: Avoid TailwindCSS unless explicitly requested; leverage Vanilla CSS with CSS Variables for precise control.

## 3. SEO & Performance Budget
- **Performance**: Aim for a 95+ score on Lighthouses. Optimize images and use `clamp()` for fluid typography.
- **Semantic HTML**: Use only one `<h1>` per page. Always use `<nav>`, `<header>`, `<main>`, and `<footer>` tags.
- **Accessibility**: Ensure high contrast for all critical information.

## 4. Security & Data Integrity
- **Admin Protection**: Admin routes MUST be protected by a `sessionStorage` session guard. For static demos, hardcoded credentials are acceptable but should be documented.
- **Lead Storage**: All frontend-collected data should use `localStorage` with a consistent key (`galaxy_leads`), and follow the established JSON schema.
- **Safety**: Do NOT allow scripts to bypass the "Security Guard" script in the `<head>` of admin pages.

## 5. Development Workflow
- **Before Committing**: Verify all links and paths locally using `http-server`.
- **Documentation**: All new features or UI components must be added to the `.agents/skills/galaxy-s26-dev/SKILL.md` file.
