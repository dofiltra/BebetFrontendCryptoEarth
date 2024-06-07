import { DataEntry } from '@/Components/App/Statistic/Statistic.types'

const getData = (value: unknown): number | string => {
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
