import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/lib/store/auth-store'
import * as authService from '@/lib/service/auth.service.ts'
import {  ToastContainer } from 'react-toastify';


type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  documento: z.string().min(1, {
    message: "Por favor ingrese un documento válido"
  }),
  fechaNacimiento: z.string().min(1, {
    message: "Por favor ingrese una fecha válida"
  })
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documento: '',
      fechaNacimiento: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const fecha = new Date(data.fechaNacimiento)
      const user = await authService.login({documento: data.documento, fechaNacimiento: fecha.toISOString()})
      
      setUser(user)
      navigate({ to: '/' })
    } catch (error) {
      console.error('Authentication error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='documento'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Documento</FormLabel>
                  <FormControl>
                    <Input placeholder='Ingrese su documento' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='fechaNacimiento'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              Continuar
            </Button>
            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  O
                </span>
              </div>
            </div>
            <Link to="/sign-up">
              <Button variant="outline" className="w-full">
                Registrarse como Paciente
              </Button>
            </Link>
          </div>
        </form>
      </Form>
      <ToastContainer />
    </div>
  )
}
