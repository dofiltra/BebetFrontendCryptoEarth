import {
  AvgIncome,
  AvgTrafByDay,
  DepositsCompleted,
  DepositsConversion,
  DepositsSum,
  FirstDeposits,
  Reg,
  TotalIncome,
  Traf2Reg,
  Traffic,
} from '@/shared/ui/dashboard/item'
import type { TFullStatistic } from './Statistic.types'

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
