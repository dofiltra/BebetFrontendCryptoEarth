import './Settings.scss';
import React, {useEffect, useState} from "react";
import UiInput from "../../Ui/Input/UiInput";
import UiButton from "../../Ui/Button/UiButton";
import UiSelector from "../../Ui/UiSelector/UiSelector";

interface ISettingsProps {
    user: any;
    updateUserState: any
}

const Settings: React.FC<ISettingsProps> = ({user, updateUserState}) => {
    const mobile = window.innerWidth >= 320 && window.innerWidth <= 470

    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [communicationType, setCommunicationType] = useState(user?.connectionType)
    const [traffic, setTraffic] = useState(user?.traficSource)
    const [typeOfCooperation, setTypeOfCooperation] = useState(user?.partnershipType)

    useEffect(() => {
        if (user) {
            user.email && setEmail(user.email)
            user.partnershipType && setTypeOfCooperation(user.partnershipType)
        }
    }, [user])

    return (
        <div className={'settings'}>
            <div className={'settings__title'}>
                <p>Настройки</p>
            </div>

            <div className={'settings__container'}>
                <div className={'settings__inputs'}>

                    <UiInput onChange={(props) => setName(props)} placeHolder={'Имя'} value={name} told/>
                    <UiSelector onSelect={(props) => setCommunicationType(props)}
                                title={'Способ связи'}
                                value={communicationType}
                                items={['email']}
                    />
                    <UiInput onChange={(props) => setTraffic(props)} placeHolder={'Источние трафика'}
                             value={traffic}
                             told
                    />
                    <UiSelector onSelect={(props) => setTypeOfCooperation(props)} title={'Тип сотрудничества'}
                                items={['Rev. Share']}
                                value={typeOfCooperation}/>
                    <div className={'settings__inputs-email'}>
                        <UiInput onChange={(props) => setEmail(props)}
                                 placeHolder={'Email'}
                                 value={email}
                                 told
                                 autocomplete
                        />
                    </div>
                    <UiInput onChange={(props) => setOldPassword(props)}
                             placeHolder={'Старый пароль'}
                             value={oldPassword ? oldPassword : ''}
                             hidden
                             told
                    />
                    <UiInput onChange={(props) => setPassword(props)}
                             placeHolder={'Новый пароль'}
                             value={password}
                             hidden
                             told
                    />
                    <UiInput onChange={(props) => setConfirmPassword(props)}
                             placeHolder={'Повторите новый пароль'}
                             value={confirmPassword}
                             hidden
                             told
                    />
                </div>

                {/*<div className={'settings__mobile'}>*/}
                {/*    <div className={'settings__mobile-info'}>*/}
                {/*        <h1>Подтвердите номер телефона</h1>*/}
                {/*        <p>Мы заботимся о безопасности ваших средств и для подтверждения вывода Вам необходимо*/}
                {/*            верифицировать номер телефона</p>*/}
                {/*    </div>*/}
                {/*    <UiButton title={'Подтвердить'} handleClick={() => console.log('confirm mobile')}*/}
                {/*              disabled={true}/>*/}
                {/*</div>*/}

                <div className={'settings__btn'}>
                    <UiButton title={'Сохранить'}
                              handleClick={() => updateUserState({
                                  email: email,
                                  password: password,
                                  name: name,
                                  communicationType: communicationType,
                                  partnershipType: typeOfCooperation
                              })}
                              disabled={password !== confirmPassword}
                              width={'100%'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Settings;