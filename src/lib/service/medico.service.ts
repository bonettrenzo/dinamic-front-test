
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface MedicoModel {
    Nombre: string;
    Especialidad: string;
}

export const getMedicos = async () => {
    const response = await axios.get(`${API_URL}/api/Medico`);
    return response.data;
};

export const getMedico = async (id: number) => {
    const response = await axios.get(`${API_URL}/api/Medico/${id}`);
    return response.data;
};

export const createMedico = async (data: MedicoModel) => {
    const response = await axios.post(`${API_URL}/api/Medico`, data);
    return response.data;
};

export const updateMedico = async (id: number, data: MedicoModel) => {
    const response = await axios.put(`${API_URL}/api/Medico/${id}`, data);
    return response.data;
};

export const deleteMedico = async (id: number) => {
    const response = await axios.delete(`${API_URL}/api/Medico/${id}`);
    return response.data;
};

export const getMedicoEspecialidad = async (especialidad: string) => {
    const response = await axios.get(`${API_URL}/api/Medico/especialidad/${especialidad}`);
    return response.data;
};