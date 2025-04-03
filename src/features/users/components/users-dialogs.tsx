import { useUsers } from '../context/users-context'
import { CitaDialog } from './users-action-dialog'
import { UsersDeleteDialog } from './users-delete-dialog'
import { UsersInviteDialog } from './users-invite-dialog'

export function UsersDialogs({getCitas}: {getCitas: Function}) {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()
  return (
    <>
      <CitaDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
        getCitas={getCitas}
      />

      <UsersInviteDialog
        key='user-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      {currentRow && (
        <>
          <CitaDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            getCitas={getCitas}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
          />

          <UsersDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
