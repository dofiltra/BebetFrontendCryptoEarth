import { type UserDto, userQueries } from 'src/entities/user'
import { UserAdminTable } from '@/widgets/user-admin-table/ui'
import { useStyles } from './styles'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Button, Pagination } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const DEFAULT_USER_LIMIT = 10

export const AdminPage = () => {
  const { classes } = useStyles()
  const [page, setPage] = useState(1)
  const { data } = useQuery(userQueries.list(page, DEFAULT_USER_LIMIT))
  const { currentUser } = useCurrentUser()

  if (currentUser?.role !== 'admin') {
    return <></>
  }

  return (
    <div>
      <nav className={classes.navigation}>
        <Button component={Link} to={'/'}>
          To Main
        </Button>
      </nav>
      <h1 className={classes.title}>Admin page</h1>
      <h2 className={classes.stats_title}>Users</h2>
      <UserAdminTable users={data?.users || []} />
      <div className={classes.paginate_wrapper}>
        <Pagination
          count={data?.totalPages || 1}
          onChange={(_, page) => {
            setPage(page)
          }}
          color='primary'
        />
      </div>
    </div>
  )
}
