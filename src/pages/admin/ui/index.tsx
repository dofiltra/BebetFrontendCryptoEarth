import '../../../Components/App/Statistic/Statistic.scss'
import '../../../Components/App/Main/App.scss'
import 'react-toastify/dist/ReactToastify.css'

import { userQueries } from 'src/entities/user'
import { UserAdminTable } from '@/widgets/user-admin-table/ui'
import { useStyles } from './styles'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Pagination } from '@mui/material'
import { useCurrentUser, useIsMobile } from '@/shared/lib/hooks'
import { ToastContainer } from 'react-toastify'
import { HeaderLogo } from '@/Components/Ui/Header/Header'
import { AdminDashboard } from '@/Components/Admin/Dashboard/Dashboard'
import { createFormData, postFormData } from '@/services/api'
import { isAdmin } from '@/shared/lib/validators/isAdmin'
import { TFullStatistic } from '@/Components/App/Statistic/Statistic.types'

const DEFAULT_USER_LIMIT = 10

export const AdminPage = () => {
  const { classes } = useStyles()
  const { isMobile } = useIsMobile()

  const [page, setPage] = useState(1)
  const { data, refetch } = useQuery(userQueries.list(page, DEFAULT_USER_LIMIT))
  const { currentUser } = useCurrentUser()
  const [adminStatistics, setAdminStatistics] = useState<TFullStatistic>({})

  useEffect(() => {
    if (!currentUser) {
      return
    }

    if (!isAdmin(currentUser)) {
      location.href = '/'
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser?.role !== 'admin') {
      return
    }
    loadAdminStatistics()
  }, [currentUser])

  const loadAdminStatistics = async () => {
    // const date = getDateByFilter(filter)
    const d = createFormData({})
    const res = await postFormData('/ref_user/getAdminDashboard', d)

    if (res) {
      setAdminStatistics(res)
    }
  }

  if (currentUser?.role !== 'admin') {
    return <></>
  }

  return (
    <div
      className="app"
      style={{
        alignItems: 'center',
        // height: currentPage === 'auth' ? '100vh' : '',
      }}
    >
      <div className="app-header">
        <div className="app-header__container">
          <HeaderLogo />
        </div>
        {/* <Profile
          wallet={wallet}
          isVisible={showProfile}
          setVisible={setShowProfile}
          popupButtons={() => (
            <>
              <Button
                title={'Вывести'}
                handleClick={() => {
                  setShowProfile(false)
                  setShowMoneyPopup(true)
                }}
                disabled={false}
                width={'100%'}
              />
            </>
          )}
          content={() => (
            <>
              <p
                onClick={() => {
                  setCurrentPage('outs')
                  setShowProfile(false)
                }}
              >
                Выводы
              </p>
              <p onClick={settingShow}>Настройки</p>
              <p onClick={gotoSupport}>Поддержка</p>
              <p onClick={logOut}>Выйти</p>
            </>
          )}
        /> */}
      </div>

      <h1 className={classes?.title}>Admin panel</h1>

      <div className={'statistic'}>
        <div className={'statistic__info'}>
          <div className={'statistic__info-container'}>
            <AdminDashboard statistics={adminStatistics} isMobile={isMobile} />
          </div>
        </div>
      </div>

      <h2 className={classes?.stats_title}>Partners</h2>
      <UserAdminTable users={data?.users || []} wallets={{ ...data.walets }} refetch={refetch} />
      <div className={classes?.paginate_wrapper}>
        <Pagination
          count={data?.totalPages || 1}
          onChange={(_, page) => {
            setPage(page)
          }}
          color="primary"
        />
      </div>

      <ToastContainer />
    </div>
  )
}
