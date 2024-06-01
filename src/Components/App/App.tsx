import './App.scss'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/button'
import Auth from './Auth/Auth'
import Statistic, { Filters } from './Statistic/Statistic'
import Links from './Links/Links'
import Referral from './Referral/Referral'
import Settings from './Settings/Settings'
import Outs from './Outs/Outs'
import { createFormData, get, postFormData } from '../../services/api'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Input from '@/shared/ui/input'
import { useIsMobile } from '@/shared/lib/hooks'
import { getDateByFilter } from '@/shared/lib/date/get-date-by-filter'
import { Link, redirect } from '@tanstack/react-router'
import { getCurrentUser, useCurrentUser } from '@/hooks/useCurrentUser'

function App() {
  const { isMobile } = useIsMobile()

  const [menuOpen, setMenuOpen] = useState(false)

  const [showMoneyPopup, setShowMoneyPopup] = useState(false)
  const [email, setEmail] = useState('')
  const [value, setValue] = useState('')

  const [logged, setLogged] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [currentPage, setCurrentPage] = useState('statistic')
  const [showProfile, setShowProfile] = useState(false)

  const { currentUser, setCurrentUser } = useCurrentUser()
  const [profile, setProfile] = useState<any>({})
  const [referent, setReferent] = useState([])
  const [fullStatistic, setFullStatistic] = useState([])
  const [refLinks, setRefLinks] = useState([])
  const [outs, setOuts] = useState([])

  const settingShow = () => {
    setCurrentPage('settings')
    setShowProfile(false)
  }

  const getSupport = () => {
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
        console.log('userState', userState)

        if (userState) {
          setProfile(userState)
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
      setReferent(res)
    }
  }

  const getFullStatistic = async (filter?: Filters) => {
    const date = getDateByFilter(filter)
    const d = createFormData({ start_date: date })
    let res = await postFormData('/ref_user/getDashboardByDate', d)
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
        const newItem = item
        newItem.url = `${import.meta.env.VITE_FRONT_URL}?ref=${item.ref_string}`

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
      getCurrentUser().then((user) => setCurrentUser(user))
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
          <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='48' height='48' rx='16' fill='white' />
            <path
              d='M28.331 18.6083C28.6239 18.3154 29.0988 18.3154 29.3917 18.6083C29.6846 18.9012 29.6846 19.3761 29.3917 19.669L25.0606 24L29.3916 28.331C29.6845 28.6239 29.6845 29.0988 29.3916 29.3917C29.0987 29.6846 28.6238 29.6846 28.331 29.3917L23.9999 25.0607L19.6689 29.3917C19.376 29.6846 18.9012 29.6846 18.6083 29.3917C18.3154 29.0988 18.3154 28.6239 18.6083 28.331L22.9393 24L18.6082 19.669C18.3153 19.3761 18.3153 18.9012 18.6082 18.6083C18.9011 18.3154 19.376 18.3154 19.6689 18.6083L23.9999 22.9394L28.331 18.6083Z'
              fill='black'
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

  if (currentUser?.role === 'super_admin') {
    redirect({ to: `/admin` })
  }

  if (isMobile) {
    return (
      <div className={'mobile-app'}>
        {(showAuth || showMoneyPopup) && <div className={'bg'} />}
        {showMoneyPopup && moneyReauestPopup()}
        <div className='app-header'>
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
          <div className='app-header__wrapper'>
            <div className={logged ? 'app-header__menu' : 'displaynone'}>
              {menuOpen ? (
                <svg
                  onClick={() => setMenuOpen(false)}
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M6.22468 4.81096C5.83416 4.42044 5.201 4.42044 4.81047 4.81096C4.41995 5.20148 4.41995 5.83465 4.81047 6.22517L10.5852 11.9999L4.81053 17.7746C4.42001 18.1651 4.42001 18.7983 4.81053 19.1888C5.20106 19.5793 5.83422 19.5793 6.22474 19.1888L11.9994 13.4141L17.7741 19.1888C18.1646 19.5793 18.7978 19.5793 19.1883 19.1888C19.5788 18.7983 19.5788 18.1651 19.1883 17.7746L13.4136 11.9999L19.1884 6.22517C19.5789 5.83465 19.5789 5.20148 19.1884 4.81096C18.7978 4.42044 18.1647 4.42044 17.7742 4.81096L11.9994 10.5857L6.22468 4.81096Z'
                    fill='#E8EAED'
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setMenuOpen(true)}
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z'
                    fill='white'
                  />
                  <path
                    d='M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z'
                    fill='white'
                  />
                  <path
                    d='M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z'
                    fill='white'
                  />
                </svg>
              )}
            </div>
            <div className='app-header__logo'>
              <svg width='72' height='20' viewBox='0 0 72 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M1 18.1797L4.59766 1H10.4688C11.7422 1 12.6328 1.03906 13.1406 1.11719C13.9844 1.23438 14.6992 1.46875 15.2852 1.82031C15.8711 2.17188 16.3164 2.64062 16.6211 3.22656C16.9258 3.8125 17.0781 4.46094 17.0781 5.17188C17.0781 6.125 16.8125 6.95312 16.2812 7.65625C15.75 8.35156 14.9297 8.87891 13.8203 9.23828C14.7031 9.48047 15.3906 9.91406 15.8828 10.5391C16.3828 11.1562 16.6328 11.8555 16.6328 12.6367C16.6328 13.668 16.3398 14.6484 15.7539 15.5781C15.168 16.5 14.3594 17.1641 13.3281 17.5703C12.2969 17.9766 10.8867 18.1797 9.09766 18.1797H1ZM6.67188 7.9375H9.36719C10.5781 7.9375 11.4492 7.85156 11.9805 7.67969C12.5117 7.50781 12.9102 7.22656 13.1758 6.83594C13.4414 6.44531 13.5742 6.02734 13.5742 5.58203C13.5742 5.14453 13.4492 4.78516 13.1992 4.50391C12.9492 4.22266 12.5938 4.03516 12.1328 3.94141C11.875 3.89453 11.2539 3.87109 10.2695 3.87109H7.52734L6.67188 7.9375ZM5.11328 15.4141H8.52344C9.95312 15.4141 10.9102 15.3242 11.3945 15.1445C11.8867 14.957 12.2773 14.6523 12.5664 14.2305C12.8633 13.8086 13.0117 13.3633 13.0117 12.8945C13.0117 12.3242 12.8008 11.8555 12.3789 11.4883C11.957 11.1133 11.2539 10.9258 10.2695 10.9258H6.05078L5.11328 15.4141Z'
                  fill='#E8EAED'
                />
                <path
                  d='M30.4609 13H22.0234C22.0156 13.1328 22.0117 13.2344 22.0117 13.3047C22.0117 14.1328 22.2461 14.8008 22.7148 15.3086C23.1914 15.8164 23.7695 16.0703 24.4492 16.0703C25.5664 16.0703 26.4375 15.4922 27.0625 14.3359L30.0742 14.8398C29.4883 16.0508 28.7031 16.9609 27.7188 17.5703C26.7422 18.1719 25.6445 18.4727 24.4258 18.4727C22.7539 18.4727 21.3945 17.9453 20.3477 16.8906C19.3008 15.8281 18.7773 14.4258 18.7773 12.6836C18.7773 10.9805 19.25 9.46484 20.1953 8.13672C21.4844 6.33984 23.3242 5.44141 25.7148 5.44141C27.2383 5.44141 28.4492 5.91406 29.3477 6.85938C30.2461 7.79688 30.6953 9.11328 30.6953 10.8086C30.6953 11.6211 30.6172 12.3516 30.4609 13ZM27.625 10.9492C27.6328 10.8008 27.6367 10.6875 27.6367 10.6094C27.6367 9.6875 27.4297 8.99609 27.0156 8.53516C26.6016 8.07422 26.0469 7.84375 25.3516 7.84375C24.6562 7.84375 24.0312 8.10547 23.4766 8.62891C22.9297 9.15234 22.5586 9.92578 22.3633 10.9492H27.625Z'
                  fill='#E8EAED'
                />
                <path
                  d='M31.7031 18.1797L35.3008 1H41.1719C42.4453 1 43.3359 1.03906 43.8438 1.11719C44.6875 1.23438 45.4023 1.46875 45.9883 1.82031C46.5742 2.17188 47.0195 2.64062 47.3242 3.22656C47.6289 3.8125 47.7812 4.46094 47.7812 5.17188C47.7812 6.125 47.5156 6.95312 46.9844 7.65625C46.4531 8.35156 45.6328 8.87891 44.5234 9.23828C45.4062 9.48047 46.0938 9.91406 46.5859 10.5391C47.0859 11.1562 47.3359 11.8555 47.3359 12.6367C47.3359 13.668 47.043 14.6484 46.457 15.5781C45.8711 16.5 45.0625 17.1641 44.0312 17.5703C43 17.9766 41.5898 18.1797 39.8008 18.1797H31.7031ZM37.375 7.9375H40.0703C41.2812 7.9375 42.1523 7.85156 42.6836 7.67969C43.2148 7.50781 43.6133 7.22656 43.8789 6.83594C44.1445 6.44531 44.2773 6.02734 44.2773 5.58203C44.2773 5.14453 44.1523 4.78516 43.9023 4.50391C43.6523 4.22266 43.2969 4.03516 42.8359 3.94141C42.5781 3.89453 41.957 3.87109 40.9727 3.87109H38.2305L37.375 7.9375ZM35.8164 15.4141H39.2266C40.6562 15.4141 41.6133 15.3242 42.0977 15.1445C42.5898 14.957 42.9805 14.6523 43.2695 14.2305C43.5664 13.8086 43.7148 13.3633 43.7148 12.8945C43.7148 12.3242 43.5039 11.8555 43.082 11.4883C42.6602 11.1133 41.957 10.9258 40.9727 10.9258H36.7539L35.8164 15.4141Z'
                  fill='#0085FF'
                />
                <path
                  d='M61.1641 13H52.7266C52.7188 13.1328 52.7148 13.2344 52.7148 13.3047C52.7148 14.1328 52.9492 14.8008 53.418 15.3086C53.8945 15.8164 54.4727 16.0703 55.1523 16.0703C56.2695 16.0703 57.1406 15.4922 57.7656 14.3359L60.7773 14.8398C60.1914 16.0508 59.4062 16.9609 58.4219 17.5703C57.4453 18.1719 56.3477 18.4727 55.1289 18.4727C53.457 18.4727 52.0977 17.9453 51.0508 16.8906C50.0039 15.8281 49.4805 14.4258 49.4805 12.6836C49.4805 10.9805 49.9531 9.46484 50.8984 8.13672C52.1875 6.33984 54.0273 5.44141 56.418 5.44141C57.9414 5.44141 59.1523 5.91406 60.0508 6.85938C60.9492 7.79688 61.3984 9.11328 61.3984 10.8086C61.3984 11.6211 61.3203 12.3516 61.1641 13ZM58.3281 10.9492C58.3359 10.8008 58.3398 10.6875 58.3398 10.6094C58.3398 9.6875 58.1328 8.99609 57.7188 8.53516C57.3047 8.07422 56.75 7.84375 56.0547 7.84375C55.3594 7.84375 54.7344 8.10547 54.1797 8.62891C53.6328 9.15234 53.2617 9.92578 53.0664 10.9492H58.3281Z'
                  fill='#0085FF'
                />
                <path
                  d='M63.25 8.23047L63.7656 5.73438H65.4062L65.8164 3.74219L69.6719 1.42188L68.7695 5.73438H70.8203L70.3047 8.23047H68.2422L67.1523 13.4453C66.957 14.3906 66.8594 14.9297 66.8594 15.0625C66.8594 15.3203 66.9414 15.5234 67.1055 15.6719C67.2695 15.8125 67.5664 15.8828 67.9961 15.8828C68.1445 15.8828 68.5156 15.8555 69.1094 15.8008L68.582 18.2969C68.0039 18.4141 67.4102 18.4727 66.8008 18.4727C65.6133 18.4727 64.75 18.2461 64.2109 17.793C63.6719 17.332 63.4023 16.6953 63.4023 15.8828C63.4023 15.5 63.5469 14.6172 63.8359 13.2344L64.8789 8.23047H63.25Z'
                  fill='#0085FF'
                />
              </svg>
            </div>
          </div>

          {logged ? (
            <div className={'profile'} onClick={() => setShowProfile(!showProfile)}>
              <div className={'profile__balance'}>
                <p>
                  {profile?.value && profile.value.toFixed(0)} {profile.currency}
                </p>
              </div>
              <div className={'profile__avatar'}>
                <svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <rect width='42' height='42' rx='8' fill='#242731' />
                  <path
                    d='M14.0781 23.4805L16.2227 23.293C16.3242 24.1523 16.5586 24.8594 16.9258 25.4141C17.3008 25.9609 17.8789 26.4062 18.6602 26.75C19.4414 27.0859 20.3203 27.2539 21.2969 27.2539C22.1641 27.2539 22.9297 27.125 23.5938 26.8672C24.2578 26.6094 24.75 26.2578 25.0703 25.8125C25.3984 25.3594 25.5625 24.8672 25.5625 24.3359C25.5625 23.7969 25.4062 23.3281 25.0938 22.9297C24.7812 22.5234 24.2656 22.1836 23.5469 21.9102C23.0859 21.7305 22.0664 21.4531 20.4883 21.0781C18.9102 20.6953 17.8047 20.3359 17.1719 20C16.3516 19.5703 15.7383 19.0391 15.332 18.4062C14.9336 17.7656 14.7344 17.0508 14.7344 16.2617C14.7344 15.3945 14.9805 14.5859 15.4727 13.8359C15.9648 13.0781 16.6836 12.5039 17.6289 12.1133C18.5742 11.7227 19.625 11.5273 20.7812 11.5273C22.0547 11.5273 23.1758 11.7344 24.1445 12.1484C25.1211 12.5547 25.8711 13.1562 26.3945 13.9531C26.918 14.75 27.1992 15.6523 27.2383 16.6602L25.0586 16.8242C24.9414 15.7383 24.543 14.918 23.8633 14.3633C23.1914 13.8086 22.1953 13.5312 20.875 13.5312C19.5 13.5312 18.4961 13.7852 17.8633 14.293C17.2383 14.793 16.9258 15.3984 16.9258 16.1094C16.9258 16.7266 17.1484 17.2344 17.5938 17.6328C18.0312 18.0312 19.1719 18.4414 21.0156 18.8633C22.8672 19.2773 24.1367 19.6406 24.8242 19.9531C25.8242 20.4141 26.5625 21 27.0391 21.7109C27.5156 22.4141 27.7539 23.2266 27.7539 24.1484C27.7539 25.0625 27.4922 25.9258 26.9688 26.7383C26.4453 27.543 25.6914 28.1719 24.707 28.625C23.7305 29.0703 22.6289 29.293 21.4023 29.293C19.8477 29.293 18.543 29.0664 17.4883 28.6133C16.4414 28.1602 15.6172 27.4805 15.0156 26.5742C14.4219 25.6602 14.1094 24.6289 14.0781 23.4805Z'
                    fill='white'
                  />
                </svg>
              </div>

              {showProfile && (
                <div className={'profile__popup'}>
                  <div className={'profile__popup-buttons'}>
                    <Button
                      title={'Вывести'}
                      handleClick={() => {
                        setShowProfile(false)
                        setShowMoneyPopup(true)
                      }}
                      disabled={false}
                      width={'100%'}
                    />
                  </div>
                  <p
                    onClick={() => {
                      setCurrentPage('outs')
                      setMenuOpen(false)
                    }}
                  >
                    Выводы
                  </p>
                  <p onClick={settingShow}>Настройки</p>
                  {currentUser?.role === 'super_admin' && <Link to={'/admin'}>Перейти в админ панель</Link>}
                  <p onClick={getSupport}>Поддержка</p>
                  <p onClick={logOut}>Выйти</p>
                </div>
              )}
            </div>
          ) : (
            <Button title={'Войти'} handleClick={() => setShowAuth(true)} disabled={false} />
          )}
        </div>

        {!logged && (
          <Auth
            setProfile={setProfile}
            showAuth={showAuth}
            setLogged={() => setLogged(true)}
            setShowAuth={() => setShowAuth(false)}
          />
        )}

        {currentPage === 'settings' && logged && <Settings updateUserState={updateUserState} user={currentUser} />}
        {currentPage === 'statistic' && logged && (
          <Statistic fullStatistic={fullStatistic} onChangeDate={getFullStatistic} />
        )}
        {currentPage === 'links' && logged && <Links getRefUrls={getRefUrls} refLinks={refLinks} user={currentUser} />}
        {currentPage === 'referral' && logged && <Referral referent={referent} />}
        {currentPage === 'outs' && logged && <Outs outs={outs} />}
      </div>
    )
  }

  return (
    <div
      className='app'
      style={{
        alignItems: currentPage === 'settings' && !isMobile ? 'flex-start' : 'center',
        height: currentPage === 'auth' ? '100vh' : '',
      }}
    >
      {(showAuth || showMoneyPopup) && <div className={'bg'} />}
      {showMoneyPopup && moneyReauestPopup()}
      <div className='app-header'>
        <div className='app-header__logo'>
          <svg width='72' height='20' viewBox='0 0 72 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M1 18.1797L4.59766 1H10.4688C11.7422 1 12.6328 1.03906 13.1406 1.11719C13.9844 1.23438 14.6992 1.46875 15.2852 1.82031C15.8711 2.17188 16.3164 2.64062 16.6211 3.22656C16.9258 3.8125 17.0781 4.46094 17.0781 5.17188C17.0781 6.125 16.8125 6.95312 16.2812 7.65625C15.75 8.35156 14.9297 8.87891 13.8203 9.23828C14.7031 9.48047 15.3906 9.91406 15.8828 10.5391C16.3828 11.1562 16.6328 11.8555 16.6328 12.6367C16.6328 13.668 16.3398 14.6484 15.7539 15.5781C15.168 16.5 14.3594 17.1641 13.3281 17.5703C12.2969 17.9766 10.8867 18.1797 9.09766 18.1797H1ZM6.67188 7.9375H9.36719C10.5781 7.9375 11.4492 7.85156 11.9805 7.67969C12.5117 7.50781 12.9102 7.22656 13.1758 6.83594C13.4414 6.44531 13.5742 6.02734 13.5742 5.58203C13.5742 5.14453 13.4492 4.78516 13.1992 4.50391C12.9492 4.22266 12.5938 4.03516 12.1328 3.94141C11.875 3.89453 11.2539 3.87109 10.2695 3.87109H7.52734L6.67188 7.9375ZM5.11328 15.4141H8.52344C9.95312 15.4141 10.9102 15.3242 11.3945 15.1445C11.8867 14.957 12.2773 14.6523 12.5664 14.2305C12.8633 13.8086 13.0117 13.3633 13.0117 12.8945C13.0117 12.3242 12.8008 11.8555 12.3789 11.4883C11.957 11.1133 11.2539 10.9258 10.2695 10.9258H6.05078L5.11328 15.4141Z'
              fill='#E8EAED'
            />
            <path
              d='M30.4609 13H22.0234C22.0156 13.1328 22.0117 13.2344 22.0117 13.3047C22.0117 14.1328 22.2461 14.8008 22.7148 15.3086C23.1914 15.8164 23.7695 16.0703 24.4492 16.0703C25.5664 16.0703 26.4375 15.4922 27.0625 14.3359L30.0742 14.8398C29.4883 16.0508 28.7031 16.9609 27.7188 17.5703C26.7422 18.1719 25.6445 18.4727 24.4258 18.4727C22.7539 18.4727 21.3945 17.9453 20.3477 16.8906C19.3008 15.8281 18.7773 14.4258 18.7773 12.6836C18.7773 10.9805 19.25 9.46484 20.1953 8.13672C21.4844 6.33984 23.3242 5.44141 25.7148 5.44141C27.2383 5.44141 28.4492 5.91406 29.3477 6.85938C30.2461 7.79688 30.6953 9.11328 30.6953 10.8086C30.6953 11.6211 30.6172 12.3516 30.4609 13ZM27.625 10.9492C27.6328 10.8008 27.6367 10.6875 27.6367 10.6094C27.6367 9.6875 27.4297 8.99609 27.0156 8.53516C26.6016 8.07422 26.0469 7.84375 25.3516 7.84375C24.6562 7.84375 24.0312 8.10547 23.4766 8.62891C22.9297 9.15234 22.5586 9.92578 22.3633 10.9492H27.625Z'
              fill='#E8EAED'
            />
            <path
              d='M31.7031 18.1797L35.3008 1H41.1719C42.4453 1 43.3359 1.03906 43.8438 1.11719C44.6875 1.23438 45.4023 1.46875 45.9883 1.82031C46.5742 2.17188 47.0195 2.64062 47.3242 3.22656C47.6289 3.8125 47.7812 4.46094 47.7812 5.17188C47.7812 6.125 47.5156 6.95312 46.9844 7.65625C46.4531 8.35156 45.6328 8.87891 44.5234 9.23828C45.4062 9.48047 46.0938 9.91406 46.5859 10.5391C47.0859 11.1562 47.3359 11.8555 47.3359 12.6367C47.3359 13.668 47.043 14.6484 46.457 15.5781C45.8711 16.5 45.0625 17.1641 44.0312 17.5703C43 17.9766 41.5898 18.1797 39.8008 18.1797H31.7031ZM37.375 7.9375H40.0703C41.2812 7.9375 42.1523 7.85156 42.6836 7.67969C43.2148 7.50781 43.6133 7.22656 43.8789 6.83594C44.1445 6.44531 44.2773 6.02734 44.2773 5.58203C44.2773 5.14453 44.1523 4.78516 43.9023 4.50391C43.6523 4.22266 43.2969 4.03516 42.8359 3.94141C42.5781 3.89453 41.957 3.87109 40.9727 3.87109H38.2305L37.375 7.9375ZM35.8164 15.4141H39.2266C40.6562 15.4141 41.6133 15.3242 42.0977 15.1445C42.5898 14.957 42.9805 14.6523 43.2695 14.2305C43.5664 13.8086 43.7148 13.3633 43.7148 12.8945C43.7148 12.3242 43.5039 11.8555 43.082 11.4883C42.6602 11.1133 41.957 10.9258 40.9727 10.9258H36.7539L35.8164 15.4141Z'
              fill='#0085FF'
            />
            <path
              d='M61.1641 13H52.7266C52.7188 13.1328 52.7148 13.2344 52.7148 13.3047C52.7148 14.1328 52.9492 14.8008 53.418 15.3086C53.8945 15.8164 54.4727 16.0703 55.1523 16.0703C56.2695 16.0703 57.1406 15.4922 57.7656 14.3359L60.7773 14.8398C60.1914 16.0508 59.4062 16.9609 58.4219 17.5703C57.4453 18.1719 56.3477 18.4727 55.1289 18.4727C53.457 18.4727 52.0977 17.9453 51.0508 16.8906C50.0039 15.8281 49.4805 14.4258 49.4805 12.6836C49.4805 10.9805 49.9531 9.46484 50.8984 8.13672C52.1875 6.33984 54.0273 5.44141 56.418 5.44141C57.9414 5.44141 59.1523 5.91406 60.0508 6.85938C60.9492 7.79688 61.3984 9.11328 61.3984 10.8086C61.3984 11.6211 61.3203 12.3516 61.1641 13ZM58.3281 10.9492C58.3359 10.8008 58.3398 10.6875 58.3398 10.6094C58.3398 9.6875 58.1328 8.99609 57.7188 8.53516C57.3047 8.07422 56.75 7.84375 56.0547 7.84375C55.3594 7.84375 54.7344 8.10547 54.1797 8.62891C53.6328 9.15234 53.2617 9.92578 53.0664 10.9492H58.3281Z'
              fill='#0085FF'
            />
            <path
              d='M63.25 8.23047L63.7656 5.73438H65.4062L65.8164 3.74219L69.6719 1.42188L68.7695 5.73438H70.8203L70.3047 8.23047H68.2422L67.1523 13.4453C66.957 14.3906 66.8594 14.9297 66.8594 15.0625C66.8594 15.3203 66.9414 15.5234 67.1055 15.6719C67.2695 15.8125 67.5664 15.8828 67.9961 15.8828C68.1445 15.8828 68.5156 15.8555 69.1094 15.8008L68.582 18.2969C68.0039 18.4141 67.4102 18.4727 66.8008 18.4727C65.6133 18.4727 64.75 18.2461 64.2109 17.793C63.6719 17.332 63.4023 16.6953 63.4023 15.8828C63.4023 15.5 63.5469 14.6172 63.8359 13.2344L64.8789 8.23047H63.25Z'
              fill='#0085FF'
            />
          </svg>
        </div>
        {logged && (
          <div className='app-header__container'>
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
          <div className={'profile'} onClick={() => setShowProfile(!showProfile)}>
            <div className={'profile__balance'}>
              <p>
                {profile?.value && profile.value.toFixed(0)} {profile.currency}
              </p>
            </div>
            <div className={'profile__avatar'}>
              <svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <rect width='42' height='42' rx='8' fill='#242731' />
                <path
                  d='M14.0781 23.4805L16.2227 23.293C16.3242 24.1523 16.5586 24.8594 16.9258 25.4141C17.3008 25.9609 17.8789 26.4062 18.6602 26.75C19.4414 27.0859 20.3203 27.2539 21.2969 27.2539C22.1641 27.2539 22.9297 27.125 23.5938 26.8672C24.2578 26.6094 24.75 26.2578 25.0703 25.8125C25.3984 25.3594 25.5625 24.8672 25.5625 24.3359C25.5625 23.7969 25.4062 23.3281 25.0938 22.9297C24.7812 22.5234 24.2656 22.1836 23.5469 21.9102C23.0859 21.7305 22.0664 21.4531 20.4883 21.0781C18.9102 20.6953 17.8047 20.3359 17.1719 20C16.3516 19.5703 15.7383 19.0391 15.332 18.4062C14.9336 17.7656 14.7344 17.0508 14.7344 16.2617C14.7344 15.3945 14.9805 14.5859 15.4727 13.8359C15.9648 13.0781 16.6836 12.5039 17.6289 12.1133C18.5742 11.7227 19.625 11.5273 20.7812 11.5273C22.0547 11.5273 23.1758 11.7344 24.1445 12.1484C25.1211 12.5547 25.8711 13.1562 26.3945 13.9531C26.918 14.75 27.1992 15.6523 27.2383 16.6602L25.0586 16.8242C24.9414 15.7383 24.543 14.918 23.8633 14.3633C23.1914 13.8086 22.1953 13.5312 20.875 13.5312C19.5 13.5312 18.4961 13.7852 17.8633 14.293C17.2383 14.793 16.9258 15.3984 16.9258 16.1094C16.9258 16.7266 17.1484 17.2344 17.5938 17.6328C18.0312 18.0312 19.1719 18.4414 21.0156 18.8633C22.8672 19.2773 24.1367 19.6406 24.8242 19.9531C25.8242 20.4141 26.5625 21 27.0391 21.7109C27.5156 22.4141 27.7539 23.2266 27.7539 24.1484C27.7539 25.0625 27.4922 25.9258 26.9688 26.7383C26.4453 27.543 25.6914 28.1719 24.707 28.625C23.7305 29.0703 22.6289 29.293 21.4023 29.293C19.8477 29.293 18.543 29.0664 17.4883 28.6133C16.4414 28.1602 15.6172 27.4805 15.0156 26.5742C14.4219 25.6602 14.1094 24.6289 14.0781 23.4805Z'
                  fill='white'
                />
              </svg>
            </div>

            {showProfile && (
              <div className={'profile__popup'}>
                <div className={'profile__popup-buttons'}>
                  <Button
                    title={'Вывести'}
                    handleClick={() => {
                      setShowProfile(false)
                      setShowMoneyPopup(true)
                    }}
                    disabled={false}
                    width={'100%'}
                  />
                </div>
                <p
                  onClick={() => {
                    setCurrentPage('outs')
                    setShowProfile(false)
                  }}
                >
                  Выводы
                </p>
                <p onClick={settingShow}>Настройки</p>
                {currentUser?.role === 'super_admin' && <Link to={'/admin'}>Перейти в админ панель</Link>}
                <p onClick={getSupport}>Поддержка</p>
                <p onClick={logOut}>Выйти</p>
              </div>
            )}
          </div>
        ) : (
          <Button title={'Войти'} handleClick={() => setShowAuth(true)} disabled={false} width={'15%'} />
        )}
      </div>

      {!logged && (
        <Auth
          setProfile={setProfile}
          showAuth={showAuth}
          setLogged={() => setLogged(true)}
          setShowAuth={() => setShowAuth(!showAuth)}
        />
      )}
      {currentPage === 'statistic' && logged && (
        <Statistic onChangeDate={getFullStatistic} fullStatistic={fullStatistic} />
      )}
      {currentPage === 'links' && logged && <Links getRefUrls={getRefUrls} refLinks={refLinks} user={currentUser} />}
      {currentPage === 'referral' && logged && <Referral referent={referent} />}
      {currentPage === 'settings' && logged && <Settings updateUserState={updateUserState} user={currentUser} />}
      {currentPage === 'outs' && logged && <Outs outs={outs} />}
      <ToastContainer />
    </div>
  )
}

export default App
