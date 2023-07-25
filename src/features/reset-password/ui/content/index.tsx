import s from './styles.module.scss'
import Input from '@shared/ui/input'
import { useState } from 'react'
import { Button } from '@shared/ui/button'
import { validateEmail } from '@shared/lib/validators'
import { resetPassword } from '../../api'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'


type Props = {
  handleClose: () => void
}

export const Content = (props: Props) => {
  const { handleClose } = props
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)

  const validate = (emailValue: string) => {
    const emailIsValid = validateEmail(emailValue)
    setIsValid(emailIsValid)
  }

  const handleChange = (value: string) => {
    setEmail(value)
    validate(value)
  }

  const handleReset = async () => {
    try {
      const res = await resetPassword({ email })
      if (res.status === 200) {
        toast.success('Инструкция по сбросу пароля была отправлена на почту')
        handleClose()
      } else {
        toast.warning('Что-то пошло не так')
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const data = e.response?.data
        if (data && 'error' in data && data.error === 'USER_DOES_NOT_EXIST') {
          toast.error('Такого пользователя не существует')
          return
        }
      }
      toast.error('Возникла непредвиденная ошибка, мы уже чиним')
    }

  }


  return (
    <div className={s.forgot_password}>
      <h2>Забыли пароль?</h2>
      <Input
        onChange={handleChange}
        placeHolder="Введите ваш email"
        value={email}
      />
      <Button
        title="Сбросить"
        handleClick={handleReset}
        disabled={!isValid}
      />
    </div>
  )
}
