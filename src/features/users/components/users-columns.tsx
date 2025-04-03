import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import LongText from '@/components/long-text';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Medico } from '@/features/tasks/data/tasks';
import { ColumnDef } from '@tanstack/react-table';
import { CITA_ESTADOS } from '@/constants/data';
import { Cita } from '../data/schema';





export const columns: ColumnDef<Cita>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'especialidad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Especialidad' />
    ),
    cell: ({ row }) => <LongText className='max-w-36'>{row.getValue('especialidad')}</LongText>,
  },
  {
    accessorKey: 'fechaHora',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha y Hora' />
    ),
    cell: ({ row }) => <div>{new Date(row.getValue('fechaHora')).toLocaleString()}</div>,
  },
  {
    accessorKey: 'estado',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Estado' />
    ),
    cell: ({ row }) => {
      const estado = row.getValue('estado');
      const color = estado === CITA_ESTADOS.DISPONIBLE ? 'bg-green-500' : 'bg-red-500';
      return (
        <Badge variant='outline' className={cn('capitalize', color)}>
         {/*  {estado} */}
        </Badge>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'idMedico',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID Médico' />
    ),
    cell: ({ row }) => <div>{row.getValue('idMedico')}</div>,
  },
  {
    accessorKey: 'medico',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Médico' />
    ),
    cell: ({ row }) => {
/*       const { nombre } = row.original?.medico;
      return <LongText className='max-w-36'>{nombre}</LongText>; */
    },
  }
];
