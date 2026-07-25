const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const CARAPI_BASE_URL = 'https://carapi.app/api';

const carApiService = {
   cachedToken: null,

   async getBearerToken() {
        if (this.cachedToken) {
             return this.cachedToken;
        }

        try {
            const response = await axios.post(`${CARAPI_BASE_URL}/auth/login`,{
                api_token: process.env.CARAPI_API_TOKEN,
                api_secret: process.env.CARAPI_API_SECRET
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            this.cachedToken = response.data;
            return this.cachedToken;

        } catch (error) {
            console.error('Error fetching bearer token:', error.response?.data || error.message);
            throw new Error('Failed to fetch bearer token');    
        } 
    },
    // Helper method to build authorized headers
    async getAuthHeaders() {
        const token = await this.getBearerToken();
        console.log("Using token:", token ? "Loaded" : "MISSING!");
        return {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        };
    },
    
    // Example request: Fetch a paginated list of car makes
    async getMakes() {
      const headers = await this.getAuthHeaders();
      const response = await axios.get(`${CARAPI_BASE_URL}/makes`, { headers });
        return response.data;  
    }
};

module.exports = carApiService;