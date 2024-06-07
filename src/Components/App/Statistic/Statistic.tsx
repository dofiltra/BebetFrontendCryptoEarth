import './Statistic.scss'
import { useEffect, useRef, useState } from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { useIsMobile } from '@/shared/lib/hooks'
import cn from 'classnames'
import type { DataEntry, TFilterDate, TFullStatistic, TransformedData } from './Statistic.types'

interface Props {
  fullStatistic: TFullStatistic
  onChangeDate: (value: TFilterDate) => void
}

const getData = (value: unknown): number | string => {
  if (value || value === 0) {
    if (Array.isArray(value)) {
      value = value
        ?.filter((x) => x?.data)
        .map((x) => x.data)
        .reduce((prev, curr) => prev + (curr || 0), 0)
    }

    if (typeof value === 'number' || typeof value === 'string') {
      return value
    }
  }
  return 'Нет данных'
}

const getMonths = () => [
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

const Statistic = (props: Props = {} as Props) => {
  const { fullStatistic = {}, onChangeDate } = { ...props }
  const chartRef = useRef<HTMLDivElement | null>(null)
  const { isMobile } = useIsMobile()
  const [width, setWidth] = useState(0)
  const [filter, setFilter] = useState<TFilterDate>('all')

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

  const handleFilterChange = (filterValue: TFilterDate) => {
    onChangeDate?.(filterValue)
    setFilter(filterValue)
  }

  const months: string[] = getMonths()

  function transformData(data: { [key: string]: DataEntry[] }): TransformedData[] {
    const transformedData: TransformedData[] = []
    const fieldTranslations: { [key: string]: string } = {
      registractions: 'Регистрации',
      traffic: 'Переходы',
      depositsFirst: 'Депозит',
      depositsSummary: 'Сумма депозита',
      avgIncome: 'Средний доход с игрока',
    }

    for (let i = 0; i < months.length; i++) {
      const newObj: TransformedData = {
        name: months[i] || '',
        Депозит: 0,
        Переходы: 0,
        Регистрации: 0,
        'Средний доход с игрока': 0,
        'Сумма депозита': 0,
      }
      for (const key in data) {
        if (!data.hasOwnProperty(key)) {
          continue
        }

        const values: DataEntry[] | null = data[key]
        let totalValue = 0

        if (values?.length && Array.isArray(values)) {
          for (const entry of values) {
            const date = entry.date
            const value = entry.data || 0

            if (new Date(date).getMonth() === i) {
              totalValue += value
            }
          }
        }

        const translatedKey = fieldTranslations[key] || key
        newObj[translatedKey] = totalValue
      }
      transformedData.push(newObj)
    }
    return transformedData
  }

  const statisticData = transformData(fullStatistic)

  return (
    <div className={'statistic'}>
      <div className={'statistic__title'}>
        <p>Статистика</p>
      </div>
      <div className={'statistic__graphics'} ref={chartRef}>
        {width > 0 && (
          <BarChart width={width} height={300} data={statisticData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Регистрации" fill="#F14336" />
            <Bar dataKey="Переходы" fill="#a358e8" />
            <Bar dataKey="Депозит" fill="#0085FF" />
            <Bar dataKey="Сумма депозита" fill="#28B446" />
            <Bar dataKey="Средний доход с игрока" fill="#FDB12F" />
          </BarChart>
        )}
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
          {isMobile && <DashboardItemsMobile fullStatistic={fullStatistic} />}
          {!isMobile && <DashboardItems fullStatistic={fullStatistic} />}
        </div>
      </div>
    </div>
  )
}

function DashboardItem({
  title,
  data,
  formatter = ({ value }) => value.toString(),
}: {
  title: string
  data?: DataEntry[]
  formatter?: (o: { value: string | number }) => string
}) {
  return (
    <div className="item">
      <div className="item__title">
        <p>{title}</p>
      </div>
      <p>{formatter({ value: getData(data) })}</p>
    </div>
  )
}

function Traffic({ data }: { data?: DataEntry[] }) {
  return <DashboardItem title={`Переходы`} data={data} />
}

function Reg({ data }: { data?: DataEntry[] }) {
  return <DashboardItem title={`Регистрации`} data={data} />
}

function Traf2Reg({ data }: { data?: DataEntry[] }) {
  return (
    <DashboardItem
      title={`Конверсия в регистрации`}
      data={data}
      formatter={({ value }) => `${parseFloat(value.toString() || '0') * 100}%`}
    />
  )
}

function AvgIncome({ data }: { data?: DataEntry[] }) {
  return <DashboardItem title={`Средний доход с игрока`} data={data} />
}

function AvgTrafByDay({ data }: { data?: DataEntry[] }) {
  return <DashboardItem title={`Среднее кол-во переходов в сутки`} data={data} />
}

function FirstDeposits({ data }: { data?: DataEntry[] }) {
  return <DashboardItem title={`Первые депозиты`} data={data} />
}

function DepositsCompleted({ data }: { data?: DataEntry[] }) {
  return <DashboardItem title={`Кол-во заврешенных депозитов`} data={data} />
}

function DepositsConversion({ data }: { data?: DataEntry[] }) {
  console.log(data)
  return (
    <DashboardItem
      title={`Конверсия рег в деп`}
      data={data}
      formatter={({ value }) => `${parseFloat(value.toString() || '0') * 100}%`}
    />
  )
}

function DepositsSum({ data }: { data?: DataEntry[] }) {
  return <DashboardItem title={`Сумма депозитов`} data={data} />
}

function TotalIncome({ data }: { data?: DataEntry[] }) {
  return <DashboardItem title={`Общий доход`} data={data} />
}

function DashboardItems({ fullStatistic }: { fullStatistic: TFullStatistic }) {
  return (
    <>
      <div className={'statistic__info-container-first'}>
        <Traffic data={fullStatistic?.traffic} />
        <Reg data={fullStatistic?.registractions} />
        <Traf2Reg data={fullStatistic?.ratioTrafficRegistration} />
        <AvgTrafByDay data={fullStatistic?.traffic2} />
      </div>
      <div className={'statistic__info-container-second'}>
        <FirstDeposits data={fullStatistic?.depositsFirst} />
        <DepositsCompleted data={fullStatistic?.depositsCompleted} />
        <DepositsConversion data={fullStatistic?.depositsRatio} />
        <DepositsSum data={fullStatistic?.depositsSummary} />
      </div>
      <div className={'statistic__info-container-third'}>
        <AvgIncome data={fullStatistic?.avgIncome} />
        <TotalIncome data={fullStatistic?.income} />
      </div>
    </>
  )
}

function DashboardItemsMobile({ fullStatistic }: { fullStatistic: TFullStatistic }) {
  return (
    <>
      <div className={'statistic__info-container-first'}>
        <Traffic data={fullStatistic?.traffic} />
        <Reg data={fullStatistic?.registractions} />
      </div>
      <div className={'statistic__info-container-second'}>
        <Traf2Reg data={fullStatistic?.ratioTrafficRegistration} />
        <AvgTrafByDay data={fullStatistic?.traffic2} />
      </div>
      <div className={'statistic__info-container-third'}>
        <FirstDeposits data={fullStatistic?.depositsFirst} />
        <DepositsCompleted data={fullStatistic?.depositsCompleted} />
      </div>

      <div className={'statistic__info-container-four'}>
        <DepositsConversion data={fullStatistic?.depositsRatio} />
        <DepositsSum data={fullStatistic?.depositsSummary} />
      </div>
      <div className={'statistic__info-container-five'}>
        <AvgIncome data={fullStatistic?.avgIncome} />
        <TotalIncome data={fullStatistic?.income} />
      </div>
    </>
  )
}

export default Statistic
