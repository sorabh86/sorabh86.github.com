import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../db/firebase";
import useUserStore from "../store/users-store";

interface Pledge {
  id: string;
  amount: number;
  note: string;
  createdAt?: { toDate: () => Date };
}

export default function SupportPage() {
  const currentUser = useUserStore((state) => state.currentUser);
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!currentUser?.id) return;
    let active = true;
    const loadPledges = async () => {
      try {
        const pledgeQuery = query(collection(db, "users", currentUser.id!, "pledges"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(pledgeQuery);
        if (active) setPledges(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as Pledge)));
      } catch {
        if (active) setMessage("Support records could not be loaded. Check your connection and Firestore rules.");
      }
    };
    void loadPledges();
    return () => { active = false; };
  }, [currentUser?.id]);

  async function recordPledge(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!currentUser?.id) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const amount = Number(formData.get("amount"));
    const note = String(formData.get("note") ?? "").trim();
    if (!Number.isFinite(amount) || amount <= 0) {
      setMessage("Enter a contribution amount greater than zero.");
      return;
    }
    setSaving(true);
    try {
      const pledgeRef = await addDoc(collection(db, "users", currentUser.id, "pledges"), {
        amount,
        note,
        createdAt: serverTimestamp(),
      });
      setPledges((existing) => [{ id: pledgeRef.id, amount, note }, ...existing]);
      setMessage("Your support intention was recorded. No payment was processed.");
      form.reset();
    } catch {
      setMessage("Could not record your intention. Check your connection and Firestore rules.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl py-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Community</p>
      <h2 className="mt-2 text-2xl font-semibold text-gray-950">Support this work</h2>
      <p className="mt-2 max-w-2xl text-sm text-gray-600">Record a contribution intention here. This site does not collect payment details or process donations; a payment provider can be connected when you choose one.</p>
      <form onSubmit={recordPledge} className="mt-6 space-y-4 border-y border-gray-200 py-5">
        <label className="block text-sm font-medium text-gray-800">
          Intended amount
          <input type="number" name="amount" min="1" max="100000" step="1" required className="mt-1 block w-full border border-gray-300 bg-white px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-gray-800">
          Note <span className="font-normal text-gray-500">(optional)</span>
          <textarea name="note" maxLength={400} rows={2} className="mt-1 block w-full border border-gray-300 bg-white px-3 py-2" />
        </label>
        {message && <p role="status" className="text-sm text-gray-700">{message}</p>}
        <button disabled={saving} className="bg-gray-950 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50">{saving ? "Recording..." : "Record intention"}</button>
      </form>
      <h3 className="mt-6 text-lg font-semibold text-gray-950">Your support history</h3>
      <ul className="mt-2 divide-y divide-gray-200">
        {pledges.map((pledge) => (
          <li key={pledge.id} className="flex items-start justify-between gap-4 py-3">
            <span className="font-medium">{pledge.amount.toLocaleString()}</span>
            <span className="flex-1 text-sm text-gray-600">{pledge.note || "Support intention"}</span>
            <time className="text-xs text-gray-500">{pledge.createdAt?.toDate().toLocaleDateString() ?? "Just now"}</time>
          </li>
        ))}
        {!pledges.length && <li className="py-4 text-sm text-gray-600">No support intentions recorded.</li>}
      </ul>
    </section>
  );
}
