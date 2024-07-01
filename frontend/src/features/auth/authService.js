import axios from "axios";

const API_URL = "http://localhost:8000/users/";

// Login user
const login = async (user) => {
  const { data: response } = await axios.post(API_URL + "login", user);

  if (response.data?.token) {
    response.data.user.token = response.data.token;
    sessionStorage.setItem("user", JSON.stringify(response.data.user));
    sessionStorage.setItem("token", JSON.stringify(response.data.token).slice(1, -1));
  }

  return response;
};

const logOut = () => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
  window.location.reload();
};

const authService = {
  login,
  logOut
};

export default authService;
