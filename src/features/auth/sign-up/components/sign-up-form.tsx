import { HTMLAttributes, useState } from 'react'
import {  z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
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
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { IconCalendar } from '@tabler/icons-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useAuthStore } from '@/lib/store/auth-store'
import * as pacienteService from '@/lib/service/paciente.service'

type SignUpFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  nombres: z.string().min(1, { message: 'Por favor ingrese sus nombres' }),
  apellidos: z.string().min(1, { message: 'Por favor ingrese sus apellidos' }),
  documento: z.string().min(1, { message: 'Por favor ingrese su documento' }),
  fechaNacimiento: z.date({
    required_error: 'Por favor seleccione su fecha de nacimiento',
  }),
  telefono: z.string().min(1, { message: 'Por favor ingrese su teléfono' }),
})


export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: '',
      apellidos: '',
      documento: '',
      fechaNacimiento: new Date(),
      telefono: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // Transformar los datos al formato esperado por el servicio
      const pacienteData = {
        Nombres: data.nombres,
        Apellidos: data.apellidos,
        Documento: data.documento,
        FechaNacimiento: data.fechaNacimiento.toISOString(),
        Telefono: data.telefono,
      }

      const paciente = await pacienteService.createPaciente(pacienteData)
      
      setUser(paciente)
      navigate({ to: '/' })
    } catch (error) {
      console.error('Registration error:', error)
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
              name='nombres'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input placeholder='Ingrese sus nombres' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='apellidos'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input placeholder='Ingrese sus apellidos' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <IconCalendar className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='telefono'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder='Ingrese su teléfono' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              Crear Cuenta
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
