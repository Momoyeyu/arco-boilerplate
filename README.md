# Arco Boilerplate

A production-grade React frontend boilerplate paired with [FastAPI Boilerplate](https://github.com/user/fastapi-boilerplate). Built with Arco Design for a clean, Notion-inspired UI.

## Tech Stack

- **React 18** + TypeScript
- **Vite** + SWC for fast builds
- **Arco Design** - UI component library
- **Zustand** - State management
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with JWT interceptor
- **react-i18next** - Internationalization (zh-CN / en-US)
- **Less** - CSS preprocessor with Arco theme customization

## Features

- Complete auth flow: login, register (email verification), forgot/reset password
- JWT token management with automatic refresh and rotation
- Dark mode (system / light / dark) with persistent preference
- i18n support (Chinese & English) with persistent preference
- Protected routes with auth guards
- User profile and settings management
- Notion-inspired minimal design

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- Backend API running at `http://localhost:8000` (see [FastAPI Boilerplate](https://github.com/user/fastapi-boilerplate))

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app runs at `http://localhost:3000` with API proxy to `http://localhost:8000`.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── api/          # Axios client, interceptors, API modules
├── components/   # Shared reusable components
├── hooks/        # Custom React hooks
├── layouts/      # Page layouts (Auth, Main, ProtectedRoute)
├── locales/      # i18n translation files
├── pages/        # Page components (auth, dashboard, settings)
├── router/       # Route configuration
├── stores/       # Zustand state stores
├── styles/       # Global styles and theme variables
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8000` | Backend API base URL |
| `VITE_APP_NAME` | `Arco Boilerplate` | Application display name |

## License

MIT
