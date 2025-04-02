import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { SignUpForm } from './components/sign-up-form'

export default function SignUp() {
  return (
    <AuthLayout>
      <Card className='p-6'>
        <div className='mb-2 flex flex-col space-y-2 text-left'>
          <h1 className='text-lg font-semibold tracking-tight'>
            Crear una cuenta
          </h1>
          <p className='text-sm text-muted-foreground'>
            Ingrese sus datos para crear una cuenta. <br />
            ¿Ya tiene una cuenta?{' '}
            <Link
              to='/sign-in'
              className='underline underline-offset-4 hover:text-primary'
            >
              Iniciar Sesión
            </Link>
          </p>
        </div>
        <SignUpForm />

      </Card>
    </AuthLayout>
  )
}
