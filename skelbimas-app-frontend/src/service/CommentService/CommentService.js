import axios from 'axios';

class CommentService {
    static BASE_URL = "http://localhost:8080";

    static async getAllComments(token) {
        try {
            const response = await axios.get(`${CommentService.BASE_URL}/adminuser/comments`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async addComment(json, token) {
        try {
            const response = await axios.post(`${CommentService.BASE_URL}/adminuser/comments/add`, json, {
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

    static async likeComment(id, token) {
        try {
            const response = await axios.post(`${CommentService.BASE_URL}/adminuser/comments/like/${id}`, null, {
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

    static async unLikeComment(id, token) {
        try {
            const response = await axios.post(`${CommentService.BASE_URL}/adminuser/comments/unlike/${id}`, null, {
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

    static async dislikeComment(id, token) {
        try {
            const response = await axios.post(`${CommentService.BASE_URL}/adminuser/comments/dislike/${id}`, null, {
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

    static async undislikeComment(id, token) {
        try {
            const response = await axios.post(`${CommentService.BASE_URL}/adminuser/comments/undislike/${id}`, null, {
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

    static async editComment(id, json, token) {
        try {
            const response = await axios.put(`${CommentService.BASE_URL}/adminuser/comments/edit/${id}`, json, {
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

    static async deleteComment(id, token) {
        try {
            const response = await axios.delete(`${CommentService.BASE_URL}/adminuser/comments/${id}`, {
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

export default CommentService;
