import { DashboardItem } from '@/shared/ui/dashboard/item'
import type { DataEntry, TFullStatistic } from './Statistic.types'

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
      formatter={({ value }) => `${(parseFloat((value || 0).toString() || '0') * 100).toFixed(2)}%`}
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
      formatter={({ value }) => `${(parseFloat((value || 0).toString() || '0') * 100).toFixed(2)}%`}
    />
  )
}

function DepositsSum({ data }: { data?: DataEntry[] }) {
  return <DashboardItem title={`Сумма депозитов`} data={data} />
}

function TotalIncome({ data }: { data?: DataEntry[] }) {
  return <DashboardItem title={`Общий доход`} data={data} />
}

function DashboardLaptop({ fullStatistic }: { fullStatistic: TFullStatistic }) {
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

function DashboardMobile({ fullStatistic }: { fullStatistic: TFullStatistic }) {
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

export function Dashboard({ fullStatistic, isMobile }: { fullStatistic: TFullStatistic; isMobile: boolean }) {
  if (isMobile) {
    return <DashboardMobile fullStatistic={fullStatistic} />
  }

  return <DashboardLaptop fullStatistic={fullStatistic} />
}
