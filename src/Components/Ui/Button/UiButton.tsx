import './UiButton.scss';
import React from 'react';
import classNames from "classnames";

interface IUIButtonProps {
    title: string;
    handleClick: () => void;
    disabled: boolean;
    width?: string,
    transparent?: boolean;
    black?: boolean;
    told?: boolean;
}

const UiButton: React.FC<IUIButtonProps> = ({title, handleClick, disabled, width, transparent, black,told}) => {
    return (
        <div className={classNames({
            'ui-button': true,
            'ui-button--disabled': disabled,
            'ui-button--transparent': transparent,
            'ui-button--black': black,
            'ui-button--told': told,
        })}
             style={{width: width ? width : 'auto'}}
             onClick={() => !disabled && handleClick()}
        >
            {title}
        </div>
    );
}

export default UiButton;
