import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategorieeService from '../service/CategorieService/CategorieService';
import PostService from '../service/PostService/PostService';
function AdminDashboard() {
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(""); // State to hold the token

    useEffect(() => {
        // Example: Load token from localStorage or context
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
        
        fetchCategories();
        fetchPosts();
    }, []);

    const fetchCategories = async () => {
        try {
            const categoriesData = await CategorieeService.getAllCategories();
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchPosts = async () => {
        try {
            const postsData = await PostService.getAllPosts();
            setPosts(postsData);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await CategorieeService.deleteCategoryById(id);
            setCategories(categories.filter(category => category.id !== id));
            console.log('Category deleted successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await PostService.deletePostById(id, token); // Pass token to deletePostById
            setPosts(posts.filter(post => post.id !== id));
            console.log('Post deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="font-poppins min-h-screen">
            <div className="max-w-7xl mx-auto mt-8">

                {/* Categories Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Categories</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Add Category Link */}
                        <Link to="/add-category"  className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col items-center justify-center transition duration-300 hover:shadow-lg">
                            <h1  className="text-blue-500 hover:text-blue-700 font-semibold text-xl mb-2">
                                Add Category
                            </h1>
                            <span className="text-5xl text-blue-500">+</span>
                        </Link>

                        {/* Category List */}
                        {categories.map(category => (
                            <div key={category.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Name: {category.id}</h2>
                                    <p className="text-sm text-gray-600 mb-4">Description: {category.tag}</p>

                                    <div className="flex justify-center gap-4">
                                        <Link
                                            to={`/edit-category/${category.id}`}
                                            className="text-blue-500 hover:text-blue-700 bg-blue-100 py-2 px-4 rounded-md text-center block w-full transition duration-300"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteCategory(category.id)}
                                            className="text-red-500 hover:text-red-700 bg-red-100 py-2 px-4 rounded-md text-center block w-full transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Posts Section */}
                <div>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Posts</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Add Post Link */}
                        <Link to="/add-post" className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col items-center justify-center transition duration-300 hover:shadow-lg">
                            <h1 to="/add-post" className="text-blue-500 hover:text-blue-700 font-semibold text-xl mb-2">
                                Add Post
                            </h1>
                            <span className="text-5xl text-blue-500">+</span>
                        </Link>

                        {/* Post List */}
                        {posts.map(post => (
                            <div key={post.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                                <div className="p-4">
                                    <img src={post.photo} alt={post.name} className="w-full h-40 object-cover mb-4" />
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Name: {post.name}</h2>
                                    <p className="text-sm text-gray-600 mb-4">Description: {post.description}</p>
                                    <p className="text-sm text-gray-600 mb-4">Category: {post.category}</p>
                                    <p className="text-sm text-gray-600 mb-4">City: {post.city}</p>
                                    <p className="text-sm text-gray-600 mb-4">Price: ${post.price}</p>

                                    <div className="flex justify-center gap-4">
                                        <Link
                                            to={`/edit-post/${post.id}`}
                                            className="text-blue-500 hover:text-blue-700 bg-blue-100 py-2 px-4 rounded-md text-center block w-full transition duration-300"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeletePost(post.id)}
                                            className="text-red-500 hover:text-red-700 bg-red-100 py-2 px-4 rounded-md text-center block w-full transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;
