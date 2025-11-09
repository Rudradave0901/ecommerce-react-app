import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { setUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setUser(null)); // clear Redux auth state
      toast.success("Logged out successfully");
      nav("/login");
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out");
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <Link to="/" className="sm:text-2xl font-bold text-blue-600">MyStore</Link>

      <div className="flex items-center md:gap-5 gap-3">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/cart" className="hover:text-blue-600 transition">Cart</Link>
        {user.uid ? (
          <>
            <Link to="/orders" className="hover:text-blue-600 transition">Orders</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded hover:bg-blue-50 transition hidden sm:block"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
