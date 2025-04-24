# Bobs Corn 🌽

## 1 - Getting Started

1. Node v20.18.1 required
2. Run `cd` to project root and `npm i`
3. `npm run dev` starts frontend & backend (initializes DB on first run)
4. Frontend at `localhost:3012`
5. Backend at `localhost:3013`

## 2 - Solution Architecture

This project utilizes a monorepo structure for simplified development:

### Backend
- Data: SQLite
- Service: Vanilla JavaScript
- API: Express.js
- Data -> Service -> API

### Frontend
- API: Axios
- State management: Zustand
- Presentation: React + TypeScript + Tailwind CSS + Shadcn
- API -> State -> Presentation

## 3 - Project Overview

This project manages a corn marketplace where users can switch between clients, view available and purchased corn, and make purchases. The frontend handles user interactions and state management, while the backend provides APIs for data storage and processing.

## 4 - Future Improvements

### Backend
- Implement race condition handling for concurrent endpoint calls to ensure data consistency
- Add validation for user IDs in purchase transactions

### Frontend
- Fix toast notification timeout issues
- Add loading spinner for improved user feedback
- Implement individual countdown timers per user

### Both
- Standardize code styling using Biome
- Implement path aliases for improved code organization