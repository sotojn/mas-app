import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  async login(username:any, password:any) {
    return await axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username:any, password:any) {
    return axios.post(API_URL + "signup", {
      username,
      password
    });
  }

  getCurrentUser() {
    const userItem = localStorage.getItem('user');
    const user = (typeof userItem === 'string') ? JSON.parse(userItem) : null;
    return user;
  }
}

export default new AuthService();