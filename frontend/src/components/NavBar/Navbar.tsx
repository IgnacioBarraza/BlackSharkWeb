import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
        <div className="flex items-center justify-between">
            <div className="w-32 h-32 z-100">
                <img src="/BlackShark.png" alt="logo"  />
            </div>
            <div className="flex items-center space-x-12 ml-20">   
                <a href="#" className="font-myriad-pro font-semibold text-white transition duration-500 transform hover:scale-110 text-base px-2">Servicios</a>
                <a href="#" className="font-myriad-pro font-semibold text-white transition duration-500 transform hover:scale-110 text-base px-2">Galería</a>
                <a href="#" className="font-myriad-pro font-semibold text-white transition duration-500 transform hover:scale-110 text-base px-2">Portafolio</a>
                <a href="#" className="font-myriad-pro font-semibold text-white transition duration-500 transform hover:scale-110 text-base px-2">Contactos</a>
                <Link to={'/login'}>
                  <span className="font-myriad-pro font-semibold text-white transition duration-500 transform hover:scale-110 text-base px-2">Iniciar Sesión</span>
                </Link>
                <Link to={'/signup'}>
                  <span className="border px-4 py-1.5 rounded-md border-white font-myriad-pro font-semibold text-white transition duration-500 transform hover:scale-110 text-base">Registrarse</span>
                </Link>
                <div className="mr-0">
                  <a href="https://web.facebook.com/ElLokojara/"><img src="../../../public/facebook.png" alt="Icon" className="h-5 w-5 mr-2 inline-block transition duration-500 transform hover:scale-110" /></a>
                  <a href="https://www.instagram.com/blackshark.studios/?hl=es-la"><img src="../../../public/instagram.png" alt="Icono" className="h-5 w-5 mr-2 inline-block transition duration-500 transform hover:scale-110" /></a>
                </div>
            </div>
        </div>
    </>
  )
}
