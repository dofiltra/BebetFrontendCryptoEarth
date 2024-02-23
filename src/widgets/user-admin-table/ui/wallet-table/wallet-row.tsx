import { WalletDto } from "src/entities/user";
import { TableCell, TableRow } from "@mui/material";

type Props = {
  wallet: WalletDto
}

export const WalletRow = (props: Props) => {
  const { wallet } = props
  return (
    <TableRow>
      <TableCell align='center'>{wallet.value}</TableCell>
      <TableCell align='center'>{wallet.currency}</TableCell>
      <TableCell align='center'>{wallet.status}</TableCell>
      <TableCell align='center'>{wallet.is_removed ? 'Yes' : 'No'}</TableCell>
    </TableRow>
  )

}
