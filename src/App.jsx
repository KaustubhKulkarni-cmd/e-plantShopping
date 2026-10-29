
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import ProductList, { Navbar } from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";
import "./App.css";

function Home() {
  const [showProductList, setShowProductList] = useState(false);
  const navigate = useNavigate();

  function handleGetStartedClick() {
    setShowProductList(true);
    navigate("/plants");
  }

  if (showProductList) {
    return <ProductList />;
  }

  return (
    <>
      <section className="landing background-image">
        <div className="landing-content">
          <h2>Welcome to Paradise Nursery</h2>
          <p>
            Discover beautiful houseplants and bring the beauty
            of nature into your home.
          </p>
          <button onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
      </section>
      <AboutUs />
    </>
  );
}

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
