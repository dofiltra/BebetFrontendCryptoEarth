import { WalletDto } from '@/entities/user'

export type TWalletProps = {
  wallets: WalletDto[]
  actionsCol?: (o: { wallet: WalletDto }) => JSX.Element
}
