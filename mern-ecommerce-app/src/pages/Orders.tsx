import { useEffect, useState } from "react";
import { fetchOrders } from "../firebase/orderService";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import toast from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    async function loadOrders() {
      if (!user.uid) return;
      try {
        const data = await fetchOrders(user.uid);
        setOrders(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch orders");
      }
    }
    loadOrders();
  }, [user.uid]);

  if (!user.uid) {
    return (
      <div className="text-center p-20">
        <p className="text-gray-600">
          Please <a href="/login" className="text-blue-600 underline">login</a> to view your orders.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <p className="text-lg font-semibold">Order #{order.id.slice(0, 6)}</p>
                <p className="text-gray-500 text-sm">
                  {order.date?.seconds
                    ? new Date(order.date.seconds * 1000).toLocaleString()
                    : "Pending"}
                </p>
              </div>
              <ul className="space-y-2">
                {order.items.map((item: any) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.title}</span>
                    <span>₹{item.price * (item.quantity || 1)}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right mt-4 font-semibold">
                Total: ₹{order.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
