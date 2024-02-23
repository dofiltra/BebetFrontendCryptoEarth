import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getUsers } from './get-users'
import { getUser, GetUserParams } from './get-user'

export const userQueries = {
  all: () => ['users'],

  lists: () => [...userQueries.all(), 'list'],
  list: (page: number, limit: number) => queryOptions({
    queryFn: () => getUsers(page, limit),
    queryKey: [...userQueries.lists(), page, limit]
  }),
  details: () => [...userQueries.all(), 'detail'],
  detail: (params: GetUserParams) => queryOptions({
    queryFn: () => getUser(params),
    queryKey: [...userQueries.details(), params.id],
    placeholderData: keepPreviousData
  }),
}
