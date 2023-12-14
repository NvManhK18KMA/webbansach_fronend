import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import SachForm from './SachForm'
import SachFormUpdate from './SachFormUpdate'

interface JwtPayload {
  isAdmin: boolean
  isStaff: boolean
  isUser: boolean
}

const RequireAdmin = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAdminCheck: React.FC<P> = (props) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
      const checkAdmin = () => {
        if (!token) {
          navigate('/dang-nhap')
          //   navigate("/admin/SachForm");
          return
        } else {
          try {
            const decodedToken = jwtDecode(token) as JwtPayload
            console.log(decodedToken)
            // Lấy thông tin cụ thể
            const isAdmin = decodedToken.isAdmin
            if (!isAdmin) {
              // Không phải admin
              //   navigate("/dang-nhap");
              navigate('/bao-loi-403')
            } else {
              console.log('duoc quyen', isAdmin)
            }
          } catch (error) {
            // Handle decoding error or invalid token
            console.error('Error decoding token:', error)
            navigate('/dang-nhap')
          }
        }
      }
      checkAdmin()
    }, [navigate, token])

    // Render the wrapped component if everything is okay
    return <WrappedComponent {...props} />
  }
  return WithAdminCheck
}

const SachFormCreate_Admin = RequireAdmin(SachForm)
const SachFormUpdate_Admin = RequireAdmin(SachFormUpdate)
export { SachFormCreate_Admin, SachFormUpdate_Admin }
