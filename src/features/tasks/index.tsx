import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { TasksDialogs } from './components/tasks-dialogs'
import { TasksPrimaryButtons } from './components/tasks-primary-buttons'
import TasksProvider from './context/tasks-context'
/* import { medicos } from './data/tasks' */
import * as medicoService from '@/lib/service/medico.service'
import { useEffect, useState } from 'react'
import { Medico } from './data/tasks'

export default function Tasks() {

  const [medicos, setMedicos] = useState<Medico[]>([])

  const getMedicos = async () => {
    medicoService.getMedicos().then(res => {
      setMedicos(res)
    })
  };
  
  useEffect(() => {
    getMedicos()
  }, [])

  return (
    <TasksProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Gestion de médicos</h2>
          </div>
          <TasksPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={medicos} columns={columns} />
        </div>
      </Main>

      <TasksDialogs getMedicos={getMedicos} />
    </TasksProvider>
  )
}
