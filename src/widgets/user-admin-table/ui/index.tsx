import { UserDto } from 'src/entities/user'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { UserRow } from './user-row'
import { useStyles } from './styles'

type Props = {
  users: UserDto[]
}

export const UserAdminTable = (props: Props) => {
  const { users } = props
  const { classes } = useStyles()

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Partnership Type</TableCell>
            <TableCell align="center">Communication Type</TableCell>
            <TableCell align="center">Referrals</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Ref string</TableCell>
            <TableCell align="center">Reference</TableCell>
            <TableCell align="center">Is Removed</TableCell>
            <TableCell align="center">Created At</TableCell>
            <TableCell align="center">Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserRow key={user._id} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
