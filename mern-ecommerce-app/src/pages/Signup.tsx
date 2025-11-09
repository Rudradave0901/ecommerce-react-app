// src/pages/Signup.tsx
import React, { useState, type JSX } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      // Create user in Firebase Auth
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // 1) Store user in Redux so app UI knows current user immediately
      dispatch(setUser({ uid: user.uid, email: user.email ?? "" }));

      // 2) Optional: create a user document in Firestore (profile)
      // This is useful later to store roles, name, address etc.
      try {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email ?? "",
          createdAt: new Date().toISOString(),
        });
      } catch (fireErr) {
        // Firestore write failure shouldn't block signup flow; log it
        console.error("Failed to write user doc:", fireErr);
      }

      toast.success("Account created successfully!");
      navigate("/"); // redirect to home or dashboard
    } catch (err: any) {
      console.error("Signup error:", err);
      // Friendly error messages for common Firebase errors
      const code = err?.code || "";
      if (code.includes("auth/email-already-in-use")) {
        toast.error("Email already in use. Try signing in.");
      } else if (code.includes("auth/invalid-email")) {
        toast.error("Invalid email address.");
      } else if (code.includes("auth/weak-password")) {
        toast.error("Password should be at least 6 characters.");
      } else {
        toast.error(err?.message || "Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create an account</h2>

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            minLength={6}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white font-semibold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
