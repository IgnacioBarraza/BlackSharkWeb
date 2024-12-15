import { Link } from 'react-router-dom'
import { SideNavBar } from './sidebar'
import { SidebarTrigger } from '../ui/sidebar'
import { useProps } from '@/hooks/useProps'
import { LogIn } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../ui/button'

export const Navbar = () => {
  const { userToken, userName, userType } = useProps()

  return (
    <nav className="bg-background border-b border-border fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <SideNavBar
            userToken={userToken}
            userName={userName}
            userType={userType}
          />
          <SidebarTrigger />
          <div className="flex-1 flex items-center justify-center">
            <Link to="/" className="font-bold text-2xl text-foreground">
              <span className="sr-only">Black Shark Studios</span>
              <img
                src="/BlackShark.png"
                alt="Black Shark Studio logo"
                className="w-20 h-20"
              />
            </Link>
          </div>
          {userToken ? (
            <Link to={'/cart'} aria-label="Carrito de Compras" >
              <FontAwesomeIcon icon={faCartShopping} size="lg" />
            </Link>
          ) : (
            <Link to={'/login'} aria-label="Login">
              <LogIn className="h-6 w-6" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
