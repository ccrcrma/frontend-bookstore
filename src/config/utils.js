import AuthService from "../services/AuthService";
export const baseUrl = "https://localhost:7225/api/books";
export const loginUrl = "https://localhost:7225/api/Authentication/login";

export const AuthHeaders = {
  Authorization: `Bearer ${new AuthService().getToken()}`,
};
