import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons/faCircleUser";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setUsername(user);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
    navigate('/');
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
            <span>Contacto</span>
          </Link>
          {username ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7 items-center justify-center hidden md:flex">
                <span>{username}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  <div className="flex items-center p-4">
                    <FontAwesomeIcon icon={faCircleUser} className="w-8 h-8 rounded-full"/>
                    <span className="ml-3 font-myriad-pro font-medium">Mi Cuenta</span>
                  </div>
                  <hr className="border-t border-gray-300" />
                  <Link to={'/orders'} className="block px-4 py-2 text-black font-myriad-pro hover:bg-gray-100">Mis pedidos</Link>
                  <Link to={'/cart'} className="block px-4 py-2 text-black font-myriad-pro hover:bg-gray-100">Carrito de compras</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-black font-myriad-pro hover:bg-gray-100">Cerrar Sesión</button>
                </div>
              )}
            </div>
          ) : (
            <Link to={'/login'} className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7 items-center justify-center hidden md:flex">
              <span>Iniciar Sesión</span>
            </Link>
          )}
        </div>

        <div className="flex flex-row items-center md:hidden justify-between w-full space-x-12">
          <div>
            <button id="menu-button" className="flex w-20 h-20 md:hidden items-center justify-start" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faList} style={{color: "#000000"}} size="2x"/>
            </button>
          </div>

          <div className="flex justify-center items-center">
            <Link to={'/'}>
              <div className="w-20 h-20 z-100 md:hidden justify-center items-center">
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
            {username ? (
              <div className="relative">
                <button onClick={toggleDropdown} className="font-myriad-pro block py-4 text-black text-lg font-bold pl-4">
                  <span>{username}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    <div className="flex items-center p-4">
                      <FontAwesomeIcon icon={faCircleUser} className="w-8 h-8 rounded-full"/>
                      <span className="ml-3 font-myriad-pro font-medium">Mi Cuenta</span>
                    </div>
                    <hr className="border-t border-gray-300" />
                    <Link to={'/orders'} className="block px-4 py-2 text-black font-myriad-pro hover:bg-gray-100">Mis pedidos</Link>
                    <Link to={'/cart'} className="block px-4 py-2 text-black font-myriad-pro hover:bg-gray-100">Carrito de compras</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-black font-myriad-pro hover:bg-gray-100">Cerrar Sesión</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={'/login'} className="font-myriad-pro block py-4 text-black text-lg font-bold pl-4"><span>Iniciar Sesión</span></Link>
            )}
          </div>
        )}
      </div>
    </>
  );
};
