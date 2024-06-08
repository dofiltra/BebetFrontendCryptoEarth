import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { ReferredRow } from './referred-row'
import { TReferredProps } from './types'

export const ReferredTable = ({ refferends = [], hiddenCols = [], actionsCol }: TReferredProps) => {
  if (refferends.length === 0) {
    return <></>
  }

  return (
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          {!hiddenCols?.includes('email') && <TableCell align="center">Email</TableCell>}
          {!hiddenCols?.includes('is_removed') && <TableCell align="center">Is removed</TableCell>}
          {!hiddenCols?.includes('status') && <TableCell align="center">Status</TableCell>}
          {!hiddenCols?.includes('refferend') && <TableCell align="center">Referrend</TableCell>}
          {!hiddenCols?.includes('date') && <TableCell align="center">Date</TableCell>}
          {/* {!hiddenCols?.includes('traffic') && <TableCell align="center">Traffic</TableCell>} */}
          {!hiddenCols?.includes('connection_date') && <TableCell align="center">Connection date</TableCell>}
          {!hiddenCols?.includes('depositsFirst') && <TableCell align="center">Deposits first</TableCell>}
          {!hiddenCols?.includes('depositsCount') && <TableCell align="center">Deposits count</TableCell>}
          {!hiddenCols?.includes('depositsSummary') && <TableCell align="center">Deposits summary</TableCell>}
          {!hiddenCols?.includes('depositsRepeat') && <TableCell align="center">Deposits repeat</TableCell>}
          {!hiddenCols?.includes('betsCount') && <TableCell align="center">Bets count</TableCell>}
          {!hiddenCols?.includes('betsSummary') && <TableCell align="center">Bets summary</TableCell>}
          {!hiddenCols?.includes('losedSummary') && <TableCell align="center">Losed summary</TableCell>}
          {!hiddenCols?.includes('winnedSummary') && <TableCell align="center">Winned summary</TableCell>}
          {!hiddenCols?.includes('betsDiff') && <TableCell align="center">Bets diff</TableCell>}
          {!hiddenCols?.includes('bonus') && <TableCell align="center">Bonus</TableCell>}
          {!hiddenCols?.includes('income') && <TableCell align="center">Income</TableCell>}
          {!!actionsCol && <TableCell align="center"></TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {refferends.map((refferend) => (
          <ReferredRow key={refferend._id} refferend={refferend} hiddenCols={hiddenCols} actionsCol={actionsCol} />
        ))}
      </TableBody>
    </Table>
  )
}
