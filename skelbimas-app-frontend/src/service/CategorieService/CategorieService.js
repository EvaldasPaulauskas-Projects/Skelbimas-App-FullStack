import axios from 'axios';

class CategorieeService {
    static BASE_URL = "http://localhost:8080";
    
    static async getAllCategories() {
        try {
            const response = await axios.get(`${CategorieeService.BASE_URL}/public/api/categories`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getCategoryById(id) {
        try {
            const response = await axios.get(`${CategorieeService.BASE_URL}/public/api/categories/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async addACategory(json, token) {
        try {
            const response = await axios.post(
                `${CategorieeService.BASE_URL}/admin/api/categories/add`,
                json,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async editACategory(id, json, token) {
        try {
            const response = await axios.put(
                `${CategorieeService.BASE_URL}/admin/api/categories/${id}`,
                json,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteACategory(id, token) {
        try {
            const response = await axios.delete(
                `${CategorieeService.BASE_URL}/admin/api/categories/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default CategorieeService;