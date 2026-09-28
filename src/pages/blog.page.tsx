import /* React, */ { Fragment, useState } from 'react'
import { motion } from "framer-motion";
import { Link } from 'react-router';
import { getState } from '../store/sorabh-store';
import { Post, PostCategory } from '../types/default-type';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

function BlogPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const postsPerPage = 9;
	const [currentPage, setCurrentPage] = useState(1);

	const categories = getState().post_cat as PostCategory[];
	const posts = getState().posts as Post[];

	const filteredPosts = posts.filter((post: Post) =>
		selectedCategory === "All" ? true : post.category === selectedCategory
	).filter((post: Post) =>
		post.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
	const displayedPosts = filteredPosts.slice(
		(currentPage - 1) * postsPerPage,
		currentPage * postsPerPage
	);

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

					{/* <select
						className="w-full md:w-1/4 px-6 py-4 border border-gray-600bg-gray-200 appearance-none text-white p-2 focus:outline-none focus:ring-2 rounded-full"
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						{categories.map((category, index) => (
							<option key={index} value={category.title}>
								{category.title}
							</option>
						))}
					</select> */}
					<Menu as="div" className="relative w-full md:w-1/4">
						<MenuButton className="w-full px-6 py-4 border border-gray-600 text-white rounded-full flex justify-between items-center focus:outline-none focus:ring-2">
							{selectedCategory || 'Select a category'}
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</MenuButton>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<MenuItems className="absolute w-full p-2 bg-so-gray rounded-lg shadow-2xl ">
								{categories.map((category, index) => (
									<MenuItem key={index}>
										<div className="cursor-pointer py-2 px-8 rounded-2xl hover:bg-so-blue transition-colors duration-500"
											onClick={() => setSelectedCategory(category.title)}
										>
											{category.title}
										</div>
									</MenuItem>
								))}
							</MenuItems>
						</Transition>
					</Menu>
				</div>

				<div className="container mx-auto px-4">

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
