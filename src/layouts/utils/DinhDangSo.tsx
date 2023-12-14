function dinhDangSo(x: number | undefined): string {
  if (x === undefined || isNaN(x)) {
    return '0'
  }

  // Sử dụng toLocaleString để định dạng số theo định dạng tiền tệ Việt Nam
  return x.toLocaleString('vi-VN')
}

export default dinhDangSo
