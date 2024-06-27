import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import UserService from '../../service/UserService/UserService';
import CategorieeService from '../../service/CategorieService/CategorieService';
import PostService from '../../service/PostService/PostService';

function EditPost() {
    const { id } = useParams();
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
        async function fetchPostAndCategories() {
            try {
                const post = await PostService.getPostById(id);
                const categoriesData = await CategorieeService.getAllCategories();
                setPostData({
                    name: post.name,
                    description: post.description,
                    price: post.price,
                    photo: post.photo,
                    city: post.city,
                    category: post.category
                });
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching post or categories:', error);
            }
        }

        fetchPostAndCategories();
    }, [id]);

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
            await PostService.editPostById(id, postData, token);
            console.log('Post edited successfully');
            navigate("/admin-dashboard"); 
        } catch (error) {
            console.error('Error editing post:', error);
            setError(error.response?.data || "Failed to edit post");
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-gray-800 p-8 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-200 mb-6">Edit Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-300">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={postData.name}
                            onChange={handleChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-300">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={postData.description}
                            onChange={handleChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-300">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={postData.price}
                            onChange={handleChange}
                            step="0.01"
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="photo" className="block text-gray-300">Photo URL:</label>
                        <input
                            type="text"
                            id="photo"
                            name="photo"
                            value={postData.photo}
                            onChange={handleChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="city" className="block text-gray-300">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={postData.city}
                            onChange={handleChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-300">Category:</label>
                        <select
                            id="category"
                            name="category"
                            value={postData.category}
                            onChange={handleChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            required
                        >
                            <option className='text-black' value="">Select a category</option>
                            {categories.map(category => (
                                <option className='text-black' key={category.id} value={category.tag}>{category.tag}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary2 text-white font-bold py-2 px-4 rounded-md focus:outline-none hover:scale-105"
                    >
                        Save Changes
                    </button>
                    {error && <p className="mt-4 text-red-500 text-xs italic">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default EditPost;
