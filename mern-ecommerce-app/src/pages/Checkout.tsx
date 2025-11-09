import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { saveOrder } from "../firebase/orderService";
import { clearCart } from "../features/cart/cartSlice";

export default function Checkout() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const total = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  const handleOrder = async () => {
    if (!user.uid) {
      toast.error("Please log in first");
      nav("/login");
      return;
    }
    try {
      await saveOrder(user.uid, { items: cart, total });
      dispatch(clearCart());
      toast.success("Order placed successfully!");
      nav("/order-success");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center p-10 text-gray-600">
        Your cart is empty. <a href="/" className="text-blue-600 underline">Shop now</a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>
      <div className="space-y-4 border-b pb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between border p-3 rounded-lg">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-gray-600">
                ₹{item.price} × {item.quantity || 1}
              </p>
            </div>
            <p className="font-semibold">₹{item.price * (item.quantity || 1)}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-lg font-semibold mt-6">
        <span>Total:</span>
        <span>₹{total}</span>
      </div>

      <div className="mt-10 text-right">
        <button
          onClick={handleOrder}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
