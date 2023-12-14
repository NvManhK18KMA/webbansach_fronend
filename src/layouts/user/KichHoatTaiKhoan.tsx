import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function KichHoatTaiKhoan() {
  const { email } = useParams()
  const { maKichHoat } = useParams()
  const [daKichHoat, setDaKichHoat] = useState(false)
  const [thongBao, setThongBao] = useState('')

  useEffect(() => {
    console.log('Email', email)
    console.log('Ma Kich Hoat', maKichHoat)

    if (email && maKichHoat) {
      thucHienKichHoat()
    }
  }, []) // Thêm dependencies email và maKichHoat vào useEffect

  const thucHienKichHoat = async () => {
    console.log('Email', email)
    console.log('Ma Kich Hoat', maKichHoat)
    try {
      const url = `http://localhost:8080/tai-khoan/kich-hoat?email=${email}&maKichHoat=${maKichHoat}`

      const response = await fetch(url, {
        method: 'GET',
      })

      if (response.ok) {
        setDaKichHoat(true)
      } else {
        setThongBao('Lỗi kích hoạt: ' + response.text + '')
      }
    } catch (error) {
      //   setThongBao("Lỗi kích hoạt: " + error.message);
      console.error('Lỗi kích hoạt ', error)
    }
  }

  return (
    <div>
      <h1>Kích Hoạt Tài Khoản</h1>
      {daKichHoat ? <p>Kích Hoạt Thành Công</p> : <p>Kich hoạt không thành công {thongBao}</p>}
    </div>
  )
}

export default KichHoatTaiKhoan
