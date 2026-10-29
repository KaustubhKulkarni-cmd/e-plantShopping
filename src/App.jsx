
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";
import "./App.css";

function Navbar() {
  const items = useSelector((state) => state.cart.items);
  const location = useLocation();

  const count = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        Paradise Nursery
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">
          🛒 Cart ({count})
        </Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <>
      <main className="landing">
        <div className="landing-content">
          <h1>Paradise Nursery</h1>
          <p>
            Welcome to Paradise Nursery, your destination for
            beautiful indoor plants. Bring nature into your
            home and make every space greener.
          </p>
          <Link to="/plants">
            <button>Get Started</button>
          </Link>
        </div>
      </main>

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
        <Route path="*" element={<Home />} />
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
