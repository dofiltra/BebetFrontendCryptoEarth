import './Auth.scss'
import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import UiCheckBox from '../../Ui/CheckBox/UiCheckBox'
import { createFormData, get, postFormData } from '../../../services/api'
import Input from '@/shared/ui/input'
import UiSelector from '../../Ui/UiSelector/UiSelector'
import { useIsMobile } from '@/shared/lib/hooks/use-is-mobile'
import { ResetPasswordModal } from '@/features/reset-password'

const footerPoints = [
  {
    title: 'Монетизируем любой азартный трафик',
  },
  {
    title: 'Удобные способы вывода заработка',
  },
  {
    title: 'Личный продукт, а значит лучшие показатели',
  },
  {
    title: 'Лучшие условия для новых партнеров',
  },
]

interface IAppProps {
  showAuth: boolean
  setLogged: () => void
  setProfile: any
  setShowAuth: () => void
}

const Auth: React.FC<IAppProps> = ({ showAuth, setLogged, setShowAuth, setProfile }) => {
  const { isMobile } = useIsMobile()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [communicationType, setCommunicationType] = useState('')
  const [link, setLink] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [trafficSource] = useState('')
  const [refCode] = useState('')
  const [partnershipType] = useState('Rev. Share')
  const [imOlder, setImOlder] = useState(false)

  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')

  const auth = async () => {
    let data = createFormData({ email: email, password: password })
    let res = await postFormData('/ref_user/auth', data)

    if (res.token) {
      localStorage.setItem('token', res.token)
      localStorage.setItem('email', email)
      localStorage.setItem('password', password)
      localStorage.setItem('reconnect', password)

      setLogged()
      let userState = await get('/ref_wallet/getMainWallet')
      if (userState) {
        setProfile(userState)
        setShowAuth()
        setLogged()
      }
    }
  }

  const reg = async () => {
    if (!email) {
      setError('email')
      setDisabled(true)
      return
    }
    if (!partnershipType) {
      setError('typeOfCooperation')
      setDisabled(true)
      return
    }
    if (!communicationType) {
      setError('communicationType')
      setDisabled(true)
      return
    }
    if (!name) {
      setError('name')
      setDisabled(true)
      return
    }
    if (!imOlder) {
      setError('imOlder')
      setDisabled(true)
      return
    }
    if (!password || !confirmPassword || password !== confirmPassword) {
      setError('password')
      setDisabled(true)
      return
    }
    setDisabled(false)

    const formData = createFormData({
      name,
      email,
      partnershipType,
      communicationType,
      reference: link || '',
      password,
      trafficSource,
      promocode: refCode || '',
    })
    const res = await postFormData('/ref_auth/registrate', formData)

    if (res) {
      await auth()
    }
  }

  const loginComp = () => {
    return (
      <div className={'login'}>
        <div className={'login__closeBtn'} onClick={setShowAuth}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="16" fill="white" />
            <path
              d="M28.331 18.6083C28.6239 18.3154 29.0988 18.3154 29.3917 18.6083C29.6846 18.9012 29.6846 19.3761 29.3917 19.669L25.0606 24L29.3916 28.331C29.6845 28.6239 29.6845 29.0988 29.3916 29.3917C29.0987 29.6846 28.6238 29.6846 28.331 29.3917L23.9999 25.0607L19.6689 29.3917C19.376 29.6846 18.9012 29.6846 18.6083 29.3917C18.3154 29.0988 18.3154 28.6239 18.6083 28.331L22.9393 24L18.6082 19.669C18.3153 19.3761 18.3153 18.9012 18.6082 18.6083C18.9011 18.3154 19.376 18.3154 19.6689 18.6083L23.9999 22.9394L28.331 18.6083Z"
              fill="black"
            />
          </svg>
        </div>
        <div className={'login__logo'}>
          <svg width="69" height="19" viewBox="0 0 69 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.757812 0.820312H7.625C8.98438 0.820312 9.99609 0.878906 10.6602 0.996094C11.332 1.10547 11.9297 1.33984 12.4531 1.69922C12.9844 2.05859 13.4258 2.53906 13.7773 3.14062C14.1289 3.73438 14.3047 4.40234 14.3047 5.14453C14.3047 5.94922 14.0859 6.6875 13.6484 7.35938C13.2188 8.03125 12.6328 8.53516 11.8906 8.87109C12.9375 9.17578 13.7422 9.69531 14.3047 10.4297C14.8672 11.1641 15.1484 12.0273 15.1484 13.0195C15.1484 13.8008 14.9648 14.5625 14.5977 15.3047C14.2383 16.0391 13.7422 16.6289 13.1094 17.0742C12.4844 17.5117 11.7109 17.7812 10.7891 17.8828C10.2109 17.9453 8.81641 17.9844 6.60547 18H0.757812V0.820312ZM4.22656 3.67969V7.65234H6.5C7.85156 7.65234 8.69141 7.63281 9.01953 7.59375C9.61328 7.52344 10.0781 7.32031 10.4141 6.98438C10.7578 6.64062 10.9297 6.19141 10.9297 5.63672C10.9297 5.10547 10.7812 4.67578 10.4844 4.34766C10.1953 4.01172 9.76172 3.80859 9.18359 3.73828C8.83984 3.69922 7.85156 3.67969 6.21875 3.67969H4.22656ZM4.22656 10.5117V15.1055H7.4375C8.6875 15.1055 9.48047 15.0703 9.81641 15C10.332 14.9062 10.75 14.6797 11.0703 14.3203C11.3984 13.9531 11.5625 13.4648 11.5625 12.8555C11.5625 12.3398 11.4375 11.9023 11.1875 11.543C10.9375 11.1836 10.5742 10.9219 10.0977 10.7578C9.62891 10.5938 8.60547 10.5117 7.02734 10.5117H4.22656ZM25.2734 14.0391L28.5547 14.5898C28.1328 15.793 27.4648 16.7109 26.5508 17.3438C25.6445 17.9688 24.5078 18.2812 23.1406 18.2812C20.9766 18.2812 19.375 17.5742 18.3359 16.1602C17.5156 15.0273 17.1055 13.5977 17.1055 11.8711C17.1055 9.80859 17.6445 8.19531 18.7227 7.03125C19.8008 5.85938 21.1641 5.27344 22.8125 5.27344C24.6641 5.27344 26.125 5.88672 27.1953 7.11328C28.2656 8.33203 28.7773 10.2031 28.7305 12.7266H20.4805C20.5039 13.7031 20.7695 14.4648 21.2773 15.0117C21.7852 15.5508 22.418 15.8203 23.1758 15.8203C23.6914 15.8203 24.125 15.6797 24.4766 15.3984C24.8281 15.1172 25.0938 14.6641 25.2734 14.0391ZM25.4609 10.7109C25.4375 9.75781 25.1914 9.03516 24.7227 8.54297C24.2539 8.04297 23.6836 7.79297 23.0117 7.79297C22.293 7.79297 21.6992 8.05469 21.2305 8.57812C20.7617 9.10156 20.5312 9.8125 20.5391 10.7109H25.4609Z"
              fill="#E8EAED"
            />
            <path
              d="M31.4609 0.820312H38.3281C39.6875 0.820312 40.6992 0.878906 41.3633 0.996094C42.0352 1.10547 42.6328 1.33984 43.1562 1.69922C43.6875 2.05859 44.1289 2.53906 44.4805 3.14062C44.832 3.73438 45.0078 4.40234 45.0078 5.14453C45.0078 5.94922 44.7891 6.6875 44.3516 7.35938C43.9219 8.03125 43.3359 8.53516 42.5938 8.87109C43.6406 9.17578 44.4453 9.69531 45.0078 10.4297C45.5703 11.1641 45.8516 12.0273 45.8516 13.0195C45.8516 13.8008 45.668 14.5625 45.3008 15.3047C44.9414 16.0391 44.4453 16.6289 43.8125 17.0742C43.1875 17.5117 42.4141 17.7812 41.4922 17.8828C40.9141 17.9453 39.5195 17.9844 37.3086 18H31.4609V0.820312ZM34.9297 3.67969V7.65234H37.2031C38.5547 7.65234 39.3945 7.63281 39.7227 7.59375C40.3164 7.52344 40.7812 7.32031 41.1172 6.98438C41.4609 6.64062 41.6328 6.19141 41.6328 5.63672C41.6328 5.10547 41.4844 4.67578 41.1875 4.34766C40.8984 4.01172 40.4648 3.80859 39.8867 3.73828C39.543 3.69922 38.5547 3.67969 36.9219 3.67969H34.9297ZM34.9297 10.5117V15.1055H38.1406C39.3906 15.1055 40.1836 15.0703 40.5195 15C41.0352 14.9062 41.4531 14.6797 41.7734 14.3203C42.1016 13.9531 42.2656 13.4648 42.2656 12.8555C42.2656 12.3398 42.1406 11.9023 41.8906 11.543C41.6406 11.1836 41.2773 10.9219 40.8008 10.7578C40.332 10.5938 39.3086 10.5117 37.7305 10.5117H34.9297ZM55.9766 14.0391L59.2578 14.5898C58.8359 15.793 58.168 16.7109 57.2539 17.3438C56.3477 17.9688 55.2109 18.2812 53.8438 18.2812C51.6797 18.2812 50.0781 17.5742 49.0391 16.1602C48.2188 15.0273 47.8086 13.5977 47.8086 11.8711C47.8086 9.80859 48.3477 8.19531 49.4258 7.03125C50.5039 5.85938 51.8672 5.27344 53.5156 5.27344C55.3672 5.27344 56.8281 5.88672 57.8984 7.11328C58.9688 8.33203 59.4805 10.2031 59.4336 12.7266H51.1836C51.207 13.7031 51.4727 14.4648 51.9805 15.0117C52.4883 15.5508 53.1211 15.8203 53.8789 15.8203C54.3945 15.8203 54.8281 15.6797 55.1797 15.3984C55.5312 15.1172 55.7969 14.6641 55.9766 14.0391ZM56.1641 10.7109C56.1406 9.75781 55.8945 9.03516 55.4258 8.54297C54.957 8.04297 54.3867 7.79297 53.7148 7.79297C52.9961 7.79297 52.4023 8.05469 51.9336 8.57812C51.4648 9.10156 51.2344 9.8125 51.2422 10.7109H56.1641ZM67.8359 5.55469V8.17969H65.5859V13.1953C65.5859 14.2109 65.6055 14.8047 65.6445 14.9766C65.6914 15.1406 65.7891 15.2773 65.9375 15.3867C66.0938 15.4961 66.2812 15.5508 66.5 15.5508C66.8047 15.5508 67.2461 15.4453 67.8242 15.2344L68.1055 17.7891C67.3398 18.1172 66.4727 18.2812 65.5039 18.2812C64.9102 18.2812 64.375 18.1836 63.8984 17.9883C63.4219 17.7852 63.0703 17.5273 62.8438 17.2148C62.625 16.8945 62.4727 16.4648 62.3867 15.9258C62.3164 15.543 62.2812 14.7695 62.2812 13.6055V8.17969H60.7695V5.55469H62.2812V3.08203L65.5859 1.16016V5.55469H67.8359Z"
              fill="#0085FF"
            />
          </svg>
        </div>
        <div className={'login__container'}>
          <div className={'login__title'}>
            <p>Войти</p>
          </div>

          <Input onChange={(props) => setEmail(props)} placeHolder={'Email'} value={email} told autocomplete />
          <Input
            onChange={(props) => setPassword(props)}
            placeHolder={'Пароль'}
            value={password}
            hidden
            told
            autocomplete
          />
          <div className={'login__restore'}>
            <ResetPasswordModal renderOpenEl={(handleOpen: () => void) => <p onClick={handleOpen}>Забыли пароль?</p>} />

            <p onClick={setShowAuth}>Нет аккаунта?</p>
          </div>
          <div className={'login__btn'}>
            <Button title={'Войти'} handleClick={auth} disabled={!email || !password} width={'100%'} told />
          </div>
        </div>
      </div>
    )
  }

  const loginMobileComp = () => {
    return (
      <div className={'login'}>
        <div className={'login__closeBtn'} onClick={setShowAuth}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="16" fill="white" />
            <path
              d="M28.331 18.6083C28.6239 18.3154 29.0988 18.3154 29.3917 18.6083C29.6846 18.9012 29.6846 19.3761 29.3917 19.669L25.0606 24L29.3916 28.331C29.6845 28.6239 29.6845 29.0988 29.3916 29.3917C29.0987 29.6846 28.6238 29.6846 28.331 29.3917L23.9999 25.0607L19.6689 29.3917C19.376 29.6846 18.9012 29.6846 18.6083 29.3917C18.3154 29.0988 18.3154 28.6239 18.6083 28.331L22.9393 24L18.6082 19.669C18.3153 19.3761 18.3153 18.9012 18.6082 18.6083C18.9011 18.3154 19.376 18.3154 19.6689 18.6083L23.9999 22.9394L28.331 18.6083Z"
              fill="black"
            />
          </svg>
        </div>
        <div className={'login__logo'}>
          <svg width="69" height="19" viewBox="0 0 69 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.757812 0.820312H7.625C8.98438 0.820312 9.99609 0.878906 10.6602 0.996094C11.332 1.10547 11.9297 1.33984 12.4531 1.69922C12.9844 2.05859 13.4258 2.53906 13.7773 3.14062C14.1289 3.73438 14.3047 4.40234 14.3047 5.14453C14.3047 5.94922 14.0859 6.6875 13.6484 7.35938C13.2188 8.03125 12.6328 8.53516 11.8906 8.87109C12.9375 9.17578 13.7422 9.69531 14.3047 10.4297C14.8672 11.1641 15.1484 12.0273 15.1484 13.0195C15.1484 13.8008 14.9648 14.5625 14.5977 15.3047C14.2383 16.0391 13.7422 16.6289 13.1094 17.0742C12.4844 17.5117 11.7109 17.7812 10.7891 17.8828C10.2109 17.9453 8.81641 17.9844 6.60547 18H0.757812V0.820312ZM4.22656 3.67969V7.65234H6.5C7.85156 7.65234 8.69141 7.63281 9.01953 7.59375C9.61328 7.52344 10.0781 7.32031 10.4141 6.98438C10.7578 6.64062 10.9297 6.19141 10.9297 5.63672C10.9297 5.10547 10.7812 4.67578 10.4844 4.34766C10.1953 4.01172 9.76172 3.80859 9.18359 3.73828C8.83984 3.69922 7.85156 3.67969 6.21875 3.67969H4.22656ZM4.22656 10.5117V15.1055H7.4375C8.6875 15.1055 9.48047 15.0703 9.81641 15C10.332 14.9062 10.75 14.6797 11.0703 14.3203C11.3984 13.9531 11.5625 13.4648 11.5625 12.8555C11.5625 12.3398 11.4375 11.9023 11.1875 11.543C10.9375 11.1836 10.5742 10.9219 10.0977 10.7578C9.62891 10.5938 8.60547 10.5117 7.02734 10.5117H4.22656ZM25.2734 14.0391L28.5547 14.5898C28.1328 15.793 27.4648 16.7109 26.5508 17.3438C25.6445 17.9688 24.5078 18.2812 23.1406 18.2812C20.9766 18.2812 19.375 17.5742 18.3359 16.1602C17.5156 15.0273 17.1055 13.5977 17.1055 11.8711C17.1055 9.80859 17.6445 8.19531 18.7227 7.03125C19.8008 5.85938 21.1641 5.27344 22.8125 5.27344C24.6641 5.27344 26.125 5.88672 27.1953 7.11328C28.2656 8.33203 28.7773 10.2031 28.7305 12.7266H20.4805C20.5039 13.7031 20.7695 14.4648 21.2773 15.0117C21.7852 15.5508 22.418 15.8203 23.1758 15.8203C23.6914 15.8203 24.125 15.6797 24.4766 15.3984C24.8281 15.1172 25.0938 14.6641 25.2734 14.0391ZM25.4609 10.7109C25.4375 9.75781 25.1914 9.03516 24.7227 8.54297C24.2539 8.04297 23.6836 7.79297 23.0117 7.79297C22.293 7.79297 21.6992 8.05469 21.2305 8.57812C20.7617 9.10156 20.5312 9.8125 20.5391 10.7109H25.4609Z"
              fill="#E8EAED"
            />
            <path
              d="M31.4609 0.820312H38.3281C39.6875 0.820312 40.6992 0.878906 41.3633 0.996094C42.0352 1.10547 42.6328 1.33984 43.1562 1.69922C43.6875 2.05859 44.1289 2.53906 44.4805 3.14062C44.832 3.73438 45.0078 4.40234 45.0078 5.14453C45.0078 5.94922 44.7891 6.6875 44.3516 7.35938C43.9219 8.03125 43.3359 8.53516 42.5938 8.87109C43.6406 9.17578 44.4453 9.69531 45.0078 10.4297C45.5703 11.1641 45.8516 12.0273 45.8516 13.0195C45.8516 13.8008 45.668 14.5625 45.3008 15.3047C44.9414 16.0391 44.4453 16.6289 43.8125 17.0742C43.1875 17.5117 42.4141 17.7812 41.4922 17.8828C40.9141 17.9453 39.5195 17.9844 37.3086 18H31.4609V0.820312ZM34.9297 3.67969V7.65234H37.2031C38.5547 7.65234 39.3945 7.63281 39.7227 7.59375C40.3164 7.52344 40.7812 7.32031 41.1172 6.98438C41.4609 6.64062 41.6328 6.19141 41.6328 5.63672C41.6328 5.10547 41.4844 4.67578 41.1875 4.34766C40.8984 4.01172 40.4648 3.80859 39.8867 3.73828C39.543 3.69922 38.5547 3.67969 36.9219 3.67969H34.9297ZM34.9297 10.5117V15.1055H38.1406C39.3906 15.1055 40.1836 15.0703 40.5195 15C41.0352 14.9062 41.4531 14.6797 41.7734 14.3203C42.1016 13.9531 42.2656 13.4648 42.2656 12.8555C42.2656 12.3398 42.1406 11.9023 41.8906 11.543C41.6406 11.1836 41.2773 10.9219 40.8008 10.7578C40.332 10.5938 39.3086 10.5117 37.7305 10.5117H34.9297ZM55.9766 14.0391L59.2578 14.5898C58.8359 15.793 58.168 16.7109 57.2539 17.3438C56.3477 17.9688 55.2109 18.2812 53.8438 18.2812C51.6797 18.2812 50.0781 17.5742 49.0391 16.1602C48.2188 15.0273 47.8086 13.5977 47.8086 11.8711C47.8086 9.80859 48.3477 8.19531 49.4258 7.03125C50.5039 5.85938 51.8672 5.27344 53.5156 5.27344C55.3672 5.27344 56.8281 5.88672 57.8984 7.11328C58.9688 8.33203 59.4805 10.2031 59.4336 12.7266H51.1836C51.207 13.7031 51.4727 14.4648 51.9805 15.0117C52.4883 15.5508 53.1211 15.8203 53.8789 15.8203C54.3945 15.8203 54.8281 15.6797 55.1797 15.3984C55.5312 15.1172 55.7969 14.6641 55.9766 14.0391ZM56.1641 10.7109C56.1406 9.75781 55.8945 9.03516 55.4258 8.54297C54.957 8.04297 54.3867 7.79297 53.7148 7.79297C52.9961 7.79297 52.4023 8.05469 51.9336 8.57812C51.4648 9.10156 51.2344 9.8125 51.2422 10.7109H56.1641ZM67.8359 5.55469V8.17969H65.5859V13.1953C65.5859 14.2109 65.6055 14.8047 65.6445 14.9766C65.6914 15.1406 65.7891 15.2773 65.9375 15.3867C66.0938 15.4961 66.2812 15.5508 66.5 15.5508C66.8047 15.5508 67.2461 15.4453 67.8242 15.2344L68.1055 17.7891C67.3398 18.1172 66.4727 18.2812 65.5039 18.2812C64.9102 18.2812 64.375 18.1836 63.8984 17.9883C63.4219 17.7852 63.0703 17.5273 62.8438 17.2148C62.625 16.8945 62.4727 16.4648 62.3867 15.9258C62.3164 15.543 62.2812 14.7695 62.2812 13.6055V8.17969H60.7695V5.55469H62.2812V3.08203L65.5859 1.16016V5.55469H67.8359Z"
              fill="#0085FF"
            />
          </svg>
        </div>
        <div className={'login__container'}>
          <div className={'login__title'}>
            <p>Войти</p>
          </div>
          <Input onChange={(props) => setEmail(props)} placeHolder={'Email'} value={email} told autocomplete />
          <Input
            onChange={(props) => setPassword(props)}
            placeHolder={'Пароль'}
            value={password}
            hidden
            told
            autocomplete
          />
          <div className={'login__restore'}>
            <ResetPasswordModal renderOpenEl={(handleOpen: () => void) => <p onClick={handleOpen}>Забыли пароль?</p>} />

            <a href="#register">
              <p onClick={setShowAuth}>Нет аккаунта?</p>
            </a>
          </div>
          <div className={'login__btn'}>
            <Button title={'Войти'} handleClick={auth} disabled={!email || !password} width={'100%'} told />
          </div>
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className={'mobile-register'}>
        {showAuth && loginMobileComp()}
        <div className={'mobile-register__partner'}>
          <div className={'mobile-register__partner-title'}>
            <p>
              Партнерская программа до <span>60%</span> прибыли
            </p>
          </div>
        </div>
        <div className={'mobile-register__points'}>
          {footerPoints.map((item, index) => {
            return (
              <div
                className={'point'}
                style={{
                  backgroundImage: `url(./img/${index}.svg)`,
                }}
                key={index}
              >
                <p>{item.title}</p>
              </div>
            )
          })}
        </div>
        <div className={'mobile-register__form'} id="register">
          <div className={'login__title'}>
            <p>Регистрация</p>
          </div>
          <Input
            onChange={(props) => {
              setName(props)
              setDisabled(false)
              setError('')
            }}
            placeHolder={'Имя'}
            value={name}
            told
            error={error === 'name'}
          />
          <Input
            onChange={(props) => {
              setEmail(props)
              setDisabled(false)
              setError('')
            }}
            placeHolder={'Email'}
            value={email}
            told
            error={error === 'email'}
          />
          <UiSelector
            onSelect={(props) => {
              setCommunicationType(props)
              setDisabled(false)
              setError('')
            }}
            title={'Способ связи'}
            value={communicationType}
            items={['Email', 'Telegram', 'WhatsApp']}
            error={error === 'communicationType'}
          />
          <Input onChange={(props) => setLink(props)} placeHolder={'Введите данные для связи'} value={link} told />
          <Input
            onChange={(props) => {
              setPassword(props)
              setError('')
              setDisabled(false)
            }}
            placeHolder={'Пароль'}
            value={password}
            hidden
            told
            error={error === 'password'}
          />
          <Input
            onChange={(props) => {
              setConfirmPassword(props)
              setError('')
              setDisabled(false)
            }}
            placeHolder={'Подтвердите пароль'}
            value={confirmPassword}
            hidden
            told
            error={error === 'password'}
          />
          <div className={'register-body-right__checkbox'}>
            <UiCheckBox
              title={'Я подтверждаю, что мне есть 18 лет'}
              handleToggle={() => {
                setImOlder(!imOlder)
                setDisabled(false)
                setError('')
              }}
              checked={imOlder}
              terms
              error={error === 'imOlder'}
            />
          </div>

          <Button title={'Создать аккаунт'} handleClick={reg} disabled={disabled} width={'100%'} />
        </div>
      </div>
    )
  }

  return (
    <div className="register" id="register">
      {showAuth && loginComp()}
      <div className={'register-body'}>
        <div className={'register-body-left'}>
          <div className={'register-body-left__bg'} />
          <div className={'register-body-left__title'}>
            <p>
              Партнерская программа до <span>60%</span> прибыли
            </p>
          </div>
        </div>
        <div className={'register-body-right'}>
          <div className={'register-body-right__first'}>
            <Input
              onChange={(props) => {
                setName(props)
                setDisabled(false)
                setError('')
              }}
              placeHolder={'Имя'}
              value={name}
              told
              error={error === 'name'}
            />
            <Input
              onChange={(props) => {
                setEmail(props)
                setDisabled(false)
                setError('')
              }}
              placeHolder={'Email'}
              value={email}
              told
              error={error === 'email'}
            />
          </div>
          <div className={'register-body-right__second'}>
            <UiSelector
              onSelect={(props) => {
                setCommunicationType(props)
                setDisabled(false)
                setError('')
              }}
              title={'Способ связи'}
              value={communicationType}
              items={['Email', 'Telegram', 'WhatsApp']}
              error={error === 'communicationType'}
            />
            <Input onChange={(props) => setLink(props)} placeHolder={'Введите данные для связи'} value={link} told />
          </div>
          <div className={'register-body-right__third'}>
            <Input
              onChange={(props) => {
                setPassword(props)
                setError('')
                setDisabled(false)
              }}
              placeHolder={'Пароль'}
              value={password}
              hidden
              told
              error={error === 'password'}
            />
            <Input
              onChange={(props) => {
                setConfirmPassword(props)
                setError('')
                setDisabled(false)
              }}
              placeHolder={'Подтвердите пароль'}
              value={confirmPassword}
              hidden
              told
              error={error === 'password'}
            />
          </div>

          <div className={'register-body-right__checkbox'}>
            <UiCheckBox
              title={'Я подтверждаю, что мне есть 18 лет'}
              handleToggle={() => {
                setImOlder(!imOlder)
                setDisabled(false)
                setError('')
              }}
              checked={imOlder}
              terms
              error={error === 'imOlder'}
            />
          </div>

          <Button title={'Создать аккаунт'} handleClick={reg} disabled={disabled} width={'100%'} />
        </div>
      </div>
      <div className={'register-footer'}>
        {footerPoints.map((item, index) => {
          return (
            <div
              className={'register-footer__point'}
              style={{
                backgroundImage: `url(./img/${index}.svg)`,
              }}
              key={index}
            >
              <p>{item.title}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Auth
