import { Link, useLocation } from 'react-router-dom'
import { SideNavBar } from './sidebar'
import { SidebarTrigger } from '../ui/sidebar'
import { useProps } from '@/hooks/useProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export const Navbar = () => {
  const { userToken, userName, userType } = useProps()
  const location = useLocation()
  const hideNavbarAndFooter = ['/auth', '/auth/signup', '/404'].some((path) =>
    location.pathname.startsWith(path)
  )

  if (hideNavbarAndFooter) {
    return null
  }

  return (
    <nav className='bg-background border-b border-border fixed top-0 left-0 right-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          <SideNavBar
            userToken={userToken}
            userName={userName}
            userType={userType}
          />
          <SidebarTrigger />
          <div className='flex-1 flex items-center justify-center'>
            <Link to='/' className='font-bold text-2xl text-foreground'>
              <span className='sr-only'>Black Shark Studios</span>
              <img
                src='/BlackShark.webp'
                alt='Black Shark Studio logo'
                className='w-24 h-24'
              />
            </Link>
          </div>
          {userToken ? (
            <Link to={'/inicio/cart'} aria-label='Carrito de Compras'>
              <FontAwesomeIcon icon={faCartShopping} size='xl' />
            </Link>
          ) : (
            <Link
              to={'/auth'}
              aria-label='Login'
              className='bg-blue-light-bs hover:bg-blue-strong-bs p-2 rounded-lg transition-colors'
            >
              <span className='font-myriad-pro text-lg text-white'>
                Iniciar Sesión
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
