export interface Medico {
  id?: number;
  nombre: string; 
  especialidad: string;
}

export const medicos: Medico[] = [
  {
    id: 1,
    nombre: "Juan",
    especialidad: "Medico",
  },
  {
    id: 2,
    nombre: "Pedro",
    especialidad: "Medico",
  },
  {
    id: 3,
    nombre: "Carlos",
    especialidad: "Medico",
  },
  {
    id: 4,
    nombre: "Luis",
    especialidad: "Medico",
  },
]