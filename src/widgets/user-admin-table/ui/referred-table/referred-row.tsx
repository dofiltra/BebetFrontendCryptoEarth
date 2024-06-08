import { TableCell, TableRow } from '@mui/material'
import { getStringDate } from '@/shared/lib/date/get-string-date'
import { TReferredProps } from './types'
import { getData } from '@/shared/ui/dashboard/item'

export const ReferredRow = (props: TReferredProps) => {
  const { refferend, hiddenCols = [], actionsCol } = props
  const { statistics } = { ...refferend }

  return (
    <TableRow>
      {!hiddenCols?.includes('email') && (
        <TableCell align="center" style={{ color: statistics?.isPartner ? '#cddc39' : '' }}>
          {refferend.email}
        </TableCell>
      )}
      {!hiddenCols?.includes('is_removed') && <TableCell align="center">{refferend.is_removed}</TableCell>}
      {!hiddenCols?.includes('status') && <TableCell align="center">{refferend.status}</TableCell>}
      {!hiddenCols?.includes('refferend') && <TableCell align="center">{refferend.refferend}</TableCell>}
      {!hiddenCols?.includes('date') && <TableCell align="center">{getStringDate(statistics.date)}</TableCell>}
      {/* {!hiddenCols?.includes('traffic') && <TableCell align="center">{statistics.traffic}</TableCell>} */}
      {!hiddenCols?.includes('connection_date') && (
        <TableCell align="center">{getStringDate(statistics.connection_date)}</TableCell>
      )}
      {!hiddenCols?.includes('depositsFirst') && (
        <TableCell align="center">{getData(statistics.depositsFirst)}</TableCell>
      )}
      {!hiddenCols?.includes('depositsCount') && (
        <TableCell align="center">{getData(statistics.depositsCount)}</TableCell>
      )}
      {!hiddenCols?.includes('depositsSummary') && (
        <TableCell align="center">{getData(statistics.depositsSummary)}</TableCell>
      )}
      {!hiddenCols?.includes('depositsRepeat') && (
        <TableCell align="center">{getData(statistics.depositsRepeat)}</TableCell>
      )}
      {!hiddenCols?.includes('betsCount') && <TableCell align="center">{statistics.betsCount}</TableCell>}
      {!hiddenCols?.includes('betsSummary') && <TableCell align="center">{statistics.betsSummary}</TableCell>}
      {!hiddenCols?.includes('losedSummary') && <TableCell align="center">{statistics.losedSummary}</TableCell>}
      {!hiddenCols?.includes('winnedSummary') && (
        <TableCell align="center">{statistics.winnedSummary?.toFixed(2)}</TableCell>
      )}
      {!hiddenCols?.includes('betsDiff') && <TableCell align="center">{statistics.betsDiff?.toFixed(2)}</TableCell>}
      {!hiddenCols?.includes('bonus') && <TableCell align="center"> {statistics.bonus}</TableCell>}
      {!hiddenCols?.includes('income') && <TableCell align="center">{statistics.income?.toFixed(2)}</TableCell>}
      {actionsCol && <TableCell align="center">{actionsCol?.({ user: refferend })}</TableCell>}
    </TableRow>
  )
}
