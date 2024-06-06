import { type UserDto } from '@/entities/user'

export function isAdmin(user?: UserDto) {
  return user?._id && user?.role === 'admin'
}

export function isDev() {
  return localStorage.getItem(`DEV_MODE`)
}
