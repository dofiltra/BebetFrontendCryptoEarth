import './Referral.scss';
import React, {useState} from "react";
import Input from "@/shared/ui/input";

interface IStatisticProps {
    referent: any;
}

const Referral: React.FC<IStatisticProps> = ({referent}) => {
    const [showPopup, setShowPopup] = useState(false)
    const [name, setName] = useState('')
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')

    const popup = () => {
        return (
            <div className={'referral-popup'}>
                <div className={'login__closeBtn'} onClick={() => setShowPopup(false)}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" rx="16" fill="white"/>
                        <path
                            d="M28.331 18.6083C28.6239 18.3154 29.0988 18.3154 29.3917 18.6083C29.6846 18.9012 29.6846 19.3761 29.3917 19.669L25.0606 24L29.3916 28.331C29.6845 28.6239 29.6845 29.0988 29.3916 29.3917C29.0987 29.6846 28.6238 29.6846 28.331 29.3917L23.9999 25.0607L19.6689 29.3917C19.376 29.6846 18.9012 29.6846 18.6083 29.3917C18.3154 29.0988 18.3154 28.6239 18.6083 28.331L22.9393 24L18.6082 19.669C18.3153 19.3761 18.3153 18.9012 18.6082 18.6083C18.9011 18.3154 19.376 18.3154 19.6689 18.6083L23.9999 22.9394L28.331 18.6083Z"
                            fill="black"/>
                    </svg>
                </div>

                <div className={'referral-popup__title'}>
                    <p>Создать ссылку</p>
                </div>

                <Input onChange={(props) => setName(props)} placeHolder={'Имя'} value={name}/>
                <Input onChange={(props) => setLink(props)} placeHolder={'Ссылка на страницу'} value={link}/>
                <textarea
                    placeholder={'Описание'}
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                />
            </div>
        )
    }


    return (
        <div className={'referral'}>
            {showPopup && popup()}
            <div className={'referral__title'}>
                <p>Мои рефералы</p>
            </div>
            <div className={'referral__container'}>
                <div className={'referral__container-header'}>
                    <p>Дата</p>
                    <p>Переходы</p>
                    <p>Регистраця</p>
                    <p>Первые депозиты</p>
                    <p>Кол-во депозитов</p>
                    <p>Сумма депозитов</p>
                    <p>Повторные депозиты</p>
                    <p>Сумма ставок</p>
                    <p>Общий выигрыш</p>
                    <p>Общий проигрыш</p>
                    <p>Общая разница</p>
                    <p>Бонус</p>
                    <p>Доход</p>
                </div>

                {referent.length > 0 && referent.map((item: any, index: any) => {

                    return (
                        <div key={index} className={'referral__item'}>
                            <p>{new Date(item?.statistics?.connection_date).toJSON().slice(0, 10)}</p>
                            <p>{item?.statistics?.traffic}</p>
                            <p>{new Date(item?.statistics?.connection_date).toJSON().slice(0, 10)}</p>
                            <p>{item?.statistics?.depositsFirst}</p>
                            <p>{item?.statistics?.depositsCount}</p>
                            <p>{item?.statistics?.depositsSummary}</p>
                            <p>{item?.statistics?.depositsRepeat}</p>
                            <p>{item?.statistics?.betsSummary}</p>
                            <p>{item?.statistics?.winnedSummary}</p>
                            <p>{item?.statistics?.losedSummary}</p>
                            <p>{item?.statistics?.betsDiff}</p>
                            <p>{item?.statistics?.bonus}</p>
                            <p>{item?.statistics?.income}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Referral;
