import './Statistic.scss';
import React, {useEffect, useRef, useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

interface IStatisticProps {
    data: any,
    fullStatistic: any
}

const Statistic: React.FC<IStatisticProps> = ({data, fullStatistic}) => {
    const chartRef = useRef(null)
    const mobile = window.innerWidth >= 320 && window.innerWidth <= 470

    const [ldata, setLData] = useState<any>({})

    useEffect(() => {
        setLData(data)
    }, [data])

    const months: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

    interface DataEntry {
        date: string;
        value: number;
    }

    interface TransformedData {
        name: string;
        [key: string]: number | string;
    }


    function transformData(data: { [key: string]: DataEntry[] }): TransformedData[] {
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

        return transformedData;
    }



    let res = transformData(fullStatistic)


    return (
        <div className={'statistic'}>
            <div className={'statistic__title'}>
                <p>Дашборд</p>
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
                    <Bar dataKey="Переходы" fill="#E8EAED"/>
                    <Bar dataKey="Депозит" fill="#0085FF"/>
                    <Bar dataKey="Сумма депозита" fill="#28B446"/>
                    <Bar dataKey="Первые депозиты" fill="#FDB12F"/>
                </BarChart>
            </div>
            <div className={'statistic__info'}>
                <div className={'statistic__info-filters'}>
                    <div className={'filter'}><p>За все время</p></div>
                    <div className={'filter'}><p>Месяц</p></div>
                    <div className={'filter'}><p>Неделя</p></div>
                    <div className={'filter'}><p>Вчера</p></div>
                    <div className={'filter'}><p>Сегодня</p></div>
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