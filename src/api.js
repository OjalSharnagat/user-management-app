import axios from 'axios';

const API_BASE_URL = 'https://randomuser.me/api/?nat=us&results=100&page=1'; // Replace with your actual API URL

export const fetchRecords = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/records`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching records.');
  }
}; 
