import { useState } from 'react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { CITA_ESTADOS, Especialidades } from '@/constants/data'
import { SelectDropdown } from '@/components/select-dropdown'
import { FormProvider, useForm } from 'react-hook-form'
import * as citasService from '@/lib/service/citas.service'
import { Cita } from '../users/data/schema'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

export default function Dashboard() {
  const [selectedEspecialidad, setSelectedEspecialidad] = useState<string>("")
  const [citasByEspecialidad, setCitasByEspecialidad] = useState<Cita[]>([])

  const methods = useForm()

  const onValueChangeEspecialidad = (value: string) => {
    setCitasByEspecialidad([])
    setSelectedEspecialidad(value)
    citasService.getByEspecialidad(value).then(res => {
      setCitasByEspecialidad(res) 
    })
  }

  const actualizarDisponibilidad = async (cita: Cita) => {
    const id = cita.id;
    if (!id) return;


    if(cita.estado === CITA_ESTADOS.RESERVADA) {
      toast({
        title: 'Error al actualizar la disponibilidad',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>
              Esta no se puede tomar porque ya esta reservada
            </code>
          </pre>
        ),
      })
      return
    }

    
     await citasService.actualizarDisponibilidad(id, CITA_ESTADOS.RESERVADA)
     onValueChangeEspecialidad(selectedEspecialidad) 
  }


  return (
    <FormProvider {...methods}>
      <>
        {/* ===== Top Heading ===== */}
        <Header>
          <TopNav links={[]} />
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>

        {/* ===== Main ===== */}
        <Main>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>Tomar Cita</h1>
          </div>
          <Tabs
            orientation='vertical'
            defaultValue='overview'
            className='space-y-4'
          >
            <TabsContent value='overview' className='space-y-4'>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>

                {/* SELECT */}
                <SelectDropdown
                  items={Especialidades}
                  defaultValue={selectedEspecialidad}
                  onValueChange={onValueChangeEspecialidad}
                  placeholder="Selecciona una especialidad"
                />

              </div>

              <Separator className='shadow' />

              <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3'>
                { citasByEspecialidad?.map((cita) => (
                  <li
                    key={cita.id}
                    className='rounded-lg border p-4 hover:shadow-md'
                  >
                    <div className='mb-8 flex items-center justify-between'>
                      <div
                        className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                      >
                        {/* Icono de especialidad o un placeholder */}
                        🏥
                      </div>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => actualizarDisponibilidad(cita)} 
                        className={`${cita.estado.toLowerCase() === CITA_ESTADOS.DISPONIBLE.toLowerCase() ? 'border border-green-300 bg-green-50 hover:bg-green-100 dark:border-green-700 dark:bg-green-950 dark:hover:bg-green-900' : 'border border-red-300 bg-red-50 hover:bg-red-100 dark:border-red-700 dark:bg-red-950 dark:hover:bg-red-900'}`}
                      >
                        {cita.estado}
                      </Button>
                    </div>
                    <div>
                      <h2 className='mb-1 font-semibold'>{cita.especialidad}</h2>
                      <p className='text-gray-500'>Médico: {cita.medico.nombre}</p>
                      <p className='text-gray-500'>Fecha: {new Date(cita.FechaHora).toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>



            </TabsContent>
          </Tabs>
        </Main>
      </>
    </FormProvider>
  )
}
