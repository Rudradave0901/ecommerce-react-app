import { db } from "./config";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

export async function saveOrder(uid: string, orderData: any) {
  const ref = collection(db, "users", uid, "orders");
  await addDoc(ref, {
    ...orderData,
    date: serverTimestamp(),
  });
}

export async function fetchOrders(uid: string) {
  const ref = collection(db, "users", uid, "orders");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
