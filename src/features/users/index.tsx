import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/users-columns'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersTable } from './components/users-table'
import UsersProvider from './context/users-context'
import { Cita } from './data/schema'
import { useEffect, useState } from 'react'
import * as citasService from '@/lib/service/citas.service'

export default function Users() {

  const [citas, setCitas] = useState<Cita[]>([])

  const getCitas = async () => {
    citasService.getCitas().then(setCitas)
  }

  useEffect(() => {
    getCitas()
  }, [])

  return (
    <UsersProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Gestion de citas</h2>
      
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <UsersTable data={citas} columns={columns} />
        </div>
      </Main>

      <UsersDialogs getCitas={getCitas} />
    </UsersProvider>
  )
}
