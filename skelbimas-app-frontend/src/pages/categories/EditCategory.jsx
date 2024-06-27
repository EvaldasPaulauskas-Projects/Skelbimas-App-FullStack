import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategorieeService from '../../service/CategorieService/CategorieService';
import UserService from '../../service/UserService/UserService';

function EditCategory() {
    const { id } = useParams();
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        async function fetchCategory() {
            try {
                const categoryData = await CategorieeService.getCategoryById(id);
                setCategoryName(categoryData.tag);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        }
        fetchCategory();
    }, [id]); // Fetch category data whenever `id` changes

    useEffect(() => {
        fetchProfileInfo();

        // Add event listener for confirmation when leaving the page
        window.addEventListener("beforeunload", confirmExit);

        return () => {
            // Remove event listener when component unmounts
            window.removeEventListener("beforeunload", confirmExit);
        };
    }, []);

    const confirmExit = (event) => {
        const message = "Do you really want to leave? Your changes will be lost!";
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
    };

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const profileResponse = await UserService.getYourProfile(token);
            setProfileInfo(profileResponse.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const updatedCategory = { tag: categoryName };
            await CategorieeService.editACategory(id, updatedCategory, token);
            navigate('/admin-board');
        } catch (error) {
            console.error('Error editing category:', error);
            setError(error.response.data);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Category</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="tag" className="block text-gray-700">Category Name:</label>
                        <input
                            type="text"
                            id="tag"
                            name="tag"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="bg-gray-200 border-b-2 border-gray-400 w-full py-2 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:border-blue-500 transition duration-300"
                            placeholder="Enter category name"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600 transition duration-300"
                    >
                        Update Category
                    </button>
                    {error && <p className="mt-4 text-red-500 text-xs italic">{error.message}</p>}
                </form>
            </div>
        </div>
    );
}

export default EditCategory;
