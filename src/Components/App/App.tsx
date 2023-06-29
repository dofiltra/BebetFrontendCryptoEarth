import './App.scss';
import React, {useEffect, useState} from 'react';
import UiButton from "../Ui/Button/UiButton";
import Auth from "./Auth/Auth";
import Statistic from "./Statistic/Statistic";
import Links from "./Links/Links";
import Referral from "./Referral/Referral";
import Settings from "./Settings/Settings";
import Outs from "./Outs/Outs";
import {createFormData, get, postFormData} from "../../services/api";
import UiInput from "../Ui/Input/UiInput";

function App() {
    const mobile = window.innerWidth >= 320 && window.innerWidth <= 470

    const [menuOpen, setMenuOpen] = useState(false)

    const [showMoneyPopup, setShowMoneyPopup] = useState(false)
    const [email, setEmail] = useState('')
    const [value, setValue] = useState('')

    const [logged, setLogged] = useState(false)
    const [showAuth, setShowAuth] = useState(false)
    const [currentPage, setCurrentPage] = useState('statistic')
    const [showProfile, setShowProfile] = useState(false)
    const [user, setUser] = useState({})
    const [profile, setProfile] = useState<any>({})
    const [referent, setReferent] = useState([])
    const [statistic, setStatistic] = useState([])
    const [fullStatistic, setFullStatistic] = useState([])
    const [refLinks, setRefLinks] = useState([])
    const [outs, setOuts] = useState([])

    const settingShow = () => {
        setCurrentPage('settings')
        setShowProfile(false)
    }

    const getSupport = () => {
        window.location.replace("https://t.me/ansigame")
    }

    const logOut = () => {
        localStorage.setItem('reconnect', '')
        window.location.reload()
    }

    useEffect(() => {
        const auth = async () => {
            let data = createFormData({
                email: localStorage.getItem('email'),
                password: localStorage.getItem('password')
            })
            let res = await postFormData("/ref_user/auth", data)
            if (res.token) {
                localStorage.setItem("token", res.token)
                console.log(res)
                let userState = await get("/ref_wallet/getMainWallet")
                if (userState) {
                    setProfile(userState)
                    setShowAuth(false)
                    setLogged(true)
                }
            }
        }


        const condition = !localStorage.getItem('token') || !localStorage.getItem('email') || !localStorage.getItem('password') || !localStorage.getItem('reconnect')

        if (!condition && !logged) {
            auth()
        }

    }, [logged])

    const getReferent = async () => {
        let res = await get("/ref_user/getAllReferent")
        if (res) {
            setReferent(res)
        }
    }

    const getStatistic = async () => {
        let res = await get("/ref_user/getDashboard")
        if (res) {
            setStatistic(res)
        }
    }

    const getFullStatistic = async () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const januaryFirst = new Date(currentYear, 0, 1);

        const d = createFormData({start_date: januaryFirst})
        let res = await postFormData("/ref_user/getDashboardByDate", d)
        if (res) {
            console.log(res)
            setFullStatistic(res)
        }
    }

    const getUserState = async () => {
        let res = await get("/ref_user/getCurrentUser")
        if (res) {
            setUser(res)
        }
    }

    const updateUserState = async (props: any) => {
        let data = createFormData({
            data:
                {
                    email: props?.email || null,
                    password: props?.password || null,
                    name: props?.name || null,
                    communicationType: props?.communicationType || null,
                    partnershipType: props?.partnershipType || null,
                }
        })
        let res = await postFormData("/ref_user/updateData", data)
        if (res) {
            console.log(res)
            getUserState()
            setCurrentPage('statistic')
        }
    }

    const getRefUrls = async () => {
        let res = await get("/ref_refs/GetByCurrentUser")
        if (res) {
            const parsedData = res.map((item: any) => {
                const newItem = item
                newItem.url = `${process.env.REACT_APP_FRONT_URL}?ref=${item.ref_string}`

                return newItem
            })
            setRefLinks(parsedData)
        }
    }

    const getOuts = async () => {
        let res = await get("/out_ref_transaction/getAllRequests")
        if (res) {
            setOuts(res)
        }
    }


    useEffect(() => {
        if (logged) {
            getUserState()
            getReferent()
            getRefUrls()
            getStatistic()
            getFullStatistic()
            getOuts()
        }
    }, [logged])

    const moneyReauestPopup = () => {
        const request = async () => {
            let data = createFormData({
                email: email,
                value: value
            })
            let res = await postFormData("/out_ref_transaction/requestOut", data)
            if (res) {
                console.log(res)
                setShowMoneyPopup(false)
                getOuts()
            }
        }
        return (
            <div className={'money-request'}>
                <div className={'money-request__closeBtn'} onClick={() => setShowMoneyPopup(false)}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" rx="16" fill="white"/>
                        <path
                            d="M28.331 18.6083C28.6239 18.3154 29.0988 18.3154 29.3917 18.6083C29.6846 18.9012 29.6846 19.3761 29.3917 19.669L25.0606 24L29.3916 28.331C29.6845 28.6239 29.6845 29.0988 29.3916 29.3917C29.0987 29.6846 28.6238 29.6846 28.331 29.3917L23.9999 25.0607L19.6689 29.3917C19.376 29.6846 18.9012 29.6846 18.6083 29.3917C18.3154 29.0988 18.3154 28.6239 18.6083 28.331L22.9393 24L18.6082 19.669C18.3153 19.3761 18.3153 18.9012 18.6082 18.6083C18.9011 18.3154 19.376 18.3154 19.6689 18.6083L23.9999 22.9394L28.331 18.6083Z"
                            fill="black"/>
                    </svg>
                </div>

                <div className={'money-request__title'}>
                    <p>Вывод средств</p>
                </div>
                <UiInput onChange={(props) => setEmail(props)} placeHolder={'Email от BeBet'} value={email} told/>
                <UiInput onChange={(props) => setValue(props)} placeHolder={'Сумма выводаs'} value={value} told/>
                <span>
                    Вывод денежных средств осуществляется путем перечисления их на Ваш игровой счет, предварительно зарегистрированны айте букмекерской компании Обращаем внимание, что игровой аккаунт не должен быть зарегистрирован по Вашей реферальной ссылке или с использованием Вашего промокода
                </span>
                <UiButton title={'Вывести'} handleClick={request} disabled={false}
                          width={'100%'}
                />
            </div>
        )
    }

    if (mobile) {
        return (
            <div className={'mobile-app'}>
                {(showAuth || showMoneyPopup) &&
                    <div className={'bg'}/>
                }
                {showMoneyPopup &&
                    moneyReauestPopup()
                }
                <div className="app-header">
                    {menuOpen && <div className={'mobile-menu'}>
                        <p className={currentPage === 'statistic' ? 'selected' : ''}
                           onClick={() => {
                               setCurrentPage('statistic')
                               setMenuOpen(false)
                           }}
                        >Статистика</p>
                        <p className={currentPage === 'links' ? 'selected' : ''}
                           onClick={() => {
                               setCurrentPage('links')
                               setMenuOpen(false)
                           }}
                        >Ссылки</p>
                        <p className={currentPage === 'referral' ? 'selected' : ''}
                           onClick={() => {
                               setCurrentPage('referral')
                               setMenuOpen(false)
                           }}
                        >Рефералы</p>
                    </div>}
                    <div className="app-header__wrapper">
                        <div className="app-header__menu">
                            {menuOpen ?
                                <svg onClick={() => setMenuOpen(false)}
                                     width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.22468 4.81096C5.83416 4.42044 5.201 4.42044 4.81047 4.81096C4.41995 5.20148 4.41995 5.83465 4.81047 6.22517L10.5852 11.9999L4.81053 17.7746C4.42001 18.1651 4.42001 18.7983 4.81053 19.1888C5.20106 19.5793 5.83422 19.5793 6.22474 19.1888L11.9994 13.4141L17.7741 19.1888C18.1646 19.5793 18.7978 19.5793 19.1883 19.1888C19.5788 18.7983 19.5788 18.1651 19.1883 17.7746L13.4136 11.9999L19.1884 6.22517C19.5789 5.83465 19.5789 5.20148 19.1884 4.81096C18.7978 4.42044 18.1647 4.42044 17.7742 4.81096L11.9994 10.5857L6.22468 4.81096Z"
                                        fill="#E8EAED"/>
                                </svg>

                                :
                                <svg onClick={() => setMenuOpen(true)}
                                     width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
                                        fill="white"/>
                                    <path
                                        d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z"
                                        fill="white"/>
                                    <path
                                        d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z"
                                        fill="white"/>
                                </svg>
                            }
                        </div>
                        <div className="app-header__logo">
                            <svg width="69" height="19" viewBox="0 0 69 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.757812 0.820312H7.625C8.98438 0.820312 9.99609 0.878906 10.6602 0.996094C11.332 1.10547 11.9297 1.33984 12.4531 1.69922C12.9844 2.05859 13.4258 2.53906 13.7773 3.14062C14.1289 3.73438 14.3047 4.40234 14.3047 5.14453C14.3047 5.94922 14.0859 6.6875 13.6484 7.35938C13.2188 8.03125 12.6328 8.53516 11.8906 8.87109C12.9375 9.17578 13.7422 9.69531 14.3047 10.4297C14.8672 11.1641 15.1484 12.0273 15.1484 13.0195C15.1484 13.8008 14.9648 14.5625 14.5977 15.3047C14.2383 16.0391 13.7422 16.6289 13.1094 17.0742C12.4844 17.5117 11.7109 17.7812 10.7891 17.8828C10.2109 17.9453 8.81641 17.9844 6.60547 18H0.757812V0.820312ZM4.22656 3.67969V7.65234H6.5C7.85156 7.65234 8.69141 7.63281 9.01953 7.59375C9.61328 7.52344 10.0781 7.32031 10.4141 6.98438C10.7578 6.64062 10.9297 6.19141 10.9297 5.63672C10.9297 5.10547 10.7812 4.67578 10.4844 4.34766C10.1953 4.01172 9.76172 3.80859 9.18359 3.73828C8.83984 3.69922 7.85156 3.67969 6.21875 3.67969H4.22656ZM4.22656 10.5117V15.1055H7.4375C8.6875 15.1055 9.48047 15.0703 9.81641 15C10.332 14.9062 10.75 14.6797 11.0703 14.3203C11.3984 13.9531 11.5625 13.4648 11.5625 12.8555C11.5625 12.3398 11.4375 11.9023 11.1875 11.543C10.9375 11.1836 10.5742 10.9219 10.0977 10.7578C9.62891 10.5938 8.60547 10.5117 7.02734 10.5117H4.22656ZM25.2734 14.0391L28.5547 14.5898C28.1328 15.793 27.4648 16.7109 26.5508 17.3438C25.6445 17.9688 24.5078 18.2812 23.1406 18.2812C20.9766 18.2812 19.375 17.5742 18.3359 16.1602C17.5156 15.0273 17.1055 13.5977 17.1055 11.8711C17.1055 9.80859 17.6445 8.19531 18.7227 7.03125C19.8008 5.85938 21.1641 5.27344 22.8125 5.27344C24.6641 5.27344 26.125 5.88672 27.1953 7.11328C28.2656 8.33203 28.7773 10.2031 28.7305 12.7266H20.4805C20.5039 13.7031 20.7695 14.4648 21.2773 15.0117C21.7852 15.5508 22.418 15.8203 23.1758 15.8203C23.6914 15.8203 24.125 15.6797 24.4766 15.3984C24.8281 15.1172 25.0938 14.6641 25.2734 14.0391ZM25.4609 10.7109C25.4375 9.75781 25.1914 9.03516 24.7227 8.54297C24.2539 8.04297 23.6836 7.79297 23.0117 7.79297C22.293 7.79297 21.6992 8.05469 21.2305 8.57812C20.7617 9.10156 20.5312 9.8125 20.5391 10.7109H25.4609Z"
                                    fill="#E8EAED"/>
                                <path
                                    d="M31.4609 0.820312H38.3281C39.6875 0.820312 40.6992 0.878906 41.3633 0.996094C42.0352 1.10547 42.6328 1.33984 43.1562 1.69922C43.6875 2.05859 44.1289 2.53906 44.4805 3.14062C44.832 3.73438 45.0078 4.40234 45.0078 5.14453C45.0078 5.94922 44.7891 6.6875 44.3516 7.35938C43.9219 8.03125 43.3359 8.53516 42.5938 8.87109C43.6406 9.17578 44.4453 9.69531 45.0078 10.4297C45.5703 11.1641 45.8516 12.0273 45.8516 13.0195C45.8516 13.8008 45.668 14.5625 45.3008 15.3047C44.9414 16.0391 44.4453 16.6289 43.8125 17.0742C43.1875 17.5117 42.4141 17.7812 41.4922 17.8828C40.9141 17.9453 39.5195 17.9844 37.3086 18H31.4609V0.820312ZM34.9297 3.67969V7.65234H37.2031C38.5547 7.65234 39.3945 7.63281 39.7227 7.59375C40.3164 7.52344 40.7812 7.32031 41.1172 6.98438C41.4609 6.64062 41.6328 6.19141 41.6328 5.63672C41.6328 5.10547 41.4844 4.67578 41.1875 4.34766C40.8984 4.01172 40.4648 3.80859 39.8867 3.73828C39.543 3.69922 38.5547 3.67969 36.9219 3.67969H34.9297ZM34.9297 10.5117V15.1055H38.1406C39.3906 15.1055 40.1836 15.0703 40.5195 15C41.0352 14.9062 41.4531 14.6797 41.7734 14.3203C42.1016 13.9531 42.2656 13.4648 42.2656 12.8555C42.2656 12.3398 42.1406 11.9023 41.8906 11.543C41.6406 11.1836 41.2773 10.9219 40.8008 10.7578C40.332 10.5938 39.3086 10.5117 37.7305 10.5117H34.9297ZM55.9766 14.0391L59.2578 14.5898C58.8359 15.793 58.168 16.7109 57.2539 17.3438C56.3477 17.9688 55.2109 18.2812 53.8438 18.2812C51.6797 18.2812 50.0781 17.5742 49.0391 16.1602C48.2188 15.0273 47.8086 13.5977 47.8086 11.8711C47.8086 9.80859 48.3477 8.19531 49.4258 7.03125C50.5039 5.85938 51.8672 5.27344 53.5156 5.27344C55.3672 5.27344 56.8281 5.88672 57.8984 7.11328C58.9688 8.33203 59.4805 10.2031 59.4336 12.7266H51.1836C51.207 13.7031 51.4727 14.4648 51.9805 15.0117C52.4883 15.5508 53.1211 15.8203 53.8789 15.8203C54.3945 15.8203 54.8281 15.6797 55.1797 15.3984C55.5312 15.1172 55.7969 14.6641 55.9766 14.0391ZM56.1641 10.7109C56.1406 9.75781 55.8945 9.03516 55.4258 8.54297C54.957 8.04297 54.3867 7.79297 53.7148 7.79297C52.9961 7.79297 52.4023 8.05469 51.9336 8.57812C51.4648 9.10156 51.2344 9.8125 51.2422 10.7109H56.1641ZM67.8359 5.55469V8.17969H65.5859V13.1953C65.5859 14.2109 65.6055 14.8047 65.6445 14.9766C65.6914 15.1406 65.7891 15.2773 65.9375 15.3867C66.0938 15.4961 66.2812 15.5508 66.5 15.5508C66.8047 15.5508 67.2461 15.4453 67.8242 15.2344L68.1055 17.7891C67.3398 18.1172 66.4727 18.2812 65.5039 18.2812C64.9102 18.2812 64.375 18.1836 63.8984 17.9883C63.4219 17.7852 63.0703 17.5273 62.8438 17.2148C62.625 16.8945 62.4727 16.4648 62.3867 15.9258C62.3164 15.543 62.2812 14.7695 62.2812 13.6055V8.17969H60.7695V5.55469H62.2812V3.08203L65.5859 1.16016V5.55469H67.8359Z"
                                    fill="#0085FF"/>
                            </svg>
                        </div>
                    </div>

                    {logged ?
                        <div className={'profile'} onClick={() => setShowProfile(!showProfile)}>
                            <div className={'profile__balance'}>
                                <p>{profile?.value && profile.value.toFixed(0)}{' '}{profile.currency}</p>
                            </div>
                            <div className={'profile__avatar'}>
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect width="42" height="42" rx="8" fill="#242731"/>
                                    <path
                                        d="M14.0781 23.4805L16.2227 23.293C16.3242 24.1523 16.5586 24.8594 16.9258 25.4141C17.3008 25.9609 17.8789 26.4062 18.6602 26.75C19.4414 27.0859 20.3203 27.2539 21.2969 27.2539C22.1641 27.2539 22.9297 27.125 23.5938 26.8672C24.2578 26.6094 24.75 26.2578 25.0703 25.8125C25.3984 25.3594 25.5625 24.8672 25.5625 24.3359C25.5625 23.7969 25.4062 23.3281 25.0938 22.9297C24.7812 22.5234 24.2656 22.1836 23.5469 21.9102C23.0859 21.7305 22.0664 21.4531 20.4883 21.0781C18.9102 20.6953 17.8047 20.3359 17.1719 20C16.3516 19.5703 15.7383 19.0391 15.332 18.4062C14.9336 17.7656 14.7344 17.0508 14.7344 16.2617C14.7344 15.3945 14.9805 14.5859 15.4727 13.8359C15.9648 13.0781 16.6836 12.5039 17.6289 12.1133C18.5742 11.7227 19.625 11.5273 20.7812 11.5273C22.0547 11.5273 23.1758 11.7344 24.1445 12.1484C25.1211 12.5547 25.8711 13.1562 26.3945 13.9531C26.918 14.75 27.1992 15.6523 27.2383 16.6602L25.0586 16.8242C24.9414 15.7383 24.543 14.918 23.8633 14.3633C23.1914 13.8086 22.1953 13.5312 20.875 13.5312C19.5 13.5312 18.4961 13.7852 17.8633 14.293C17.2383 14.793 16.9258 15.3984 16.9258 16.1094C16.9258 16.7266 17.1484 17.2344 17.5938 17.6328C18.0312 18.0312 19.1719 18.4414 21.0156 18.8633C22.8672 19.2773 24.1367 19.6406 24.8242 19.9531C25.8242 20.4141 26.5625 21 27.0391 21.7109C27.5156 22.4141 27.7539 23.2266 27.7539 24.1484C27.7539 25.0625 27.4922 25.9258 26.9688 26.7383C26.4453 27.543 25.6914 28.1719 24.707 28.625C23.7305 29.0703 22.6289 29.293 21.4023 29.293C19.8477 29.293 18.543 29.0664 17.4883 28.6133C16.4414 28.1602 15.6172 27.4805 15.0156 26.5742C14.4219 25.6602 14.1094 24.6289 14.0781 23.4805Z"
                                        fill="white"/>
                                </svg>
                            </div>

                            {showProfile &&
                                <div className={'profile__popup'}>
                                    <div className={'profile__popup-buttons'}>
                                        <UiButton title={'Вывести'}
                                                  handleClick={() => {
                                                      setShowProfile(false)
                                                      setShowMoneyPopup(true)
                                                  }}
                                                  disabled={false} width={'100%'}
                                        />
                                    </div>
                                    <p onClick={() => {
                                        setCurrentPage('outs')
                                        setMenuOpen(false)
                                    }}>Выводы</p>
                                    <p onClick={settingShow}>Настройки</p>
                                    <p onClick={getSupport}>Поддержка</p>
                                    <p onClick={logOut}>Выйти</p>
                                </div>
                            }
                        </div>
                        :
                        <UiButton title={'Войти'} handleClick={() => setShowAuth(true)} disabled={false}/>
                    }
                </div>

                {!logged &&
                    <Auth
                        setProfile={setProfile}
                        showAuth={showAuth}
                        setLogged={() => setLogged(true)}
                        setShowAuth={() => setShowAuth(false)}
                    />
                }

                {currentPage === 'settings' && logged && <Settings updateUserState={updateUserState} user={user}/>}
                {currentPage === 'statistic' && logged && <Statistic fullStatistic={fullStatistic} data={statistic}/>}
                {currentPage === 'links' && logged && <Links getRefUrls={getRefUrls} refLinks={refLinks} user={user}/>}
                {currentPage === 'referral' && logged && <Referral referent={referent}/>}
                {currentPage === 'outs' && logged && <Outs outs={outs}/>}
            </div>
        )
    }


    return (
        <div className="app"
             style={{
                 alignItems: currentPage === 'settings' && !mobile ? 'flex-start' : 'center'
             }}
        >
            {(showAuth || showMoneyPopup) &&
                <div className={'bg'}/>
            }
            {showMoneyPopup &&
                moneyReauestPopup()
            }
            <div className="app-header">
                <div className="app-header__logo">
                    <svg width="69" height="19" viewBox="0 0 69 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.757812 0.820312H7.625C8.98438 0.820312 9.99609 0.878906 10.6602 0.996094C11.332 1.10547 11.9297 1.33984 12.4531 1.69922C12.9844 2.05859 13.4258 2.53906 13.7773 3.14062C14.1289 3.73438 14.3047 4.40234 14.3047 5.14453C14.3047 5.94922 14.0859 6.6875 13.6484 7.35938C13.2188 8.03125 12.6328 8.53516 11.8906 8.87109C12.9375 9.17578 13.7422 9.69531 14.3047 10.4297C14.8672 11.1641 15.1484 12.0273 15.1484 13.0195C15.1484 13.8008 14.9648 14.5625 14.5977 15.3047C14.2383 16.0391 13.7422 16.6289 13.1094 17.0742C12.4844 17.5117 11.7109 17.7812 10.7891 17.8828C10.2109 17.9453 8.81641 17.9844 6.60547 18H0.757812V0.820312ZM4.22656 3.67969V7.65234H6.5C7.85156 7.65234 8.69141 7.63281 9.01953 7.59375C9.61328 7.52344 10.0781 7.32031 10.4141 6.98438C10.7578 6.64062 10.9297 6.19141 10.9297 5.63672C10.9297 5.10547 10.7812 4.67578 10.4844 4.34766C10.1953 4.01172 9.76172 3.80859 9.18359 3.73828C8.83984 3.69922 7.85156 3.67969 6.21875 3.67969H4.22656ZM4.22656 10.5117V15.1055H7.4375C8.6875 15.1055 9.48047 15.0703 9.81641 15C10.332 14.9062 10.75 14.6797 11.0703 14.3203C11.3984 13.9531 11.5625 13.4648 11.5625 12.8555C11.5625 12.3398 11.4375 11.9023 11.1875 11.543C10.9375 11.1836 10.5742 10.9219 10.0977 10.7578C9.62891 10.5938 8.60547 10.5117 7.02734 10.5117H4.22656ZM25.2734 14.0391L28.5547 14.5898C28.1328 15.793 27.4648 16.7109 26.5508 17.3438C25.6445 17.9688 24.5078 18.2812 23.1406 18.2812C20.9766 18.2812 19.375 17.5742 18.3359 16.1602C17.5156 15.0273 17.1055 13.5977 17.1055 11.8711C17.1055 9.80859 17.6445 8.19531 18.7227 7.03125C19.8008 5.85938 21.1641 5.27344 22.8125 5.27344C24.6641 5.27344 26.125 5.88672 27.1953 7.11328C28.2656 8.33203 28.7773 10.2031 28.7305 12.7266H20.4805C20.5039 13.7031 20.7695 14.4648 21.2773 15.0117C21.7852 15.5508 22.418 15.8203 23.1758 15.8203C23.6914 15.8203 24.125 15.6797 24.4766 15.3984C24.8281 15.1172 25.0938 14.6641 25.2734 14.0391ZM25.4609 10.7109C25.4375 9.75781 25.1914 9.03516 24.7227 8.54297C24.2539 8.04297 23.6836 7.79297 23.0117 7.79297C22.293 7.79297 21.6992 8.05469 21.2305 8.57812C20.7617 9.10156 20.5312 9.8125 20.5391 10.7109H25.4609Z"
                            fill="#E8EAED"/>
                        <path
                            d="M31.4609 0.820312H38.3281C39.6875 0.820312 40.6992 0.878906 41.3633 0.996094C42.0352 1.10547 42.6328 1.33984 43.1562 1.69922C43.6875 2.05859 44.1289 2.53906 44.4805 3.14062C44.832 3.73438 45.0078 4.40234 45.0078 5.14453C45.0078 5.94922 44.7891 6.6875 44.3516 7.35938C43.9219 8.03125 43.3359 8.53516 42.5938 8.87109C43.6406 9.17578 44.4453 9.69531 45.0078 10.4297C45.5703 11.1641 45.8516 12.0273 45.8516 13.0195C45.8516 13.8008 45.668 14.5625 45.3008 15.3047C44.9414 16.0391 44.4453 16.6289 43.8125 17.0742C43.1875 17.5117 42.4141 17.7812 41.4922 17.8828C40.9141 17.9453 39.5195 17.9844 37.3086 18H31.4609V0.820312ZM34.9297 3.67969V7.65234H37.2031C38.5547 7.65234 39.3945 7.63281 39.7227 7.59375C40.3164 7.52344 40.7812 7.32031 41.1172 6.98438C41.4609 6.64062 41.6328 6.19141 41.6328 5.63672C41.6328 5.10547 41.4844 4.67578 41.1875 4.34766C40.8984 4.01172 40.4648 3.80859 39.8867 3.73828C39.543 3.69922 38.5547 3.67969 36.9219 3.67969H34.9297ZM34.9297 10.5117V15.1055H38.1406C39.3906 15.1055 40.1836 15.0703 40.5195 15C41.0352 14.9062 41.4531 14.6797 41.7734 14.3203C42.1016 13.9531 42.2656 13.4648 42.2656 12.8555C42.2656 12.3398 42.1406 11.9023 41.8906 11.543C41.6406 11.1836 41.2773 10.9219 40.8008 10.7578C40.332 10.5938 39.3086 10.5117 37.7305 10.5117H34.9297ZM55.9766 14.0391L59.2578 14.5898C58.8359 15.793 58.168 16.7109 57.2539 17.3438C56.3477 17.9688 55.2109 18.2812 53.8438 18.2812C51.6797 18.2812 50.0781 17.5742 49.0391 16.1602C48.2188 15.0273 47.8086 13.5977 47.8086 11.8711C47.8086 9.80859 48.3477 8.19531 49.4258 7.03125C50.5039 5.85938 51.8672 5.27344 53.5156 5.27344C55.3672 5.27344 56.8281 5.88672 57.8984 7.11328C58.9688 8.33203 59.4805 10.2031 59.4336 12.7266H51.1836C51.207 13.7031 51.4727 14.4648 51.9805 15.0117C52.4883 15.5508 53.1211 15.8203 53.8789 15.8203C54.3945 15.8203 54.8281 15.6797 55.1797 15.3984C55.5312 15.1172 55.7969 14.6641 55.9766 14.0391ZM56.1641 10.7109C56.1406 9.75781 55.8945 9.03516 55.4258 8.54297C54.957 8.04297 54.3867 7.79297 53.7148 7.79297C52.9961 7.79297 52.4023 8.05469 51.9336 8.57812C51.4648 9.10156 51.2344 9.8125 51.2422 10.7109H56.1641ZM67.8359 5.55469V8.17969H65.5859V13.1953C65.5859 14.2109 65.6055 14.8047 65.6445 14.9766C65.6914 15.1406 65.7891 15.2773 65.9375 15.3867C66.0938 15.4961 66.2812 15.5508 66.5 15.5508C66.8047 15.5508 67.2461 15.4453 67.8242 15.2344L68.1055 17.7891C67.3398 18.1172 66.4727 18.2812 65.5039 18.2812C64.9102 18.2812 64.375 18.1836 63.8984 17.9883C63.4219 17.7852 63.0703 17.5273 62.8438 17.2148C62.625 16.8945 62.4727 16.4648 62.3867 15.9258C62.3164 15.543 62.2812 14.7695 62.2812 13.6055V8.17969H60.7695V5.55469H62.2812V3.08203L65.5859 1.16016V5.55469H67.8359Z"
                            fill="#0085FF"/>
                    </svg>
                </div>
                {logged &&
                    <div className="app-header__container">
                        <p className={currentPage === 'statistic' ? 'selected' : ''}
                           onClick={() => setCurrentPage('statistic')}>Статистика</p>
                        <p className={currentPage === 'links' ? 'selected' : ''}
                           onClick={() => setCurrentPage('links')}>Ссылки</p>
                        <p className={currentPage === 'referral' ? 'selected' : ''}
                           onClick={() => setCurrentPage('referral')}>Рефералы</p>
                    </div>
                }
                {logged ?
                    <div className={'profile'} onClick={() => setShowProfile(!showProfile)}>
                        <div className={'profile__balance'}>
                            <p>{profile?.value && profile.value.toFixed(0)}{' '}{profile.currency}</p>
                        </div>
                        <div className={'profile__avatar'}>
                            <svg width="42" height="42" viewBox="0 0 42 42" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="42" height="42" rx="8" fill="#242731"/>
                                <path
                                    d="M14.0781 23.4805L16.2227 23.293C16.3242 24.1523 16.5586 24.8594 16.9258 25.4141C17.3008 25.9609 17.8789 26.4062 18.6602 26.75C19.4414 27.0859 20.3203 27.2539 21.2969 27.2539C22.1641 27.2539 22.9297 27.125 23.5938 26.8672C24.2578 26.6094 24.75 26.2578 25.0703 25.8125C25.3984 25.3594 25.5625 24.8672 25.5625 24.3359C25.5625 23.7969 25.4062 23.3281 25.0938 22.9297C24.7812 22.5234 24.2656 22.1836 23.5469 21.9102C23.0859 21.7305 22.0664 21.4531 20.4883 21.0781C18.9102 20.6953 17.8047 20.3359 17.1719 20C16.3516 19.5703 15.7383 19.0391 15.332 18.4062C14.9336 17.7656 14.7344 17.0508 14.7344 16.2617C14.7344 15.3945 14.9805 14.5859 15.4727 13.8359C15.9648 13.0781 16.6836 12.5039 17.6289 12.1133C18.5742 11.7227 19.625 11.5273 20.7812 11.5273C22.0547 11.5273 23.1758 11.7344 24.1445 12.1484C25.1211 12.5547 25.8711 13.1562 26.3945 13.9531C26.918 14.75 27.1992 15.6523 27.2383 16.6602L25.0586 16.8242C24.9414 15.7383 24.543 14.918 23.8633 14.3633C23.1914 13.8086 22.1953 13.5312 20.875 13.5312C19.5 13.5312 18.4961 13.7852 17.8633 14.293C17.2383 14.793 16.9258 15.3984 16.9258 16.1094C16.9258 16.7266 17.1484 17.2344 17.5938 17.6328C18.0312 18.0312 19.1719 18.4414 21.0156 18.8633C22.8672 19.2773 24.1367 19.6406 24.8242 19.9531C25.8242 20.4141 26.5625 21 27.0391 21.7109C27.5156 22.4141 27.7539 23.2266 27.7539 24.1484C27.7539 25.0625 27.4922 25.9258 26.9688 26.7383C26.4453 27.543 25.6914 28.1719 24.707 28.625C23.7305 29.0703 22.6289 29.293 21.4023 29.293C19.8477 29.293 18.543 29.0664 17.4883 28.6133C16.4414 28.1602 15.6172 27.4805 15.0156 26.5742C14.4219 25.6602 14.1094 24.6289 14.0781 23.4805Z"
                                    fill="white"/>
                            </svg>
                        </div>

                        {showProfile &&
                            <div className={'profile__popup'}>
                                <div className={'profile__popup-buttons'}>
                                    <UiButton title={'Вывести'}
                                              handleClick={() => {
                                                  setShowProfile(false)
                                                  setShowMoneyPopup(true)
                                              }}
                                              disabled={false} width={'100%'}
                                    />
                                </div>
                                <p onClick={() => {
                                    setCurrentPage('outs')
                                    setShowProfile(false)
                                }}>Выводы</p>
                                <p onClick={settingShow}>Настройки</p>
                                <p onClick={getSupport}>Поддержка</p>
                                <p onClick={logOut}>Выйти</p>
                            </div>
                        }
                    </div>
                    :
                    <UiButton title={'Войти'} handleClick={() => setShowAuth(true)} disabled={false} width={'15%'}/>
                }
            </div>

            {!logged &&
                <Auth
                    setProfile={setProfile}
                    showAuth={showAuth}
                    setLogged={() => setLogged(true)}
                    setShowAuth={() => setShowAuth(!showAuth)}
                />
            }
            {currentPage === 'statistic' && logged && <Statistic fullStatistic={fullStatistic} data={statistic}/>}
            {currentPage === 'links' && logged && <Links getRefUrls={getRefUrls} refLinks={refLinks} user={user}/>}
            {currentPage === 'referral' && logged && <Referral referent={referent}/>}
            {currentPage === 'settings' && logged && <Settings updateUserState={updateUserState} user={user}/>}
            {currentPage === 'outs' && logged && <Outs outs={outs}/>}
        </div>
    );
}

export default App;
