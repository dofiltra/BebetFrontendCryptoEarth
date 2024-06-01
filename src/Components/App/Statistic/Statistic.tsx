import './Statistic.scss'
import { useEffect, useRef, useState } from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { useIsMobile } from '@/shared/lib/hooks'
import cn from 'classnames'

export type Filters = 'all' | 'month' | 'week' | 'yesterday' | 'today'

interface Props {
  fullStatistic: any
  onChangeDate: (value: Filters) => void
}

const getData = (value: unknown): number | string => {
  if (value && (typeof value === 'number' || typeof value === 'string')) {
    return value
  }
  return 'Нет данных'
}

const Statistic = (props: Props) => {
  const { fullStatistic, onChangeDate } = props
  const chartRef = useRef<HTMLDivElement | null>(null)
  const { isMobile } = useIsMobile()
  const [width, setWidth] = useState(0)
  const [filter, setFilter] = useState<Filters>('all') // Изначально выбран фильтр "За все время"

  useEffect(() => {
    const changeWidth = () => {
      const offset = chartRef.current?.offsetWidth
      if (offset) {
        setWidth(offset)
      }
    }
    changeWidth()
    window.addEventListener('resize', changeWidth)
    return () => window.removeEventListener('resize', changeWidth)
  }, [])

  const handleFilterChange = (filterValue: Filters) => {
    onChangeDate(filterValue)
    setFilter(filterValue)
  }

  const months: string[] = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]

  interface DataEntry {
    date: string
    data: number
  }

  interface TransformedData {
    name: string

    [key: string]: number | string
  }

  function transformData(data: { [key: string]: DataEntry[] }): TransformedData[] {
    const transformedData: TransformedData[] = []
    const fieldTranslations: { [key: string]: string } = {
      registractions: 'Регистрации',
      traffic: 'Переходы',
      depositsFirst: 'Депозит',
      depositsSummary: 'Сумма депозита',
      avgIncome: 'Первые депозиты',
    }

    for (let i = 0; i < months.length; i++) {
      const newObj: TransformedData = { name: months[i] }
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const values: DataEntry[] = data[key]
          let totalValue = 0
          if (Array.isArray(values)) {
            for (const entry of values) {
              const date = entry.date
              const value = entry.data

              if (new Date(date).getMonth() === i) {
                totalValue += value
              }
            }
          }
          const translatedKey = fieldTranslations[key] || key
          newObj[translatedKey] = totalValue
        }
      }
      transformedData.push(newObj)
    }
    return transformedData
  }

  let res = transformData(fullStatistic)
  return (
    <div className={'statistic'}>
      <div className={'statistic__title'}>
        <p>Статистика</p>
      </div>
      <div className={'statistic__graphics'} ref={chartRef}>
        <BarChart
          width={width}
          height={300}
          data={res}
          margin={
            {
              // top: 5,
              // right: 30,
              // left: 20,
              // bottom: 5,
            }
          }
        >
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Регистрации' fill='#F14336' />
          <Bar dataKey='Переходы' fill='#a358e8' />
          <Bar dataKey='Депозит' fill='#0085FF' />
          <Bar dataKey='Сумма депозита' fill='#28B446' />
          <Bar dataKey='Первые депозиты' fill='#FDB12F' />
        </BarChart>
      </div>
      <div className={'statistic__info'}>
        <div className={'statistic__info-filters'}>
          <div
            className={cn('filter', {
              ['filter_active']: filter === 'all',
            })}
            onClick={() => handleFilterChange('all')}
          >
            <p>За все время</p>
          </div>
          <div
            className={cn('filter', {
              ['filter_active']: filter === 'month',
            })}
            onClick={() => handleFilterChange('month')}
          >
            <p>Месяц</p>
          </div>
          <div
            className={cn('filter', {
              ['filter_active']: filter === 'week',
            })}
            onClick={() => handleFilterChange('week')}
          >
            <p>Неделя</p>
          </div>
          <div
            className={cn('filter', {
              ['filter_active']: filter === 'yesterday',
            })}
            onClick={() => handleFilterChange('yesterday')}
          >
            <p>Вчера</p>
          </div>
          <div
            className={cn('filter', {
              ['filter_active']: filter === 'today',
            })}
            onClick={() => handleFilterChange('today')}
          >
            <p>Сегодня</p>
          </div>
        </div>

        <div className={'statistic__info-container'}>
          <div className={'statistic__info-container-first'}>
            {!isMobile && (
              <>
                <div className='item'>
                  <div className='item__title'>
                    <p>Переходы</p>
                  </div>
                  <p>{getData(fullStatistic?.traffic)}</p>
                </div>
                <div className='item'>
                  <div className='item__title'>
                    <p>Регистрации</p>
                  </div>
                  <p>{getData(fullStatistic?.registractions)}</p>
                </div>
                <div className='item'>
                  <div className='item__title'>
                    <p>Ратио по регистрациям</p>
                  </div>
                  <p>{getData(fullStatistic?.ratioTrafficRegistration)}</p>
                </div>
                <div className='item'>
                  <div className='item__title'>
                    <p>Средний доход с игрока</p>
                  </div>
                  <p>{getData(fullStatistic?.avgIncome)}</p>
                </div>
              </>
            )}
            {isMobile && (
              <>
                <div className='item'>
                  <div className='item__title'>
                    <p>Переходы</p>
                  </div>
                  <p>{getData(fullStatistic?.traffic)}</p>
                </div>
                <div className='item'>
                  <div className='item__title'>
                    <p>Регистрации</p>
                  </div>
                  <p>{getData(fullStatistic?.registractions)}</p>
                </div>
              </>
            )}
          </div>
          <div className={'statistic__info-container-second'}>
            {!isMobile && (
              <>
                <div className='item'>
                  <div className='item__title'>
                    <p>Переходы в день</p>
                  </div>
                  <p>{getData(fullStatistic?.traffic2)}</p>
                </div>
                <div className='item'>
                  <div className='item__title'>
                    <p>Первые депозиты</p>
                  </div>
                  <p>{getData(fullStatistic?.depositsFirst)}</p>
                </div>
                <div className='item'>
                  <div className='item__title'>
                    <p>Кол-во выполнений депозитов</p>
                  </div>
                  <p>{getData(fullStatistic?.depositsCompleted)}</p>
                </div>
                <div className='item'>
                  <div className='item__title'>
                    <p>Ратио по депозитам</p>
                  </div>
                  <p>{getData(fullStatistic?.depositsRatio)}</p>
                </div>
              </>
            )}
            {isMobile && (
              <>
                <div className='item'>
                  <div className='item__title'>
                    <p>Ратио по регистрациям</p>
                  </div>
                  <p>{getData(fullStatistic?.ratioTrafficRegistration)}</p>
                </div>
                <div className='item'>
                  <div className='item__title'>
                    <p>Средний доход с игрока</p>
                  </div>
                  <p>{getData(fullStatistic?.avgIncome)}</p>
                </div>
              </>
            )}
          </div>
          <div className={'statistic__info-container-third'}>
            {!isMobile && (
              <>
                <div className='item'>
                  <div className='item__title'>
                    <p>Сумма депозитов</p>
                  </div>
                  <p>{getData(fullStatistic?.depositsSummary)}</p>
                </div>
                <div className='item'>
                  <div className='item__title'>
                    <p>Стоимость перехода</p>
                  </div>
                  <p>{getData(fullStatistic?.trafficPrice)}</p>
                </div>
              </>
            )}
            {isMobile && (
              <>
                <div className='item'>
                  <div className='item__title'>
                    <p>Переходы в день</p>
                  </div>
                  <p>{getData(fullStatistic?.traffic2)}</p>
                </div>
                <div className='item'>
                  <div className='item__title'>
                    <p>Первые депозиты</p>
                  </div>
                  <p>{getData(fullStatistic?.depositsFirst)}</p>
                </div>
              </>
            )}
          </div>
          {isMobile && (
            <>
              <div className={'statistic__info-container-four'}>
                <div className='item'>
                  <div className='item__title'>
                    <p>Кол-во выполнений депозитов</p>
                  </div>
                  <p>{getData(fullStatistic?.depositsCompleted)}</p>
                </div>
                <div className='item'>
                  <div className='item__title'>
                    <p>Ратио по депозитам</p>
                  </div>
                  <p>{getData(fullStatistic?.depositsRatio)}</p>
                </div>
              </div>
              <div className={'statistic__info-container-five'}>
                <div className='item'>
                  <div className='item__title'>
                    <p>Сумма депозитов</p>
                  </div>
                  <p>{getData(fullStatistic?.depositsSummary)}</p>
                </div>
                <div className='item'>
                  <div className='item__title'>
                    <p>Стоимость перехода</p>
                  </div>
                  <p>{getData(fullStatistic?.trafficPrice)}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Statistic
