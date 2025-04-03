
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface CitaModel {
    especialidad: string;
    fechaHora: string;
    estado: string;
    idMedico: string;
}

export const getCitas = async () => {
    const response = await axios.get(`${API_URL}/api/Cita`);
    return response.data;
};

export const getCita = async (id: number) => {
    const response = await axios.get(`${API_URL}/api/Cita/${id}`);
    return response.data;
};

export const createCita = async (data: CitaModel) => {
    const response = await axios.post(`${API_URL}/api/Cita`, data);
    return response.data;
};

export const updateCita = async (id: number, data: CitaModel) => {
    const response = await axios.put(`${API_URL}/api/Cita/${id}`, data);
    return response.data;
};

export const deleteCita = async (id: number) => {
    const response = await axios.delete(`${API_URL}/api/Cita/${id}`);
    return response.data;
};

export const getCitaDocumento = async (documento: string) => {
    const response = await axios.get(`${API_URL}/api/Cita/documento/${documento}`);
    return response.data;
};


/* GET
/api/Cita

POST
/api/Cita

GET
/api/Cita/{id}

GET
/api/Cita/medico/{medicoId}

GET
/api/Cita/especialidad/{especialidad} */