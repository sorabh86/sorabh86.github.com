import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router";
import { db } from "../../db/firebase";
import { proj_cat } from "../../constants/project-category.data";
import { MyWorkItem } from "../../types/default-type";
import Loading from "../../components/loading";

type WorkFormData = Omit<MyWorkItem, "id">;

const emptyWork: WorkFormData = {
  title: "",
  description: "",
  image: "",
  category: "",
  live: "",
  github: "",
  sortOrder: 0,
};

export default function AddWork() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [work, setWork] = useState<WorkFormData>(emptyWork);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setWork(emptyWork);
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    void getDoc(doc(db, "mywork", id)).then((snapshot) => {
      if (!active) return;
      if (!snapshot.exists()) {
        setError("This work item could not be found.");
        return;
      }
      const data = snapshot.data();
      setWork({
        title: typeof data.title === "string" ? data.title : "",
        description: typeof data.description === "string" ? data.description : "",
        image: typeof data.image === "string" ? data.image : "",
        category: typeof data.category === "string" ? data.category : "",
        live: typeof data.live === "string" ? data.live : "",
        github: typeof data.github === "string" ? data.github : "",
        sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 0,
      });
    }).catch((loadError) => {
      if (active) setError(loadError instanceof Error ? loadError.message : "Work item could not be loaded.");
    }).finally(() => {
      if (active) setLoading(false);
    });

    return () => { active = false; };
  }, [id]);

  const updateField = (field: keyof WorkFormData, value: string | number) => {
    setWork((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const workData = {
      title: work.title.trim(),
      description: work.description.trim(),
      image: work.image.trim(),
      category: work.category.trim(),
      live: work.live.trim(),
      github: work.github.trim(),
      sortOrder: work.sortOrder,
    };

    try {
      if (id) {
        await updateDoc(doc(db, "mywork", id), { ...workData, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, "mywork"), { ...workData, createdAt: serverTimestamp() });
      }
      navigate("/dashboard/mywork");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Work item could not be saved. Check your Firebase rules and connection.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="mx-auto max-w-3xl border border-gray-200 bg-white p-5 sm:p-7">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">My work</p>
      <h2 className="mt-2 text-2xl font-semibold text-gray-950">{id ? "Edit work item" : "Add work item"}</h2>
      {error && <p role="alert" className="mt-4 border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <label className="block text-sm font-medium text-gray-800">
          Title
          <input value={work.title} onChange={(event) => updateField("title", event.target.value)} maxLength={180} required className="mt-1 block w-full border border-gray-300 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-gray-800">
          Description
          <textarea value={work.description} onChange={(event) => updateField("description", event.target.value)} maxLength={3000} rows={5} className="mt-1 block w-full border border-gray-300 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-gray-800">
          Category
          <input list="work-categories" value={work.category} onChange={(event) => updateField("category", event.target.value)} maxLength={80} required className="mt-1 block w-full border border-gray-300 px-3 py-2" />
          <datalist id="work-categories">
            {proj_cat.filter((category) => category.title !== "All").map((category) => <option key={category.title} value={category.title} />)}
          </datalist>
        </label>
        <label className="block text-sm font-medium text-gray-800">
          Image path or URL
          <input value={work.image} onChange={(event) => updateField("image", event.target.value)} maxLength={2048} placeholder="/project/example.jpg" required className="mt-1 block w-full border border-gray-300 px-3 py-2" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-gray-800">
            Live project URL <span className="font-normal text-gray-500">(optional)</span>
            <input type="url" value={work.live} onChange={(event) => updateField("live", event.target.value)} maxLength={2048} className="mt-1 block w-full border border-gray-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium text-gray-800">
            GitHub URL <span className="font-normal text-gray-500">(optional)</span>
            <input type="url" value={work.github} onChange={(event) => updateField("github", event.target.value)} maxLength={2048} className="mt-1 block w-full border border-gray-300 px-3 py-2" />
          </label>
        </div>
        <label className="block text-sm font-medium text-gray-800">
          Display order
          <input type="number" value={work.sortOrder} onChange={(event) => updateField("sortOrder", Number(event.target.value))} step="1" className="mt-1 block w-full border border-gray-300 px-3 py-2" />
        </label>
        <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-5">
          <button type="submit" disabled={saving} className="bg-blue-800 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">{saving ? "Saving..." : id ? "Save changes" : "Create work item"}</button>
          <Link to="/dashboard/mywork" className="border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-100">Cancel</Link>
        </div>
      </form>
    </section>
  );
}