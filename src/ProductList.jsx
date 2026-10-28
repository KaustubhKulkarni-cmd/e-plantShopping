

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./CartSlice";

const categories = [
  {
    name: "Air Purifying Plants",
    plants: [
      { id: 1, name: "Snake Plant", price: 15, image: "photo-1501004318641-b39e6451bec6" },
      { id: 2, name: "Peace Lily", price: 18, image: "photo-1497250681960-ef046c08a56e" },
      { id: 3, name: "Spider Plant", price: 12, image: "photo-1459156212016-c812468e2115" },
      { id: 4, name: "Areca Palm", price: 22, image: "photo-1485955900006-10f4d324d411" },
      { id: 5, name: "Boston Fern", price: 17, image: "photo-1509423350716-97f9360b4e09" },
      { id: 6, name: "Rubber Plant", price: 20, image: "photo-1509423350716-97f9360b4e09" }
    ]
  },
  {
    name: "Succulents",
    plants: [
      { id: 7, name: "Aloe Vera", price: 10, image: "photo-1509423350716-97f9360b4e09" },
      { id: 8, name: "Echeveria", price: 9, image: "photo-1459156212016-c812468e2115" },
      { id: 9, name: "Jade Plant", price: 14, image: "photo-1485955900006-10f4d324d411" },
      { id: 10, name: "Haworthia", price: 11, image: "photo-1501004318641-b39e6451bec6" },
      { id: 11, name: "String of Pearls", price: 16, image: "photo-1497250681960-ef046c08a56e" },
      { id: 12, name: "Zebra Plant", price: 13, image: "photo-1459156212016-c812468e2115" }
    ]
  },
  {
    name: "Tropical Plants",
    plants: [
      { id: 13, name: "Monstera", price: 25, image: "photo-1497250681960-ef046c08a56e" },
      { id: 14, name: "Golden Pothos", price: 16, image: "photo-1501004318641-b39e6451bec6" },
      { id: 15, name: "Philodendron", price: 19, image: "photo-1485955900006-10f4d324d411" },
      { id: 16, name: "Calathea", price: 21, image: "photo-1509423350716-97f9360b4e09" },
      { id: 17, name: "Bird of Paradise", price: 30, image: "photo-1497250681960-ef046c08a56e" },
      { id: 18, name: "ZZ Plant", price: 18, image: "photo-1459156212016-c812468e2115" }
    ]
  }
];

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const addedIds = cartItems.map((item) => item.id);

  return (
    <main className="plant-categories">
      <h1>Shop Houseplants</h1>

      {categories.map((category) => (
        <section key={category.name}>
          <h2>{category.name}</h2>

          <div className="plant-grid">
            {category.plants.map((plant) => (
              <article className="plant-card" key={plant.id}>
                <img
                  src={`https://images.unsplash.com/${plant.image}?auto=format&fit=crop&w=500&q=80`}
                  alt={plant.name}
                />
                <h3>{plant.name}</h3>
                <p>${plant.price.toFixed(2)}</p>

                <button
                  disabled={addedIds.includes(plant.id)}
                  onClick={() => dispatch(addToCart(plant))}
                >
                  {addedIds.includes(plant.id)
                    ? "Added to Cart"
                    : "Add to Cart"}
                </button>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
