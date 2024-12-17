import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProps } from "../../../hooks/useProps";

export const DesktopMenu = () => {
  const navigate = useNavigate();
  const { userName, userType, userToken, logout } = useProps();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const firstName = userName ? userName.split(' ')[0] : '';

  const handleLogout = () => {
    logout()
    navigate("/")
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutsideDropdown);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [isDropdownOpen]);


  return (
    <>
      <div className="w-full flex overflow-hidden">
        <div className="mr-4 flex md:mr-4 px-2">
          <Link to="/" className="mr-4 flex">
              <img src="/BlackShark.png" alt="Blackshark logo" className="w-20 h-20" />
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-center space-x-2 max-md:hidden">
          <Link
            to="/servicios"
            className="group relative inline-block text-white font-myriad-pro px-2 text-xl"
          > 
            <span>Servicios</span>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-ligth-bs transition-all duration-300 group-hover:w-full"
            />
          </Link>
          <Link
            to="/gallery"
            className="group relative inline-block text-white font-myriad-pro px-2 text-xl"
          >
            <span>Galería</span>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-ligth-bs transition-all duration-300 group-hover:w-full"
            />
          </Link>
          <Link
            to="/contact"
            className="group relative inline-block text-white font-myriad-pro px-2 text-xl"
          >
            <span>Contacto</span>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-ligth-bs transition-all duration-300 group-hover:w-full"
            />
          </Link>
        </div>

        <div className="flex items-center justify-end max-md:hidden ">
          {userName ? (
            <div ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7"
              >
                <span className="text-white">{firstName}</span>
              </button>
              <div className={`fixed h-screen w-[250px] top-0 right-0 bg-white z-50 shadow-md transform transition-transform duration-500 ease-in-out ${
              isDropdownOpen ? "translate-x-0" : "translate-x-full"
              }`}>
                <div className="flex justify-center items-center border-b-8 border-b-black bg-black">
                  <img src="/background-auth-photo.jpg" alt="background-photo" className="opacity-70"/>
                  <div className="absolute flex justify-center">
                    <span className="font-myriad-pro text-2xl py-2 px-4 font-bold w-full text-center text-white">{userName}</span>
                  </div>
                </div>
                {userType === 'admin' && userToken ? (
                  <>
                    <Link
                      to="/manageOrders"
                      className="block w-full px-4 py-2 text-black text-xl font-myriad-pro hover:bg-blue-strong-bs hover:text-white"
                      onClick={toggleDropdown}
                    >
                      Gestionar pedidos
                    </Link>
                    <Link
                      to="/tools"
                      className="block w-full px-4 py-2 text-black text-xl font-myriad-pro hover:bg-blue-strong-bs hover:text-white"
                      onClick={toggleDropdown}
                    >
                      Equipos
                    </Link>
                    <Link
                      to="/metrics"
                      className="block w-full px-4 py-2 text-black text-xl font-myriad-pro hover:bg-blue-strong-bs hover:text-white"
                      onClick={toggleDropdown}
                    >
                      Métricas
                    </Link>
                    <Link
                      to="/messagecontact"
                      className="block w-full px-4 py-2 text-black text-xl font-myriad-pro hover:bg-blue-strong-bs hover:text-white"
                      onClick={toggleDropdown}
                    >
                      Gestionar mensajes
                    </Link>
                  </> 
                  ) : (
                    <>
                      <Link
                        to="/orders"
                        className="block w-full px-4 py-2 text-black text-xl font-myriad-pro hover:bg-bg-blue-strong-bs hover:text-white"
                      >
                        Mis pedidos
                      </Link>
                      <Link
                        to="/cart"
                        className="block w-full px-4 py-2 text-black text-xl font-myriad-pro hover:bg-bg-blue-strong-bs hover:text-white"
                      >
                        Carrito de compras
                      </Link>
                    </>
                    )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-black text-xl font-myriad-pro hover:bg-blue-strong-bs hover:text-white"
                      >
                        Cerrar Sesión
                      </button>
              </div>
            </div>
                ) : (
            <>
              <Link
                to="/login"
                className="group relative inline-block text-white font-myriad-pro text-xl"
              >
                <span className="hover:opacity-75">Iniciar Sesión</span>
              </Link>
              <Link
                to="/signup"
                className="group relative inline-block text-white font-myriad-pro text-xl px-4"
              >
                <span className="bg-blue-ligth-bs rounded p-2 hover:opacity-75 mr-4">Registrarse</span>
              </Link>
            </> )}
        </div>
      </div>
      
    </>
  );
};
