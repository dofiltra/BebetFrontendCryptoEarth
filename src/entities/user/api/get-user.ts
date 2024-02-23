import { apiInstance } from "@/shared/api";
import { GetDetailUserResponse } from "src/entities/user";


export type GetUserParams = {
  id: string
}

export const getUser = ({ id }: GetUserParams) => {
  return apiInstance.get<GetDetailUserResponse>(`/api/v1/ref_admin/users/${id}`, {
    withCredentials: true,
  })
}
