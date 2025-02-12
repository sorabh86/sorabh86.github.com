import { useState } from "react";
import { Link, Outlet } from "react-router";

export default function PostsPage() {
  // Mock data for posts
  const [posts, setPosts] = useState([
    { id: 1, title: "React Hooks Guide", author: "John Doe", date: "2025-02-11" },
    { id: 2, title: "Tailwind CSS Tips", author: "Jane Smith", date: "2025-02-10" },
    { id: 3, title: "State Management in React", author: "Mike Johnson", date: "2025-02-09" },
  ]);

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <Outlet />
      <div className="flex bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="border-b">
                <td className="p-3">{post.title}</td>
                <td className="p-3">{post.author}</td>
                <td className="p-3">{post.date}</td>
                <td className="p-3">
                  <Link to={`/dashboard/posts/edit:${post.id}`} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2">Edit</Link>
                  <button onClick={() => handleDelete(post.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
