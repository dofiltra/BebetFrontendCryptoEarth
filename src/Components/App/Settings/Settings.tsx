import './Settings.scss'
import React, { useEffect, useState } from 'react'
import Input from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { type UserDto } from '@/entities/user'

interface ISettingsProps {
  user?: UserDto
  updateUserState: (props: any) => Promise<void>
}

const Settings: React.FC<ISettingsProps> = ({ user, updateUserState }) => {
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)

  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [communicationType] = useState(user?.communicationType)
  const [partnershipType, setPartnershipType] = useState(user?.partnershipType)

  useEffect(() => {
    if (user) {
      user.email && setEmail(user.email)
      user.partnershipType && setPartnershipType(user.partnershipType)
    }
  }, [user])

  return (
    <div className={'settings'}>
      <div className={'settings__title'}>
        <p>Настройки</p>
      </div>

      <div className={'settings__container'}>
        <div className={'settings__inputs'}>
          <Input onChange={(props) => setName(props)} placeHolder={'Имя'} value={name} told />
          <div className={'settings__inputs-email'}>
            <Input onChange={(props) => setEmail(props)} placeHolder={'Email'} value={email} told autocomplete />
          </div>
          <Input
            onChange={(props) => setOldPassword(props)}
            placeHolder={'Старый пароль'}
            value={oldPassword || ''}
            hidden
            told
          />
          <Input onChange={(props) => setPassword(props)} placeHolder={'Новый пароль'} value={password} hidden told />
          <Input
            onChange={(props) => setConfirmPassword(props)}
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
          <Button
            title={'Сохранить'}
            handleClick={() =>
              updateUserState({
                email,
                password,
                name,
                communicationType,
                partnershipType,
              })
            }
            disabled={password !== confirmPassword}
            width={'100%'}
          />
        </div>
      </div>
    </div>
  )
}

export default Settings
