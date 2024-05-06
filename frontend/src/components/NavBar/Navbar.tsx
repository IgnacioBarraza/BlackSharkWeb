import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
        <div className="flex items-center justify-between">
            <div className="w-32 h-32 z-100">
                <img src="/BlackShark.png" alt="Blackshark logo"  />
            </div>
            <div className="flex items-center space-x-12 ml-20">   
                <a href="#" className="font-myriad-pro font-semibold text-white transition duration-500 transform hover:scale-110 text-base px-2">Servicios</a>
                <Link to={'/gallery'}>
                  <span className="font-myriad-pro font-semibold text-white transition duration-500 transform hover:scale-110 text-base px-2">Galería</span>
                </Link>
                <a href="#" className="font-myriad-pro font-semibold text-white transition duration-500 transform hover:scale-110 text-base px-2">Portafolio</a>
                <a href="#" className="font-myriad-pro font-semibold text-white transition duration-500 transform hover:scale-110 text-base px-2">Contactos</a>
                <Link to={'/login'}>
                  <span className="font-myriad-pro font-semibold text-white transition duration-500 transform hover:scale-110 text-base px-2">Iniciar Sesión</span>
                </Link>
                <Link to={'/signup'}>
                  <span className="border px-4 py-1.5 rounded-md border-white font-myriad-pro font-semibold text-white transition duration-500 transform hover:scale-110 text-base">Registrarse</span>
                </Link>
                <div className="mr-0 flex justify-around content-center w-20">
                  <a href="https://web.facebook.com/ElLokojara/">
                    <FontAwesomeIcon icon={faFacebook} size="2xl" color="#4267B2" />
                  </a>
                  <a href="https://www.instagram.com/blackshark.studios/?hl=es-la">
                    <FontAwesomeIcon icon={faInstagram} size="2xl" color="#F56040" />
                  </a>
                </div>
            </div>
        </div>
    </>
  )
}
