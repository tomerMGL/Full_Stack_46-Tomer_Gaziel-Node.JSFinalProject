import axios from "axios";

const API_URL = "http://localhost:8000/users";

// Get all users
const getAllUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const {data: response} = await axios.get(API_URL, config);

    return response;
};


const usersService = {
    getAllUsers
};

export default usersService;