import './Outs.scss';
import React from "react";

interface ISettingsProps {
    outs: any
}

const Outs: React.FC<ISettingsProps> = ({outs}) => {
    const mobile = window.innerWidth >= 320 && window.innerWidth <= 470


    return (
        <div className={'outs'}>
            <div className={'outs__title'}>
                <p>Выводы</p>
            </div>
            <div className={'outs__container'}>
                <div className={'outs__container-header'}>
                    <p>Создано</p>
                    <p>Обработано</p>
                    <p>Сумма</p>
                    <p>Получатель</p>
                </div>

                {outs.length > 0 && outs.map((item: any, index: number) => {
                    return (
                        <div key={index} className={'outs__item'}>
                            <p>{item.createdAt}</p>
                            <p>{item.updatedAt}</p>
                            <p>{item.value}</p>
                            <p>{item.email}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Outs;