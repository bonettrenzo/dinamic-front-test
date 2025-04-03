import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: number
  nombres: string
  apellidos: string
  documento: string
  fechaNacimiento: string
  telefono: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => {
        localStorage.removeItem('auth-storage')
        return(set({ user: null, isAuthenticated: false }))
      },
    }),
    {
      name: 'auth-storage',
    }
  )
) 