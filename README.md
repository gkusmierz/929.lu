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

This project uses Capacitor for building native mobile applications. Below are detailed instructions for setting up and running the application on iOS, Android, and web platforms.

### Web Target

To run the application in a web browser:

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173) by default.

### iOS Target

To run the application on iOS simulator or device:

#### Prerequisites
- macOS operating system
- Xcode 14 or higher installed
- iOS development tools and SDKs
- CocoaPods installed (`sudo gem install cocoapods`)

#### Setup and Run

1. Install dependencies (if not already done):
```bash
npm install
```

2. Build the web assets:
```bash
npm run build
```

3. Sync the web build with the iOS project:
```bash
npx cap sync ios
```

4. Open the iOS project in Xcode:
```bash
npx cap open ios
```

5. In Xcode:
   - Select a simulator or connected device from the device dropdown
   - Click the "Play" button to build and run the app
   - Alternatively, use `Cmd+R` to run the app

#### Live Reload for Development

For development with live reload:

```bash
# Run dev server with external network option
npm run dev -- --host

# Sync and open the iOS project with live reload
npx cap sync ios
npx cap run ios -l --external
```

### Android Target

To run the application on Android emulator or device:

#### Prerequisites
- Android Studio installed
- Android SDK installed and configured
- JDK 11 or higher installed
- Gradle 7.x or higher

#### Setup and Run

1. Install dependencies (if not already done):
```bash
npm install
```

2. Build the web assets:
```bash
npm run build
```

3. Sync the web build with the Android project:
```bash
npx cap sync android
```

4. Open the Android project in Android Studio:
```bash
npx cap open android
```

5. In Android Studio:
   - Wait for Gradle sync to complete
   - Select an emulator or connected device from the device dropdown
   - Click the "Run" button (green triangle) to build and run the app

#### Live Reload for Development

For development with live reload:

```bash
# Run dev server with external network option
npm run dev -- --host

# Sync and open the Android project with live reload
npx cap sync android
npx cap run android -l --external
```

### Common Issues and Troubleshooting

#### iOS
- If you encounter CocoaPods related errors, try:
  ```bash
  cd ios/App
  pod install --repo-update
  ```
- For signing issues, ensure your Apple Developer account is properly configured in Xcode

#### Android
- For Gradle sync issues, try:
  ```bash
  cd android
  ./gradlew clean
  ```
- Ensure your Android SDK and JDK paths are correctly set in Android Studio

### Updating Native Code

After making changes to the native configurations (in `capacitor.config.ts` or plugins):

```bash
npx cap sync
```

This will update both iOS and Android projects with the latest web code and configuration.

## Additional Information

- The application includes a player interface, playlists, and contact functionality
- Built with Ionic React v8.5.0 and React v19.0.0
- Uses Vite as the build tool and development server