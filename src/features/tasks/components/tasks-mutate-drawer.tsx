import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
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
import { SelectDropdown } from '@/components/select-dropdown'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Medico } from '../data/tasks'
import * as medicoService from '@/lib/service/medico.service'
import { Especialidades } from '@/constants/data'



interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Medico
}

const formSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio.'),
  especialidad: z.string().min(1, 'Seleccione una especialidad.'),
})

type MedicoForm = z.infer<typeof formSchema>

export function MedicoMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow
  const form = useForm<MedicoForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
      nombre: '',
      especialidad: '',
    },
  })

  const onSubmit = async (data: MedicoForm) => {


    await medicoService.createMedico({Nombre: data.nombre, "Especialidad": data.especialidad})

    onOpenChange(false)
    form.reset()
    toast({
      title: 'Formulario enviado con éxito:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>{isUpdate ? 'Actualizar' : 'Agregar'} Médico</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Actualiza la información del médico.'
              : 'Agrega un nuevo médico con la información necesaria.'}
            Haz clic en guardar cuando termines.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='medico-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-5'
          >
            <FormField
              control={form.control}
              name='nombre'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Nombre del médico' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='especialidad'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Especialidad</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Seleccione una especialidad'
                    items={Especialidades}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Cerrar</Button>
          </SheetClose>
          <Button form='medico-form' type='submit'>
            Guardar cambios
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
