
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateQuantity,
  removeItem
} from "./CartSlice";

export default function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1
        })
      );
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleContinueShopping = () => {
    navigate("/plants");
  };

  const handleCheckout = () => {
    window.alert("Coming Soon!");
  };

  return (
    <main className="cart-page">
      <header className="page-heading">
        <h1>Shopping Cart</h1>
        <p>Total Items: {totalQuantity}</p>
      </header>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some plants to get started.</p>

          <button
            className="get-started-button"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            {cartItems.map((item) => (
              <div className="card-container" key={item.id}>
                <article className="cart-item">
                  <img
                    src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=400&q=80`}
                    alt={item.name}
                  />

                  <div className="cart-item-details">
                    <h2>{item.name}</h2>

                    <p>
                      Unit Price: ${item.price.toFixed(2)}
                    </p>

                    <div className="cart-actions">
                      <button
                        onClick={() => handleDecrement(item)}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>

                      <span className="quantity">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleIncrement(item)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <p>
                      Total for this plant: $
                      {(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      className="cart-item-delete"
                      onClick={() => handleRemove(item)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <section className="cart-summary">
            <h2>Grand Total: ${totalCost.toFixed(2)}</h2>

            <div className="cart-actions">
              <button
                className="get-started-button"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>

              <button
                className="get-started-button"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
