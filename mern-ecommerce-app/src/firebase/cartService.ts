import { db } from "./config";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function saveCartToFirestore(uid: string, cartItems: any[]) {
  if (!uid) return;
  const ref = doc(db, "users", uid);
  await setDoc(ref, { cartItems }, { merge: true });
}

export async function loadCartFromFirestore(uid: string) {
  if (!uid) return null;
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data()?.cartItems ?? null;
}
