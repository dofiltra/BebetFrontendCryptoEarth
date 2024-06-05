import { UserDto } from 'src/entities/user'
import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useState } from 'react'
import { UserCollapse } from '@/widgets/user-admin-table/ui/user-collapse'
import { getStringDate } from '@/shared/lib/date/get-string-date'

type Props = {
  user: UserDto
}

export const UserRow = (props: Props) => {
  const { user } = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">{user.partnershipType}</TableCell>
        <TableCell align="center">{user.communicationType}</TableCell>
        <TableCell align="center">{user.referrals}</TableCell>
        <TableCell align="center">{user.role}</TableCell>
        <TableCell align="center">{user.ref_string}</TableCell>
        <TableCell align="center">{user.reference}</TableCell>
        <TableCell align="center">{user.is_removed || '-'}</TableCell>
        <TableCell align="center">{getStringDate(user.createdAt)}</TableCell>
        <TableCell align="center">{getStringDate(user.updatedAt)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <UserCollapse userId={user._id} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
