import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import type { RootState } from "../app/store";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  if (!product) {
    return (
      <div className="text-center p-10 text-gray-500">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    const exists = items.find(p => p.id === product.id);
    if (exists) return toast.error("Item already in cart!");
    dispatch(addToCart(product));
    toast.success("Added to cart!");
  };

  return (
    <div className="max-w-5xl mx-auto p-8 grid md:grid-cols-2 gap-10">
      <img
        src={product.image}
        alt={product.title}
        className="rounded-lg shadow-md w-full h-96 object-cover"
      />
      <div>
        <h2 className="text-3xl font-bold mb-3">{product.title}</h2>
        <p className="text-gray-600 mb-4">High-quality product just for you.</p>
        <p className="text-2xl font-semibold mb-6">₹{product.price}</p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
