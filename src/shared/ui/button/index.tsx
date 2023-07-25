import s from './styles.module.scss'
import React from 'react'
import cn from 'classnames'

interface Props {
  title: string;
  handleClick: () => void;
  disabled: boolean;
  width?: string,
  transparent?: boolean;
  black?: boolean;
  told?: boolean;
}

export const Button: React.FC<Props> = (props: Props) => {

  const { title, handleClick, disabled, width, transparent, black, told } = props
  return (
    <div className={cn(s.ui_button, {
      [s.ui_button__disabled]: disabled,
      [s.ui_button__transparent]: transparent,
      [s.ui_button__black]: black,
      [s.ui_button__told]: told,
    })}
         style={{ width: width ? width : 'auto' }}
         onClick={() => !disabled && handleClick()}
    >
      {title}
    </div>
  )
}
