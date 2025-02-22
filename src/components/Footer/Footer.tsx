import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Mail, MapPin } from 'lucide-react'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { useLocation } from 'react-router-dom'

export const Footer = () => {
  const location = useLocation()
  const hideNavbarAndFooter = ['/auth', '/auth/signup', '/404'].some((path) =>
    location.pathname.startsWith(path)
  )

  if (hideNavbarAndFooter) {
    return null
  }

  return (
    <footer className='bg-black text-white py-6'>
      <div className=' grid grid-cols-1 md:grid-cols-4 px-4 gap-4'>
        <div className='space-y-4 md:mx-auto'>
          <h3 className='text-xl font-semibold'>Black Shark Studios</h3>
          <p className='text-lg text-gray-light'>
            Soluciones creativas de marketing digital para hacer crecer tu
            negocio
          </p>
        </div>

        <div className='space-y-4 md:mx-auto'>
          <h4 className='text-xl font-semibold'>Atención al Cliente</h4>
          <p className='text-lg text-gray-light'>24/7 vía correo electrónico</p>
        </div>

        <div className='space-y-4 list-none md:mx-auto'>
          <h4 className='text-xl font-semibold'>Contacto</h4>
          <ul className='space-y-2'>
            <li className='flex items-center gap-2'>
              <Mail size={16} />
              <span className='text-lg text-gray-light'>
                bswebstudios@gmail.com
              </span>
            </li>
            <li className='flex items-center gap-2'>
              <MapPin size={16} />
              <span className='text-lg text-gray-light'>Iquique, Chile</span>
            </li>
          </ul>
        </div>

        <div className='space-y-4 md:mx-auto'>
          <h4 className='text-xl font-semibold'>Síguenos</h4>
          <div className='flex gap-4'>
            <a
              href='https://www.facebook.com/ElLokojara'
              aria-label='Facebook'
              className='text-white hover:text-gray-light'
              target='_blank'
            >
              <FontAwesomeIcon icon={faFacebook} size='2x' />
            </a>
            <a
              href='https://www.instagram.com/blackshark.studios/'
              aria-label='Instagram'
              className='text-white hover:text-gray-light'
              target='_blank'
            >
              <FontAwesomeIcon icon={faInstagram} size='2x' />
            </a>
          </div>
        </div>
      </div>

      <div className='mt-12 pt-8 border-t border-gray-800 text-center text-gray-light'>
        <p>
          &copy; {new Date().getFullYear()} Black Shark Studios. Todos los
          derechos reservados.
        </p>
      </div>
    </footer>
  )
}
