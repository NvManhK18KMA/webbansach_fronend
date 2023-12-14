import React, { useState, FormEvent } from 'react'
import SachModel from '../../models/SachModel'
import { useLocation, useNavigate } from 'react-router-dom'

interface SachUpdateInterface {
  sach: SachModel
}
function SachFormUpdate() {
  const navigate = useNavigate()
  const location = useLocation()
  const sach2 = location.state?.sach || {}

  const [sach, setSach] = useState({
    maSach: sach2.maSach,
    tenSach: sach2.tenSach,
    giaBan: sach2.giaBan,
    giaNiemYet: sach2.giaNiemYet,
    moTa: sach2.moTa,
    soLuong: sach2.soLuong,
    tenTacGia: sach2.tenTacGia,
    isbn: 'chua xac dinh',
    trungBinhXepHang: sach2.trungBinhXepHang,
  })
  console.log(sach2)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    console.log(token)

    try {
      const response = await fetch(`http://localhost:8080/sach/${sach.maSach}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sach),
      })

      if (response.ok) {
        alert('Đã cập nhật sách thành công!')
        setSach({
          maSach: 0,
          tenSach: '',
          giaBan: 0,
          giaNiemYet: 0,
          moTa: '',
          soLuong: 0,
          tenTacGia: '',
          isbn: '',
          trungBinhXepHang: 0,
        })
      } else {
        const errorText = await response.text()
        alert(`Gặp lỗi trong quá trình thêm sách: ${errorText}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Gặp lỗi trong quá trình thêm sách!')
    }
    navigate('/')
  }

  return (
    <div className="container row d-flex align-items-center justify-content-center">
      <div className="">
        <h1>THÊM SÁCH</h1>
        <form onSubmit={handleSubmit} className="form">
          <input type="hidden" id="maSach" value={sach.maSach} />

          <label htmlFor="tenSach">Tên sách</label>
          <input className="form-control" type="text" value={sach.tenSach} onChange={(e) => setSach({ ...sach, tenSach: e.target.value })} required />

          <label htmlFor="giaBan">Giá bán</label>
          <input className="form-control" type="number" value={sach.giaBan} onChange={(e) => setSach({ ...sach, giaBan: parseFloat(e.target.value) || 0 })} required />

          <label htmlFor="giaNiemYet">Giá niêm yết</label>
          <input className="form-control" type="number" value={sach.giaNiemYet} onChange={(e) => setSach({ ...sach, giaNiemYet: parseFloat(e.target.value) || 0 })} required />

          <label htmlFor="soLuong">Số lượng</label>
          <input className="form-control" type="number" value={sach.soLuong} onChange={(e) => setSach({ ...sach, soLuong: parseInt(e.target.value) || 0 })} required />

          <label htmlFor="tenTacGia">Tên tác giả</label>
          <input className="form-control" type="text" value={sach.tenTacGia} onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })} required />

          <label htmlFor="moTa">Mô tả</label>
          <input className="form-control" type="text" value={sach.moTa} onChange={(e) => setSach({ ...sach, moTa: e.target.value })} required />

          <label htmlFor="isbn">ISBN</label>
          <input className="form-control" type="text" value={sach.isbn} onChange={(e) => setSach({ ...sach, isbn: e.target.value })} required />

          <button type="submit" className="btn btn-success mt-2">
            Lưu
          </button>
        </form>
      </div>
    </div>
  )
}

export default SachFormUpdate
