import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useProps } from '@/hooks/useProps'
import { googleLogout } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'

export default function UserDropdownMenu({ userType }) {
  const { authMethod, logout } = useProps()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (authMethod != 'custom') {
      googleLogout()
    }

    logout()
    navigate('/')
  }

  return (
    <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
      {userType === 'admin' ? (
        <div>
          <Link to={'/admin'}>
            <DropdownMenuItem>
              <span>Gestionar Pedidos</span>
            </DropdownMenuItem>
          </Link>
          <Link to={'/admin'}>
            <DropdownMenuItem>
              <span>Administrar</span>
            </DropdownMenuItem>
          </Link>
          <Link to={'/admin/messagecontact'}>
            <DropdownMenuItem>
              <span>Gestionar Mensajes</span>
            </DropdownMenuItem>
          </Link>
        </div>
      ) : (
        <div>
          <Link to={'/account/orders'}>
            <DropdownMenuItem>
              <span>Mis pedidos</span>
            </DropdownMenuItem>
          </Link>
          <Link to={'/inicio/cart'}>
            <DropdownMenuItem>
              <span>Carrito de compras</span>
            </DropdownMenuItem>
          </Link>
        </div>
      )}
      <Link to={'/account'}>
        <DropdownMenuItem>
          <span>Cuenta</span>
        </DropdownMenuItem>
      </Link>
      <DropdownMenuItem onClick={handleLogout}>
        <span>Cerrar Sesión</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
