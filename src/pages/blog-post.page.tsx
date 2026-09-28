import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router";
import { db } from "../db/firebase";
import Loading from "../components/loading";

interface BlogPost {
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image?: string;
}

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    let active = true;
    const loadPost = async () => {
      setLoading(true);
      setPost(null);
      setError("");
      try {
        const snapshot = await getDoc(doc(db, "posts", id));
        if (!active) return;
        if (!snapshot.exists()) {
          setError("This post could not be found.");
          return;
        }
        const data = snapshot.data();
        setPost({
          title: typeof data.title === "string" ? data.title : "Untitled post",
          content: typeof data.content === "string" ? data.content : "",
          category: typeof data.category === "string" ? data.category : "",
          author: typeof data.author === "string" ? data.author : "",
          date: typeof data.date === "string" ? data.date : "",
          image: typeof data.image === "string" ? data.image : undefined,
        });
      } catch (loadError) {
        if (active) setError(loadError instanceof Error ? loadError.message : "Post could not be loaded.");
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadPost();
    return () => { active = false; };
  }, [id]);

  if (loading) return <Loading />;

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-4xl px-4 py-12 text-white sm:py-16">
      <Link to="/blog" className="text-sm font-medium text-blue-300 hover:underline">← Back to blog</Link>
      {error && <section role="alert" className="mt-8 border-l-4 border-red-500 bg-red-950 px-4 py-4 text-red-100">{error}</section>}
      {post && (
        <article className="mt-8">
          <header className="border-b border-gray-700 pb-6">
            {post.category && <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">{post.category}</p>}
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-300">
              {post.author && <span>By {post.author}</span>}
              {post.date && <time dateTime={post.date}>{post.date}</time>}
            </div>
          </header>
          {post.image && <img src={post.image} alt="" className="mt-8 max-h-[32rem] w-full object-cover" />}
          <div className="mt-8 whitespace-pre-wrap text-base leading-8 text-white">{post.content}</div>
          <footer className="mt-10 border-t border-gray-700 pt-5">
            <Link to="/blog" className="font-medium text-blue-300 hover:underline">Browse more posts</Link>
          </footer>
        </article>
      )}
    </main>
  );
}
