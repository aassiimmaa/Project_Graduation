import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { STORAGE_DATA_USER } from '~/app/shared/constant'
import { User } from '~/app/shared/inteface'

const useRequireAuth = () => {
  const router = useRouter()
  const hasShown = useRef(false)
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem(STORAGE_DATA_USER) || '{}'
    )
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
