import { userQueries } from 'src/entities/user'
import { ReferredTable } from 'src/widgets/user-admin-table/ui/referred-table'
import { useQuery } from '@tanstack/react-query'
import { useStyles } from './styles'

type Props = {
  userId: string
}

export const UserCollapse = (props: Props) => {
  const { userId } = props
  const { classes } = useStyles()
  const { data, isLoading } = useQuery(userQueries.detail({ id: userId }))

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={classes.user_collapse}>
      <div>
        <h2>Referends</h2>
        <ReferredTable refferends={data?.data?.referents || []} hiddenCols={['refferend']} />
      </div>
    </div>
  )
}
