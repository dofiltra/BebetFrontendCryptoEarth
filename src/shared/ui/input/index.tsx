import s from './styles.module.scss'
import { useState } from 'react'
import cn from 'classnames'

interface IUiInputProps {
  onChange: (e: string) => void;
  placeHolder: string;
  value: string;
  hidden?: boolean,
  type?: string,
  large?: boolean;
  label?: boolean;
  told?: boolean;
  autocomplete?: boolean;
  error?: boolean;
}

const Input = (props: IUiInputProps) => {
  const {
    onChange,
    placeHolder,
    value,
    hidden,
    type,
    large,
    label,
    told,
    autocomplete,
    error
  } = props
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }


  const inputType = hidden ? (showPassword ? 'text' : 'password') : type || 'text'

  if (label) {
    return (
      <div className={s.ui_input_label}
      >
        <div className={s.ui_input_label_placeholder}>
          <p>{placeHolder}</p>
        </div>
        <input type={inputType}
               onChange={(e) => onChange(e.target.value)}
               placeholder={placeHolder}
               value={value}
        />
      </div>
    )
  }

  return (
    <div className={cn(s.ui_input, {
      [s.ui_input__large]: large,
      [s.ui_input__told]: told,
      [s.ui_input__error]: error,
    })}>
      {!large && <input type={inputType}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeHolder}
                        value={value}
                        autoComplete={autocomplete ? 'on' : 'off'}
      />}
      {large && <textarea onChange={(e) => onChange(e.target.value)} placeholder={placeHolder}
                          value={value}/>}

      {hidden &&
          <div className={s.ui_input__show_btn} onClick={handleShowPassword}>
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M18.267 10.1667C16.5836 6.25833 13.417 3.83333 10.0003 3.83333C6.58363 3.83333 3.41697 6.25833 1.73363 10.1667C1.68775 10.2718 1.66406 10.3853 1.66406 10.5C1.66406 10.6147 1.68775 10.7282 1.73363 10.8333C3.41697 14.7417 6.58363 17.1667 10.0003 17.1667C13.417 17.1667 16.5836 14.7417 18.267 10.8333C18.3129 10.7282 18.3365 10.6147 18.3365 10.5C18.3365 10.3853 18.3129 10.2718 18.267 10.1667ZM10.0003 15.5C7.35863 15.5 4.85863 13.5917 3.41697 10.5C4.85863 7.40833 7.35863 5.49999 10.0003 5.49999C12.642 5.49999 15.142 7.40833 16.5836 10.5C15.142 13.5917 12.642 15.5 10.0003 15.5ZM10.0003 7.16666C9.34103 7.16666 8.69656 7.36216 8.1484 7.72843C7.60024 8.0947 7.17299 8.6153 6.9207 9.22438C6.66841 9.83347 6.6024 10.5037 6.73102 11.1503C6.85963 11.7969 7.1771 12.3908 7.64328 12.857C8.10945 13.3232 8.7034 13.6407 9.35 13.7693C9.9966 13.8979 10.6668 13.8319 11.2759 13.5796C11.885 13.3273 12.4056 12.9001 12.7719 12.3519C13.1381 11.8037 13.3336 11.1593 13.3336 10.5C13.3336 9.61594 12.9824 8.76809 12.3573 8.14297C11.7322 7.51785 10.8844 7.16666 10.0003 7.16666ZM10.0003 12.1667C9.67066 12.1667 9.34843 12.0689 9.07435 11.8858C8.80027 11.7026 8.58665 11.4423 8.4605 11.1378C8.33435 10.8333 8.30135 10.4981 8.36566 10.1748C8.42997 9.85154 8.5887 9.55457 8.82179 9.32148C9.05488 9.0884 9.35185 8.92966 9.67515 8.86535C9.99845 8.80104 10.3336 8.83405 10.6381 8.9602C10.9426 9.08634 11.2029 9.29996 11.3861 9.57404C11.5692 9.84813 11.667 10.1704 11.667 10.5C11.667 10.942 11.4914 11.3659 11.1788 11.6785C10.8663 11.9911 10.4423 12.1667 10.0003 12.1667Z"
                      fill="#DBDDE0"/>
              </svg>
          </div>
      }
    </div>
  )
}

export default Input
