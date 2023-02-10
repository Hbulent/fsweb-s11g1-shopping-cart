import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([initialStateOku("cart")]);

  function localStorageYaz(cartParam) {
    localStorage.setItem("cart", JSON.stringify(cartParam));
  }

  function localStorageOku(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function initialStateOku(key) {
    const initialCart = localStorageOku(key);

    if (initialCart) {
      return initialCart;
    } else {
      return [];
    }
  }

  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    setCart([...cart, item]);
    localStorageYaz(cart);
  };

  const removeItem = (id) => {
    setCart([...cart.filter((c) => c.id !== id)]);
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
