import type { UserDto, WalletDto } from 'src/entities/user'
import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useState } from 'react'
import { UserCollapse } from '@/widgets/user-admin-table/ui/user-collapse'
import { getStringDate } from '@/shared/lib/date/get-string-date'
import { apiInstance } from '@/shared/api'
import { toast } from 'react-toastify'
import { Button } from '@/shared/ui/button'

type Props = {
  user: UserDto
  wallet: WalletDto
  refetch: () => void
}

const toogleBlockWallet = async ({
  userId,
  type,
  refetch,
}: {
  userId: string
  type: 'block' | 'unblock'
  refetch: () => void
}) => {
  const resp = await apiInstance.post<any>(
    `/api/v1/ref_admin/users/${userId}/${type}`,
    {
      withCredentials: true,
      params: {},
    },
    {},
    {
      onError: async ({ error = 'Error' }) => {
        toast.error(`${error}`)
      },
    }
  )

  if (!resp?.data) {
    return
  }
  refetch()
}

export const UserRow = (props: Props) => {
  const { user, wallet, refetch } = props
  const [open, setOpen] = useState(false)
  const isBlockedWallet = wallet?.status !== 'open'

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          {user.referrals > 0 && (
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">{user.referrals}</TableCell>
        <TableCell align="center">
          {!wallet?.status && '-'}
          {!!wallet?.status && (
            <>
              {wallet?.currency || ''} {wallet?.value || 0} ({wallet?.status || ''})
              <br />
              <Button
                title={isBlockedWallet ? 'Unblock' : 'Block'}
                handleClick={() =>
                  toogleBlockWallet({
                    userId: user._id,
                    type: isBlockedWallet ? 'unblock' : 'block',
                    refetch,
                  })
                }
                disabled={false}
                width="120px"
                transparent={false}
                black={true}
              />
            </>
          )}
        </TableCell>
        <TableCell align="center">{user.partnershipType}</TableCell>
        <TableCell align="center">{user.communicationType}</TableCell>
        <TableCell align="center">{user.role}</TableCell>
        <TableCell align="center">{user.ref_string}</TableCell>
        <TableCell align="center">{user.reference}</TableCell>
        <TableCell align="center">{user.is_removed || 'No'}</TableCell>
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
