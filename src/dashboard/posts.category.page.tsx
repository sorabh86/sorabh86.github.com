import { FormEvent, useCallback, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../db/firebase";

interface PostCategoryRecord {
  id: string;
  title: string;
  createdAt?: { toDate: () => Date };
}

export default function PostCategoryPage() {
  const [categories, setCategories] = useState<PostCategoryRecord[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const categoryQuery = query(collection(db, "post_categories"), orderBy("title"));
      const snapshot = await getDocs(categoryQuery);
      setCategories(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as PostCategoryRecord)));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load categories. Check your Firebase rules and connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  const resetForm = () => {
    setTitle("");
    setEditingId(null);
    setError("");
    setNotice("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedTitle = title.trim();
    if (!normalizedTitle) return;
    if (categories.some((category) => category.title.toLowerCase() === normalizedTitle.toLowerCase() && category.id !== editingId)) {
      setError("A category with this name already exists.");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");
    try {
      if (editingId) {
        await updateDoc(doc(db, "post_categories", editingId), { title: normalizedTitle });
        setNotice("Category updated.");
      } else {
        await addDoc(collection(db, "post_categories"), {
          title: normalizedTitle,
          createdAt: serverTimestamp(),
        });
        setNotice("Category added.");
      }
      resetForm();
      await loadCategories();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save category. Check your Firebase rules and connection.");
    } finally {
      setSaving(false);
    }
  };

  const beginEdit = (category: PostCategoryRecord) => {
    setEditingId(category.id);
    setTitle(category.title);
    setError("");
    setNotice("");
  };

  const removeCategory = async (category: PostCategoryRecord) => {
    if (!window.confirm(`Delete the category “${category.title}”?`)) return;
    setError("");
    setNotice("");
    try {
      await deleteDoc(doc(db, "post_categories", category.id));
      setCategories((current) => current.filter((item) => item.id !== category.id));
      if (editingId === category.id) resetForm();
      setNotice("Category deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete category. Check your Firebase rules and connection.");
    }
  };

  return (
    <section className="mx-auto max-w-5xl p-4 sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Administration</p>
      <h1 className="mt-2 text-2xl font-semibold text-gray-950">Post categories</h1>
      <p className="mt-2 text-sm text-gray-600">Categories are stored in Firestore and managed by administrators.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 border-y border-gray-200 py-5 sm:flex-row sm:items-end">
        <label htmlFor="category-title" className="min-w-0 flex-1 text-sm font-medium text-gray-800">
          {editingId ? "Rename category" : "New category"}
          <input
            id="category-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={80}
            required
            placeholder="For example, Design"
            className="mt-1 block w-full border border-gray-300 bg-white px-3 py-2 text-gray-950"
          />
        </label>
        <button type="submit" disabled={saving} className="bg-blue-800 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
          {saving ? "Saving..." : editingId ? "Save changes" : "Add category"}
        </button>
        {editingId && <button type="button" onClick={resetForm} className="border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-100">Cancel</button>}
      </form>

      {error && <p role="alert" className="mt-4 border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      {notice && <p role="status" className="mt-4 border-l-4 border-green-700 bg-green-50 px-4 py-3 text-sm text-green-800">{notice}</p>}

      <div className="mt-5 overflow-x-auto border border-gray-200 bg-white">
        {loading ? <p role="status" className="p-5 text-sm text-gray-600">Loading categories...</p> : (
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-100 text-sm text-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3">Category</th>
                <th scope="col" className="px-4 py-3">Created</th>
                <th scope="col" className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-3 font-medium text-gray-950">{category.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{category.createdAt?.toDate().toLocaleDateString() ?? "-"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button type="button" onClick={() => beginEdit(category)} className="mr-4 text-sm font-medium text-blue-800 hover:underline">Edit</button>
                    <button type="button" onClick={() => void removeCategory(category)} className="text-sm font-medium text-red-700 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {!categories.length && <tr><td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-600">No categories yet. Add one above to start organizing posts.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
