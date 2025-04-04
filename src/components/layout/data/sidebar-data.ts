import {
  IconChecklist,
  IconLayoutDashboard,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

const userInSesion: any = JSON.parse(localStorage.getItem('auth-storage') || '{}');

export const sidebarData: SidebarData = {
  user: {
    name: `${userInSesion?.state?.user?.nombres}`,
    email: '',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: `${userInSesion?.state?.user?.nombres}`,
      logo: Command,
      plan: '',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Medico',
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'Citas',
          url: '/users',
          icon: IconUsers,
        },
      ],
    },

  ],
}
