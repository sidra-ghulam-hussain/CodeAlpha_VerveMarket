# Verve Market

**Boutique goods, plainly priced.** A full-stack e-commerce store built for CodeAlpha's Full Stack Development internship (Task 1).

Verve Market is a small, honestly-priced boutique shop with real cart logic, stock-aware checkout, and order tracking — not just a static product list.

## Features

- 🛍 Product catalog with search, category filters, and sorting
- 🧾 Product detail pages with live stock counts
- 🛒 Persistent shopping cart (survives page refresh)
- 🔐 User registration & login (JWT-based auth, hashed passwords)
- 📦 Real order processing — stock is decremented, a tracking code is generated, order history is saved per user
- 🎟 A signature "price tag" UI motif used throughout for a distinct, boutique feel

## Tech Stack

- **Frontend:** React 18, React Router, Axios, Vite (plain CSS design system — no UI framework)
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT + bcrypt password hashing

## Project Structure

```
verve-market/
├── backend/
│   ├── models/        # User, Product, Order (Mongoose schemas)
│   ├── routes/         # auth, products, orders
│   ├── middleware/     # JWT auth guard
│   ├── utils/seed.js   # sample product seeder
│   └── server.js
└── frontend/
    └── src/
        ├── pages/       # Home, ProductDetail, Cart, Login, Register, Checkout, Orders...
        ├── components/  # Navbar, ProductCard, Footer, ProtectedRoute
        ├── context/     # AuthContext, CartContext
        └── api/         # axios client
```

## Getting Started

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env      # then edit MONGO_URI / JWT_SECRET
npm run seed               # loads 8 sample products
npm run dev                 # starts API on http://localhost:5000
```

You'll need a MongoDB connection — either install MongoDB locally or use a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster and paste its connection string into `MONGO_URI`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                 # starts app on http://localhost:5173
```

Open `http://localhost:5173` — register an account, browse the catalog, add items to your cart, and check out.
