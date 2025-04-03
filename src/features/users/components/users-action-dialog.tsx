
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectDropdown } from '@/components/select-dropdown'

const formSchema = z.object({
  Especialidad: z.string().min(1, { message: 'Especialidad es requerida.' }),
  FechaHora: z.string().min(1, { message: 'Fecha y hora son requeridas.' }),
  Estado: z.string().min(1, { message: 'Estado es requerido.' }),
  IdMedico: z.number().min(1, { message: 'Debe seleccionar un médico.' }),
})

type CitaForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CitaDialog({ open, onOpenChange }: Props) {
  const form = useForm<CitaForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Especialidad: '',
      FechaHora: '',
      Estado: '',
      IdMedico: 0,
    },
  })

  const onSubmit = (values: CitaForm) => {
    form.reset()
    toast({
      title: 'Datos de la cita:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>Crear Cita</DialogTitle>
          <DialogDescription>Ingrese los detalles de la cita y haga clic en guardar.</DialogDescription>
        </DialogHeader>
        <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form id='cita-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-0.5'>
              <FormField control={form.control} name='Especialidad' render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialidad</FormLabel>
                  <FormControl>
                    <Input placeholder='Ej. Cardiología' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name='FechaHora' render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha y Hora</FormLabel>
                  <FormControl>
                    <Input type='datetime-local' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name='Estado' render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder='Ej. Pendiente' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name='IdMedico' render={({ field }) => (
                <FormItem>
                  <FormLabel>Médico</FormLabel>
                  {/* <SelectDropdown defaultValue={""} onValueChange={field.onChange} placeholder='Seleccione un médico' /> */}
                  <FormMessage />
                </FormItem>
              )} />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='cita-form'>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
