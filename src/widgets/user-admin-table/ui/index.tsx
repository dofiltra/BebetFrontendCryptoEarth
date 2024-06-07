import type { UserDto, WalletDto } from 'src/entities/user'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { UserRow } from './user-row'
import { useStyles } from './styles'

type Props = {
  users: UserDto[]
  wallets: Record<string, WalletDto>
  refetch: () => void
}

export const UserAdminTable = (props: Props) => {
  const { users, wallets, refetch } = props
  const { classes } = useStyles()

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Referrals</TableCell>
            <TableCell align="center">Wallet</TableCell>
            <TableCell align="center">Partnership Type</TableCell>
            <TableCell align="center">Communication Type</TableCell>
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
            <UserRow key={user._id} user={user} wallet={wallets?.[user._id]} refetch={refetch} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
