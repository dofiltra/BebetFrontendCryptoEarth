import { type UserDto } from "@/entities/user";

export function isAdmin(user?: UserDto) {
  return user?._id && user?.role === 'admin'
}
