# 929.lu - Ionic React Application

This repository contains the codebase for the 929.lu music streaming application, built with Ionic React.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/) (for version control)

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the repository

```bash
git clone [repository-url]
cd 929.lu
```

### 2. Install dependencies

```bash
npm install
```

This will install all the necessary dependencies listed in the `package.json` file.

### 3. Start the development server

```bash
npm run dev
```

This will start the Vite development server. Once it's running, you can access the application at:
- [http://localhost:5173](http://localhost:5173) (default Vite port)

The development server includes:
- Hot module replacement (changes reflected without page reload)
- Error overlay
- Fast refresh

## Building for Production

To build the application for production:

```bash
npm run build
```

This command compiles the TypeScript code and bundles the application using Vite. The output will be in the `dist` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Testing

### E2E Testing

To run end-to-end tests using Cypress:

```bash
npm run test.e2e
```

### Unit Testing

To run unit tests with Vitest:

```bash
npm run test.unit
```

## Project Structure

- `src/` - Main source code directory
  - `components/` - Reusable UI components
  - `pages/` - Application pages/screens
  - `theme/` - Global styling and theming
- `public/` - Static assets
- `capacitor.config.ts` - Capacitor configuration for mobile builds

## Mobile Development

This project uses Capacitor for building native mobile applications. For detailed instructions on building and running the mobile versions, refer to the [Capacitor documentation](https://capacitorjs.com/docs/getting-started).

## Additional Information

- The application includes a player interface, playlists, and contact functionality
- Built with Ionic React v8.5.0 and React v19.0.0
- Uses Vite as the build tool and development server