import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="text-center p-20">
      <h2 className="text-3xl font-bold mb-4 text-green-600">✅ Order Successful!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Continue Shopping
        </Link>
        <Link to="/orders" className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300">
          View Orders
        </Link>
      </div>
    </div>
  );
}
