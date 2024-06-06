import { WalletDto } from 'src/entities/user'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { WalletRow } from './wallet-row'

type Props = {
  wallets: WalletDto[]
}

export const WalletTable = ({ wallets }: Props) => {
  if (wallets.length === 0) {
    return <></>
  }
  return (
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Value</TableCell>
          <TableCell align="center">Currency</TableCell>
          <TableCell align="center">Status</TableCell>
          <TableCell align="center">Is removed</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {wallets.map((wallet) => (
          <WalletRow key={wallet._id} wallet={wallet} />
        ))}
      </TableBody>
    </Table>
  )
}
