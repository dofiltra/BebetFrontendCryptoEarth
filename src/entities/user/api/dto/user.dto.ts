export interface UserDto {
  _id: string
  role?: string
  is_removed: boolean
  ref_string: string
  email: string
  communicationType: string
  partnershipType: string
  name: string
  createdAt: string
  updatedAt: string
  referrals: number
  reference?: string
  promocode?: string
}
