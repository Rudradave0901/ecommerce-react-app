import { loadCartFromFirestore, saveCartToFirestore } from "./firebase/cartService";
import { onAuthStateChanged } from "firebase/auth";
import { setCartItems } from "./features/cart/cartSlice";
import { auth } from "./firebase/config";
import { setUser } from "./features/auth/authSlice";
import React from 'react'
import { store } from './app/store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './styles/globle.css'

onAuthStateChanged(auth, async (user) => {
  if (user) {
    store.dispatch(setUser({ uid: user.uid, email: user.email ?? "" }));
    // load cart from firestore and merge with local cart
    const remote = await loadCartFromFirestore(user.uid);
    if (remote) {
      store.dispatch(setCartItems(remote)); // you need to add this reducer in cartSlice
      localStorage.setItem("cartItems", JSON.stringify(remote));
    } else {
      // If no remote exists, save local cart to firestore
      const local = JSON.parse(localStorage.getItem("cartItems") || "[]");
      await saveCartToFirestore(user.uid, local);
    }
  } else {
    // user signed out
    store.dispatch(setUser(null));
  }
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
