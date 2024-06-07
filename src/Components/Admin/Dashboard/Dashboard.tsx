import type { TAdminStatistics } from './types'

// function TotalIncome({ data }: { data?: DataEntry[] }) {
//     return <DashboardItem title={`Общий доход`} data={data} />
//   }

//   function DashboardLaptop({ fullStatistic }: { fullStatistic: TFullStatistic }) {
//     return (
//       <>
//         <div className={'statistic__info-container-first'}>
//           <Traffic data={fullStatistic?.traffic} />
//           <Reg data={fullStatistic?.registractions} />
//           <Traf2Reg data={fullStatistic?.ratioTrafficRegistration} />
//           <AvgTrafByDay data={fullStatistic?.traffic2} />
//         </div>
//         <div className={'statistic__info-container-second'}>
//           <FirstDeposits data={fullStatistic?.depositsFirst} />
//           <DepositsCompleted data={fullStatistic?.depositsCompleted} />
//           <DepositsConversion data={fullStatistic?.depositsRatio} />
//           <DepositsSum data={fullStatistic?.depositsSummary} />
//         </div>
//         <div className={'statistic__info-container-third'}>
//           <AvgIncome data={fullStatistic?.avgIncome} />
//           <TotalIncome data={fullStatistic?.income} />
//         </div>
//       </>
//     )
//   }

//   function DashboardMobile({ fullStatistic }: { fullStatistic: TFullStatistic }) {
//     return (
//       <>
//         <div className={'statistic__info-container-first'}>
//           <Traffic data={fullStatistic?.traffic} />
//           <Reg data={fullStatistic?.registractions} />
//         </div>
//         <div className={'statistic__info-container-second'}>
//           <Traf2Reg data={fullStatistic?.ratioTrafficRegistration} />
//           <AvgTrafByDay data={fullStatistic?.traffic2} />
//         </div>
//         <div className={'statistic__info-container-third'}>
//           <FirstDeposits data={fullStatistic?.depositsFirst} />
//           <DepositsCompleted data={fullStatistic?.depositsCompleted} />
//         </div>

//         <div className={'statistic__info-container-four'}>
//           <DepositsConversion data={fullStatistic?.depositsRatio} />
//           <DepositsSum data={fullStatistic?.depositsSummary} />
//         </div>
//         <div className={'statistic__info-container-five'}>
//           <AvgIncome data={fullStatistic?.avgIncome} />
//           <TotalIncome data={fullStatistic?.income} />
//         </div>
//       </>
//     )
//   }

export function AdminDashboard({ statistics, isMobile }: { statistics: TAdminStatistics; isMobile: boolean }) {
  // if (isMobile) {
  //   return <DashboardMobile fullStatistic={fullStatistic} />
  // }

  // return <DashboardLaptop fullStatistic={fullStatistic} />
  return <></>
}
