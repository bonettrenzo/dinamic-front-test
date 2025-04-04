
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
import * as medicoService from '@/lib/service/medico.service'
import { use, useEffect, useState } from 'react'
import { Medico } from '@/features/tasks/data/tasks'
import { CITA_ESTADOS, Especialidades } from '@/constants/data'
import * as citasService from '@/lib/service/citas.service'

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
  getCitas: Function
}


export function CitaDialog({ open, onOpenChange, getCitas }: Props) {
  const form = useForm<CitaForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Especialidad: '',
      FechaHora: '',
      Estado: '',
      IdMedico: 0,
    },
  })

   const getMedicos = async () => {
    medicoService.getMedicos().then(res => {
      setMedicos(res)
    })
  };
 
  const [medicos, setMedicos] = useState<Medico[]>([])


  useEffect(() => {
    getMedicos()
  }, [])



  const onSubmit = async (values: CitaForm) => {
    form.reset()
    const localDate = new Date(values.FechaHora)

    await citasService.createCita({
      especialidad: values.Especialidad,
      estado: values.Estado,
      fechaHora: localDate.toISOString(),
      idMedico: values.IdMedico,
    })
    getCitas()
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
              <FormField control={form.control} name="Especialidad" render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialidad</FormLabel>
                  <FormControl>
                    <SelectDropdown
                      items={Especialidades}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Selecciona una especialidad"
                    />
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
              <FormField control={form.control} name="Estado" render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <SelectDropdown
                      items={Object.entries(CITA_ESTADOS).map(([value, label]) => ({ label, value }))}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Selecciona un estado"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="IdMedico" render={({ field }) => (
                <FormItem>
                  <FormLabel>Médico</FormLabel>
                  <FormControl>
                    <SelectDropdown
                      items={medicos.map(medico => ({
                        label: medico.nombre,
                        value: String(medico.id),
                      }))}
                      defaultValue={String(field.value)}
                      onValueChange={(value) => field.onChange(Number(value))}
                      placeholder="Selecciona un médico"
                    />
                  </FormControl>
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
