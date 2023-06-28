import './UiCheckBox.scss';
import React from 'react';
import classNames from "classnames";

interface IUiCheckBoxProps {
    title: string;
    handleToggle: () => void;
    checked: boolean;
    terms?: boolean;
    error?: boolean;
}

const UiCheckBox: React.FC<IUiCheckBoxProps> = ({title, handleToggle, checked, terms, error}) => {
    return (
        <div className={classNames({
            'ui-checkbox': true,
            'ui-checkbox--error': error,
        })}
             onClick={handleToggle}
        >
            {
                checked
                    ?
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.68198 12.2353L4.5 9.05328L5.56066 7.99262L7.68198 10.1139L11.9246 5.8713L12.9853 6.93196L7.68198 12.2353Z"
                            fill="#E8EAED"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M0.75 3.75C0.75 2.09315 2.09315 0.75 3.75 0.75H14.25C15.9069 0.75 17.25 2.09315 17.25 3.75V14.25C17.25 15.9069 15.9069 17.25 14.25 17.25H3.75C2.09315 17.25 0.75 15.9069 0.75 14.25V3.75ZM3.75 2.25H14.25C15.0784 2.25 15.75 2.92157 15.75 3.75V14.25C15.75 15.0784 15.0784 15.75 14.25 15.75H3.75C2.92157 15.75 2.25 15.0784 2.25 14.25V3.75C2.25 2.92157 2.92157 2.25 3.75 2.25Z"
                              fill="#E8EAED"/>
                    </svg>

                    :
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M17.25 3.75C17.25 2.09315 15.9069 0.75 14.25 0.75H3.75C2.09315 0.75 0.75 2.09315 0.75 3.75V14.25C0.75 15.9069 2.09315 17.25 3.75 17.25H14.25C15.9069 17.25 17.25 15.9069 17.25 14.25V3.75ZM14.25 2.25H3.75C2.92157 2.25 2.25 2.92157 2.25 3.75V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V3.75C15.75 2.92157 15.0784 2.25 14.25 2.25Z"
                              fill="#E8EAED"/>
                    </svg>
            }
            <div className={'ui-checkbox__container'}>
                <p>{title}</p>
                {terms && <h1>Условия использования</h1>}
            </div>
        </div>
    );
}

export default UiCheckBox;
