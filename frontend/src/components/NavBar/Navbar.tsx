import { faList, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isSideMenuOpen, setMenu] = useState(false);

  return (
    <>
        <div className="flex items-center justify-center">
            <div className="flex items-center space-x-16 ">
                <Link to={'/servicios'}>   
                <span className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 px-2 mr-7 text-2xl flex items-center justify-center">Servicios</span>
                </Link>
                <Link to={'/gallery'} className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7 flex items-center justify-center">
                <span>Galería</span>
                </Link>
                <Link to={'/'}>
                <div className="w-28 h-28 z-100">
                <img src="/BlackShark.png" alt="Blackshark logo" />
                </div>
                </Link>
                <Link to={'/contact'} className="font-myriad-pro font-medium  transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7 flex items-center justify-center">
                <span >Contacto</span>
                </Link>
                <Link to={'/login'} className="font-myriad-pro font-medium  transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7 flex items-center justify-center">
                  <span>Iniciar Sesión</span>
                </Link>
            </div>
        </div>
    </>
  )
}
