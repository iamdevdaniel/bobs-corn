# Bob's Corn 🌽

## 1 - Getting Started

1. Node v20.18.1 required
2. Run `cd` to project root and `npm i`
3. `npm run dev` starts frontend & backend (initializes DB on first run)
4. Frontend at `localhost:3012`
5. Backend at `localhost:3013`

## 2 - Solution Architecture

This project utilizes a monorepo structure for simplified development:

### Backend
- Entry point: `1_api.js`
- Data: SQLite
- Service: Vanilla JavaScript
- API: Express.js
- Data -> Service -> API

### Frontend
- Entry point: `main.tsx`
- API: Axios
- State management: Zustand
- Presentation: React + TypeScript + Tailwind CSS + Shadcn
- API -> State -> Presentation

## 3 - Project Overview

This project is a corn marketplace where users can switch clients, view/buy corn, and track purchases. The frontend manages interactions and state, while the backend handles APIs and data storage.

SQLite with the following tables:

| Table         | Columns                     | Description                     |
|---------------|-----------------------------|---------------------------------|
| `corn_stock`  | `available_units` (INTEGER) | Tracks the available corn stock |
| `purchases`   | `client_id` (TEXT), `timestamp` (DATETIME), `quantity` (INTEGER) | Logs client purchases           |

The frontend allows switching between pre-registered clients and displays the total corn stock (`corn_stock`) and the quantity each client has purchased (`purchases`).

When a client attempts a purchase, the backend service checks if the time since their last purchase exceeds the allowed time window. If valid, the purchase is processed; otherwise, an error is returned.

## 4 - Future Improvements

### Backend
- Implement race condition handling for concurrent endpoint calls to ensure data consistency
- Add validation for user IDs in purchase transactions

### Frontend
- Fix toast notification timeout issues
- Add loading spinner for improved user feedback
- Implement individual countdown timers per user
- Refactor the App file by extracting useState and useEffect logic into custom hooks

### Both
- Standardize code styling using Biome
- Implement path aliases for improved code organization

## 5 - Demo

[Watch the demo video here](https://jam.dev/c/059ed37e-37a0-488b-b29a-21cd0de587d3).

Note: For the purpose of the demo, the allowed time window between purchases was reduced to 10 seconds.
