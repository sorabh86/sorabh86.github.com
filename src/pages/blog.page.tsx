import { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { Link } from 'react-router';
import { Post, PostCategory } from '../types/default-type';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../db/firebase';
import Loading from '../components/loading';

function BlogPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const postsPerPage = 9;
	const [currentPage, setCurrentPage] = useState(1);
	const [posts, setPosts] = useState<Post[]>([]);
	const [categories, setCategories] = useState<PostCategory[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		const loadBlogData = async () => {
			setLoading(true);
			setError("");
			try {
				const [postSnapshot, categorySnapshot] = await Promise.all([
					getDocs(collection(db, "posts")),
					getDocs(collection(db, "post_categories")),
				]);

				const loadedPosts = postSnapshot.docs.map((item) => {
					const data = item.data();
					return {
						id: item.id,
						title: typeof data.title === "string" ? data.title : "Untitled post",
						content: typeof data.content === "string" ? data.content : "",
						category: typeof data.category === "string" ? data.category : "",
						author: typeof data.author === "string" ? data.author : "",
						date: typeof data.date === "string" ? data.date : "",
					} satisfies Post;
				}).sort((left, right) => right.date.localeCompare(left.date));

				const savedCategories = categorySnapshot.docs
					.map((item) => item.data().title)
					.filter((title): title is string => typeof title === "string" && title.trim().length > 0);
				const postCategories = loadedPosts.map((post) => post.category).filter(Boolean);
				const categoryTitles = [...new Set([...savedCategories, ...postCategories].filter((title) => title !== "All"))]
					.sort((left, right) => left.localeCompare(right));

				if (active) {
					setPosts(loadedPosts);
					setCategories([
						{ id: 0, title: "All" },
						...categoryTitles.map((title, index) => ({ id: index + 1, title })),
					]);
				}
			} catch (loadError) {
				if (active) setError(loadError instanceof Error ? loadError.message : "Blog content could not be loaded.");
			} finally {
				if (active) setLoading(false);
			}
		};
		void loadBlogData();
		return () => { active = false; };
	}, []);

	const filteredPosts = posts.filter((post: Post) =>
		selectedCategory === "All" ? true : post.category === selectedCategory
	).filter((post: Post) =>
		post.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, selectedCategory]);
	const displayedPosts = filteredPosts.slice(
		(currentPage - 1) * postsPerPage,
		currentPage * postsPerPage
	);

	if (loading) return <Loading />;

	return (
		<div className="blog-page page">

			<div className="bg-white text-gray-900 pt-12 text-center">

				<motion.h1
					className="text-4xl font-bold text-gray-900 mb-4"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					📝 Blog
				</motion.h1>
				<p className='text-gray-600 text-lg mb-8'>Insights & Innovations in Software Development and Engineering</p>


			</div>

			<div className="bg-dark text-secondary py-12">
				<div className="container m-auto flex flex-wrap justify-between items-center mb-6 px-4 gap-4" >
					<input
						type="text"
						placeholder="Search blogs..."
						className="w-full md:w-1/3 px-6 py-4 border border-gray-600 rounded-full"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>

					<label className="w-full text-sm md:w-1/4">
						<span className="sr-only">Filter by category</span>
						<select
							aria-label="Filter by category"
							className="w-full rounded-full border border-gray-600 bg-gray-900 px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={selectedCategory}
							onChange={(event) => setSelectedCategory(event.target.value)}
							disabled={loading}
						>
							{categories.map((category) => (
								<option key={category.id} value={category.title}>{category.title}</option>
							))}
						</select>
					</label>
				</div>

				<div className="container mx-auto px-4">
					{error && <p role="alert" className="mb-6 border-l-4 border-red-500 bg-red-50 px-4 py-3 text-red-800">Blog content could not be loaded. Check Firebase rules and your connection.</p>}
					{posts.length > 0 && (
						<motion.div
							className="bg-white text-black p-5 rounded-lg mb-8"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-xl font-semibold">Featured Post</h2>
							<Link to={`/blog/${posts[0].id}`} className="text-so-gray text-lg">
								{posts[0].title}
							</Link>
							<p className=" mt-2">{posts[0].content}</p>
						</motion.div>
					)}

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6 }}
					>
						{displayedPosts.length > 0 ? (
							displayedPosts.map((post) => (
								<div
									key={post.id}
									className="bg-white text-black p-4 rounded-lg shadow-lg hover:shadow-2xl transition"
								>
									<h3 className="font-bold text-lg">
										<Link to={`/blog/${post.id}`}>{post.title}</Link>
									</h3>
									<p className="text-gray-400">{post.content.split(" ").slice(0, 20).join(" ")}...</p>
									<Link
										to={`/blog/${post.id}`}
										className="text-blue-400 hover:underline"
									>
										Read More →
									</Link>
								</div>
							))
						) : (
							<p className="text-gray-400">No posts found.</p>
						)}
					</motion.div>

					{totalPages > 1 && (
						<div className="flex justify-center mt-6">
							{Array.from({ length: totalPages }, (_, index) => (
								<button
									key={index}
									className={`mx-1 px-3 py-1 border ${currentPage === index + 1
										? "bg-blue-500 text-white"
										: " text-gray-300"
										} rounded`}
									onClick={() => setCurrentPage(index + 1)}
								>
									{index + 1}
								</button>
							))}
						</div>
					)}
				</div>

			</div>

			<motion.div
				className="bg-white text-so-gray-dark py-12 text-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.7 }}
			>
				<h2 className="text-xl font-semibold mb-4"> Subscribe to Our Newsletter </h2>
				<p className="mb-4"> Stay updated with our latest blog posts! </p>
				<div className="flex flex-col md:flex-row justify-center gap-4 px-4">
					<input
						type="email"
						placeholder="Enter your email..."
						className="px-6 py-3 border border-gray-600 rounded-full w-full md:w-1/3"
					/>
					<button className="btn-blue"> Subscribe </button>
				</div>
			</motion.div>
		</div>
	)
}

export default BlogPage
