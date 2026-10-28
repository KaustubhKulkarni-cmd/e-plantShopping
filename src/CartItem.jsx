

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} from "./CartSlice";

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <h1>Shopping Cart</h1>
      <p>Total items: {itemCount}</p>

      {items.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link to="/plants">
            <button>Continue Shopping</button>
          </Link>
        </>
      ) : (
        <>
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img
                src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=300&q=80`}
                alt={item.name}
              />

              <div>
                <h3>{item.name}</h3>
                <p>Unit price: ${item.price.toFixed(2)}</p>
                <p>
                  Item total: $
                  {(item.price * item.quantity).toFixed(2)}
                </p>

                <div className="cart-actions">
                  <button
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}

          <h2>Grand Total: ${total.toFixed(2)}</h2>

          <div className="cart-actions">
            <button
              onClick={() => window.alert("Coming Soon!")}
            >
              Checkout
            </button>

            <Link to="/plants">
              <button>Continue Shopping</button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
