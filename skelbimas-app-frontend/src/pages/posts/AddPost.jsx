import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import PostService from '../../service/PostService/PostService';
import UserService from '../../service/UserService/UserService';
import CategorieeService from '../../service/CategorieService/CategorieService';

function AddPost() {
    const [categories, setCategories] = useState([]);
    const [postData, setPostData] = useState({
        name: '',
        description: '',
        price: '',
        photo: '',
        city: '',
        category: ''
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const profileResponse = await UserService.getYourProfile(token);
            setProfileInfo(profileResponse.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    useEffect(() => {
        async function fetchCategories() {
            try {
                const categoriesData = await CategorieeService.getAllCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await PostService.addPost(postData, token);
            console.log('Post added: ', response);
            setPostData({
                name: '',
                description: '',
                price: '',
                photo: '',
                city: '',
                category: ''
            });
            navigate("/admin-dashboard");
        } catch (error) {
            console.error('Error adding post:', error);
            setError(error.response?.data || "Failed to add post");
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };
    

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Add a Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={postData.name}
                            onChange={handleChange}
                            className="bg-gray-100 border-b-2 border-gray-300 w-full py-2 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:border-blue-500 focus:bg-white transition duration-300 rounded-md"
                            placeholder="Enter name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={postData.description}
                            onChange={handleChange}
                            className="bg-gray-100 border-b-2 border-gray-300 w-full py-2 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:border-blue-500 focus:bg-white transition duration-300 rounded-md h-32 resize-none"
                            placeholder="Enter description"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={postData.price}
                            onChange={handleChange}
                            step="0.01"
                            className="bg-gray-100 border-b-2 border-gray-300 w-full py-2 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:border-blue-500 focus:bg-white transition duration-300 rounded-md"
                            placeholder="Enter price"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="photo" className="block text-gray-700">Photo URL:</label>
                        <input
                            type="text"
                            id="photo"
                            name="photo"
                            value={postData.photo}
                            onChange={handleChange}
                            className="bg-gray-100 border-b-2 border-gray-300 w-full py-2 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:border-blue-500 focus:bg-white transition duration-300 rounded-md"
                            placeholder="Enter photo URL"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="city" className="block text-gray-700">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={postData.city}
                            onChange={handleChange}
                            className="bg-gray-100 border-b-2 border-gray-300 w-full py-2 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:border-blue-500 focus:bg-white transition duration-300 rounded-md"
                            placeholder="Enter city"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700">Category:</label>
                        <select
                            id="category"
                            name="category"
                            value={postData.category}
                            onChange={handleChange}
                            className="bg-gray-100 border-b-2 border-gray-300 w-full py-2 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:border-blue-500 focus:bg-white transition duration-300 rounded-md"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.tag}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary2 text-white font-bold py-2 px-4 rounded-md focus:outline-none hover:scale-105"
                    >
                        Add Post
                    </button>
                    {error && <p className="mt-4 text-red-500 text-xs italic">{error}</p>}
                </form>
            </div>
        </div>
    );
    
}

export default AddPost;
