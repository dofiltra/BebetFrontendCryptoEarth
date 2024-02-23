import { ReferredDto } from "src/entities/user";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ReferredRow } from "./referred-row";

type Props = {
  referred: ReferredDto[]
}


export const ReferredTable = ({ referred }: Props) => {
  if (referred.length === 0) {
    return <></>
  }

  return (
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell align='center'>Email</TableCell>
          <TableCell align='center'>Connection date</TableCell>
          <TableCell align='center'>Is removed</TableCell>
          <TableCell align='center'>Status</TableCell>
          <TableCell align='center'>Referred</TableCell>
          <TableCell align='center'>Date</TableCell>
          <TableCell align='center'>Traffic</TableCell>
          <TableCell align='center'>Connection date</TableCell>
          <TableCell align='center'>Deposits first</TableCell>
          <TableCell align='center'>Deposits count</TableCell>
          <TableCell align='center'>Deposits summary</TableCell>
          <TableCell align='center'>Deposits repeat</TableCell>
          <TableCell align='center'>Bets count</TableCell>
          <TableCell align='center'>Bets summary</TableCell>
          <TableCell align='center'>Losed summary</TableCell>
          <TableCell align='center'>Winned summary</TableCell>
          <TableCell align='center'>Bets diff</TableCell>
          <TableCell align='center'>Bonus</TableCell>
          <TableCell align='center'>Income</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {referred.map((referrer) => (
          <ReferredRow key={referrer._id} referrer={referrer}/>
        ))}
      </TableBody>
    </Table>
  )
}
