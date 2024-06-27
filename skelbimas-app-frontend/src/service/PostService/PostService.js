import axios from 'axios';

class PostService{
    static BASE_URL = "http://localhost:8080";

    static async getAllPosts() {
        try {
            const response = await axios.get(`${PostService.BASE_URL}/public/posts`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getPostById(id) {
        try {
            const response = await axios.get(`${PostService.BASE_URL}/public/search/id/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async addPost(json, token) {
        try {
            const response = await axios.post(`${PostService.BASE_URL}/admin/post/add`, json, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    
    static async editPostById(id, json, token) {
        try {
            const response = await axios.put(`${PostService.BASE_URL}/admin/post/${id}`, json, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    
    static async deletePostById(id, token) {
        try {
            const response = await axios.delete(`${PostService.BASE_URL}/admin/post/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    

}

export default PostService;