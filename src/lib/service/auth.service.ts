import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

interface LoginCredentials {
  documento: string
  fechaNacimiento: string
}

export const login = async ({documento, fechaNacimiento}: LoginCredentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, {documento, fechaNacimiento});
        return response.data;
    } catch (error) {
        console.log(error);
    }
};