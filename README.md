# AI Meme Generator - Frontend

Angular-based web application that provides a user interface for generating AI-powered meme captions.

## Overview

This application allows users to upload images, select a caption style (humorous or advertising), and generate contextual captions using AI. Built with Angular 20 and Angular Material, it communicates with a FastAPI backend service.

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Angular CLI 20.x

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment

The application is pre-configured to connect to the backend at `http://localhost:8000`. If your backend runs on a different port or host, update the API URL in `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```

## Running the Application

### Development server
```bash
ng serve
```

Navigate to `http://localhost:4200`. The application will automatically reload when source files change.

### Build for production
```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

## Development Workflow

### Generate new component
```bash
ng generate component components/component-name
```

### Generate new service
```bash
ng generate service services/service-name
```

### Code linting
```bash
ng lint
```

### Run tests
```bash
ng test
```

## API Integration

The frontend communicates with the backend through two main endpoints:

**Upload Image:**
```typescript
POST /api/memes/upload
Content-Type: multipart/form-data
```

**Generate Caption:**
```typescript
POST /api/memes/generate
Content-Type: application/json
Body: { image_url: string, style: string }
```
