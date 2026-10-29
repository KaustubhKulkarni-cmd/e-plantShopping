
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./CartSlice";

const categories = [
  {
    name: "Air-Purifying Plants",
    plants: [
      {
        id: 1,
        name: "Snake Plant",
        description: "A hardy plant with upright leaves, suitable for beginners.",
        price: 15,
        image: "photo-1501004318641-b39e6451bec6"
      },
      {
        id: 2,
        name: "Peace Lily",
        description: "An elegant green plant known for its white flowers.",
        price: 18,
        image: "photo-1497250681960-ef046c08a56e"
      },
      {
        id: 3,
        name: "Spider Plant",
        description: "A leafy plant that looks beautiful in hanging pots.",
        price: 12,
        image: "photo-1459156212016-c812468e2115"
      },
      {
        id: 4,
        name: "Areca Palm",
        description: "A tropical palm that adds a fresh look to interiors.",
        price: 22,
        image: "photo-1485955900006-10f4d324d411"
      },
      {
        id: 5,
        name: "Boston Fern",
        description: "A lush fern with soft, arching green fronds.",
        price: 17,
        image: "photo-1509423350716-97f9360b4e09"
      },
      {
        id: 6,
        name: "Rubber Plant",
        description: "A decorative plant with broad, glossy leaves.",
        price: 20,
        image: "photo-1501004318641-b39e6451bec6"
      }
    ]
  },
  {
    name: "Aromatic Plants",
    plants: [
      {
        id: 7,
        name: "Lavender",
        description: "A fragrant herb with beautiful purple flowers.",
        price: 14,
        image: "photo-1499002238440-d264edd596ec"
      },
      {
        id: 8,
        name: "Rosemary",
        description: "An aromatic herb often used in cooking.",
        price: 10,
        image: "photo-1466692476868-aef1dfb1e735"
      },
      {
        id: 9,
        name: "Mint",
        description: "A refreshing herb suitable for pots and kitchens.",
        price: 8,
        image: "photo-1497250681960-ef046c08a56e"
      },
      {
        id: 10,
        name: "Basil",
        description: "A fragrant culinary herb with soft green leaves.",
        price: 9,
        image: "photo-1501004318641-b39e6451bec6"
      },
      {
        id: 11,
        name: "Lemon Balm",
        description: "A leafy herb with a fresh lemon-like aroma.",
        price: 11,
        image: "photo-1459156212016-c812468e2115"
      },
      {
        id: 12,
        name: "Thyme",
        description: "A compact aromatic herb for sunny windowsills.",
        price: 10,
        image: "photo-1466692476868-aef1dfb1e735"
      }
    ]
  },
  {
    name: "Medicinal and Wellness Plants",
    plants: [
      {
        id: 13,
        name: "Aloe Vera",
        description: "A succulent commonly grown for its gel-filled leaves.",
        price: 12,
        image: "photo-1509423350716-97f9360b4e09"
      },
      {
        id: 14,
        name: "Jade Plant",
        description: "A compact succulent with thick, rounded leaves.",
        price: 14,
        image: "photo-1485955900006-10f4d324d411"
      },
      {
        id: 15,
        name: "Holy Basil",
        description: "A traditional aromatic herb also called Tulsi.",
        price: 10,
        image: "photo-1497250681960-ef046c08a56e"
      },
      {
        id: 16,
        name: "Echeveria",
        description: "A rosette-shaped succulent with fleshy leaves.",
        price: 11,
        image: "photo-1459156212016-c812468e2115"
      },
      {
        id: 17,
        name: "ZZ Plant",
        description: "A low-maintenance plant with glossy foliage.",
        price: 19,
        image: "photo-1501004318641-b39e6451bec6"
      },
      {
        id: 18,
        name: "Pothos",
        description: "A trailing leafy plant suited to shelves and hanging pots.",
        price: 16,
        image: "photo-1497250681960-ef046c08a56e"
      }
    ]
  }
];

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const addedIds = cartItems.map((item) => item.id);

  return (
    <main className="plant-page">
      <header className="page-heading">
        <h1>Explore Our Plants</h1>
        <p>Find the perfect greenery for your home.</p>
      </header>

      {categories.map((category) => (
        <section className="plant-category" key={category.name}>
          <h2>{category.name}</h2>

          <div className="plant-grid">
            {category.plants.map((plant) => {
              const added = addedIds.includes(plant.id);

              return (
                <article className="plant-card" key={plant.id}>
                  <img
                    src={`https://images.unsplash.com/${plant.image}?auto=format&fit=crop&w=600&q=80`}
                    alt={plant.name}
                    loading="lazy"
                  />

                  <div className="plant-card-content">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="price">
                      ${plant.price.toFixed(2)}
                    </p>

                    <button
                      disabled={added}
                      onClick={() => dispatch(addToCart(plant))}
                    >
                      {added ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
