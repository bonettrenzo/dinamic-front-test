import { Medico } from '@/features/tasks/data/tasks'
import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
])

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
/*         public int Id { get; set; }
        public string Especialidad { get; set; }
        public DateTime FechaHora { get; set; }
        public string Estado { get; set; } = "Disponible";
        public int IdMedico { get; set; }
        public Medico Medico { get; set; }  */
export interface Cita{
  id?: number
  especialidad: string
  fechaHora: Date
  estado: string
  IdMedico: number
  medico: Medico
}
