import { useEffect, useState } from 'react'
import { throttle } from '@shared/lib/throttle'

const getIsMobile = () => {
  return window.innerWidth >= 320 && window.innerWidth <= 470
}


export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile())

  useEffect(() => {
    const handleMobile = throttle(() => {
      setIsMobile(getIsMobile())
    }, 500)
    window.addEventListener('resize', handleMobile)
    return () => window.removeEventListener('resize', handleMobile)
  }, [])

  return { isMobile }
}
