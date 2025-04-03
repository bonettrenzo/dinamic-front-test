import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface PacienteModel {
    Nombres: string;
    Apellidos: string;
    Documento: string;
    FechaNacimiento: string;
    Telefono: string;
}

export const getPacientes = async () => {
    const response = await axios.get(`${API_URL}/api/Paciente`);
    return response.data;
};

export const getPaciente = async (id: number) => {
    const response = await axios.get(`${API_URL}/api/Paciente/${id}`);
    return response.data;
};

export const createPaciente = async (data: PacienteModel) => {
    const response = await axios.post(`${API_URL}/api/Paciente`, data);
    return response.data;
};

export const updatePaciente = async (id: number, data: PacienteModel) => {
    const response = await axios.put(`${API_URL}/api/Paciente/${id}`, data);
    return response.data;
};

export const deletePaciente = async (id: number) => {
    const response = await axios.delete(`${API_URL}/api/Paciente/${id}`);
    return response.data;
};

export const getPacienteDocumento = async (documento: string) => {
    const response = await axios.get(`${API_URL}/api/Paciente/documento/${documento}`);
    return response.data;
};
