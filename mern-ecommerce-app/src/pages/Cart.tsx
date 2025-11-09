import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { removeFromCart, clearCart, increaseQty, decreaseQty } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between sm:items-center border-b pb0-3 flex-col sm:flex-row">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded" />
                  <p>{item.title}</p>
                </div>
                <div className="flex items-center gap-6 my-3 sm:my-0">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(decreaseQty(item.id))}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button
                      onClick={() => dispatch(increaseQty(item.id))}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <span>₹{item.price * (item.quantity || 1)}</span>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-6 text-lg font-semibold">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
            <Link to={'/checkout'} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
