import { loginUrl } from "../config/utils";
class AuthService {
  constructor() {
    this.loginUrl = loginUrl;
  }
  async login(username, password) {
    try {
      const response = await fetch(`${this.loginUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const token = data.token; // Assuming the server returns a JWT token

      // Save token in localStorage or sessionStorage
      localStorage.setItem("token", token);

      return token;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    // Remove token from localStorage or sessionStorage
    localStorage.removeItem("token");
  }

  isAuthenticated() {
    // Check if the user is authenticated (token exists)
    return !!localStorage.getItem("token");
  }
}

export default AuthService;
