import { rejects } from 'assert'
import { error } from 'console'
import { read } from 'fs'
import { resolve } from 'path/posix'
import React, { useState } from 'react'
import { text } from 'stream/consumers'

function DangKyNguoiDung() {
  // let checkTenDangNhap: boolean ;
  // let checkEmail: boolean ;
  // let checkMatKhauLan1: boolean ;
  // var checkMatKhauLan2: boolean ;
  // // var checkHoDem: boolean ;
  // // var checkTen: boolean ;
  // // var checkSoDienThoai ;
  // // var checkGioiTinh ;

  const [checkTenDangNhap, setCheckDangNhap] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)
  const [checkMatKhauLan1, setCheckMatKhauLan1] = useState(false)
  const [checkMatKhauLan2, setCheckMatKhauLan2] = useState(false)

  //fields
  const [avatar, setAvatar] = useState<File | null>(null)
  const [tenDangNhap, setTenDangNhap] = useState('')
  const [email, setEmail] = useState('')
  const [hoDem, setHoDem] = useState('')
  const [ten, setTen] = useState('')
  const [soDienThoai, setSoDienThoai] = useState('')
  const [matKhau, setMatKhau] = useState('')
  const [matKhauNhapLai, setMatKhauNhapLai] = useState('')
  const [gioiTinh, setGioiTinh] = useState('M')

  //errorfields
  const [errorTenDangNhap, setErrorTenDangNhap] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorHoDem, setErrorHodem] = useState('')
  const [errorTen, setErrorTen] = useState('')
  const [errorSoDienThoai, setErrorSoDienThoai] = useState('')
  const [errorGioiTinh, setErrorGioiTinh] = useState('')
  const [errorMatKhauLan1, setErrorMatKhauLan1] = useState('')
  const [errorMatKhauLan2, setErrorMatKhauLan2] = useState('')

  const [thongBao, setThongBao] = useState('')

  const checkLength = (text: string, min: number, max: number) => {
    if (text.length < min || text.length > max) {
      return false
    }
    return true
  }

  const checkExistInDataBase = async (text: string, url: string): Promise<boolean> => {
    try {
      const response = await fetch(url)
      const data = await response.text()
      if (data.trim() === 'true') {
        return false
      }
    } catch (error) {
      console.error('Lỗi Kiểm Tra Tên Đăng Nhập', error)
      return false
    }
    return true
  }

  const checkDinhDang = (text: string, format: any) => {
    const regex = new RegExp(format)
    return regex.test(text)
  }

  const validTenDangNhap = async (event: React.ChangeEvent<HTMLInputElement>): Promise<boolean> => {
    const thisElement = document.getElementById('errorTenDangNhap')
    setTenDangNhap(event.target.value)
    const url = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${event.target.value}`
    // console.log(checkLength(newTenDangNhap , 4 , 12))
    if (!checkLength(event.target.value, 4, 12) || !(await checkExistInDataBase(event.target.value, url))) {
      if (!checkLength(event.target.value, 4, 12)) {
        thisElement?.setAttribute('style', 'color: red;')
        setErrorTenDangNhap('Độ Dài Từ 4 Đến 12 Ký Tự')
        setCheckDangNhap(false)
        return false
      }
      if (!(await checkExistInDataBase(event.target.value, url))) {
        thisElement?.setAttribute('style', 'color: red;')
        setErrorTenDangNhap('Tên Đăng Nhập Đã Tồn Tại , Vui Lòng Chọn Tên Khác')
        setCheckDangNhap(false)
        return false
      }
    }
    setCheckDangNhap(true)
    thisElement?.setAttribute('style', 'color: green;')
    setErrorTenDangNhap('Good Job')
    return true
  }

  const validEmail = async (event: React.ChangeEvent<HTMLInputElement>): Promise<boolean> => {
    const thisElement = document.getElementById('errorEmail')
    setEmail(event.target.value)
    const url = `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${event.target.value}`
    if (
      // !checkDinhDang(event.target.value, '^[^s@]+@[^s@]+.[^s@]+$') ||
      !checkDinhDang(event.target.value, '^[a-zA-Z0-9._%+-]+@gmail.com$') ||
      !(await checkExistInDataBase(event.target.value, url))
    ) {
      // if (!checkDinhDang(event.target.value, '^[^s@]+@[^s@]+.[^s@]+$')) {
      if (!checkDinhDang(event.target.value, '^[a-zA-Z0-9._%+-]+@gmail.com$')) {
        setErrorEmail('Vui Lòng Nhập Email')
        setCheckEmail(false)
        thisElement?.setAttribute('style', 'color: red;')
        setErrorEmail('Email Không đúng')
        return checkEmail
      }
      if (!(await checkExistInDataBase(event.target.value, url))) {
        setCheckEmail(false)
        thisElement?.setAttribute('style', 'color: red;')
        setErrorEmail('Email Đã Được Đăng Ký')
        return false
      }
    }
    thisElement?.setAttribute('style', 'color: green;')
    setErrorEmail('Good Job')
    setCheckEmail(true)
    return true
  }

  const validMatKhauLan1 = (event: React.ChangeEvent<HTMLInputElement>): boolean => {
    const thisElement = document.getElementById('errorMatKhauLan1')
    setMatKhau(event.target.value)
    if (!checkDinhDang(event.target.value, /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/)) {
      setErrorMatKhauLan1('Ít nhất 8 ký tự , chứa in hoa , đặc biệt')
      setCheckMatKhauLan1(false)
      thisElement?.setAttribute('style', 'color: red;')
      return false
    }
    setErrorMatKhauLan1('Good Job')
    setCheckMatKhauLan1(true)
    thisElement?.setAttribute('style', 'color: green;')
    return true
  }

  const validMatKhauLan2 = (event: React.ChangeEvent<HTMLInputElement>): boolean => {
    const thisElement = document.getElementById('errorMatKhauLan2')
    setMatKhauNhapLai(event.target.value)
    if (event.target.value !== matKhau || !checkDinhDang(event.target.value, /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/)) {
      setErrorMatKhauLan2('Mật khẩu không khớp hoặc sai định dạng')
      setCheckMatKhauLan2(false)
      if (thisElement) {
        thisElement.style.color = 'red'
      }
      return false
    }

    setCheckMatKhauLan2(true)
    setErrorMatKhauLan2('Good Job')
    thisElement?.setAttribute('style', 'color: green;')
    return true
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    console.log(checkTenDangNhap)
    console.log(checkEmail)
    console.log(checkMatKhauLan1)
    console.log(checkMatKhauLan2)

    if (checkTenDangNhap && checkEmail && checkMatKhauLan1 && checkMatKhauLan2) {
      const base64Avatar = avatar ? await getBase64(avatar) : null
      console.log(base64Avatar)
      try {
        const url = 'http://localhost:8080/tai-khoan/dang-ky'
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hoDem: hoDem,
            ten: ten,
            tenDangNhap: tenDangNhap,
            matKhau: matKhau,
            gioiTinh: gioiTinh,
            email: email,
            soDienThoai: soDienThoai,
            diaChiMuaHang: '456 Đường XYZ',
            diaChiGiaoHang: '123 Đường ABC',
            daKichHoat: 0,
            maKichHoat: '',
            avatar: base64Avatar,
          }),
        })
        if (response.ok) {
          const data = await response.json()
          setThongBao('Đăng Ký Thành Công')
          console.log('Response from server:', data)
        } else {
          const errorData = await response.json()
          setThongBao('Đã Xảy Ra Lỗi Hãy Thử Lại')
          console.error('Error response from server:', errorData)
        }
      } catch (error) {
        setThongBao('Đã Xảy Ra Lỗi Hãy Thử Lại')
        console.error('Error:', error)
      }
    }
  }

  const getBase64 = (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      // Lắng nghe sự kiện khi FileReader đọc xong file
      // reader.onload = () => resolve(reader.result ? (reader.result as string).split(',')[1] : null);
      reader.onload = () => resolve(reader.result ? (reader.result as string) : null)

      // Lắng nghe sự kiện khi có lỗi xảy ra trong quá trình đọc file
      reader.onerror = (error) => reject(error)

      // Đọc file dưới dạng Data URL
      reader.readAsDataURL(file)
    })
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files

    if (files && files.length > 0) {
      const file = files[0]
      setAvatar(file)
    } else {
      // Nếu người dùng chọn một file rồi sau đó hủy bỏ chọn, bạn có thể xử lý ở đây (ví dụ: xóa file avatar)
      setAvatar(null)
    }
  }

  return (
    <div className="container">
      <h1 className="mt-5 text-center">Đăng Ký</h1>
      <div className="mb-3 col-md-6 col-12 mx-auto">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          {/* Tên đăng nhập */}
          <div className="mb-3">
            <label htmlFor="tenDangNhap" className="form-label">
              Tên Đăng Nhập
            </label>
            <input type="text" id="tenDangNhap" className="form-control" value={tenDangNhap} onInput={validTenDangNhap} />
            {<div id="errorTenDangNhap">{errorTenDangNhap}</div>}
          </div>
          {/* mat khau lan 1 */}
          <div className="mb-3">
            <label htmlFor="matKhauLan1" className="form-label">
              Mật Khẩu
            </label>
            <input type="password" id="matKhauLan1" className="form-control" value={matKhau} onInput={validMatKhauLan1} />
            {<div id="errorMatKhauLan1">{errorMatKhauLan1}</div>}
          </div>
          {/* mat khau lan 2 */}
          <div className="mb-3">
            <label htmlFor="matKhauLan2" className="form-label">
              Xác Nhận Mật Khẩu
            </label>
            <input type="password" id="matKhauLan2" className="form-control" value={matKhauNhapLai} onInput={validMatKhauLan2} />
            {<div id="errorMatKhauLan2">{errorMatKhauLan2}</div>}
          </div>
          {/* email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" id="email" className="form-control" value={email} onChange={validEmail} />
            {/* <div id="errorEmail" className="invalid-feedback">{errorEmail}</div> */}
            <div id="errorEmail">{errorEmail}</div>
          </div>
          {/* ho dem */}
          <div className="mb-3">
            <label htmlFor="hoDem" className="form-label">
              Họ Đệm
            </label>
            <input
              type="text"
              id="text"
              className="form-control"
              value={hoDem}
              onMouseOut={() => setErrorHodem(hoDem.length > 0 ? 'Good Job' : 'Bạn Chưa Nhập Thông Tin')}
              onChange={(event) => setHoDem(event.target.value)}
            />
            <div style={{ color: 'green' }} id="errorHoDem">
              {errorHoDem}
            </div>
          </div>
          {/* ten */}
          <div className="mb-3">
            <label htmlFor="ten" className="form-label">
              Tên
            </label>
            <input
              type="text"
              id="ten"
              className="form-control"
              value={ten}
              onMouseOut={() => setErrorTen(ten.length > 0 ? 'Good Job' : 'Bạn Chưa Nhập Thông Tin')}
              onChange={(event) => setTen(event.target.value)}
            />
            <div style={{ color: 'green' }} id="setErrorTen">
              {errorTen}
            </div>
          </div>
          {/* so dien thoai */}
          <div className="mb-3">
            <label htmlFor="soDienThoai" className="form-label">
              Số Điện Thoại
            </label>
            <input
              type="phone"
              id="soDienThoai"
              pattern="\+84[0-9]{9,10}"
              className="form-control"
              value={soDienThoai}
              onMouseOut={() => setErrorSoDienThoai(soDienThoai.length > 0 ? 'Good Job' : 'Bạn Chưa Nhập Thông Tin')}
              onChange={(event) => setSoDienThoai(event.target.value)}
            />
            <div style={{ color: 'green' }} id="errorSoDienThoai">
              {errorSoDienThoai}
            </div>
          </div>
          {/* gioi tinh */}
          <div className="mb-3">
            <label htmlFor="gioiTinh" className="form-label">
              Giới Tính
            </label>
            <input
              type="text"
              id="gioiTinh"
              className="form-control"
              value={gioiTinh}
              placeholder="M : Male  N : Female"
              onMouseOut={() => setErrorGioiTinh(gioiTinh.length ? 'Good Job' : 'Bạn Chưa Nhập Thông Tin')}
              onChange={(event) => setGioiTinh(event.target.value)}
            />
            <div style={{ color: 'green' }} id="errorGioiTinh">
              {errorGioiTinh}
            </div>
          </div>
          {/* avatar */}
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Avatar
            </label>
            <input type="file" id="gioiavartarTinh" className="form-control" accept="images/*" onChange={handleAvatarChange} />
            {/* <div style={{ color: 'green' }} id="errorGioiTinh">
              {errorGioiTinh}
            </div> */}
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Đăng Ký
            </button>
            <div style={{ color: 'green' }}>{thongBao}</div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default DangKyNguoiDung
//-> từ JS -> JSON(Chuỗi) || parse : Json(chuỗi) -> JS
