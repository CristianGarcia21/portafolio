# Portafolio Personal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, dark-mode React portfolio site (Hero, About, Skills, Projects, Achievements, Contact) that showcases two projects and three hackathon results, ready to deploy on Netlify.

**Architecture:** Vite + React SPA with no backend. Content that changes often (skills, projects, achievements, contact info) lives in plain JS data modules under `src/data/`, imported by presentational components under `src/components/`. Tailwind CSS handles styling via a shared dark theme. Vitest + React Testing Library cover component behavior and data-shape validation.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Vitest 2, @testing-library/react 16, @testing-library/jest-dom, @testing-library/user-event.

## Global Constraints

- Single-page site with anchor navigation (`#inicio`, `#sobre-mi`, `#skills`, `#proyectos`, `#logros`, `#contacto`) — no client-side router, no backend, no database.
- Contact section uses direct links only (`mailto:`, LinkedIn, GitHub) — no contact form/backend in this version.
- Dark mode only: background ~`#0a0a0f`, body text ~`#e5e5e5`/neutral-100-300, and exactly **one** accent color across the whole site: emerald green (Tailwind's `emerald-400`/`emerald-500`).
- Typography: `Inter` for body text, `JetBrains Mono` for code-like accents (nav logo, section eyebrows, badges).
- Mobile-first responsive layout.
- Two project cards only: **Agroinsumos** (has screenshots + live demo) and **App de envíos (Angular)** (repo link only, no screenshots yet — must show a clean placeholder, never a broken image).
- Three achievements: Hackathon Talento Tech (1er lugar, completed), Hackathon Colombia 5.0 (2do lugar, completed), Hackathon Open Data Colombia (en curso, pending result).
- No certifications/education section, no blog, no multi-language support in this version.
- Deploy target: Netlify, build command `npm run build`, publish directory `dist`.
- Image assets already staged at `public/images/projects/agroinsumos/`, `public/images/projects/envios-angular/`, `public/images/profile/`.

---

### Task 1: Project scaffold (Vite + React + Tailwind + Vitest)

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `src/main.jsx`
- Create: `src/index.css`
- Create: `src/App.jsx` (temporary placeholder, replaced in Task 10)
- Create: `src/test/setup.js`
- Test: `src/App.test.jsx`

**Interfaces:**
- Produces: `App` default export (React component) rendered by `main.jsx` into `#root`. Later tasks (2-10) add data/components; Task 10 replaces the body of `App.jsx`.
- Produces: Vitest config (`test` block in `vite.config.js`) with `environment: 'jsdom'` and `setupFiles: './src/test/setup.js'`, used by every later `*.test.jsx`/`*.test.js` file.
- Produces: Tailwind theme tokens available globally: `emerald-400`/`emerald-500` as the only accent, `font-sans` (Inter), `font-mono` (JetBrains Mono).

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "portafolio-cristian-garcia",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@testing-library/user-event": "^14.5.2",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "vite": "^5.4.8",
    "vitest": "^2.1.2"
  }
}
```

- [ ] **Step 2: Write `vite.config.js`**

```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
  },
});
```

- [ ] **Step 3: Write `index.html`**

```html
<!doctype html>
<html lang="es" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cristian García · Frontend Developer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="bg-[#0a0a0f]">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Write `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Write `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Write `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply font-sans;
}
```

- [ ] **Step 7: Write `src/main.jsx`**

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 8: Write temporary `src/App.jsx`**

```jsx
export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] text-neutral-100">
      <h1 className="font-mono text-2xl">Portafolio en construcción</h1>
    </div>
  );
}
```

- [ ] **Step 9: Write `src/test/setup.js`**

```js
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 10: Write the failing test `src/App.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/portafolio en construcción/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 11: Install dependencies**

Run: `npm install`
Expected: install completes with no errors.

- [ ] **Step 12: Run the test to verify it passes**

Run: `npm test`
Expected: `App > renders without crashing` PASS (1 test file, 1 test).

- [ ] **Step 13: Verify the production build works**

Run: `npm run build`
Expected: build succeeds, `dist/` is created.

- [ ] **Step 14: Commit**

