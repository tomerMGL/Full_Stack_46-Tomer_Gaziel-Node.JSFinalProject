const userModel = require("../Models/userModel");
const axios = require("axios");

const getAllUsers = () => {
    return userModel.find({});
}

const getUsersForSeed = () => {
    const url = "https://jsonplaceholder.typicode.com/users";
    return axios.get(url);
}

const createNewUser = async (user) => {
    await userModel.create(user);
    return "User Created";
}

const getUserByEmail = (email) => {
    return userModel.findOne({ email: email });
}



module.exports = { getAllUsers, getUsersForSeed, createNewUser, getUserByEmail }