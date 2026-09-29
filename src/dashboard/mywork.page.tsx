import { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, writeBatch } from "firebase/firestore";
import { Link, Outlet, useLocation } from "react-router";
import { db } from "../db/firebase";
import { projects as localProjects } from "../constants/projects.data";
import { MyWorkItem } from "../types/default-type";
import Loading from "../components/loading";

export default function MyWorkPage() {
  const location = useLocation();
  const isEditorRoute = /\/mywork\/(add|edit\/[^/]+)\/?$/.test(location.pathname);
  const [work, setWork] = useState<MyWorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const loadWork = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const snapshot = await getDocs(collection(db, "mywork"));
      const items = snapshot.docs.map((item) => ({
        ...(item.data() as Omit<MyWorkItem, "id">),
        id: item.id,
      })).sort((left, right) => left.sortOrder - right.sortOrder || left.title.localeCompare(right.title));
      setWork(items);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Work items could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isEditorRoute) void loadWork();
  }, [isEditorRoute, loadWork]);

  const importLocalProjects = async () => {
    if (work.length || importing) return;
    if (!window.confirm(`Import ${localProjects.length} existing work items into the mywork collection?`)) return;

    setImporting(true);
    setError("");
    setStatus("");
    try {
      const batch = writeBatch(db);
      for (const project of localProjects) {
        const projectRef = doc(db, "mywork", `legacy-${project.id}`);
        batch.set(projectRef, {
          title: project.title,
          description: project.description,
          image: project.image,
          category: project.category,
          live: project.live === "#" ? "" : project.live ?? "",
          github: project.github === "#" ? "" : project.github ?? "",
          sortOrder: project.id,
        });
      }
      await batch.commit();
      setStatus(`Imported ${localProjects.length} work items.`);
      await loadWork();
    } catch (importError) {
      setError(importError instanceof Error ? importError.message : "Work items could not be imported.");
    } finally {
      setImporting(false);
    }
  };

  const deleteWork = async (item: MyWorkItem) => {
    if (!window.confirm(`Delete “${item.title}”?`)) return;
    setError("");
    setStatus("");
    try {
      await deleteDoc(doc(db, "mywork", item.id));
      setWork((current) => current.filter((workItem) => workItem.id !== item.id));
      setStatus("Work item deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Work item could not be deleted.");
    }
  };

  if (isEditorRoute) return <div className="p-4 sm:p-6"><Outlet /></div>;
  if (loading) return <Loading />;

  return (
    <section className="mx-auto max-w-6xl p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Portfolio</p>
          <h1 className="mt-1 text-2xl font-semibold text-gray-950">My work</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {!work.length && <button type="button" onClick={() => void importLocalProjects()} disabled={importing} className="border border-blue-800 px-4 py-2 text-blue-900 hover:bg-blue-50 disabled:opacity-50">{importing ? "Importing..." : `Import ${localProjects.length} existing projects`}</button>}
          <Link to="/dashboard/mywork/add" className="bg-blue-800 px-4 py-2 text-white hover:bg-blue-700">Add work</Link>
        </div>
      </div>
      {error && <p role="alert" className="mt-4 border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      {status && <p role="status" className="mt-4 border-l-4 border-green-700 bg-green-50 px-4 py-3 text-sm text-green-800">{status}</p>}
      <div className="mt-5 overflow-x-auto border border-gray-200 bg-white">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3">Title</th>
              <th scope="col" className="px-4 py-3">Category</th>
              <th scope="col" className="px-4 py-3">Order</th>
              <th scope="col" className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {work.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 font-medium text-gray-950">{item.title}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.category}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.sortOrder}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <Link to={`/dashboard/mywork/edit/${item.id}`} className="mr-4 text-sm font-medium text-blue-800 hover:underline">Edit</Link>
                  <button type="button" onClick={() => void deleteWork(item)} className="text-sm font-medium text-red-700 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {!work.length && <tr><td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-600">No work items yet. Add an item or import the existing projects.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}