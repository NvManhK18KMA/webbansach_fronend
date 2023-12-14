import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { error } from 'console'
import HinhAnhSanPham from './components/HinhAnhSanPham'
import DanhGiaSanPham from './components/DanhGiaSanPham'
import SachModel from '../../models/SachModel'
import { laySachTheoMaSach } from '../../api/SachAPI'
import DanhSachSanPham from './DanhSachSanPham'
import renderRating from '../utils/SaoXepHang'
import dinhDanhSo from '../utils/DinhDangSo'
import { text } from 'stream/consumers'
import dinhDangSo from '../utils/DinhDangSo'

const ChiTietSanPham: React.FC = () => {
  // Lấy mã sách từ URL
  const { maSach } = useParams()

  let maSachNumber = 0
  try {
    maSachNumber = parseInt(maSach + '')
    if (Number.isNaN(maSachNumber)) maSachNumber = 0
  } catch (error) {
    maSachNumber = 0
    console.error('Error', error)
  }

  // Khai báo
  const [sach, setSach] = useState<SachModel | null>(null)
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true)
  const [baoLoi, setBaoLoi] = useState(null)
  const [soLuong, setSoLuong] = useState(1)
  const soLuongHienTai = sach && sach.soLuong ? sach.soLuong : 0

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const soLuongMoi = parseInt(event.target.value)
    console.log(soLuongMoi)
    console.log(soLuongHienTai)

    if (isNaN(soLuongMoi)) {
      setSoLuong(0)
    } else if (soLuongMoi > soLuongHienTai) {
      setSoLuong(soLuongHienTai)
    } else {
      setSoLuong(soLuongMoi)
    }
  }

  const tangSoLuong = () => {
    if (soLuong < soLuongHienTai) {
      setSoLuong(soLuong + 1)
    }
  }

  const giamSoLuong = () => {
    if (soLuong > 1) {
      setSoLuong(soLuong - 1)
    }
  }

  useEffect(() => {
    laySachTheoMaSach(maSachNumber)
      .then((sach) => {
        setSach(sach)
        setDangTaiDuLieu(false)
      })
      .catch((error) => {
        setBaoLoi(error.message)
        setDangTaiDuLieu(false)
      })
  }, [maSach])

  const handleMuaNgay = () => {}

  const handleThemVaoGioHang = () => {}

  if (dangTaiDuLieu) {
    return (
      <div>
        <h1>Đang tải dữ liệu</h1>
      </div>
    )
  }

  if (baoLoi) {
    return (
      <div>
        <h1>Gặp lỗi: {baoLoi}</h1>
      </div>
    )
  }

  if (!sach) {
    return (
      <div>
        <h1>Sách không tồn tại!</h1>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <div className="col-4">
          <HinhAnhSanPham maSach={maSachNumber} />
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-8">
              <h1>{sach.tenSach}</h1>
              <h4>
                <p>{renderRating(sach.trungBinhXepHang ? sach.trungBinhXepHang : 0)}</p>
              </h4>
              <h4>{dinhDangSo(sach.giaBan)}</h4>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: sach.moTa + '' }} />
              <hr />
            </div>
            <div className="col-4">
              {/* Đặt hàng */}
              <div>
                <div className="mb-2" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Số Lượng
                </div>
                <div className="d-flex align-items-center">
                  <button
                    style={{
                      fontSize: '14px',
                      marginRight: '5px',
                      cursor: 'pointer',
                      padding: '5px 10px',
                    }}
                    onClick={giamSoLuong}
                  >
                    -
                  </button>
                  <input
                    className="form-control text-center"
                    type="number"
                    value={soLuong}
                    onChange={handleOnChange}
                    style={{
                      width: '100px',
                      margin: '0 5px',
                      textAlign: 'center',
                    }}
                  />
                  <button
                    style={{
                      fontSize: '14px',
                      marginLeft: '5px',
                      cursor: 'pointer',
                      padding: '5px 10px',
                    }}
                    onClick={tangSoLuong}
                  >
                    +
                  </button>
                </div>
                {sach.giaBan && (
                  <div className="mt-2" text-center>
                    Số Tiền Tạm Tính <br />
                    <h4>{dinhDangSo(soLuong * sach.giaBan)}</h4>
                  </div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-danger mt-3"
                  style={{
                    borderRadius: '8px',
                    fontSize: '16px',
                    // Thêm bất kỳ thuộc tính CSS nào bạn muốn ở đây
                  }}
                  onClick={handleMuaNgay}
                >
                  Mua Ngay
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-outline-secondary mt-2"
                  style={{
                    borderRadius: '8px',
                    fontSize: '16px',
                    // Thêm bất kỳ thuộc tính CSS nào bạn muốn ở đây
                  }}
                  onClick={handleThemVaoGioHang}
                >
                  Thêm Vào Giỏ Hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <DanhGiaSanPham maSach={maSachNumber} />
      </div>
    </div>
  )
}

export default ChiTietSanPham
