import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SachModel from '../../../models/SachModel'
import HinhAnhModel from '../../../models/HinhAnhModel'
import { lay1AnhCuaMotSach } from '../../../api/HinhAnhApi'
import renderRating from '../../utils/SaoXepHang'
import dinhDangSo from '../../utils/DinhDangSo'
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  isAdmin: boolean
  isStaff: boolean
  isUser: boolean
}

interface SachPropsInterface {
  sach: SachModel
  setMaSachXoa: any
}

const SachProps: React.FC<SachPropsInterface> = (props) => {
  const navigate = useNavigate()



  const token = localStorage.getItem('token')
  const [adminOptions, setAdminOptions] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const checkAdmin = () => {
      if (!token) {
        setAdminOptions(false);
      } else {
        try {
          const decodedToken = jwtDecode(token) as JwtPayload    
          const isAdmin = decodedToken.isAdmin
          if (!isAdmin) {
            setAdminOptions(false);
          } else {
            setAdminOptions(true);

          }
        } catch (error) {
          setAdminOptions(false);
        }
      }
    }
    checkAdmin()
  }, [token])



  const maSach: number = props.sach.maSach
  const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([])
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true)
  const [baoLoi, setBaoLoi] = useState(null)

  useEffect(
    () => {
      lay1AnhCuaMotSach(maSach)
        .then((hinhAnhData) => {
          setDanhSachAnh(hinhAnhData)
          setDangTaiDuLieu(false)
        })
        .catch((error) => {
          setDangTaiDuLieu(false)
          setBaoLoi(error.message)
        })
    },
    [], // Chi goi mot lan
  )

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

  let duLieuAnh: string = ''
  if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
    duLieuAnh = danhSachAnh[0].duLieuAnh
  }

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      props.setMaSachXoa(props.sach.maSach)
  
      const response = await fetch(`http://localhost:8080/sach/${props.sach.maSach}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        alert('Đã xoá sách thành công!');

      } else {
        const errorText = await response.text();
        alert(`Gặp lỗi trong quá trình xoá sách: ${errorText}`);

      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gặp lỗi trong quá trình xoá sách!');
    }
    navigate('/')
    
  };
  
  
  

  return (
    <div className="col-md-3 mt-2">
      <div className="card">
      <div>
      {adminOptions && (
        <Link
          to={`/admin/updateSach`}
          state={{ sach: props.sach }}
          style={{ textDecoration: 'none' }} // Ví dụ quy tắc CSS inline
        >
          <button style={{ backgroundColor: 'white', color: 'black' }}>Sửa</button>
        </Link>
      )}

      {adminOptions && (
        <button
          onClick={handleDelete}
          style={{ backgroundColor: 'green', color: 'white', marginLeft: '10px' }} // Ví dụ quy tắc CSS inline
        >
          Xoá
        </button>
      )}
    </div>
        <Link to={`/sach/${props.sach.maSach}`}>
          <img src={duLieuAnh} className="card-img-top" alt={props.sach.tenSach} style={{ height: '200px' }} />
        </Link>
        <div className="card-body">
          <Link to={`/sach/${props.sach.maSach}`} style={{ textDecoration: 'none' }}>
            <h5 className="card-title">{props.sach.tenSach}</h5>
          </Link>
          <p className="card-text">{props.sach.moTa}</p>

          <div className="price row">
            <span className="original-price col-6">
              <del>{dinhDangSo(props.sach.giaNiemYet)}</del>
            </span>
            <span className="discounted-price col-6 text-end">
              <strong>{dinhDangSo(props.sach.giaBan)}</strong>
            </span>
          </div>
          <div className="row mt-2" role="group">
            <div className="col-6">
              <p>{renderRating(props.sach.trungBinhXepHang ? props.sach.trungBinhXepHang : 0)}</p>
            </div>
            <div className="col-6 text-end">
              <a href="#" className="btn btn-secondary btn-block me-2">
                <i className="fas fa-heart"></i>
              </a>
              <button className="btn btn-danger btn-block">
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SachProps
