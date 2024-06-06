import type { ReferredDto, StatisticsDto } from '@/entities/user'

export type TReferredProps = {
  refferends?: ReferredDto[]
  refferend?: ReferredDto
  hiddenCols?: (keyof ReferredDto | keyof StatisticsDto)[]
  actionsCol?: (o: { user: ReferredDto }) => JSX.Element
}
