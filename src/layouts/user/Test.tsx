import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'

const Test = () => {
  const [username, setUsername] = useState<string | null>(null)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const useData = jwtDecode(token)
      console.log(useData)
      if (useData) {
        setUsername(useData.sub + '')
      }
    }
  }, [])

  return <div>{username ? <div>Xin Chào {username}</div> : <div>Chưa Đăng Nhập</div>}</div>
}
export default Test
