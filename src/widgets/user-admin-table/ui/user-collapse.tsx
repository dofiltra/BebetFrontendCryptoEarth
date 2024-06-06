import { ReferredDto, userQueries } from 'src/entities/user'
import { ReferredTable } from 'src/widgets/user-admin-table/ui/referred-table'
import { WalletTable } from 'src/widgets/user-admin-table/ui/wallet-table'
import { useQuery } from '@tanstack/react-query'
import { useStyles } from './styles'
import { toast } from 'react-toastify'
import { get } from '@/services/api'
import { Button } from '@/shared/ui/button'

type Props = {
  userId: string
}

export const UserCollapse = (props: Props) => {
  const { userId } = props
  const { classes } = useStyles()
  const { data, isLoading } = useQuery(userQueries.detail({ id: userId }))

  const handleEarningsHistory = async () => {
    const users = await get('/ref_admin/users/')

    if (!users) {
      return toast.error(`Не получилось загрузить пользователей`)
    }
    console.log('handleEarningsHistory', users)
  }
  const handleWithdrawalInfo = async (id: any) => {
    let res = await get(`/ref_admin/users/${id}`)

    if (!res) {
      return toast.error(`Не получилось`)
    }
    console.log('handleWithdrawalInfo', res)
  }
  const handleBlockUnblockUser = async (id: any) => {
    let res = await get(`/ref_admin/users/${id}/block`)
    if (!res) {
      return toast.error(`Не получилось`)
    }
    console.log('handleBlockUnblockUser', res)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={classes.user_collapse}>
      <div>
        <h2>Referents</h2>
        <ReferredTable
          refferends={data?.data?.referents || []}
          hiddenCols={['refferend']}
          actionsCol={({ user }: { user: ReferredDto }) => (
            <>
              <Button
                title="История начислений"
                handleClick={() => handleEarningsHistory()}
                disabled={false}
                width="150px"
                transparent={false}
                black={true}
              />
              <Button
                title="Информация о выводах"
                handleClick={() => handleWithdrawalInfo(user._id)}
                disabled={false}
                width="150px"
                transparent={false}
                black={true}
              />
              <Button
                title="Блок/разблок"
                handleClick={() => handleBlockUnblockUser(user._id)}
                disabled={false}
                width="150px"
                transparent={false}
                black={true}
              />
            </>
          )}
        />
      </div>
      <div>
        <h2>Wallets</h2>
        <WalletTable wallets={data?.data?.wallets || []} />
      </div>
    </div>
  )
}
