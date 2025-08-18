# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm start` or `expo start` - Start the Expo development server
- `npm run android` or `expo run:android` - Run on Android emulator/device
- `npm run ios` or `expo run:ios` - Run on iOS simulator/device
- `npm run web` or `expo start --web` - Run on web browser

### Code Quality
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Automatically fix ESLint issues
- `npm run format` - Format code using Prettier

### Testing
- `npm test` - Run Jest tests with watch mode

### Other
- `npm run reset-project` - Remove example code and reset to clean state

## Project Architecture

### Navigation Structure
This is an Expo Router-based React Native app with a nested navigation structure:

1. **Root Layout** (`app/_layout.tsx`) - Provides Redux store, theme, and Firebase auth setup
2. **Auth Group** (`app/(auth)/`) - Authentication screens (sign-in, sign-up, forgot-password)
3. **Drawer Layout** (`app/(drawer)/_layout.tsx`) - Main app with drawer navigation (requires authentication)
4. **Tab Layout** (`app/(drawer)/(tabs)/_layout.tsx`) - Bottom tabs within drawer
   - `index.tsx` - Calendar/Blocks screen
   - `pomodoro.tsx` - Pomodoro timer
   - `settings.tsx` - App settings

### State Management
- **Redux Toolkit** with Redux Persist for state management
- **Auth Slice** (`store/slices/authSlice.ts`) - User authentication state
- **Calendar Slice** (`store/slices/calendarSlice.ts`) - Calendar and events state
- **Firebase Auth** integration with automatic state synchronization

### Key Dependencies and Architecture Patterns
- **Expo Router** for file-based navigation
- **React Native Paper** for Material Design components
- **@rneui/themed** for additional UI components
- **React Hook Form** for form management
- **Firebase** for authentication and crash reporting
- **@howljs/calendar-kit** for calendar functionality
- **@gorhom/bottom-sheet** for modal interfaces

### Import Alias Configuration
The project uses `@*` path aliases configured in `tsconfig.json`:
- `@components/*` → `./components/*`
- `@store/*` → `./store/*`
- `@hooks/*` → `./hooks/*`
- `@theme/*` → `./theme/*`
- etc.

### Styling and Theming
- Material Design with React Native Paper
- Custom theme configuration in `theme/index.ts`
- Automatic dark/light mode support
- Uses `@rneui/themed` ThemeProvider

### Code Quality Configuration
- **ESLint** with universe/native preset and TypeScript rules
- **TypeScript** with strict mode enabled
- **Prettier** for code formatting
- Custom ESLint rules for React hooks and TypeScript best practices

### Testing Setup
- **Jest** with expo preset
- Test files should be placed in `__tests__` directories or use `.test.tsx` suffix

### Platform-Specific Notes
- iOS requires Xcode and uses CocoaPods
- Android requires Android Studio with min SDK 21
- Web support available via Expo
- Firebase configuration files required (`google-services.json`, `GoogleService-Info.plist`)