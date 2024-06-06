import type { WalletDto } from 'src/entities/user'
import type { TWalletProps } from './types'
import { TableCell, TableRow } from '@mui/material'

type Props = {
  wallet: WalletDto
} & Partial<TWalletProps>

export const WalletRow = ({ wallet, actionsCol }: Props) => {
  return (
    <TableRow>
      <TableCell align="center">{wallet.value}</TableCell>
      <TableCell align="center">{wallet.currency}</TableCell>
      <TableCell align="center">{wallet.status}</TableCell>
      <TableCell align="center">{wallet.is_removed ? 'Yes' : 'No'}</TableCell>
      {!!actionsCol && <TableCell align="center">{actionsCol({ wallet })}</TableCell>}
    </TableRow>
  )
}
