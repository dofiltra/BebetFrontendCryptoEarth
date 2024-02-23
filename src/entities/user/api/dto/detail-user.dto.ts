import { UserDto } from "src/entities/user";

export interface GetDetailUserResponse {
  user: UserDto
  referents: ReferredDto[]
  wallets: WalletDto[]
}

export interface ReferredDto {
  email: string
  status: string
  is_removed: boolean
  _id: string
  login: string
  password: any
  createdAt: string
  updatedAt: string
  __v: number
  connection_date: string
  refferend: string
  statistics: StatisticsDto
}

export interface StatisticsDto {
  date: string
  traffic: number
  connection_date: string
  depositsFirst: number
  depositsCount: number
  depositsSummary: number
  depositsRepeat: number
  betsCount: number
  betsSummary: number
  losedSummary: number
  winnedSummary: number
  betsDiff: number
  bonus: number
  income: number
}

export interface WalletDto {
  currency: string
  value: number
  status: string
  is_removed: boolean
  _id: string
  user: string
  createdAt: string
  updatedAt: string
}
