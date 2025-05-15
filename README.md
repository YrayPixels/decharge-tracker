# DE+ (Decharge Tracker) 🚗

A modern mobile application built with Expo for tracking and managing vehicle charging sessions. This app provides a seamless experience for monitoring charging status, managing locations, and handling payment transactions.

## Features

### Core Features
- Real-time vehicle monitoring and telemetry
- Points-based reward system (DE points)
- Interactive dashboard with live metrics
- Cross-platform support (iOS & Android)
- Modern UI with Tailwind CSS
- Type-safe development with TypeScript

### Detailed Features
- **Vehicle Monitoring**
  - Real-time speed monitoring with speedometer
  - Fuel level tracking with animated battery indicator
  - Engine RPM monitoring
  - Engine temperature monitoring with visual indicators
  - Live vehicle data visualization

- **Points & Rewards**
  - DE points earning system
  - Animated points display
  - Points history tracking
  - Real-time points updates
  - Points calculation based on vehicle metrics

- **Navigation & Maps**
  - Route tracking functionality
  - Interactive map integration
  - Location-based services
  - Real-time navigation updates

- **User Experience**
  - Dark/Light mode support
  - Animated UI components
  - Responsive design
  - User profile management
  - Custom navigation system

## How It Works

### 1. Dashboard & Monitoring
1. **Vehicle Telemetry**
   - Real-time speed monitoring via speedometer
   - Fuel level tracking with visual battery indicator
   - Engine RPM and temperature monitoring
   - Live data updates from vehicle sensors

2. **Points System**
   - Automatic points calculation based on vehicle metrics
   - Animated points display when earned
   - Points accumulation and tracking
   - Real-time points updates

3. **Navigation**
   - Interactive map display
   - Route tracking capabilities
   - Location-based services
   - Real-time navigation updates

### 2. User Interface
- **Dashboard Components**
  - Speedometer with real-time speed display
  - Animated battery indicator for fuel level
  - Engine metrics display (RPM, temperature)
  - Points counter with animations
  - Interactive map view

- **Navigation System**
  - Custom navigation bar
  - Multiple route options
  - Real-time location tracking
  - Route visualization

### 3. Data Management
- **Local Storage**
  - User preferences
  - Points history
  - Vehicle metrics
  - Navigation data

- **Real-time Updates**
  - Live vehicle metrics
  - Points calculations
  - Navigation updates
  - Location tracking

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Zustand
- **Maps**: React Native Maps
- **Authentication**: Para
- **Crypto**: Various blockchain integrations (Ethereum, Solana, etc.)

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd decharge-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on your preferred platform:
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

## Building for Production

### Android
```bash
# Production build
npm run build:android

# Local production build
npm run build:android-local

# Test build
npm run build:test
```

### iOS
```bash
# Production build
npm run build:ios

# Local production build
npm run build:ios-local

# Test build
npm run build:iostest-local
```

## Project Structure

```
├── app/              # Main application code
├── assets/          # Images, fonts, and other static assets
├── components/      # Reusable React components
├── utils/          # Utility functions and helpers
├── client/         # API client and services
└── ...
```

## Development

- The project uses TypeScript for type safety
- Follows ESLint configuration for code quality
- Uses Expo's file-based routing system
- Implements modern React Native patterns and best practices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For support, please contact the development team or open an issue in the repository.
