import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useProps } from '@/hooks/useProps';
import { useNavigate } from 'react-router-dom';

export default function UserDropdownMenu({ userType }) {
  const { logout } = useProps()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
      {userType === 'admin' ? (
        <div>
          <DropdownMenuItem>
            <span>Gestionar Pedidos</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Administrar</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Gestionar Mensajes</span>
          </DropdownMenuItem>
        </div>
      ) : (
        <div>
          <DropdownMenuItem>
            <span>Mis pedidos</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Carrito de compras</span>
          </DropdownMenuItem>
        </div>
      )}
      <DropdownMenuItem>
        <span>Cuenta</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <button onClick={handleLogout}>
          <span>Cerrar Sesión</span>
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
