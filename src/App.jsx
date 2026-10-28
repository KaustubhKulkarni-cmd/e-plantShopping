
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";
import "./App.css";

function Navbar() {
  const cart = useSelector((state) => state.cart.items);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <strong>Paradise Nursery</strong>
      <div>
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">Cart ({count})</Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <main className="landing">
      <h1>Paradise Nursery</h1>
      <p>Bring nature home with beautiful houseplants.</p>
      <Link to="/plants">
        <button>Get Started</button>
      </Link>
      <AboutUs />
    </main>
  );
}

function AppContent() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

