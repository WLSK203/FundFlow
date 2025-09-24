# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Setup and Installation
```bash
# Install all workspace dependencies
npm install

# Setup environment configuration
cp server/.env.example server/.env
# Edit server/.env with your configuration

# Install client dependencies
cd client && npm install

# Install server dependencies
cd server && npm install
```

### Development
```bash
# Start both client and server in development mode
npm run dev

# Start client only (React development server on port 3000)
npm run dev:client

# Start server only (Node.js API server on port 5000)
npm run dev:server
```

### Testing
```bash
# Run client tests
cd client && npm test

# Run server tests
cd server && npm test

# Run specific test file
cd client && npm test -- --testPathPattern=App.test.tsx
```

### Building and Production
```bash
# Build client for production
npm run build

# Start production server
npm start
```

### Linting and Formatting
```bash
# Client uses ESLint via react-scripts
cd client && npm run build  # Will show linting errors

# TypeScript type checking
cd client && npx tsc --noEmit
```

## Architecture Overview

### Project Structure
This is a **monorepo workspace** with two main packages:
- **`client/`** - React TypeScript frontend application
- **`server/`** - Node.js Express API backend

### Frontend Architecture (`client/`)
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom color scheme (primary, trust, neutral palettes)
- **Routing**: React Router DOM v7
- **Data Visualization**: Recharts library for charts and D3 for complex visualizations
- **UI Components**: Headless UI and Heroicons for accessible components
- **State Management**: Built-in React state (no Redux/Zustand detected)

**Key Component Structure**:
- `components/TrustScoreDisplay.tsx` - AI trust score visualization with color-coded ratings
- `components/FundTracker.tsx` - Real-time fund movement tracking
- `components/SearchBar.tsx` - Global search with filtering
- `components/CommunityAudit.tsx` - Gamified audit submission system
- `pages/Homepage.tsx` - Main landing page

### Backend Architecture (`server/`)
- **Framework**: Express.js with security middleware (Helmet, CORS, rate limiting)
- **Database**: MongoDB with Mongoose ODM
- **AI/ML**: TensorFlow.js for trust score calculations
- **Authentication**: JWT-based authentication
- **File Uploads**: Multer for handling media uploads
- **Logging**: Morgan for request logging

**API Route Structure**:
- `/api/organizations` - NGO and organization management
- `/api/projects` - Project tracking and management  
- `/api/trust-scores` - AI-powered trust scoring system
- `/api/transactions` - Blockchain transaction tracking
- `/api/audits` - Community audit submissions
- `/api/schemes` - Government welfare scheme directory
- `/api/search` - Global search across all entities
- `/api/dashboard/stats` - Dashboard statistics

### Core Data Models (TypeScript Types)
**Primary Entities**:
- `Organization` - NGOs with trust scores, verification status, and project relationships
- `Project` - Individual projects with budget tracking, milestones, and AI monitoring
- `Transaction` - Blockchain-based fund movements with ZK-proof hashes
- `TrustScore` - AI-calculated trust ratings with factor breakdowns
- `CommunityAudit` - Gamified community verification system
- `TransparentAIAgent` - AI agents monitoring major grants with anomaly detection

### Technology Integration Points

**AI Trust Scoring System**:
- TensorFlow.js neural networks calculate real-time trust scores (1-100 scale)
- Factors: transparency, efficiency, compliance, community feedback, financial health
- Anomaly detection for suspicious transaction patterns

**Blockchain Integration**:
- All transactions stored with blockchain hashes for immutability
- Zero-Knowledge Proofs (ZKPs) for beneficiary privacy protection
- Support for testnet/mainnet blockchain networks

**Gamification & Community Features**:
- User points, badges, and leaderboard system
- Geo-tagged photo/video evidence submission
- Community voting and verification mechanisms

### Environment Configuration
The server requires extensive configuration via `.env`:
- Database (MongoDB), JWT secrets, blockchain API keys
- AI/ML backend settings (TensorFlow backend selection)
- File upload limits and paths
- Email SMTP and Redis caching
- Rate limiting parameters

### Development Notes
- **Custom Tailwind Theme**: Uses `trust` color palette for trust scores and `primary` for main UI
- **Workspace Management**: Uses npm workspaces for monorepo dependency management
- **Security Focus**: Helmet, CORS, rate limiting, and JWT authentication implemented
- **Mock Data**: Current API endpoints return mock data - database integration needed
- **TypeScript Strict**: Full TypeScript coverage with detailed type definitions

### Testing Strategy
- Client: Jest with React Testing Library setup
- Server: Jest with Supertest for API testing
- Type Safety: TypeScript compilation checks during build

### Key Dependencies
**Frontend**: React 19, TypeScript, Tailwind CSS, Recharts, D3, Axios
**Backend**: Express.js, Mongoose, TensorFlow.js, JWT, Multer, Helmet
**Development**: Concurrently for parallel dev servers, Nodemon for auto-restart

The application focuses on transparency, accountability, and trust-building in the NGO and public welfare sector through AI-powered analysis and blockchain-based fund tracking.
