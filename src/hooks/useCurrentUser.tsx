import { type UserDto } from '@/entities/user'
import { get } from '@/services/api'
import { useEffect, useState } from 'react'

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<UserDto | undefined>()

  useEffect(() => {
    getCurrentUser().then((user) => setCurrentUser(user))
  }, [])

  return { currentUser, setCurrentUser }
}

export const getCurrentUser = async (): Promise<UserDto | undefined> => {
  if (!localStorage.getItem('token')) {
    return
  }

  const user = await get('/ref_user/getCurrentUser')

  if (!user) {
    return
  }

  return user
}
