import type { DataEntry, TFullStatistic } from './Statistic.types'

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
      formatter={({ value }) => `${(parseFloat(value.toString() || '0') * 100).toFixed(2)}%`}
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
  return (
    <DashboardItem
      title={`Конверсия рег в деп`}
      data={data}
      formatter={({ value }) => `${(parseFloat(value.toString() || '0') * 100).toFixed(2)}%`}
    />
  )
}

function DepositsSum({ data }: { data?: DataEntry[] }) {
  return <DashboardItem title={`Сумма депозитов`} data={data} />
}

function TotalIncome({ data }: { data?: DataEntry[] }) {
  return <DashboardItem title={`Общий доход`} data={data} />
}

export function DashboardItems({ fullStatistic }: { fullStatistic: TFullStatistic }) {
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

export function DashboardItemsMobile({ fullStatistic }: { fullStatistic: TFullStatistic }) {
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
