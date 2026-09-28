import { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, serverTimestamp, writeBatch } from "firebase/firestore";
import { Link, Outlet, useLocation } from "react-router";
import { db } from "../db/firebase";
import { postsBackup } from "../constants/posts.backup";
import Loading from "../components/loading";

interface PostRecord {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  isBackup: boolean;
}

function displayDate(value: unknown): string {
  if (typeof value === "string") return value.slice(0, 10);
  if (value && typeof value === "object" && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate().toLocaleDateString();
  }
  return "-";
}

export default function PostsPage() {
  const location = useLocation();
  const isEditorRoute = /\/posts\/(add|edit\/[^/]+)\/?$/.test(location.pathname);
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [backingUp, setBackingUp] = useState(false);
  const [error, setError] = useState("");
  const [backupMessage, setBackupMessage] = useState("");
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(posts.length / pageSize));
  const visiblePosts = posts.slice(page * pageSize, (page + 1) * pageSize);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const postRecords = snapshot.docs.map((item) => {
        const data = item.data();
        return {
          id: item.id,
          title: typeof data.title === "string" ? data.title : "Untitled post",
          author: typeof data.author === "string" ? data.author : "-",
          date: displayDate(data.date ?? data.createdAt),
          category: typeof data.category === "string" ? data.category : "-",
          isBackup: data.backupSource === "posts.data.ts",
        };
      }).sort((left, right) => right.date.localeCompare(left.date));
      setPosts(postRecords);
      setPage((current) => Math.min(current, Math.max(0, Math.ceil(postRecords.length / pageSize) - 1)));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Posts could not be loaded. Check your Firebase rules and connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isEditorRoute) void loadPosts();
  }, [isEditorRoute, loadPosts]);

  const handleDelete = async (post: PostRecord) => {
    if (!window.confirm(`Delete “${post.title}”?`)) return;
    setError("");
    try {
      await deleteDoc(doc(db, "posts", post.id));
      setPosts((current) => current.filter((item) => item.id !== post.id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Post could not be deleted.");
    }
  };

  const handleBackup = async () => {
    if (!window.confirm(`Write or refresh ${postsBackup.length} local backup posts in Firebase? Other post records will not be changed.`)) return;
    setBackingUp(true);
    setError("");
    setBackupMessage("");
    try {
      const batch = writeBatch(db);
      for (const post of postsBackup) {
        const backupRef = doc(db, "posts", `backup-${post.id}`);
        batch.set(backupRef, {
          ...post,
          backupSource: "posts.data.ts",
          backupUploadedAt: serverTimestamp(),
        });
      }
      await batch.commit();
      setBackupMessage(`Backed up ${postsBackup.length} posts to Firebase. They are marked as “Local backup” in this list.`);
      await loadPosts();
    } catch (backupError) {
      setError(backupError instanceof Error ? backupError.message : "Post backup failed. Check your Firebase connection and rules.");
    } finally {
      setBackingUp(false);
    }
  };

  if (isEditorRoute) return <div className="p-4 sm:p-6"><Outlet /></div>;
  if (loading) return <Loading />;

  return (
    <section className="mx-auto max-w-6xl p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Content</p>
          <h1 className="mt-1 text-2xl font-semibold text-gray-950">Posts</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void handleBackup()} disabled={backingUp} className="border border-blue-800 px-4 py-2 text-blue-900 hover:bg-blue-50 disabled:opacity-50">
            {backingUp ? "Backing up..." : `Back up ${postsBackup.length} local posts`}
          </button>
          <Link to="/dashboard/posts/add" className="bg-blue-800 px-4 py-2 text-white hover:bg-blue-700">Add post</Link>
        </div>
      </div>
      {error && <p role="alert" className="mt-4 border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      {backupMessage && <p role="status" className="mt-4 border-l-4 border-green-700 bg-green-50 px-4 py-3 text-sm text-green-800">{backupMessage}</p>}
      <div className="mt-5 overflow-x-auto border border-gray-200 bg-white">
        {(
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-100 text-sm text-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3">Title</th>
                <th scope="col" className="px-4 py-3">Category</th>
                <th scope="col" className="px-4 py-3">Author</th>
                <th scope="col" className="px-4 py-3">Date</th>
                <th scope="col" className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visiblePosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-3 font-medium text-gray-950">
                    {post.title}
                    {post.isBackup && <span className="ml-2 inline-block text-xs font-normal text-gray-500">Local backup</span>}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{post.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{post.author}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{post.date}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Link to={`/dashboard/posts/edit/${post.id}`} className="mr-4 text-sm font-medium text-blue-800 hover:underline">Edit</Link>
                    <button type="button" onClick={() => void handleDelete(post)} className="text-sm font-medium text-red-700 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {!visiblePosts.length && <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-600">No posts found. Add your first post to get started.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
      {!loading && posts.length > 0 && <div className="mt-4 flex items-center justify-between" aria-label="Post pagination">
        <button type="button" onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={page === 0} className="bg-blue-800 px-4 py-2 text-white disabled:opacity-40">Previous</button>
        <span className="text-sm text-gray-600">Page {page + 1} of {pageCount} · {posts.length} posts</span>
        <button type="button" onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))} disabled={page >= pageCount - 1} className="bg-blue-800 px-4 py-2 text-white disabled:opacity-40">Next</button>
      </div>}
    </section>
  );
}
