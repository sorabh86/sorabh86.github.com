import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router";
import { db } from "../../db/firebase";
import Loading from "../../components/loading";

interface PostFormData {
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

const emptyPost: PostFormData = {
  title: "",
  content: "",
  category: "",
  author: "",
  date: new Date().toISOString().slice(0, 10),
  image: "",
};

export default function AddPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostFormData>(emptyPost);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const loadFormData = async () => {
      setLoading(Boolean(id));
      setError("");
      try {
        const categorySnapshot = await getDocs(collection(db, "post_categories"));
        if (active) {
          setCategories(categorySnapshot.docs
            .map((item) => item.data().title)
            .filter((value): value is string => typeof value === "string")
            .sort((left, right) => left.localeCompare(right)));
          setCategoriesLoading(false);
        }

        if (id) {
          const snapshot = await getDoc(doc(db, "posts", id));
          if (!snapshot.exists()) {
            if (active) setError("This post could not be found.");
            return;
          }
          const data = snapshot.data();
          if (active) {
            setPost({
              title: typeof data.title === "string" ? data.title : "",
              content: typeof data.content === "string" ? data.content : "",
              category: typeof data.category === "string" ? data.category : "",
              author: typeof data.author === "string" ? data.author : "",
              date: typeof data.date === "string" ? data.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
              image: typeof data.image === "string" ? data.image : "",
            });
          }
        }
      } catch (loadError) {
        if (active) setError(loadError instanceof Error ? loadError.message : "Post data could not be loaded.");
      } finally {
        if (active) {
          setCategoriesLoading(false);
          setLoading(false);
        }
      }
    };
    void loadFormData();
    return () => { active = false; };
  }, [id]);

  const updateField = (field: keyof PostFormData, value: string) => {
    setPost((current) => ({ ...current, [field]: value }));
  };

  const categoryOptions = post.category && !categories.includes(post.category)
    ? [...categories, post.category].sort((left, right) => left.localeCompare(right))
    : categories;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const postData = {
      title: post.title.trim(),
      content: post.content.trim(),
      category: post.category.trim(),
      author: post.author.trim(),
      date: post.date,
      image: post.image.trim(),
      updatedAt: serverTimestamp(),
    };

    try {
      if (id) {
        await updateDoc(doc(db, "posts", id), postData);
      } else {
        await addDoc(collection(db, "posts"), { ...postData, createdAt: serverTimestamp() });
      }
      navigate("/dashboard/posts");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Post could not be saved. Check your Firebase rules and connection.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="mx-auto max-w-3xl border border-gray-200 bg-white p-5 sm:p-7">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Posts</p>
      <h2 className="mt-2 text-2xl font-semibold text-gray-950">{id ? "Edit post" : "Add post"}</h2>
      {error && <p role="alert" className="mt-4 border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <label className="block text-sm font-medium text-gray-800">
          Title
          <input value={post.title} onChange={(event) => updateField("title", event.target.value)} maxLength={180} required className="mt-1 block w-full border border-gray-300 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-gray-800">
          Content
          <textarea value={post.content} onChange={(event) => updateField("content", event.target.value)} rows={8} required className="mt-1 block w-full border border-gray-300 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-gray-800">
          Category
          <select
            value={post.category}
            onChange={(event) => updateField("category", event.target.value)}
            required
            disabled={categoriesLoading || categoryOptions.length === 0}
            className="mt-1 block w-full border border-gray-300 bg-white px-3 py-2 disabled:bg-gray-100"
          >
            <option value="" disabled>{categoriesLoading ? "Loading categories..." : "Select a category"}</option>
            {categoryOptions.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          {!categoriesLoading && categories.length === 0 && (
            <span className="mt-1 block text-xs text-gray-600">
              No saved categories are available. <Link to="/dashboard/posts/category" className="font-medium text-blue-800 underline">Add a category</Link> first.
            </span>
          )}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-gray-800">
            Author
            <input value={post.author} onChange={(event) => updateField("author", event.target.value)} maxLength={100} required className="mt-1 block w-full border border-gray-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium text-gray-800">
            Publication date
            <input type="date" value={post.date} onChange={(event) => updateField("date", event.target.value)} required className="mt-1 block w-full border border-gray-300 px-3 py-2" />
          </label>
        </div>
        <label className="block text-sm font-medium text-gray-800">
          Image URL <span className="font-normal text-gray-500">(optional)</span>
          <input type="url" value={post.image} onChange={(event) => updateField("image", event.target.value)} placeholder="https://example.com/image.jpg" className="mt-1 block w-full border border-gray-300 px-3 py-2" />
        </label>
        <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-5">
          <button type="submit" disabled={saving} className="bg-blue-800 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">{saving ? "Saving..." : id ? "Save changes" : "Create post"}</button>
          <Link to="/dashboard/posts" className="border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-100">Cancel</Link>
        </div>
      </form>
    </section>
  );
}
