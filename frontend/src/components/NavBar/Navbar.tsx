import { faList} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../../styles/navbar.css'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex items-center relative justify-between px-4 py-2">
        <div className="items-center space-x-16 hidden md:flex">
          <Link to={'/servicios'} className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 px-2 mr-7 text-2xl items-center justify-center hidden md:flex">   
            <span>Servicios</span>
          </Link>
          <Link to={'/gallery'} className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7 items-center justify-center hidden md:flex">
            <span>Galería</span>
          </Link>
          <Link to={'/'}>
            <div className="w-28 h-28 z-100 hidden md:flex">
              <img src="/BlackShark.png" alt="Blackshark logo"/>
            </div>
          </Link>
          <Link to={'/contact'} className="font-myriad-pro font-medium  transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7 items-center justify-center hidden md:flex">
            <span >Contacto</span>
          </Link>
          <Link to={'/login'} className="font-myriad-pro font-medium  transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7 items-center justify-center hidden md:flex">
            <span>Iniciar Sesión</span>
          </Link>
        </div>
        <div className="flex items-center md:hidden space-x-64 ">
          <button id="menu-button" className="block h-8 w-8 md:hidden items-center justify-center absolute left-0" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faList} style={{color: "#000000"}} size="2x"/>
          </button>
          <Link to={'/'}>
            <div className="flex w-20 h-16 z-100 md:hidden justify-center items-center">
              <img src="/BlackShark.png" alt="Blackshark logo"/>
            </div>
          </Link>
        </div>
        {isOpen && (
          <div className="absolute top-full w-2/3 bg-white rounded-lg md:hidden z-10 border-gray-300 left-0 border">
            <Link to={'/servicios'} className="font-myriad-pro block py-4 text-black text-lg text-center font-bold"><span>Servicios</span></Link>
            <Link to={'/gallery'} className="font-myriad-pro block py-4 text-black text-center text-lg justify-center font-bold"><span>Galería</span></Link>
            <Link to={'/contact'} className="font-myriad-pro block py-4 text-black text-center text-lg justify-center font-bold"><span>Contacto</span></Link>
            <Link to={'/login'} className="font-myriad-pro block py-4 text-black text-center text-lg justify-center font-bold"><span>Iniciar Sesión</span></Link>
          </div>
        )}
      </div>
    </>
  )
}
