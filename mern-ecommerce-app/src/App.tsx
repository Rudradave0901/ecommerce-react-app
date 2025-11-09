import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import { Toaster } from 'react-hot-toast'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import Checkout from './pages/Checkout'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { saveCartToFirestore } from './firebase/cartService'
import OrderSuccess from './pages/OrderSuccess'
import { type RootState } from './app/store'
import Orders from './pages/Orders'


function App() {

  const auth = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (auth.uid) {
      saveCartToFirestore(auth.uid, cart);
    }
  }, [auth.uid, cart]);

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
