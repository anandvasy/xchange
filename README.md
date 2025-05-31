# Xchange - College Community Platform

## Overview
Xchange is a modern, mobile-first platform designed to connect college students within their academic communities. Built with React Native and TypeScript, it provides a seamless experience for students to engage with their peers, join communities, and share resources.

## Project Architecture

### Tech Stack
- **Frontend (Mobile)**
  - React Native with Expo
  - TypeScript
  - React Navigation 6
  - Expo Secure Store
  - Context API for state management
  - Axios for API communication

- **Backend (Planned)**
  - Node.js with Express
  - MongoDB
  - JWT Authentication
  - WebSocket for real-time features

### Project Structure
```
xchange/
├── apps/
│   ├── mobile/              # React Native mobile app
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── contexts/    # React Context providers
│   │   │   ├── navigation/  # Navigation configuration
│   │   │   ├── screens/     # Screen components
│   │   │   ├── services/    # API and business logic
│   │   │   └── types/       # TypeScript definitions
│   │   └── App.tsx         # Root component
│   └── backend/            # Express.js backend (planned)
└── packages/
    └── shared-types/       # Shared TypeScript definitions
```

### Key Features
1. **Authentication**
   - Secure JWT-based authentication
   - College email verification
   - Persistent session management

2. **Community Management**
   - Join/leave communities
   - Create and moderate discussions
   - Share resources and events

3. **User Profiles**
   - Customizable profiles
   - Activity tracking
   - Privacy settings

4. **Content Sharing**
   - Post creation and management
   - Media sharing
   - Interactive comments

## Getting Started

### Prerequisites
- Node.js 18+
- Yarn package manager
- iOS Simulator or Android Emulator
- Expo Go app for physical device testing

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/xchange.git
   cd xchange
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the mobile app:
   ```bash
   cd apps/mobile
   yarn start
   ```

4. Run on your preferred platform:
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator
   - Scan QR code with Expo Go app for physical device

### Environment Setup
Create a `.env` file in the mobile app directory:
```env
API_URL=your_api_url
```

## Development Workflow

### Code Organization
- **Components**: Reusable UI elements
- **Screens**: Full-page components
- **Navigation**: Route definitions and navigation logic
- **Contexts**: Global state management
- **Services**: API integration and business logic
- **Types**: TypeScript type definitions

### Testing Strategy
- **Unit Tests**: Jest and React Native Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: Detox for end-to-end testing
- **Manual Testing**: Device compatibility testing

### Best Practices
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Git flow for version control
- Conventional commits for clear history
- Component-driven development
- Mobile-first responsive design

## Deployment

### Mobile App
1. **Development**
   - Use Expo Go for rapid development
   - Live reload for instant feedback

2. **Production**
   - Build standalone apps using EAS Build
   - Submit to App Store and Play Store

### Backend (Planned)
1. **Development**
   - Local MongoDB instance
   - Nodemon for auto-reloading

2. **Production**
   - Deploy to cloud platform
   - Set up CI/CD pipeline
   - Configure monitoring

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Create a pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- React Native community
- Expo team
- React Navigation maintainers 