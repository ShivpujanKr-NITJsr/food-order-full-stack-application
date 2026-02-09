# Food Order Management System

A full-stack Order Management feature for a food delivery application. This project allows users to view menu items, add items to cart, place orders, and track order status.

This implementation follows a **senior-level scalable architecture**, includes **backend and frontend tests**, and is ready for **production deployment**.

---

### node -version should be 20.19+ better to have latest lts one

# Tech Stack

## Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- Context API
- Axios
- React Router
- Vitest (Testing)

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Socket.io (real-time support ready)
- Jest + Supertest (Testing)

## Database

- MongoDB (Local or MongoDB Atlas)

---

# Project Structure

```
food-order-management/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── socket/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── tests/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

# Prerequisites

Install the following:

- Node.js >= 20.19
- npm >= 9
- MongoDB (Local) OR MongoDB Atlas
- Git

Check versions:

```
node -v
npm -v
```

---

# Environment Setup

Create file:

```
backend/.env
```

Add:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/food-order-app
```

If using MongoDB Atlas:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/food-order-app
```

---

# Install Dependencies

## Backend

```
cd backend
npm install
```

## Frontend

```
cd frontend
npm install     if required react or reactdom error then do
npm install react react-dom
npm install -D @types/react @types/react-dom

```

---

# Running the Application (Development)

## Start Backend

```
cd backend
npm run dev
```

Expected output:

```
MongoDB Connected
Backend running on port 5000
```

Backend runs at:

```
http://localhost:5000
```

---

## Start Frontend

```
cd frontend
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

or

```
http://localhost:5174
```

---

# Seeding Menu Data (Required)

Menu must exist before using frontend.

Use Postman or curl:

POST

```
http://localhost:5000/api/v1/menu
```

Body:

```
{
  "name": "Pizza",
  "description": "Cheese Pizza",
  "price": 199,
  "image": "https://via.placeholder.com/150"
}
```

Add multiple items.

Verify:

GET

```
http://localhost:5000/api/v1/menu
```

---

# API Endpoints

## Menu

Get menu:

```
GET /api/v1/menu
```

Create menu item:

```
POST /api/v1/menu
```

---

## Orders

Create order:

```
POST /api/v1/orders
```

Get order:

```
GET /api/v1/orders/:id
```

Get all orders:

```
GET /api/v1/orders
```

---

# Running Tests

## Backend Tests

```
cd backend
npm test
```

Expected:

```
PASS tests/order.test.ts
```

Tests include:

- Order creation
- API validation
- Endpoint testing

---

## Frontend Tests

```
cd frontend
npm test
```

Tests include:

- Component rendering
- UI functionality

---

# Production Build

## Backend

```
cd backend
npm run build
npm start
```

## Frontend

```
cd frontend
npm run build
```

Preview build:

```
npm run preview
```

---

# Deployment Guide

## Backend Deployment Options

- Render
- Railway
- AWS EC2
- DigitalOcean

Steps:

```
npm install
npm run build
npm start
```

Set environment variables in hosting dashboard.

---

## Frontend Deployment Options

- Vercel (Recommended)
- Netlify
- AWS S3

Build command:

```
npm run build
```

Output folder:

```
dist
```

---

# Architecture Overview

Frontend:

```
Pages → Components → API Layer → Backend
```

Backend:

```
Routes → Controllers → Services → Models → MongoDB
```

---

# Features Implemented

- Menu display
- Cart system architecture
- Order creation
- REST API
- MongoDB storage
- Clean architecture
- Frontend and backend tests
- Production-ready configuration

---

# Testing Strategy

Backend:

- Jest
- Supertest

Frontend:

- Vitest
- React Testing Library
- if error then try to do npm install -D @testing-library/react @testing-library/jest-dom

---

# Future Enhancements

- Real-time order tracking using Socket.io
- Authentication (JWT)
- Admin dashboard
- Payment integration

---

# Author

Shivpujan Kumar

---

# License

Run backend:
cd backend
npm install
npm run dev

Run frontend:
cd frontend
npm install

# npm run dev ## for development

# npm test for testing
