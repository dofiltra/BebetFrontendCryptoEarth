import './Settings.scss';
import React, {useEffect, useState} from "react";
import Input from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
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

                    <Input onChange={(props) => setName(props)} placeHolder={'Имя'} value={name} told/>
                    <div className={'settings__inputs-email'}>
                        <Input onChange={(props) => setEmail(props)}
                               placeHolder={'Email'}
                               value={email}
                               told
                               autocomplete
                        />
                    </div>
                    <Input onChange={(props) => setOldPassword(props)}
                           placeHolder={'Старый пароль'}
                           value={oldPassword ? oldPassword : ''}
                           hidden
                           told
                    />
                    <Input onChange={(props) => setPassword(props)}
                           placeHolder={'Новый пароль'}
                           value={password}
                           hidden
                           told
                    />
                    <Input onChange={(props) => setConfirmPassword(props)}
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
                    <Button title={'Сохранить'}
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