```bash
git add package.json vite.config.js index.html tailwind.config.js postcss.config.js src/main.jsx src/index.css src/App.jsx src/App.test.jsx src/test/setup.js package-lock.json .gitignore
git commit -m "chore: scaffold proyecto con Vite, React, Tailwind y Vitest"
```

Note: create a `.gitignore` with at least `node_modules` and `dist` before this commit if one doesn't already exist (`echo -e "node_modules\ndist" > .gitignore`).

---

### Task 2: Data layer (skills, achievements, contact, projects)

**Files:**
- Create: `src/data/skills.js`
- Test: `src/data/skills.test.js`
- Create: `src/data/achievements.js`
- Test: `src/data/achievements.test.js`
- Create: `src/data/contact.js`
- Test: `src/data/contact.test.js`
- Create: `src/data/projects.js`
- Test: `src/data/projects.test.js`

**Interfaces:**
- Consumes: nothing (pure data modules).
- Produces: `skills` (array of `{ name: string, icon: string }`), used by Task 6 (Skills component).
- Produces: `achievements` (array of `{ id: string, title: string, result: string, status: 'completed' | 'in-progress' }`), used by Task 7 (Achievements component).
- Produces: `contact` (`{ email: string, linkedin: string, github: string }`), used by Task 9 (Contact component).
- Produces: `projects` (array of `{ id: string, title: string, description: string, stack: string[], repoUrl: string, demoUrl: string | null, image: string | null }`), used by Task 8 (Projects/ProjectCard components).
- All values below are placeholder content marked with `TODO(usuario)` where the user still needs to provide real info (per the design spec's "Contenido pendiente" section) — replace them once the user shares the real data in chat.

- [ ] **Step 1: Write the failing test `src/data/skills.test.js`**

```js
import { describe, expect, it } from 'vitest';
import { skills } from './skills';

describe('skills data', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
  });

  it('each skill has a non-empty name and an icon', () => {
    skills.forEach((skill) => {
      expect(typeof skill.name).toBe('string');
      expect(skill.name.length).toBeGreaterThan(0);
      expect(typeof skill.icon).toBe('string');
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/skills.test.js`
Expected: FAIL — `Failed to resolve import "./skills"`.

- [ ] **Step 3: Write `src/data/skills.js`**

```js
export const skills = [
  { name: 'React', icon: '⚛️' },
  { name: 'Angular', icon: '🅰️' },
  { name: 'HTML5', icon: '🌐' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'Java', icon: '☕' },
  { name: 'SQL', icon: '🗄️' },
  { name: 'Git', icon: '📦' },
  { name: 'Docker', icon: '🐳' },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/data/skills.test.js`
Expected: PASS (2 tests).

- [ ] **Step 5: Write the failing test `src/data/achievements.test.js`**

```js
import { describe, expect, it } from 'vitest';
import { achievements } from './achievements';

const VALID_STATUSES = ['completed', 'in-progress'];

describe('achievements data', () => {
  it('exports exactly 3 achievements', () => {
    expect(achievements).toHaveLength(3);
  });

  it('each achievement has a valid status', () => {
    achievements.forEach((achievement) => {
      expect(VALID_STATUSES).toContain(achievement.status);
    });
  });

  it('includes the Open Data Colombia hackathon as in-progress', () => {
    const openData = achievements.find((a) => a.id === 'open-data-colombia');
    expect(openData).toBeDefined();
    expect(openData.status).toBe('in-progress');
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run src/data/achievements.test.js`
Expected: FAIL — `Failed to resolve import "./achievements"`.

- [ ] **Step 7: Write `src/data/achievements.js`**

```js
export const achievements = [
  {
    id: 'talento-tech',
    title: 'Hackathon Talento Tech',
    result: '1er lugar',
    status: 'completed',
  },
  {
    id: 'colombia-5-0',
    title: 'Hackathon Colombia 5.0',
    result: '2do lugar',
    status: 'completed',
  },
  {
    id: 'open-data-colombia',
    title: 'Hackathon Open Data Colombia',
    result: 'Resultados pendientes',
    status: 'in-progress',
  },
];
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/data/achievements.test.js`
Expected: PASS (3 tests).

- [ ] **Step 9: Write the failing test `src/data/contact.test.js`**

```js
import { describe, expect, it } from 'vitest';
import { contact } from './contact';

describe('contact data', () => {
  it('has an email containing "@"', () => {
    expect(contact.email).toContain('@');
  });

  it('has https URLs for linkedin and github', () => {
    expect(contact.linkedin.startsWith('https://')).toBe(true);
    expect(contact.github.startsWith('https://')).toBe(true);
  });
});
```

- [ ] **Step 10: Run test to verify it fails**

Run: `npx vitest run src/data/contact.test.js`
Expected: FAIL — `Failed to resolve import "./contact"`.

- [ ] **Step 11: Write `src/data/contact.js`**

```js
export const contact = {
  email: 'cristiangarcianastar21@gmail.com',
  linkedin: 'https://www.linkedin.com/in/cristian-esteban-garcia-nastar-64457a147/',
  github: 'https://github.com/CristianGarcia21',
};
```

- [ ] **Step 12: Run test to verify it passes**

Run: `npx vitest run src/data/contact.test.js`
Expected: PASS (2 tests).

- [ ] **Step 13: Write the failing test `src/data/projects.test.js`**

```js
import { describe, expect, it } from 'vitest';
import { projects } from './projects';

describe('projects data', () => {
  it('exports exactly 2 projects', () => {
    expect(projects).toHaveLength(2);
  });

  it('each project has the required fields', () => {
    projects.forEach((project) => {
      expect(typeof project.title).toBe('string');
      expect(typeof project.description).toBe('string');
      expect(Array.isArray(project.stack)).toBe(true);
      expect(typeof project.repoUrl).toBe('string');
    });
  });

  it('the envios-angular project has no demo URL or image yet', () => {
    const envios = projects.find((p) => p.id === 'envios-angular');
    expect(envios).toBeDefined();
    expect(envios.demoUrl).toBeNull();
    expect(envios.image).toBeNull();
  });

  it('the agroinsumos project has a demo URL and an image', () => {
    const agroinsumos = projects.find((p) => p.id === 'agroinsumos');
    expect(agroinsumos).toBeDefined();
    expect(typeof agroinsumos.demoUrl).toBe('string');
    expect(typeof agroinsumos.image).toBe('string');
  });
});
```

- [ ] **Step 14: Run test to verify it fails**

Run: `npx vitest run src/data/projects.test.js`
Expected: FAIL — `Failed to resolve import "./projects"`.

- [ ] **Step 15: Write `src/data/projects.js`**

```js
export const projects = [
  {
    id: 'agroinsumos',
    title: 'Agroinsumos',
    // TODO(usuario): ajusta esta descripción con el detalle real del proyecto.
    description:
      'Plataforma para la gestión y venta de insumos agrícolas, con catálogo de productos y seguimiento de pedidos.',
    stack: ['React', 'Node.js'],
    // TODO(usuario): reemplaza con la URL real del repositorio.
    repoUrl: 'https://github.com/tu-usuario/agroinsumos',
    // TODO(usuario): reemplaza con la URL real de la demo en vivo.
    demoUrl: 'https://tu-demo-agroinsumos.netlify.app',
    image: '/images/projects/agroinsumos/01-dashboard.png',
  },
  {
    id: 'envios-angular',
    title: 'App de envíos (Angular)',
    description:
      'Aplicación de seguimiento de envíos desarrollada como proyecto universitario.',
    stack: ['Angular', 'TypeScript'],
    // TODO(usuario): reemplaza con la URL real del repositorio.
    repoUrl: 'https://github.com/tu-usuario/envios-angular',
    demoUrl: null,
    image: null,
  },
];
```

- [ ] **Step 16: Run test to verify it passes**

Run: `npx vitest run src/data/projects.test.js`
Expected: PASS (4 tests).

- [ ] **Step 17: Run the full test suite**

Run: `npm test`
Expected: all test files PASS.

- [ ] **Step 18: Commit**

```bash
git add src/data
git commit -m "feat: agrega capa de datos (skills, logros, contacto, proyectos)"
```

---

### Task 3: Navbar component

**Files:**
- Create: `src/components/Navbar.jsx`
- Test: `src/components/Navbar.test.jsx`

**Interfaces:**
- Consumes: nothing (static nav link list defined inline).
- Produces: `Navbar` default export, a fixed-position header with anchors to `#inicio`, `#sobre-mi`, `#skills`, `#proyectos`, `#logros`, `#contacto`, rendered by `App` in Task 10.

- [ ] **Step 1: Write the failing test `src/components/Navbar.test.jsx`**

```jsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders a link for every section', () => {
    render(<Navbar />);
    ['Inicio', 'Sobre mí', 'Skills', 'Proyectos', 'Logros', 'Contacto'].forEach((label) => {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0);
    });
  });

  it('hides the mobile menu by default', () => {
    render(<Navbar />);
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  it('opens the mobile menu when the toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole('button', { name: /abrir menú/i }));
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });

  it('closes the mobile menu after clicking a link inside it', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole('button', { name: /abrir menú/i }));
    const mobileMenu = screen.getByTestId('mobile-menu');
    await user.click(within(mobileMenu).getByRole('link', { name: 'Inicio' }));
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Navbar.test.jsx`
Expected: FAIL — `Failed to resolve import "./Navbar"`.

- [ ] **Step 3: Write `src/components/Navbar.jsx`**

```jsx
import { useState } from 'react';

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#skills', label: 'Skills' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#logros', label: 'Logros' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <a href="#inicio" className="font-mono text-lg font-bold text-emerald-400">
          CG
        </a>
        <ul className="hidden gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-neutral-300 transition hover:text-emerald-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-neutral-200 md:hidden"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </nav>
      {isOpen && (
        <ul
          data-testid="mobile-menu"
          className="flex flex-col gap-4 border-t border-white/10 px-4 py-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm text-neutral-300 hover:text-emerald-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/Navbar.test.jsx`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.jsx src/components/Navbar.test.jsx
git commit -m "feat: agrega Navbar con menú móvil"
```

---

### Task 4: Hero section

**Files:**
- Create: `src/components/Hero.jsx`
- Test: `src/components/Hero.test.jsx`

**Interfaces:**
- Consumes: nothing (static content).
- Produces: `Hero` default export, section with `id="inicio"`, rendered by `App` in Task 10.

- [ ] **Step 1: Write the failing test `src/components/Hero.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('renders inside a section with id "inicio"', () => {
    const { container } = render(<Hero />);
    expect(container.querySelector('section#inicio')).not.toBeNull();
  });

  it('renders the name and role', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: /cristian garcía/i })).toBeInTheDocument();
    expect(screen.getByText(/frontend developer/i)).toBeInTheDocument();
  });

  it('renders CTA links to projects and contact', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /ver proyectos/i })).toHaveAttribute('href', '#proyectos');
    expect(screen.getByRole('link', { name: /^contacto$/i })).toHaveAttribute('href', '#contacto');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Hero.test.jsx`
Expected: FAIL — `Failed to resolve import "./Hero"`.

- [ ] **Step 3: Write `src/components/Hero.jsx`**

```jsx
export default function Hero() {
  return (
    <section
      id="inicio"
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center"
    >
      <p className="font-mono text-sm uppercase tracking-widest text-emerald-400">Hola, soy</p>
      <h1 className="text-4xl font-bold text-white sm:text-6xl">Cristian García</h1>
      <h2 className="text-xl text-neutral-300 sm:text-2xl">Frontend Developer</h2>
      <p className="max-w-xl text-neutral-400">
        Construyo interfaces limpias y funcionales, con interés creciente en llevar mis
        proyectos de extremo a extremo (full stack).
      </p>
      <div className="flex gap-4">
        <a
          href="#proyectos"
          className="rounded-md bg-emerald-500 px-6 py-3 font-medium text-black transition hover:bg-emerald-400"
        >
          Ver proyectos
        </a>
        <a
          href="#contacto"
          className="rounded-md border border-emerald-500 px-6 py-3 font-medium text-emerald-400 transition hover:bg-emerald-500/10"
        >
          Contacto
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/Hero.test.jsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.test.jsx
git commit -m "feat: agrega sección Hero"
```

---

### Task 5: About section

**Files:**
- Create: `src/components/About.jsx`
- Test: `src/components/About.test.jsx`

**Interfaces:**
- Consumes: nothing (static bio text, marked as placeholder for the user to replace).
- Produces: `About` default export, section with `id="sobre-mi"`, rendered by `App` in Task 10.

- [ ] **Step 1: Write the failing test `src/components/About.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import About from './About';

describe('About', () => {
  it('renders inside a section with id "sobre-mi"', () => {
    const { container } = render(<About />);
    expect(container.querySelector('section#sobre-mi')).not.toBeNull();
  });

  it('renders the "Sobre mí" heading and a non-empty bio paragraph', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /sobre mí/i })).toBeInTheDocument();
    expect(screen.getByTestId('bio-text').textContent.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/About.test.jsx`
Expected: FAIL — `Failed to resolve import "./About"`.

- [ ] **Step 3: Write `src/components/About.jsx`**

```jsx
export default function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-3xl px-4 py-24">
      <h2 className="mb-6 font-mono text-sm uppercase tracking-widest text-emerald-400">
        Sobre mí
      </h2>
      {/* TODO(usuario): bio generada como punto de partida, ajústala a tu gusto más adelante. */}
      <p data-testid="bio-text" className="text-lg leading-relaxed text-neutral-300">
        Soy desarrollador frontend con experiencia construyendo interfaces con React y
        Angular, y bases sólidas en Java, SQL y Docker que me permiten entender el proyecto
        de punta a punta. Disfruto resolver problemas reales con código limpio y estoy
        ampliando mi perfil hacia el desarrollo full stack.
      </p>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/About.test.jsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/About.jsx src/components/About.test.jsx
git commit -m "feat: agrega sección Sobre mí"
```

---

### Task 6: Skills section

**Files:**
- Create: `src/components/Skills.jsx`
- Test: `src/components/Skills.test.jsx`

**Interfaces:**
- Consumes: `skills` from `src/data/skills.js` (Task 2) — array of `{ name: string, icon: string }`.
- Produces: `Skills` default export, section with `id="skills"`, rendered by `App` in Task 10.

- [ ] **Step 1: Write the failing test `src/components/Skills.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Skills from './Skills';
import { skills } from '../data/skills';

describe('Skills', () => {
  it('renders inside a section with id "skills"', () => {
    const { container } = render(<Skills />);
    expect(container.querySelector('section#skills')).not.toBeNull();
  });

  it('renders every skill name from the data module', () => {
    render(<Skills />);
    skills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Skills.test.jsx`
Expected: FAIL — `Failed to resolve import "./Skills"`.

- [ ] **Step 3: Write `src/components/Skills.jsx`**

```jsx
import { skills } from '../data/skills';

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-3xl px-4 py-24">
      <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-emerald-400">
        Stack de tecnologías
      </h2>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {skills.map((skill) => (
          <li
            key={skill.name}
            className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-neutral-200"
          >
            <span aria-hidden="true">{skill.icon}</span>
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/Skills.test.jsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/Skills.jsx src/components/Skills.test.jsx
git commit -m "feat: agrega sección de skills"
```

---

### Task 7: Achievement status helper + Achievements section

**Files:**
- Create: `src/components/achievementStatus.js`
- Test: `src/components/achievementStatus.test.js`
- Create: `src/components/Achievements.jsx`
- Test: `src/components/Achievements.test.jsx`

**Interfaces:**
- Consumes: `achievements` from `src/data/achievements.js` (Task 2).
- Produces: `getStatusBadge(status: 'completed' | 'in-progress') => { label: string, className: string }`, throws `Error` for any other status. Used by `Achievements.jsx` and available for reuse if another component needs a status badge later.
- Produces: `Achievements` default export, section with `id="logros"`, rendered by `App` in Task 10.

- [ ] **Step 1: Write the failing test `src/components/achievementStatus.test.js`**

```js
import { describe, expect, it } from 'vitest';
import { getStatusBadge } from './achievementStatus';

describe('getStatusBadge', () => {
  it('returns a completed badge for status "completed"', () => {
    expect(getStatusBadge('completed')).toEqual({
      label: 'Completado',
      className: 'bg-emerald-500/20 text-emerald-400',
    });
  });

  it('returns an in-progress badge for status "in-progress"', () => {
    expect(getStatusBadge('in-progress')).toEqual({
      label: 'En curso',
      className: 'bg-amber-500/20 text-amber-400',
    });
  });

  it('throws for an unknown status', () => {
    expect(() => getStatusBadge('unknown')).toThrow('Unknown achievement status: unknown');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/achievementStatus.test.js`
Expected: FAIL — `Failed to resolve import "./achievementStatus"`.

- [ ] **Step 3: Write `src/components/achievementStatus.js`**

```js
export function getStatusBadge(status) {
  if (status === 'completed') {
    return { label: 'Completado', className: 'bg-emerald-500/20 text-emerald-400' };
  }
  if (status === 'in-progress') {
    return { label: 'En curso', className: 'bg-amber-500/20 text-amber-400' };
  }
  throw new Error(`Unknown achievement status: ${status}`);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/achievementStatus.test.js`
Expected: PASS (3 tests).

- [ ] **Step 5: Write the failing test `src/components/Achievements.test.jsx`**

```jsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Achievements from './Achievements';
import { achievements } from '../data/achievements';

describe('Achievements', () => {
  it('renders inside a section with id "logros"', () => {
    const { container } = render(<Achievements />);
    expect(container.querySelector('section#logros')).not.toBeNull();
  });

  it('renders the title of every achievement', () => {
    render(<Achievements />);
    achievements.forEach((achievement) => {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
    });
  });

  it('renders "En curso" for the Open Data Colombia hackathon', () => {
    render(<Achievements />);
    const openDataTitle = screen.getByText('Hackathon Open Data Colombia');
    const card = openDataTitle.closest('li');
    expect(within(card).getByText('En curso')).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run src/components/Achievements.test.jsx`
Expected: FAIL — `Failed to resolve import "./Achievements"`.

- [ ] **Step 7: Write `src/components/Achievements.jsx`**

```jsx
import { achievements } from '../data/achievements';
import { getStatusBadge } from './achievementStatus';

export default function Achievements() {
  return (
    <section id="logros" className="mx-auto max-w-3xl px-4 py-24">
      <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-emerald-400">
        Logros
      </h2>
      <ul className="flex flex-col gap-4">
        {achievements.map((achievement) => {
          const badge = getStatusBadge(achievement.status);
          return (
            <li
              key={achievement.id}
              className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-5 py-4"
            >
              <div>
                <p className="font-medium text-neutral-100">{achievement.title}</p>
                <p className="text-sm text-neutral-400">{achievement.result}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${badge.className}`}>
                {badge.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/components/Achievements.test.jsx`
Expected: PASS (3 tests).

- [ ] **Step 9: Commit**

```bash
git add src/components/achievementStatus.js src/components/achievementStatus.test.js src/components/Achievements.jsx src/components/Achievements.test.jsx
git commit -m "feat: agrega sección de logros con badge de estado"
```

---

### Task 8: ProjectCard + Projects section

**Files:**
- Create: `src/components/ProjectCard.jsx`
- Test: `src/components/ProjectCard.test.jsx`
- Create: `src/components/Projects.jsx`
- Test: `src/components/Projects.test.jsx`

**Interfaces:**
- Consumes: `projects` from `src/data/projects.js` (Task 2); `ProjectCard` consumes a single `project` prop matching that shape.
- Produces: `ProjectCard` default export (takes `{ project }` prop). Produces: `Projects` default export, section with `id="proyectos"`, rendered by `App` in Task 10.

- [ ] **Step 1: Write the failing test `src/components/ProjectCard.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectCard from './ProjectCard';

const projectWithDemo = {
  id: 'agroinsumos',
  title: 'Agroinsumos',
  description: 'Plataforma de insumos agrícolas.',
  stack: ['React', 'Node.js'],
  repoUrl: 'https://github.com/tu-usuario/agroinsumos',
  demoUrl: 'https://demo.example.com',
  image: '/images/projects/agroinsumos/01-dashboard.png',
};

const projectWithoutDemo = {
  id: 'envios-angular',
  title: 'App de envíos',
  description: 'App de seguimiento de envíos.',
  stack: ['Angular'],
  repoUrl: 'https://github.com/tu-usuario/envios-angular',
  demoUrl: null,
  image: null,
};

describe('ProjectCard', () => {
  it('renders the image and a demo link when both are provided', () => {
    render(<ProjectCard project={projectWithDemo} />);
    expect(screen.getByRole('img', { name: /captura del proyecto agroinsumos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /demo en vivo/i })).toHaveAttribute(
      'href',
      'https://demo.example.com',
    );
    expect(screen.queryByTestId('image-placeholder')).not.toBeInTheDocument();
  });

  it('renders a placeholder and no demo link when image/demoUrl are missing', () => {
    render(<ProjectCard project={projectWithoutDemo} />);
    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /demo en vivo/i })).not.toBeInTheDocument();
  });

  it('always renders the repository link', () => {
    render(<ProjectCard project={projectWithoutDemo} />);
    expect(screen.getByRole('link', { name: /repositorio/i })).toHaveAttribute(
      'href',
      projectWithoutDemo.repoUrl,
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ProjectCard.test.jsx`
Expected: FAIL — `Failed to resolve import "./ProjectCard"`.

- [ ] **Step 3: Write `src/components/ProjectCard.jsx`**

```jsx
export default function ProjectCard({ project }) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/5 p-6">
      {project.image ? (
        <img
          src={project.image}
          alt={`Captura del proyecto ${project.title}`}
          className="aspect-video w-full rounded-md object-cover"
        />
      ) : (
        <div
          data-testid="image-placeholder"
          className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-white/20 bg-black/40 font-mono text-sm text-neutral-500"
        >
          Capturas próximamente
        </div>
      )}
      <h3 className="text-xl font-semibold text-neutral-100">{project.title}</h3>
      <p className="text-neutral-400">{project.description}</p>
      <ul className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex gap-4">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-neutral-200 underline-offset-4 hover:text-emerald-400 hover:underline"
        >
          Repositorio
        </a>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-emerald-400 underline-offset-4 hover:underline"
          >
            Demo en vivo
          </a>
        )}
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/ProjectCard.test.jsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Write the failing test `src/components/Projects.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Projects from './Projects';
import { projects } from '../data/projects';

describe('Projects', () => {
  it('renders inside a section with id "proyectos"', () => {
    const { container } = render(<Projects />);
    expect(container.querySelector('section#proyectos')).not.toBeNull();
  });

  it('renders a card for every project', () => {
    render(<Projects />);
    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run src/components/Projects.test.jsx`
Expected: FAIL — `Failed to resolve import "./Projects"`.

- [ ] **Step 7: Write `src/components/Projects.jsx`**

```jsx
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id="proyectos" className="mx-auto max-w-4xl px-4 py-24">
      <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-emerald-400">
        Proyectos
      </h2>
      <div className="grid gap-8 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/components/Projects.test.jsx`
Expected: PASS (2 tests).

- [ ] **Step 9: Commit**

```bash
git add src/components/ProjectCard.jsx src/components/ProjectCard.test.jsx src/components/Projects.jsx src/components/Projects.test.jsx
git commit -m "feat: agrega sección de proyectos con placeholder de imagen"
```

---

### Task 9: Contact section

**Files:**
- Create: `src/components/Contact.jsx`
- Test: `src/components/Contact.test.jsx`

**Interfaces:**
- Consumes: `contact` from `src/data/contact.js` (Task 2).
- Produces: `Contact` default export, section with `id="contacto"`, rendered by `App` in Task 10.

- [ ] **Step 1: Write the failing test `src/components/Contact.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Contact from './Contact';
import { contact } from '../data/contact';

describe('Contact', () => {
  it('renders inside a section with id "contacto"', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('section#contacto')).not.toBeNull();
  });

  it('renders links to email, LinkedIn and GitHub from the contact data', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute(
      'href',
      `mailto:${contact.email}`,
    );
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', contact.linkedin);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', contact.github);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Contact.test.jsx`
Expected: FAIL — `Failed to resolve import "./Contact"`.

- [ ] **Step 3: Write `src/components/Contact.jsx`**

```jsx
import { contact } from '../data/contact';

export default function Contact() {
  return (
    <section
      id="contacto"
      className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center"
    >
      <h2 className="font-mono text-sm uppercase tracking-widest text-emerald-400">Contacto</h2>
      <p className="max-w-md text-neutral-400">
        ¿Quieres hablar sobre una oportunidad o un proyecto? Escríbeme.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href={`mailto:${contact.email}`}
          className="rounded-md bg-emerald-500 px-6 py-3 font-medium text-black transition hover:bg-emerald-400"
        >
          Email
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-emerald-500 px-6 py-3 font-medium text-emerald-400 transition hover:bg-emerald-500/10"
        >
          LinkedIn
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-emerald-500 px-6 py-3 font-medium text-emerald-400 transition hover:bg-emerald-500/10"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/Contact.test.jsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact.jsx src/components/Contact.test.jsx
git commit -m "feat: agrega sección de contacto"
```

---

### Task 10: Assemble App with all sections

**Files:**
- Modify: `src/App.jsx` (replace the Task 1 placeholder)
- Modify: `src/App.test.jsx` (replace the Task 1 smoke test)

**Interfaces:**
- Consumes: `Navbar` (Task 3), `Hero` (Task 4), `About` (Task 5), `Skills` (Task 6), `Achievements` (Task 7), `Projects`+`ProjectCard` (Task 8), `Contact` (Task 9).
- Produces: final `App` default export rendered by `main.jsx` (Task 1) — no further consumers.

- [ ] **Step 1: Write the failing test — replace `src/App.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders all six sections in order', () => {
    const { container } = render(<App />);
    const sectionIds = Array.from(container.querySelectorAll('section')).map((el) => el.id);
    expect(sectionIds).toEqual(['inicio', 'sobre-mi', 'skills', 'proyectos', 'logros', 'contacto']);
  });

  it('renders the navbar', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: 'CG' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/App.test.jsx`
Expected: FAIL — actual section order is empty (placeholder `App` has no sections).

- [ ] **Step 3: Replace `src/App.jsx`**

```jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-neutral-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/App.test.jsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: every test file passes.

- [ ] **Step 6: Manually verify in the browser**

Run: `npm run dev`
Open the printed local URL and confirm: dark background, emerald accents, all six sections scroll in order, mobile menu works below `768px` width (resize the browser or use dev tools device toolbar).

- [ ] **Step 7: Commit**

```bash
git add src/App.jsx src/App.test.jsx
git commit -m "feat: ensambla App con todas las secciones del portafolio"
```

---

### Task 11: Netlify deploy config + production build verification

**Files:**
- Create: `netlify.toml`

**Interfaces:**
- Consumes: `npm run build` script from `package.json` (Task 1), which outputs to `dist/`.
- Produces: nothing consumed by later tasks — this is the final task in the plan.

- [ ] **Step 1: Write `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

- [ ] **Step 2: Run the full test suite one more time**

Run: `npm test`
Expected: every test file passes.

- [ ] **Step 3: Verify the production build**

Run: `npm run build`
Expected: build succeeds, `dist/index.html` and `dist/assets/*` exist.

- [ ] **Step 4: Preview the production build locally**

Run: `npm run preview`
Open the printed local URL and confirm the site looks the same as in `npm run dev`.

- [ ] **Step 5: Commit**

```bash
git add netlify.toml
git commit -m "chore: agrega configuración de despliegue para Netlify"
```

- [ ] **Step 6: Push and connect to Netlify (manual, outside this plan)**

Create a GitHub repository, push this local repo to it, then in Netlify: "Add new site" → "Import an existing project" → select the GitHub repo. Netlify will read `netlify.toml` automatically. This step requires the user's GitHub/Netlify accounts, so it is not automated here.

---

## Content still needed from the user before this looks "final"

Resolved already (incorporated into the tasks above): real skills list, real contact
info (email/LinkedIn/GitHub), and a starter bio the user said they'd refine later.

Still pending — `src/data/projects.js` keeps placeholder values marked `TODO(usuario)`
for these until the user provides them in chat:

- Real repo URL for Agroinsumos (`projects[0].repoUrl`).
- Real repo URL for the Angular shipping app (`projects[1].repoUrl`).
- Real live demo URL for Agroinsumos (`projects[0].demoUrl`).
- Real description text for the Agroinsumos project.
- `public/images/projects/agroinsumos/` — actual screenshot files (folder already scaffolded, naming convention: `01-dashboard.png`, `02-listado-productos.png`, etc.). Update the `image` path in `src/data/projects.js` to match the real filename once uploaded.
