import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../db/firebase";
import useUserStore from "../store/users-store";

interface PersonalTask {
  id: string;
  title: string;
  done: boolean;
}

export default function TasksPage() {
  const currentUser = useUserStore((state) => state.currentUser);
  const [tasks, setTasks] = useState<PersonalTask[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.id) return;
    let active = true;
    const loadTasks = async () => {
      setLoading(true);
      try {
        const taskQuery = query(collection(db, "users", currentUser.id!, "todos"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(taskQuery);
        if (active) setTasks(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as PersonalTask)));
      } catch {
        if (active) setError("Tasks could not be loaded. Check your connection and Firestore rules.");
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadTasks();
    return () => { active = false; };
  }, [currentUser?.id]);

  async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!currentUser?.id) return;
    const form = event.currentTarget;
    const title = String(new FormData(form).get("title") ?? "").trim();
    if (!title) return;
    try {
      const taskRef = await addDoc(collection(db, "users", currentUser.id, "todos"), {
        title,
        done: false,
        createdAt: serverTimestamp(),
      });
      setTasks((existing) => [{ id: taskRef.id, title, done: false }, ...existing]);
      form.reset();
      setError("");
    } catch {
      setError("Task could not be saved. Check your connection and Firestore rules.");
    }
  }

  async function toggleTask(task: PersonalTask) {
    if (!currentUser?.id) return;
    try {
      await updateDoc(doc(db, "users", currentUser.id, "todos", task.id), { done: !task.done });
      setTasks((existing) => existing.map((item) => item.id === task.id ? { ...item, done: !item.done } : item));
    } catch {
      setError("Task could not be updated.");
    }
  }

  async function removeTask(taskId: string) {
    if (!currentUser?.id) return;
    try {
      await deleteDoc(doc(db, "users", currentUser.id, "todos", taskId));
      setTasks((existing) => existing.filter((task) => task.id !== taskId));
    } catch {
      setError("Task could not be deleted.");
    }
  }

  return (
    <section className="mx-auto max-w-3xl py-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Personal workspace</p>
      <h2 className="mt-2 text-2xl font-semibold text-gray-950">Your tasks</h2>
      <form onSubmit={addTask} className="mt-6 flex gap-2 border-y border-gray-200 py-4">
        <label htmlFor="task-title" className="sr-only">New task</label>
        <input id="task-title" name="title" required maxLength={180} placeholder="Add a task" className="min-w-0 flex-1 border border-gray-300 bg-white px-3 py-2" />
        <button className="bg-blue-800 px-4 py-2 text-white hover:bg-blue-700">Add task</button>
      </form>
      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
      {loading ? <p className="py-6 text-gray-600">Loading tasks...</p> : (
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center gap-3 py-4">
              <input type="checkbox" checked={task.done} onChange={() => void toggleTask(task)} aria-label={`Mark ${task.title} ${task.done ? "incomplete" : "complete"}`} />
              <span className={`min-w-0 flex-1 ${task.done ? "text-gray-500 line-through" : "text-gray-900"}`}>{task.title}</span>
              <button type="button" onClick={() => void removeTask(task.id)} className="text-sm text-red-700 hover:underline">Delete</button>
            </li>
          ))}
          {!tasks.length && <li className="py-6 text-sm text-gray-600">Your list is clear. Add a task when something needs your attention.</li>}
        </ul>
      )}
    </section>
  );
}
