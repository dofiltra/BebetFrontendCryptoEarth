import type { TDashboardItemData } from './types'

export const getData = (value: TDashboardItemData, defaultValue: string | number = 'Нет данных'): number | string => {
  if (value || value === 0) {
    if (Array.isArray(value)) {
      value = value
        ?.filter((x: any) => x?.data || x?.value)
        .map((x: any) => x.data || x.value)
        .reduce((prev, curr) => prev + (curr || 0), 0)
    }

    if (!isNaN(value as any) && (typeof value === 'number' || typeof value === 'string')) {
      return value
    }
  }
  return defaultValue
}

export function DashboardItem({
  title,
  data,
  formatter = ({ value }) => value.toString(),
}: {
  title: string
  data?: TDashboardItemData
  formatter?: (o: { value: string | number }) => string
}) {
  return (
    <div className="item">
      <div className="item__title">
        <p>{title}</p>
      </div>
      <p>{data !== undefined ? formatter({ value: getData(data) }) : 'Нет данных'}</p>
    </div>
  )
}

export function Traffic({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Переходы`} data={data} />
}

export function Reg({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Регистрации`} data={data} />
}

function percentFormatter({ value }: { value: string | number }) {
  if (value === undefined) {
    return ''
  }
  return `${(parseFloat((value || 0).toString() || '0') * 100).toFixed(2)}%`
}
function floatNumFormatter({ value }: { value: string | number }) {
  if (value === undefined) {
    return ''
  }
  return `${parseFloat((value || 0).toString() || '0').toFixed(2)}%`
}

export function Traf2Reg({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Конверсия в регистрации`} data={data} formatter={percentFormatter} />
}

export function ActivePartnersCount({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Активных партнеров`} data={data} />
}

export function AvgTrafByDay({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Среднее кол-во переходов в сутки`} data={data} formatter={floatNumFormatter} />
}

export function AvgIncome({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Средний доход с игрока`} data={data} />
}

export function TotalIncome({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Общий доход`} data={data} />
}

export function FirstDeposits({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Первые депозиты`} data={data} />
}

export function DepositsCompleted({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Кол-во заврешенных депозитов`} data={data} />
}

export function DepositsConversion({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Конверсия рег в деп`} data={data} formatter={percentFormatter} />
}

export function DepositsSum({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Сумма депозитов`} data={data} />
}
