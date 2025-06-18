# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.3.3 application using the App Router architecture, built with React 19 and TypeScript. The project is a Japanese language event website ("てり杯" - Teri Cup) with modern development tooling and strict code quality standards.

## Essential Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Production build
npm start            # Start production server
```

### Code Quality (run these after making changes)
```bash
npm run type-check   # TypeScript type checking
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run lint:style   # Fix CSS styling issues
npm run prettier     # Format code with Prettier
```

### Pre-commit Checks
```bash
npm run lefthook     # Run all pre-commit hooks manually
npm run lint:secret  # Check for secrets in code
```

## Architecture & Code Patterns

### Component Structure
- Components use co-location pattern: each component has its own directory containing `index.tsx`, `style.module.css`, and `_static/` assets
- CSS Modules are used for scoped styling
- TypeScript is required with explicit return types
- Interactive components must use `"use client"` directive

### File Organization
```
src/app/_components/ComponentName/
├── index.tsx              # Component logic
├── style.module.css       # Component styles
└── _static/              # Component assets
```

### Styling Approach
- Global CSS reset using `ress` library
- CSS Modules for component-specific styles
- CSS custom properties for theming
- Responsive design with container queries
- Japanese typography optimization with M_PLUS_Rounded_1c and Yuji_Boku fonts

### TypeScript Configuration
- Strict TypeScript with ES2017 target
- Path aliases: `@/*` maps to `./src/*`
- CSS modules have type support

## Important Development Notes

### Code Quality Standards
- ESLint enforces strict rules including security, performance, and Next.js best practices
- Imports are automatically sorted using `perfectionist` plugin
- Git hooks prevent commits with lint errors, formatting issues, or secrets
- Commitlint enforces conventional commit message format

### Pre-commit Hooks
The project uses Lefthook to run these checks before every commit:
- ESLint validation
- Prettier formatting
- Stylelint for CSS
- TypeScript type checking
- Secret detection

### Special Libraries
- `clsx` for conditional className construction
- `react-rewards` for confetti/animation effects
- `react-page-border` for page border effects
- `use-show-window-size` for development window size display

Always run `npm run type-check` and `npm run lint` after making code changes to ensure compliance with project standards.