import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import type { RootState } from "../app/store";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, title, price, image }: Product) {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const handleAddToCart = () => {
    const already = items.find(p => p.id === id);
    if (already) return toast.error("Item already in cart!");
    dispatch(addToCart({ id, title, price, image }));
    toast.success("Added to cart!");
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 text-left">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 mb-3">₹{price}</p>
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
          <Link
            to={`/product/${id}`}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded text-center hover:bg-gray-300 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
