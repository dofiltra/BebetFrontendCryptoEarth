import { TFullStatistic } from '@/Components/App/Statistic/Statistic.types'
import {
  ActivePartnersCount,
  AvgIncome,
  DepositsCompleted,
  DepositsConversion,
  DepositsSum,
  FirstDeposits,
  Reg,
  TotalIncome,
  Traf2Reg,
  Traffic,
} from '@/shared/ui/dashboard/item'

function DashboardLaptop({ statistics }: { statistics: TFullStatistic }) {
  return (
    <>
      <div className={'statistic__info-container-first'}>
        <Traffic data={statistics?.traffic} />
        <Reg data={statistics?.registractions} />
        <Traf2Reg data={statistics?.ratioTrafficRegistration} />
        <ActivePartnersCount data={statistics?.activePartnersCount} />
      </div>
      <div className={'statistic__info-container-second'}>
        <FirstDeposits data={statistics?.depositsFirst} />
        <DepositsCompleted data={statistics?.depositsCompleted} />
        <DepositsConversion data={statistics?.depositsRatio} />
        <DepositsSum data={statistics?.depositsSummary} />
      </div>
      <div className={'statistic__info-container-third'}>
        <AvgIncome data={statistics?.avgIncome} />
        <TotalIncome data={statistics?.income} />
      </div>
    </>
  )
}

function DashboardMobile({ statistics }: { statistics: TFullStatistic }) {
  return (
    <>
      <div className={'statistic__info-container-first'}>
        <Traffic data={statistics?.traffic} />
        <Reg data={statistics?.registractions} />
      </div>
      {/* <div className={'statistic__info-container-second'}>
        <Traf2Reg data={statistics?.ratioTrafficRegistration} />
        <AvgTrafByDay data={statistics?.traffic2} />
      </div> */}
      <div className={'statistic__info-container-third'}>
        <FirstDeposits data={statistics?.depositsFirst} />
        <DepositsCompleted data={statistics?.depositsCompleted} />
      </div>

      <div className={'statistic__info-container-four'}>
        <DepositsConversion data={statistics?.depositsRatio} />
        <DepositsSum data={statistics?.depositsSummary} />
      </div>
      <div className={'statistic__info-container-five'}>
        <AvgIncome data={statistics?.avgIncome} />
        <TotalIncome data={statistics?.income} />
      </div>
    </>
  )
}

export function AdminDashboard({ statistics, isMobile }: { statistics: TFullStatistic; isMobile: boolean }) {
  if (isMobile) {
    return <DashboardMobile statistics={statistics} />
  }

  return <DashboardLaptop statistics={statistics} />
}
