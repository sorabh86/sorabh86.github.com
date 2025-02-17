import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";

export default function AddPost() {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleImageUpload = (event:React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];
    if(file)
      setImage(file);
  };

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    if (!title || !content || !category) {
      setError("All fields are required.");
      return;
    }
    setError("");
    
    // Handle post submission (API call or state management)
    console.log({ title, content, category, image });
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-lg mb-5">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        {id ? `Edit Post: ${id}` : "Add New Post"}
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New Post
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-lg"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Upload Image</label>
          <input type="file" onChange={handleImageUpload} className="w-full" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
}
