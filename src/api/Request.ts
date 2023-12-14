
export async function my_request(duongDan:string) {
    const response = await fetch(duongDan); // truy cap den duong dan va lay thong tin
    // await console.log(response);
    if(!response.ok){
        throw new Error(`Không THể Truy Cập Đường Dẫn ${duongDan}`);
    }
    return response.json();
}
 // stringify : js->json
 //parse : json -> js
 