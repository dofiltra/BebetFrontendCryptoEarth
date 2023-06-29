import './Links.scss';
import React, {useState} from "react";
import UiButton from "../../Ui/Button/UiButton";
import UiInput from "../../Ui/Input/UiInput";
import {createFormData, get, postFormData} from "../../../services/api";

interface IStatisticProps {
    user: any;
    getRefUrls: any
    refLinks: any
}

const Links: React.FC<IStatisticProps> = ({user, getRefUrls, refLinks}) => {
    const [showPopup, setShowPopup] = useState(false)
    const [name, setName] = useState('')
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')

    const createUrl = async () => {
        const url = `${link}`
        const d = createFormData({name: name, description: description, adress: url})
        let res = await postFormData("/ref_refs/Create", d)
        if (res) {
            setShowPopup(false)
            getRefUrls()
        }
    }

    const popup = () => {
        return (
            <div className={'links-popup'}>
                <div className={'login__closeBtn'} onClick={() => setShowPopup(false)}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" rx="16" fill="white"/>
                        <path
                            d="M28.331 18.6083C28.6239 18.3154 29.0988 18.3154 29.3917 18.6083C29.6846 18.9012 29.6846 19.3761 29.3917 19.669L25.0606 24L29.3916 28.331C29.6845 28.6239 29.6845 29.0988 29.3916 29.3917C29.0987 29.6846 28.6238 29.6846 28.331 29.3917L23.9999 25.0607L19.6689 29.3917C19.376 29.6846 18.9012 29.6846 18.6083 29.3917C18.3154 29.0988 18.3154 28.6239 18.6083 28.331L22.9393 24L18.6082 19.669C18.3153 19.3761 18.3153 18.9012 18.6082 18.6083C18.9011 18.3154 19.376 18.3154 19.6689 18.6083L23.9999 22.9394L28.331 18.6083Z"
                            fill="black"/>
                    </svg>
                </div>

                <div className={'links-popup__title'}>
                    <p>Создать ссылку</p>
                </div>

                <UiInput onChange={(props) => setName(props)} placeHolder={'Имя'} value={name}/>
                <UiInput onChange={(props) => setLink(props)} placeHolder={'Ссылка на страницу'} value={link}/>
                <textarea
                    placeholder={'Описание'}
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                />
                <UiButton title={'Создать ссылку'} handleClick={createUrl} disabled={false}
                          width={'100%'}/>
            </div>
        )
    }

    return (
        <div className={'links'}>
            {showPopup && popup()}
            <div className={'links__title'}>
                <p>Ссылки</p>

                <UiButton title={'Создать ссылку'} handleClick={() => setShowPopup(true)} disabled={false}/>
            </div>
            <div className={'links__container'}>
                <div className={'links__container-header'}>
                    <p>Имя</p>
                    <p>Ссылка</p>
                    <p>Описание</p>
                    <p>Ссылка для трафика</p>
                </div>

                {refLinks.length > 0 && refLinks.map((item: any, index: any) => {

                    return(
                        <div key={index} className={'links__item'}>
                            <p>{item.name}</p>
                            <p>{item.adress}</p>
                            <p>{item.description}</p>
                            <p>{item.url}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Links;