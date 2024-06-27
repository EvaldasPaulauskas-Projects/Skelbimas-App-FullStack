import { useState, useEffect } from 'react';
import PostService from "../service/PostService/PostService";
import { Link } from 'react-router-dom';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [searchQuery, selectedCategory, posts]);

  const fetchPosts = async () => {
    try {
      const postsData = await PostService.getAllPosts();
      setPosts(postsData);
      setFilteredPosts(postsData); // Initialize filteredPosts with all posts
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedCategory(''); // Reset selected category when typing in the search bar
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSearchQuery(''); // Reset search query when changing the category
  };

  const filterPosts = () => {
    const query = searchQuery.toLowerCase();
    const filtered = posts.filter((post) => {
      const matchesQuery = post.name.toLowerCase().includes(query); // Assuming 'name' as a field for search
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      return matchesQuery && matchesCategory;
    });
    setFilteredPosts(filtered);
  };

  // Extract unique categories from posts for the dropdown
  const uniqueCategories = [...new Set(posts.map(post => post.category))];

  return (
    <div className="font-poppins container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mt-6 mb-10">All Posts</h1>

      <div className="mb-6 flex items-center justify-center space-x-4">
        <select
          className='bg-primary text-white font-bold p-2 rounded-md'
          name="categories"
          id="categories"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option className='text-black' value="">Select a category</option>
          {uniqueCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 border-2 border-black rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPosts.map((post) => (
          <Link key={post.id} to={`/view-post/${post.id}`} className='transition ease-in-out transform hover:scale-105'>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={post.photo} alt={post.name} className="w-full h-40 object-cover object-center" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{post.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{post.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold">{post.price}</p>
                  <p className="text-sm italic">{post.city}</p>
                </div>
                <p className="text-sm">{post.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;
