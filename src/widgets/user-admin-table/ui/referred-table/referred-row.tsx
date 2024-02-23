import { ReferredDto } from "src/entities/user";
import { TableCell, TableRow } from "@mui/material";
import { getStringDate } from "@/shared/lib/date/get-string-date";

type Props = {
  referrer: ReferredDto
}

export const ReferredRow = (props: Props) => {
  const { referrer } = props
  const { statistics } = referrer
  return (
    <TableRow>
      <TableCell align='center'>{referrer.email}</TableCell>
      <TableCell align='center'>{referrer.connection_date}</TableCell>
      <TableCell align='center'>{referrer.is_removed ? 'Yes' : 'No'}</TableCell>
      <TableCell align='center'>{referrer.status}</TableCell>
      <TableCell align='center'>{referrer.refferend}</TableCell>
      <TableCell align='center'>{getStringDate(statistics.date)}</TableCell>
      <TableCell align='center'>{statistics.traffic}</TableCell>
      <TableCell align='center'>{statistics.connection_date}</TableCell>
      <TableCell align='center'>{statistics.depositsFirst}</TableCell>
      <TableCell align='center'>{statistics.depositsCount}</TableCell>
      <TableCell align='center'>{statistics.depositsSummary}</TableCell>
      <TableCell align='center'>{statistics.depositsRepeat}</TableCell>
      <TableCell align='center'>{statistics.betsCount}</TableCell>
      <TableCell align='center'>{statistics.betsSummary}</TableCell>
      <TableCell align='center'>{statistics.losedSummary}</TableCell>
      <TableCell align='center'>{statistics.winnedSummary}</TableCell>
      <TableCell align='center'>{statistics.betsDiff}</TableCell>
      <TableCell align='center'>{statistics.bonus}</TableCell>
      <TableCell align='center'>{statistics.income}</TableCell>
    </TableRow>
  )

}
