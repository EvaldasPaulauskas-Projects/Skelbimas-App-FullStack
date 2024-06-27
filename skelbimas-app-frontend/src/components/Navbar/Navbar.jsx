import React, { useEffect, useState } from 'react';
import UserService from "../../service/UserService/UserService";

function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();
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

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
            console.log("Logged out");
        }
    };

    if (isAuthenticated) {
        return (
            <nav className="flex justify-between items-center p-4 bg-white shadow-md">
                <a href='/dashboard' className="text-2xl font-bold text-indigo-600 uppercase">SKELBIMAS APP FRONTEND</a>
                <div className="flex items-center gap-12">
                    <a href="/all-posts" className="text-indigo-600 font-bold uppercase hover:text-indigo-800 transition duration-300">View All Posts</a>
                    {isAdmin && (
                        <a href="/admin-dashboard" className="text-indigo-600 font-bold uppercase hover:text-indigo-800 transition duration-300">Admin Dashboard</a>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-gray-700 font-bold">Welcome, {profileInfo.name || 'User'}</span>
                    <a 
                        href="/" 
                        onClick={handleLogout} 
                        className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded font-bold transition duration-300"
                    >
                        Logout
                    </a>
                </div>
            </nav>
        );
    } else {
        return null;
    }
}

export default Navbar;
