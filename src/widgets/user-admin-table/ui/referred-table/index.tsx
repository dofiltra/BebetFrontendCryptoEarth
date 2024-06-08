import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material'
import { ReferredRow } from './referred-row'
import { TReferredProps } from './types'
import { getData } from '@/shared/ui/dashboard/item'

export const ReferredTable = ({ refferends = [], hiddenCols = [], actionsCol }: TReferredProps) => {
  if (refferends.length === 0) {
    return <></>
  }

  const totalStats = {
    depositsFirst: 0,
    depositsRepeat: 0,
    depositsSummary: 0,
    depositsCount: 0,
    betsCount: 0,
    betsDiff: 0,
    betsSummary: 0,
    losedSummary: 0,
    winnedSummary: 0,
    bonus: 0,
    income: 0,
  }

  refferends.forEach((r) => {
    r.statistics
    Object.keys(totalStats).forEach((key) => {
      totalStats[key] += Number(getData(r.statistics?.[key] || 0, 0))
    })
  })

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
      <TableFooter>
        <TableRow style={{ backgroundColor: '#3f51b5' }}>
          {!hiddenCols?.includes('email') && <TableCell align="center">TOTAL</TableCell>}
          {!hiddenCols?.includes('is_removed') && <TableCell align="center"></TableCell>}
          {!hiddenCols?.includes('status') && <TableCell align="center"></TableCell>}
          {!hiddenCols?.includes('refferend') && <TableCell align="center"></TableCell>}
          {!hiddenCols?.includes('date') && <TableCell align="center"></TableCell>}
          {/* {!hiddenCols?.includes('traffic') && <TableCell align="center">Traffic</TableCell>} */}
          {!hiddenCols?.includes('connection_date') && <TableCell align="center"></TableCell>}
          {!hiddenCols?.includes('depositsFirst') && <TableCell align="center">{totalStats.depositsFirst}</TableCell>}
          {!hiddenCols?.includes('depositsCount') && <TableCell align="center">{totalStats.depositsCount}</TableCell>}
          {!hiddenCols?.includes('depositsSummary') && (
            <TableCell align="center">{totalStats.depositsSummary}</TableCell>
          )}
          {!hiddenCols?.includes('depositsRepeat') && <TableCell align="center">{totalStats.depositsRepeat}</TableCell>}
          {!hiddenCols?.includes('betsCount') && <TableCell align="center">{totalStats.betsCount}</TableCell>}
          {!hiddenCols?.includes('betsSummary') && <TableCell align="center">{totalStats.betsSummary}</TableCell>}
          {!hiddenCols?.includes('losedSummary') && <TableCell align="center">{totalStats.losedSummary}</TableCell>}
          {!hiddenCols?.includes('winnedSummary') && (
            <TableCell align="center">{totalStats.winnedSummary.toFixed(2)}</TableCell>
          )}
          {!hiddenCols?.includes('betsDiff') && <TableCell align="center">{totalStats.betsDiff.toFixed(2)}</TableCell>}
          {!hiddenCols?.includes('bonus') && <TableCell align="center">{totalStats.bonus}</TableCell>}
          {!hiddenCols?.includes('income') && <TableCell align="center">{totalStats.income.toFixed(2)}</TableCell>}
          {!!actionsCol && <TableCell align="center"></TableCell>}
        </TableRow>
      </TableFooter>
    </Table>
  )
}
