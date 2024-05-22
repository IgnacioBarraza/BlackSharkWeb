import { faList, faX } from "@fortawesome/free-solid-svg-icons";
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
        <div className="flex items-center space-x-16 md:space-x-16">
              <Link to={'/servicios'}>   
              <span className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 px-2 mr-7 text-2xl items-center justify-center hidden md:flex">Servicios</span>
              </Link>
              <Link to={'/gallery'} className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7 items-center justify-center hidden md:flex">
              <span>Galería</span>
              </Link>
              <Link to={'/'}>
              <div className="w-28 h-28 z-100">
              <img src="/BlackShark.png" alt="Blackshark logo" />
              </div>
              </Link>
              <Link to={'/contact'} className="font-myriad-pro font-medium  transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7 items-center justify-center hidden md:flex">
              <span >Contacto</span>
              </Link>
              <Link to={'/login'} className="font-myriad-pro font-medium  transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7 items-center justify-center hidden md:flex">
                <span>Iniciar Sesión</span>
              </Link>
        </div>
        <button id="menu-button" className="block md:hidden p-2 ml-auto" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faList} style={{color: "#000000"}} size="2xl"/>
        </button>
        {isOpen && (
        <div className="absolute top-full mb-12 w-full bg-white shadow-lg md:hidden z-10 ">
          <div>
          <Link to={'/servicios'} className="font-myriad-pro block px-4 py-4 text-black text-center font-bold border-gray-300 border-b">Servicios</Link>
          <Link to={'/gallery'} className="font-myriad-pro block px-4 py-4 text-black text-center font-bold  border-gray-300 border-b">Galería</Link>
          <Link to={'/contact'} className="font-myriad-pro block px-4 py-4 text-black text-center font-bold  border-gray-300 border-b">Contacto</Link>
          <Link to={'/login'} className="font-myriad-pro block px-4 py-4 text-black text-center font-bold">Iniciar Sesión</Link>
          </div>
        </div>
      )}
      </div>
    </>
  )
}
