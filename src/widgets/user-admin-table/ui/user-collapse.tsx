import { WalletDto, userQueries } from 'src/entities/user'
import { ReferredTable } from 'src/widgets/user-admin-table/ui/referred-table'
import { WalletTable } from 'src/widgets/user-admin-table/ui/wallet-table'
import { useQuery } from '@tanstack/react-query'
import { useStyles } from './styles'
import { toast } from 'react-toastify'
import { Button } from '@/shared/ui/button'
import { apiInstance } from '@/shared/api'
import { useState } from 'react'

type Props = {
  userId: string
}

export const UserCollapse = (props: Props) => {
  const { userId } = props
  const { classes } = useStyles()
  const { data, isLoading, refetch } = useQuery(userQueries.detail({ id: userId }))

  const toogleBlock = async ({ userId, type }: { userId: string; type: 'block' | 'unblock' }) => {
    const res = await apiInstance.post<any>(
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

    if (!res) {
      return
    }
    refetch()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={classes.user_collapse}>
      <div>
        <h2>Referents</h2>
        <ReferredTable refferends={data?.data?.referents || []} hiddenCols={['refferend']} />
      </div>
      <div>
        <h2>Wallets</h2>
        <WalletTable
          wallets={data?.data?.wallets || []}
          actionsCol={({ wallet }) => {
            const isBlocked = wallet?.status === 'blocked'
            return (
              <>
                <Button
                  title={isBlocked ? 'Unblock' : 'Block'}
                  handleClick={() =>
                    toogleBlock({
                      userId: wallet.user,
                      type: isBlocked ? 'unblock' : 'block',
                    })
                  }
                  disabled={false}
                  width="120px"
                  transparent={false}
                  black={true}
                />
              </>
            )
          }}
        />
      </div>
    </div>
  )
}
