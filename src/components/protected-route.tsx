import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/context/auth-context'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      navigate({ to: '/sign-in' })
    } else if (!requireAuth && isAuthenticated) {
      navigate({ to: '/' })
    }
  }, [isAuthenticated, requireAuth, navigate])

  // Don't render anything while redirecting
  if ((requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)) {
    return null
  }

  return <>{children}</>
} 