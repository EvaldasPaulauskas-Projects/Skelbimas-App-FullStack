import React, { useEffect, useState } from 'react';
import UserService from '../service/UserService/UserService';

export default function Dashboard(){
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

    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
              <div className="text-center text-gray-600 mb-8">
                  <p className="mb-2">Welcome! Explore all posts on this site.</p>
                  <p className="mb-2">Click below to view all posts.</p>
              </div>
              <div className="flex justify-center">
                  <a href="/all-posts" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline">
                      View All Posts
                  </a>
              </div>
          </div>
      </div>
  );
  
  
  
}