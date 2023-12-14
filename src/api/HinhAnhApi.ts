import React from "react";
import HinHAnhModel from "../models/HinhAnhModel";
import { my_request } from "./Request";


async function layAnhCuaMotSach(duongDan: string): Promise<HinHAnhModel[]> {
    const ketQua: HinHAnhModel[] = [];

    // Gọi phương thức request
    const response = await my_request(duongDan);

    // Lấy ra json sach
    const responseData = response._embedded.hinhAnhs;
    // console.log(responseData);

    for (const key in responseData) {
        ketQua.push({
            maHinhAnh: responseData[key].maHinhAnh,
            tenHinhAnh: responseData[key].tenHinhAnh,
            laIcon: responseData[key].laIcon,
            duongDan: responseData[key].duongDan,
            duLieuAnh: responseData[key].duLieuAnh,
        });
    }

    return ketQua;
}


export async function layToanBoAnhCuaMotSach(maSach: number): Promise<HinHAnhModel[]> {
   // Xác định endpoint
   const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;

   return layAnhCuaMotSach(duongDan);
}


export async function lay1AnhCuaMotSach(maSach: number): Promise<HinHAnhModel[]> {
    // Xác định endpoint
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=1`;
 
    return layAnhCuaMotSach(duongDan);
 }