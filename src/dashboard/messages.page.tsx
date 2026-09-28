import { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../db/firebase";

interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  created?: unknown;
}

function timestampMillis(value: unknown): number {
  if (value instanceof Timestamp) return value.toMillis();
  if (typeof value === "string") return Date.parse(value) || 0;
  if (value && typeof value === "object" && "seconds" in value && typeof value.seconds === "number") {
    return value.seconds * 1000;
  }
  return 0;
}

function formatDate(value: unknown): string {
  const milliseconds = timestampMillis(value);
  return milliseconds ? new Date(milliseconds).toLocaleString() : "Date unavailable";
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(messages.length / pageSize));
  const visibleMessages = messages.slice(page * pageSize, (page + 1) * pageSize);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const snapshot = await getDocs(collection(db, "messages"));
      const records = snapshot.docs.map((item) => {
        const data = item.data();
        return {
          id: item.id,
          name: typeof data.name === "string" ? data.name : "Unknown sender",
          phone: typeof data.phone === "string" ? data.phone : "",
          email: typeof data.email === "string" ? data.email : "",
          message: typeof data.message === "string" ? data.message : "",
          created: data.created,
        };
      }).sort((left, right) => timestampMillis(right.created) - timestampMillis(left.created));
      setMessages(records);
      setPage((current) => Math.min(current, Math.max(0, Math.ceil(records.length / pageSize) - 1)));
    } catch {
      setError("Messages could not be loaded. Check your connection and Firestore rules, then try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  async function deleteMessage(message: ContactMessage) {
    if (!window.confirm(`Delete the message from ${message.name}? This cannot be undone.`)) return;
    setDeletingId(message.id);
    setError("");
    try {
      await deleteDoc(doc(db, "messages", message.id));
      const remainingCount = messages.length - 1;
      setMessages((current) => current.filter((item) => item.id !== message.id));
      setPage((currentPage) => Math.min(currentPage, Math.max(0, Math.ceil(remainingCount / pageSize) - 1)));
    } catch {
      setError("Message could not be deleted. Check your connection and admin permissions.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="mx-auto max-w-6xl p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Administration</p>
          <h1 className="mt-1 text-2xl font-semibold text-gray-950">Contact messages</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{messages.length} total</span>
          <button type="button" onClick={() => void loadMessages()} disabled={loading} className="border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-50">
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {error && <p role="alert" className="mt-4 border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      {loading && <p role="status" className="mt-5 text-sm text-gray-600">Loading messages...</p>}

      {!loading && !error && messages.length === 0 && (
        <p className="mt-5 border border-gray-200 bg-white px-5 py-8 text-center text-sm text-gray-600">No contact messages yet.</p>
      )}

      <ul className="mt-5 space-y-3">
        {visibleMessages.map((item) => (
          <li key={item.id} className="border border-gray-200 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="break-words text-base font-semibold text-gray-950">{item.name}</h2>
                <time className="mt-1 block text-xs text-gray-500">{formatDate(item.created)}</time>
              </div>
              <button type="button" onClick={() => void deleteMessage(item)} disabled={deletingId === item.id} className="shrink-0 border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50">
                {deletingId === item.id ? "Deleting..." : "Delete"}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
              {item.email && <a href={`mailto:${item.email}`} className="break-all text-blue-800 underline hover:text-blue-950">{item.email}</a>}
              {item.phone && <a href={`tel:${item.phone}`} className="text-gray-700 underline hover:text-gray-950">{item.phone}</a>}
            </div>
            <p className="mt-4 whitespace-pre-wrap break-words border-t border-gray-100 pt-4 text-sm leading-6 text-gray-800">{item.message || "No message content."}</p>
          </li>
        ))}
      </ul>

      {!loading && messages.length > 0 && <div className="mt-4 flex items-center justify-between" aria-label="Message pagination">
        <button type="button" onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={page === 0} className="border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 disabled:opacity-40">Previous</button>
        <span className="text-sm text-gray-600">Page {page + 1} of {pageCount}</span>
        <button type="button" onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))} disabled={page >= pageCount - 1} className="border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 disabled:opacity-40">Next</button>
      </div>}
    </section>
  );
}
