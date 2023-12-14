// Pagination

import React from 'react'

interface PhanTrangInterface {
  trangHienTai: number
  tongSoTrang: number
  phanTrang: any //day la 1 ham
}

export const PhanTrang: React.FC<PhanTrangInterface> = (props) => {
  const danhSachTrang = []

  if (props.trangHienTai === 1) {
    danhSachTrang.push(props.trangHienTai)
    if (props.tongSoTrang >= props.trangHienTai + 1) {
      danhSachTrang.push(props.trangHienTai + 1)
    }
    if (props.tongSoTrang >= props.trangHienTai + 2) {
      danhSachTrang.push(props.trangHienTai + 2)
    }
  } else if (props.trangHienTai > 1) {
    // trang -2
    if (props.trangHienTai >= 3) {
      danhSachTrang.push(props.trangHienTai - 2)
    }
    // trang -1
    if (props.trangHienTai >= 2) {
      danhSachTrang.push(props.trangHienTai - 1)
    }
    // ban than no
    danhSachTrang.push(props.trangHienTai)
    // trang + 1
    if (props.tongSoTrang >= props.trangHienTai + 1) {
      danhSachTrang.push(props.trangHienTai + 1)
    }
    // trang + 2
    if (props.tongSoTrang >= props.trangHienTai + 2) {
      danhSachTrang.push(props.trangHienTai + 2)
    }
  }
  // console.log("danh sach trang");
  // console.log(danhSachTrang);

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item" onClick={() => props.phanTrang(1)}>
          <button className="page-link">Trang Đầu</button>
        </li>
        {danhSachTrang.map(
          (
            stttrang, //danh sach trang chi la danh sach so thu tu
          ) => (
            <li className="page-item" key={stttrang} onClick={() => props.phanTrang(stttrang)}>
              <button className={'page-link ' + (props.trangHienTai === stttrang ? 'active' : '')}>{stttrang}</button>
            </li>
          ),
        )}
        <li className="page-item" onClick={() => props.phanTrang(props.tongSoTrang)}>
          <button className="page-link">Trang Cuối</button>
        </li>
      </ul>
    </nav>
  )
}
