
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

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalCost = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <header className="page-heading">
        <h1>Shopping Cart</h1>
        <p>{totalItems} plant(s) in your cart</p>
      </header>

      {items.length === 0 ? (
        <section className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Discover plants and bring some greenery home.</p>
          <Link to="/plants">
            <button>Continue Shopping</button>
          </Link>
        </section>
      ) : (
        <>
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img
                src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=400&q=80`}
                alt={item.name}
              />

              <div className="cart-item-details">
                <h2>{item.name}</h2>

                <p>
                  Unit price: ${item.price.toFixed(2)}
                </p>

                <p>
                  Quantity: {item.quantity}
                </p>

                <p>
                  Item total: $
                  {(item.price * item.quantity).toFixed(2)}
                </p>

                <div className="cart-actions">
                  <button
                    aria-label={`Decrease ${item.name} quantity`}
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                  >
                    −
                  </button>

                  <span className="quantity">
                    {item.quantity}
                  </span>

                  <button
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                  >
                    +
                  </button>

                  <button
                    className="delete-button"
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

          <section className="cart-summary">
            <h2>
              Total Cost: ${totalCost.toFixed(2)}
            </h2>

            <div className="cart-actions">
              <Link to="/plants">
                <button>Continue Shopping</button>
              </Link>

              <button
                onClick={() => window.alert("Coming Soon!")}
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
