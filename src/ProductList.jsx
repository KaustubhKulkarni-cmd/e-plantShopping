
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "./CartSlice";

const categories = [
  {
    name: "Air-Purifying Plants",
    plants: [
      { id: 1, name: "Snake Plant", description: "Easy-care upright foliage.", price: 15, image: "photo-1501004318641-b39e6451bec6" },
      { id: 2, name: "Peace Lily", description: "Elegant green leaves and white flowers.", price: 18, image: "photo-1497250681960-ef046c08a56e" },
      { id: 3, name: "Spider Plant", description: "A leafy plant for shelves and hanging pots.", price: 12, image: "photo-1459156212016-c812468e2115" },
      { id: 4, name: "Areca Palm", description: "A tropical touch for your living room.", price: 22, image: "photo-1485955900006-10f4d324d411" },
      { id: 5, name: "Boston Fern", description: "Lush fronds for a fresh indoor look.", price: 17, image: "photo-1509423350716-97f9360b4e09" },
      { id: 6, name: "Rubber Plant", description: "Broad, glossy decorative leaves.", price: 20, image: "photo-1501004318641-b39e6451bec6" }
    ]
  },
  {
    name: "Aromatic Plants",
    plants: [
      { id: 7, name: "Lavender", description: "Fragrant herb with purple flowers.", price: 14, image: "photo-1499002238440-d264edd596ec" },
      { id: 8, name: "Rosemary", description: "Aromatic herb often used in cooking.", price: 10, image: "photo-1466692476868-aef1dfb1e735" },
      { id: 9, name: "Mint", description: "Refreshing herb for kitchen gardens.", price: 8, image: "photo-1497250681960-ef046c08a56e" },
      { id: 10, name: "Basil", description: "Popular culinary herb with green leaves.", price: 9, image: "photo-1501004318641-b39e6451bec6" },
      { id: 11, name: "Lemon Balm", description: "Leafy herb with a lemon-like aroma.", price: 11, image: "photo-1459156212016-c812468e2115" },
      { id: 12, name: "Thyme", description: "Compact herb for a sunny windowsill.", price: 10, image: "photo-1466692476868-aef1dfb1e735" }
    ]
  },
  {
    name: "Medicinal and Wellness Plants",
    plants: [
      { id: 13, name: "Aloe Vera", description: "Succulent with gel-filled leaves.", price: 12, image: "photo-1509423350716-97f9360b4e09" },
      { id: 14, name: "Jade Plant", description: "Compact succulent with rounded leaves.", price: 14, image: "photo-1485955900006-10f4d324d411" },
      { id: 15, name: "Holy Basil", description: "Traditional aromatic herb also called Tulsi.", price: 10, image: "photo-1497250681960-ef046c08a56e" },
      { id: 16, name: "Echeveria", description: "Rosette-shaped ornamental succulent.", price: 11, image: "photo-1459156212016-c812468e2115" },
      { id: 17, name: "ZZ Plant", description: "Low-maintenance plant with glossy foliage.", price: 19, image: "photo-1501004318641-b39e6451bec6" },
      { id: 18, name: "Pothos", description: "Trailing plant for shelves and hanging pots.", price: 16, image: "photo-1497250681960-ef046c08a56e" }
    ]
  }
];

export function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
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
        <Link to="/cart">🛒 Cart ({cartCount})</Link>
      </div>
    </nav>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const addedToCart = {};

  cartItems.forEach((item) => {
    addedToCart[item.name] = true;
  });

  return (
    <main className="plant-page">
      <header className="page-heading">
        <h1>Our Houseplants</h1>
        <p>Explore our plants and find the perfect one for your home.</p>
      </header>

      {categories.map((category) => (
        <section
          className="product-category"
          key={category.name}
        >
          <h2>{category.name}</h2>

          <div className="product-grid">
            {category.plants.map((plant) => (
              <article className="product-card" key={plant.id}>
                <img
                  src={`https://images.unsplash.com/${plant.image}?auto=format&fit=crop&w=600&q=80`}
                  alt={plant.name}
                />

                <h3>{plant.name}</h3>
                <p>{plant.description}</p>
                <p><strong>${plant.price.toFixed(2)}</strong></p>

                <button
                  disabled={Boolean(addedToCart[plant.name])}
                  onClick={() => dispatch(addItem(plant))}
                >
                  {addedToCart[plant.name]
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
