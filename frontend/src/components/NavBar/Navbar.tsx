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

        <div className="flex flex-row items-center md:hidden justify-between w-full space-x-12">

          <div>
            <button id="menu-button" className="flex w-20 h-20 md:hidden items-center justify-start" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faList} style={{color: "#000000"}} size="2x"/>
            </button>
          </div>

          <div className="flex justify-center items-center">
            <Link to={'/'}>
              <div className="flex w-20 h-20 z-100 md:hidden justify-center items-center">
                <img src="/BlackShark.png" alt="Blackshark logo"/>
              </div>
            </Link>
          </div>

          <div className="w-20 h-20 md:hidden justify-center items-center">
          </div>

        </div>

        {isOpen && (
          <div className="absolute top-full w-2/3 bg-white rounded-lg md:hidden z-10 border-gray-300 left-0 border flex flex-col">
            <Link to={'/servicios'} className="font-myriad-pro block py-4 text-black text-lg font-bold pl-4"><span>Servicios</span></Link>
            <Link to={'/gallery'} className="font-myriad-pro block py-4 text-black text-lg font-bold pl-4"><span>Galería</span></Link>
            <Link to={'/contact'} className="font-myriad-pro block py-4 text-black text-lg font-bold pl-4"><span>Contacto</span></Link>
            <Link to={'/login'} className="font-myriad-pro block py-4 text-black text-lg font-bold pl-4"><span>Iniciar Sesión</span></Link>
          </div>
        )}

      </div>
    </>
  )
}
