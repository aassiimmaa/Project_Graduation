import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const useRequireAuth = () => {
  const router = useRouter()
  const hasShown = useRef(false)
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    const isEmptyUser = Object.keys(storedUser).length === 0

    if (isEmptyUser) {
      if (!hasShown.current) {
        toast.error('Vui lòng đăng nhập để tiếp tục!')
        router.replace('/Login')
        hasShown.current = true
      }
      setUser(null)
    } else {
      setUser(storedUser)
    }
  }, [router])

  return user
}

export default useRequireAuth
