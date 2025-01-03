# OneLink - Personal Portfolio

This project demonstrates a custom link system and routes powered by React + TypeScript. It includes admin settings, authentication, and a public view.

## Key Features
- Routing with `react-router`, separating Home, Auth, and Admin areas.
- Modular architecture with specialized layouts (`MainLayout`, `AdminLayout`).
- React Query integration for data fetching and validation.
- Ready-to-use scripts for development, build, and production.

## Backend Highlights
- Node.js + Express + TypeScript with JWT authentication and link management.
- Profile APIs, CRUD operations for links, and user search by handle.
- Security via JWT middleware, rate limiting, CORS configuration, and data validation using Zod.
- Auto-generated API documentation with Swagger.

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Other scripts (see `package.json`):
   - `npm run build`: Builds the project for production.
   - `npm run preview`: Runs the local server with the production build.
   - `npm run dev:share`: Serves the application accessible on your local network.

## Route Structure
- "/" (MainLayout) → `Home`
- "/auth" (MainLayout) → `Login`, `Register`
- "/admin" (AdminLayout) → `Links`, `Profile`
- "/:handle" (MainLayout) → `Handle`
- "/404" → `NotFound`

## Technologies
- **React + TypeScript** - Main frontend stack.
- **React Query** - Data fetching and caching.
- **React Router** - Routing and navigation.
- **React Hook Form** - Form validation and submission.
- **zod** - Data validation for forms and API responses.
- **Tailwind CSS** - Utility-first CSS framework.
- **Shadcn** - CSS-in-JS library for styling.
- **Axios** - HTTP client for API requests.
- **Storybook** - Component development and documentation.
- **dnd-kit** - Drag and drop interactions.
- **vite** - Next-generation frontend tooling.