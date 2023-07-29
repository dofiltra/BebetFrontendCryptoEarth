import './UiSelector.scss';
import React, {useState} from 'react';
import cn from "classnames";

interface IUiSelectorProps {
    onSelect: (props: string) => void,
    title: string;
    value: string;
    items: Array<string>;
    error?: boolean;
}

const UiSelector: React.FC<IUiSelectorProps> = ({onSelect, title, value, items, error}) => {
    const [showDropdown, setShowDropdown] = useState(false)

    const handleSelect = (props: string) => {
        onSelect(props)
        setShowDropdown(false)
    }

    return (
        <div className={cn('ui-selector', {
            'ui-selector--error': error,
        })}
        >
            <div className={'ui-selector__container'} onClick={() => setShowDropdown(true)}>
                <p>{value ? value : title}</p>
            </div>

            {showDropdown &&
                <div className={'ui-selector-dropdown'}>
                    {items.map((item: any, index: number) => (
                        <div key={index} className={'ui-selector-dropdown__item'} onClick={() => handleSelect(item)}>
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default UiSelector;
