import { Navigate, Outlet } from '@tanstack/react-router'
import { useAuthStore } from '@/lib/store/auth-store'

interface ProtectedRouteProps {
  children?: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />
  }

  return children ? <>{children}</> : <Outlet />
} 