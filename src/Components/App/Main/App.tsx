import './App.scss'
import 'react-toastify/dist/ReactToastify.css'

import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/button'
import Auth from '../Auth/Auth'
import Statistic from '../Statistic/Statistic'
import Links from '../Links/Links'
import Referrals from '../Referral/Referral'
import Settings from '../Settings/Settings'
import Outs from '../Outs/Outs'
import { createFormData, get, postFormData } from '../../../services/api'
import { ToastContainer } from 'react-toastify'
import Input from '@/shared/ui/input'
import { useIsMobile, getCurrentUser, useCurrentUser } from '@/shared/lib/hooks'
import { getDateByFilter } from '@/shared/lib/date/get-date-by-filter'
import type { TAppCurrentPage } from './App.types'
import type { TFilterDate, TFullStatistic } from '../Statistic/Statistic.types'
import type { ReferredDto, WalletDto } from '@/entities/user'
import { isAdmin, isDev } from '@/shared/lib/admin/isAdmin'
import { HeaderLogo } from '../../Ui/Header/Header'
import { Profile } from '@/Components/Ui/Profile/Profile'
import { useRouter } from '@tanstack/react-router'

function App() {
  const { isMobile } = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const [showMoneyPopup, setShowMoneyPopup] = useState(false)
  const [email, setEmail] = useState('')
  const [value, setValue] = useState('')

  const [logged, setLogged] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [currentPage, setCurrentPage] = useState<TAppCurrentPage>('statistic')
  const [showProfile, setShowProfile] = useState(false)

  const { currentUser, setCurrentUser } = useCurrentUser()
  const [wallet, setWallet] = useState<WalletDto | undefined>()
  const [refferends, setReferends] = useState<ReferredDto[]>([])
  const [fullStatistic, setFullStatistic] = useState<TFullStatistic>({})
  const [refLinks, setRefLinks] = useState([])
  const [outs, setOuts] = useState([])

  const settingShow = () => {
    setCurrentPage('settings')
    setShowProfile(false)
  }

  const gotoSupport = () => {
    window.location.replace('https://t.me/BebetSupport')
  }

  const logOut = () => {
    localStorage.setItem('reconnect', '')
    window.location.reload()
  }

  useEffect(() => {
    const auth = async () => {
      const data = createFormData({
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password'),
      })

      const authData = await postFormData('/ref_user/auth', data)
      if (authData?.token) {
        localStorage.setItem('token', authData.token)
        let userState = await get('/ref_wallet/getMainWallet')

        if (userState) {
          setWallet(userState)
          setShowAuth(false)
          setLogged(true)
        }
      }
    }

    const condition =
      !localStorage.getItem('token') ||
      !localStorage.getItem('email') ||
      !localStorage.getItem('password') ||
      !localStorage.getItem('reconnect')

    if (!condition && !logged) {
      auth()
    }
  }, [logged])

  const getReferent = async () => {
    let res = await get('/ref_user/getAllReferent')
    if (res) {
      setReferends(res)
    }
  }

  const getFullStatistic = async (filter?: TFilterDate) => {
    const date = getDateByFilter(filter)
    const d = createFormData({ start_date: date })
    const res = await postFormData('/ref_user/getDashboardByDate', d)

    if (res) {
      setFullStatistic(res)
    }
  }

  const updateUserState = async (props: any) => {
    const data = createFormData({
      data: {
        email: props?.email || null,
        password: props?.password || null,
        name: props?.name || null,
        communicationType: props?.communicationType || null,
        partnershipType: props?.partnershipType || null,
      },
    })

    const updatedData = await postFormData('/ref_user/updateData', data)

    if (updatedData) {
      getCurrentUser().then((user) => setCurrentUser(user))
      setCurrentPage('statistic')
    }
  }

  const getRefUrls = async () => {
    const res = await get('/ref_refs/GetByCurrentUser')

    if (res) {
      const parsedData = res.map((item: any) => {
        const newItem = { ...item, url: `${import.meta.env.VITE_FRONT_URL}?ref=${item.ref_string}` }
        return newItem
      })
      setRefLinks(parsedData)
    }
  }

  const getOuts = async () => {
    let res = await get('/out_ref_transaction/getAllRequests')
    if (res) {
      setOuts(res)
    }
  }

  useEffect(() => {
    if (logged) {
      getCurrentUser().then((user) => {
        setCurrentUser(user)

        if (isAdmin(user) && !isDev()) {
          router.navigate({ to: '/admin' })
        }
      })
      getReferent()
      getRefUrls()
      getFullStatistic()
      getOuts()
    }
  }, [logged])

  const moneyReauestPopup = () => {
    const request = async () => {
      let data = createFormData({
        email: email,
        value: value,
      })
      let res = await postFormData('/out_ref_transaction/requestOut', data)
      if (res) {
        setShowMoneyPopup(false)
        getOuts()
      }
    }

    return (
      <div className={'money-request'}>
        <div className={'money-request__closeBtn'} onClick={() => setShowMoneyPopup(false)}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="16" fill="white" />
            <path
              d="M28.331 18.6083C28.6239 18.3154 29.0988 18.3154 29.3917 18.6083C29.6846 18.9012 29.6846 19.3761 29.3917 19.669L25.0606 24L29.3916 28.331C29.6845 28.6239 29.6845 29.0988 29.3916 29.3917C29.0987 29.6846 28.6238 29.6846 28.331 29.3917L23.9999 25.0607L19.6689 29.3917C19.376 29.6846 18.9012 29.6846 18.6083 29.3917C18.3154 29.0988 18.3154 28.6239 18.6083 28.331L22.9393 24L18.6082 19.669C18.3153 19.3761 18.3153 18.9012 18.6082 18.6083C18.9011 18.3154 19.376 18.3154 19.6689 18.6083L23.9999 22.9394L28.331 18.6083Z"
              fill="black"
            />
          </svg>
        </div>

        <div className={'money-request__title'}>
          <p>Вывод средств</p>
        </div>
        <Input onChange={(props) => setEmail(props)} placeHolder={'Email от BeBet'} value={email} told />
        <Input onChange={(props) => setValue(props)} placeHolder={'Сумма вывода'} value={value} told />
        <span>
          Вывод денежных средств осуществляется путем перечисления их на Ваш игровой счет, предварительно
          зарегистрированной в букмекерской компании. Обращаем внимание, что игровой аккаунт не должен быть
          зарегистрирован по Вашей реферальной ссылке или с использованием Вашего промокода.
        </span>
        <Button title={'Вывести'} handleClick={request} disabled={false} width={'100%'} />
      </div>
    )
  }

  const CurrentPage = () => (
    <>
      {currentPage === 'settings' && logged && <Settings updateUserState={updateUserState} user={currentUser} />}
      {currentPage === 'statistic' && logged && (
        <Statistic fullStatistic={fullStatistic} onChangeDate={getFullStatistic} />
      )}
      {currentPage === 'links' && logged && <Links getRefUrls={getRefUrls} refLinks={refLinks} user={currentUser} />}
      {currentPage === 'referral' && logged && <Referrals referents={refferends} />}
      {currentPage === 'outs' && logged && <Outs outs={outs} />}
    </>
  )

  if (isMobile) {
    return (
      <div className={'mobile-app'}>
        {(showAuth || showMoneyPopup) && <div className={'bg'} />}
        {showMoneyPopup && moneyReauestPopup()}
        <div className="app-header">
          {menuOpen && (
            <div className={'mobile-menu'}>
              <p
                className={currentPage === 'statistic' ? 'selected' : ''}
                onClick={() => {
                  setCurrentPage('statistic')
                  setMenuOpen(false)
                }}
              >
                Статистика
              </p>
              <p
                className={currentPage === 'links' ? 'selected' : ''}
                onClick={() => {
                  setCurrentPage('links')
                  setMenuOpen(false)
                }}
              >
                Мои ссылки
              </p>
              <p
                className={currentPage === 'referral' ? 'selected' : ''}
                onClick={() => {
                  setCurrentPage('referral')
                  setMenuOpen(false)
                }}
              >
                Мои рефералы
              </p>
            </div>
          )}
          <div className="app-header__wrapper">
            <div className={logged ? 'app-header__menu' : 'displaynone'}>
              {menuOpen ? (
                <svg
                  onClick={() => setMenuOpen(false)}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.22468 4.81096C5.83416 4.42044 5.201 4.42044 4.81047 4.81096C4.41995 5.20148 4.41995 5.83465 4.81047 6.22517L10.5852 11.9999L4.81053 17.7746C4.42001 18.1651 4.42001 18.7983 4.81053 19.1888C5.20106 19.5793 5.83422 19.5793 6.22474 19.1888L11.9994 13.4141L17.7741 19.1888C18.1646 19.5793 18.7978 19.5793 19.1883 19.1888C19.5788 18.7983 19.5788 18.1651 19.1883 17.7746L13.4136 11.9999L19.1884 6.22517C19.5789 5.83465 19.5789 5.20148 19.1884 4.81096C18.7978 4.42044 18.1647 4.42044 17.7742 4.81096L11.9994 10.5857L6.22468 4.81096Z"
                    fill="#E8EAED"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setMenuOpen(true)}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
                    fill="white"
                  />
                  <path
                    d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z"
                    fill="white"
                  />
                  <path
                    d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z"
                    fill="white"
                  />
                </svg>
              )}
            </div>
            <HeaderLogo />
          </div>

          {logged ? (
            <Profile
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
            />
          ) : (
            <Button title={'Войти'} handleClick={() => setShowAuth(true)} disabled={false} />
          )}
        </div>

        {!logged && (
          <Auth
            setWallet={setWallet}
            showAuth={showAuth}
            setLogged={() => setLogged(true)}
            setShowAuth={() => setShowAuth(false)}
          />
        )}

        <CurrentPage />
      </div>
    )
  }

  return (
    <div
      className="app"
      style={{
        alignItems: currentPage === 'settings' && !isMobile ? 'flex-start' : 'center',
        height: currentPage === 'auth' ? '100vh' : '',
      }}
    >
      {(showAuth || showMoneyPopup) && <div className={'bg'} />}
      {showMoneyPopup && moneyReauestPopup()}
      <div className="app-header">
        <HeaderLogo />
        {logged && (
          <div className="app-header__container">
            <p className={currentPage === 'statistic' ? 'selected' : ''} onClick={() => setCurrentPage('statistic')}>
              Статистика
            </p>
            <p className={currentPage === 'links' ? 'selected' : ''} onClick={() => setCurrentPage('links')}>
              Мои ссылки
            </p>
            <p className={currentPage === 'referral' ? 'selected' : ''} onClick={() => setCurrentPage('referral')}>
              Мои рефералы
            </p>
          </div>
        )}
        {logged ? (
          <Profile
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
          />
        ) : (
          <Button title={'Войти'} handleClick={() => setShowAuth(true)} disabled={false} width={'15%'} />
        )}
      </div>

      {!logged && (
        <Auth
          setWallet={setWallet}
          showAuth={showAuth}
          setLogged={() => setLogged(true)}
          setShowAuth={() => setShowAuth(false)}
        />
      )}

      <CurrentPage />
      <ToastContainer />
    </div>
  )
}

export default App
