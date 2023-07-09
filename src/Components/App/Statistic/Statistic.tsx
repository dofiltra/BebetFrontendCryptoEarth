import './Statistic.scss';
import React, {useEffect, useRef, useState} from "react";
import {Bar, BarChart, Legend, Tooltip, XAxis, YAxis} from "recharts";

interface IStatisticProps {
    data: any,
    fullStatistic: any
}

const Statistic: React.FC<IStatisticProps> = ({data, fullStatistic}) => {
    const chartRef = useRef(null)
    const mobile = window.innerWidth >= 320 && window.innerWidth <= 470

    const [ldata, setLData] = useState<any>({})
    const [filter, setFilter] = useState<string>('all'); // Изначально выбран фильтр "За все время"

    const processData = (filter: string) => {
        const transformedData = transformData(fullStatistic, filter);
        setLData(transformedData);
    }

    useEffect(() => {
        setLData(data);
    }, [data]);


    // Обработчик изменения фильтра
    /*const handleFilterChange = (filter: string) => {
        // Обновление ldata в соответствии с выбранным фильтром
        if (filter === 'all') {
            setLData(data);
        } else if (filter === 'month') {
            const filteredData = data.slice(0, 12); // Пример фильтрации по месяцам
            setLData(filteredData);
        } else if (filter === 'week') {
            const filteredData = data.slice(0, 7); // Пример фильтрации по неделям
            setLData(filteredData);
        } else if (filter === 'yesterday') {
            // Обработка фильтра "Вчера"
            // ...
        } else if (filter === 'today') {
            // Обработка фильтра "Сегодня"
            // ...
        }
    }*/
    /*const handleFilterChange = (filter: string) => {
        if (filter === 'all') {
            setLData(data);
        } else if (Array.isArray(data)) { // Check if data is an array
            if (filter === 'month') {
                const filteredData = data.slice(0, 12); // Example: filter by months
                setLData(filteredData);
            } else if (filter === 'week') {
                const filteredData = data.slice(0, 7); // Example: filter by weeks
                setLData(filteredData);
            } else if (filter === 'yesterday') {
                // Handle "yesterday" filter
            } else if (filter === 'today') {
                // Handle "today" filter
            }
        }
    }*/
    const handleFilterChange = (filter: string) => {
        // Обновление ldata в соответствии с выбранным фильтром
        if (filter === 'all') {
            setLData(data);
        } else {
            let filteredData = transformData(data, filter);
            setLData(filteredData);
        }
    }

    const months: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

    interface DataEntry {
        date: string;
        value: number;
    }

    interface TransformedData {
        name: string;
        [key: string]: number | string;
    }


    function transformData(data: { [key: string]: DataEntry[] }, filter: string): TransformedData[] {
        const transformedData: TransformedData[] = [];
        const fieldTranslations: { [key: string]: string } = {
            registractions: 'Регистрации',
            traffic: 'Переходы',
            depositsFirst: 'Депозит',
            depositsSummary: 'Сумма депозита',
            avgIncome: 'Первые депозиты'
        };

        for (let i = 0; i < months.length; i++) {
            const newObj: TransformedData = { name: months[i] };
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const values: DataEntry[] = data[key];
                    let totalValue = 0;
                    for (const entry of values) {
                        const date = entry.date;
                        const value = entry.value;
                        if (new Date(date).getMonth() === i) {
                            totalValue += value;
                        }
                    }
                    const translatedKey = fieldTranslations[key] || key;
                    newObj[translatedKey] = totalValue;
                }
            }
            transformedData.push(newObj);
        }

        // Применение фильтрации
        if (filter === 'month') {
            transformedData.splice(0, months.length - 1); // Оставляем только текущий месяц
        } else if (filter === 'week') {
            // Примените логику для фильтрации по неделе
        } else if (filter === 'yesterday') {
            // Примените логику для фильтрации по вчерашнему дню
        } else if (filter === 'today') {
            // Примените логику для фильтрации по текущему дню
        }

        return transformedData;
    }

    let res = transformData(fullStatistic, filter);

    return (
        <div className={'statistic'}>
            <div className={'statistic__title'}>
                <p>Статистика</p>
            </div>
            <div className={'statistic__graphics'} ref={chartRef}>
                <BarChart
                    // @ts-ignore
                    width={chartRef.current?.offsetWidth}
                    height={300}
                    data={res}
                    margin={{
                        // top: 5,
                        // right: 30,
                        // left: 20,
                        // bottom: 5,
                    }}
                >
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="Регистрации" fill="#F14336"/>
                    <Bar dataKey="Переходы" fill="#a358e8"/>
                    <Bar dataKey="Депозит" fill="#0085FF"/>
                    <Bar dataKey="Сумма депозита" fill="#28B446"/>
                    <Bar dataKey="Первые депозиты" fill="#FDB12F"/>
                </BarChart>
            </div>
            <div className={'statistic__info'}>
                <div className={'statistic__info-filters'}>
                    <div className={'filter'} onClick={() => handleFilterChange('all')}><p>За все время</p></div>
                    <div className={'filter'} onClick={() => handleFilterChange('month')}><p>Месяц</p></div>
                    <div className={'filter'} onClick={() => handleFilterChange('week')}><p>Неделя</p></div>
                    <div className={'filter'} onClick={() => handleFilterChange('yesterday')}><p>Вчера</p></div>
                    <div className={'filter'} onClick={() => handleFilterChange('today')}><p>Сегодня</p></div>
                </div>

                <div className={'statistic__info-container'}>
                    <div className={'statistic__info-container-first'}>
                        {!mobile &&
                            <>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Переходы</p>
                                    </div>
                                    <p>{ldata?.traffic}</p>
                                </div>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Регистрации</p>
                                    </div>
                                    <p>{ldata?.registractions}</p>
                                </div>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Ратио по регистрациям</p>
                                    </div>
                                    <p>{ldata?.ratioTrafficRegistration}</p>
                                </div>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Средний доход с игрока</p>
                                    </div>
                                    <p>{ldata?.avgIncome}</p>
                                </div>
                            </>
                        }
                        {mobile &&
                            <>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Переходы</p>
                                    </div>
                                    <p>{ldata?.traffic}</p>
                                </div>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Регистрации</p>
                                    </div>
                                    <p>{ldata?.registractions}</p>
                                </div>
                            </>
                        }
                    </div>
                    <div className={'statistic__info-container-second'}>
                        {!mobile &&
                            <>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Переходы в день</p>
                                    </div>
                                    <p>{ldata?.traffic2}</p>
                                </div>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Первые депозиты</p>
                                    </div>
                                    <p>{ldata?.depositsFirst}</p>
                                </div>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Кол-во выполнений депозитов</p>
                                    </div>
                                    <p>{ldata?.depositsCompleted}</p>
                                </div>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Ратио по депозитам</p>
                                    </div>
                                    <p>{ldata?.depositsRatio}</p>
                                </div>
                            </>
                        }
                        {mobile &&
                            <>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Ратио по регистрациям</p>
                                    </div>
                                    <p>{ldata?.ratioTrafficRegistration}</p>
                                </div>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Средний доход с игрока</p>
                                    </div>
                                    <p>{ldata?.avgIncome}</p>
                                </div>
                            </>
                        }
                    </div>
                    <div className={'statistic__info-container-third'}>
                        {!mobile &&
                            <>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Сумма депозитов</p>
                                    </div>
                                    <p>{ldata?.depositsSummary}</p>
                                </div>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Стоимость перехода</p>
                                    </div>
                                    <p>{ldata?.trafficPrice}</p>
                                </div>
                            </>
                        }
                        {mobile &&
                            <>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Переходы в день</p>
                                    </div>
                                    <p>{ldata?.traffic2}</p>
                                </div>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Первые депозиты</p>
                                    </div>
                                    <p>{ldata?.depositsFirst}</p>
                                </div>
                            </>
                        }
                    </div>
                    {mobile &&
                        <>
                            <div className={'statistic__info-container-four'}>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Кол-во выполнений депозитов</p>
                                    </div>
                                    <p>{ldata?.depositsCompleted}</p>
                                </div>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Ратио по депозитам</p>
                                    </div>
                                    <p>{ldata?.depositsRatio}</p>
                                </div>
                            </div>
                            <div className={'statistic__info-container-five'}>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Сумма депозитов</p>
                                    </div>
                                    <p>{ldata?.depositsSummary}</p>
                                </div>
                                <div className="item">
                                    <div className="item__title">
                                        <p>Стоимость перехода</p>
                                    </div>
                                    <p>{ldata?.trafficPrice}</p>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Statistic;