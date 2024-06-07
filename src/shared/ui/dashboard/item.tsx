import type { TDashboardItemData } from './types'

const getData = (value: TDashboardItemData): number | string => {
  if (value || value === 0) {
    if (Array.isArray(value)) {
      value = value
        ?.filter((x) => x?.data)
        .map((x) => x.data)
        .reduce((prev, curr) => prev + (curr || 0), 0)
    }

    if (!isNaN(value as any) && (typeof value === 'number' || typeof value === 'string')) {
      return value
    }
  }
  return 'Нет данных'
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
      <p>{formatter({ value: getData(data) })}</p>
    </div>
  )
}

export function Traffic({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Переходы`} data={data} />
}

export function Reg({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Регистрации`} data={data} />
}

export function Traf2Reg({ data }: { data?: TDashboardItemData }) {
  return (
    <DashboardItem
      title={`Конверсия в регистрации`}
      data={data}
      formatter={({ value }) => `${(parseFloat((value || 0).toString() || '0') * 100).toFixed(2)}%`}
    />
  )
}

export function AvgTrafByDay({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Среднее кол-во переходов в сутки`} data={data} />
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
  return (
    <DashboardItem
      title={`Конверсия рег в деп`}
      data={data}
      formatter={({ value }) => `${(parseFloat((value || 0).toString() || '0') * 100).toFixed(2)}%`}
    />
  )
}

export function DepositsSum({ data }: { data?: TDashboardItemData }) {
  return <DashboardItem title={`Сумма депозитов`} data={data} />
}
