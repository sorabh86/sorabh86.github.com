import { getState } from "../../store/sorabh-store";
import { PostCategory } from "../../types/default-type";
import { Link } from "react-router";

export default function PostCategoryPage() {
  const postCategory = getState().post_cat as PostCategory[];

  const handleDelete = (id: number) => {
    console.log(id);
    
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Post Category</h1>
      <div className="flex bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Id</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {postCategory.map(post => (
              <tr key={post.id} className="border-b">
                <td className="p-3">{post.id}</td>
                <td className="p-3">{post.title}</td>
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
