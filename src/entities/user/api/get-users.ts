import { apiInstance } from '@/shared/api'
import { UserDto } from './dto/user.dto'
import { toast } from 'react-toastify'

type GetUserResponse = {
  users: UserDto[]
  total: number
}

const calculateUsersPage = (totalCount: number, limit: number) => Math.floor(totalCount / limit)

export const getUsers = async (page: number, limit: number) => {
  const { data } = await apiInstance.get<GetUserResponse>(
    '/api/v1/ref_admin/users',
    {
      withCredentials: true,
      params: {
        page,
        lpage: limit,
      },
    },
    {
      onError: async ({ error }) => {
        toast.error(`Не получилось загрузить пользователей. ${error?.message || ''}`)
      },
    }
  )

  return {
    users: data.users,
    limit,
    total: data.total,
    totalPages: calculateUsersPage(data.total, limit),
  }
}
