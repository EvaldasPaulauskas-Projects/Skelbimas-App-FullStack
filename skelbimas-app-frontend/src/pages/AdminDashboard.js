import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import CategorieeService from '../service/CategorieService/CategorieService';
import UserService from '../service/UserService/UserService';

function AdminDashboard(){
    const [categories, setCategories] = useState([]);
    const [profileInfo, setProfileInfo] = useState({});

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
        fetchProfileInfo();
    }, []);

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

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            await CategorieeService.deleteACategory(id, token); // Pass token to deleteACategory method
            setCategories(categories.filter(category => category.id !== id));
            console.log('Category deleted successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };
    

    return (
        <div className="font-poppins min-h-screen">
            <h1 className="text-3xl font-bold text-center text-gray-800 mt-6">Add Category</h1>
    
            {/* Categories Section */}
            <div className="max-w-7xl mx-auto mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Add Category Link */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col items-center justify-center transition duration-300 hover:shadow-lg">
                    <Link to="/add-category" className="text-blue-500 hover:text-blue-700 font-semibold text-xl mb-2">
                        Add Category
                    </Link>
                    <span className="text-5xl text-blue-500">+</span>
                </div>
    
                {/* Category List */}
                {categories.map(category => (
                    <div key={category.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Tag: {category.tag}</h2>
                            <p className="text-sm text-gray-600 mb-4">ID: {category.id}</p>
    
                            <div className="flex justify-center gap-4">
                                <Link
                                    to={`/edit-category/${category.id}`}
                                    className="text-blue-500 hover:text-blue-700 bg-blue-100 py-2 px-4 rounded-md text-center block w-full transition duration-300"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(category.id)}
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
    );
    
    
}

export default AdminDashboard;