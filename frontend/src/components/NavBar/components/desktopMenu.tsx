import { faCircleUser } from "@fortawesome/free-regular-svg-icons/faCircleUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../providers/userContext";

export const DesktopMenu = () => {
  const navigate = useNavigate();
  const { userName, userType, userToken, setUserName, setTokenData, setUserType } = useContext(UserContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const firstName = userName ? userName.split(' ')[0] : '';

  const handleLogout = () => {
    setUserName(null);
    setTokenData(null);
    setUserType(null);
    navigate("/");
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
    <div className="hidden md:flex items-center justify-between space-x-16 w-2/4">
      <Link
        to="/servicios"
        className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 px-2 mr-7 text-2xl"
      >
        <span>Servicios</span>
      </Link>
      <Link
        to="/gallery"
        className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7"
      >
        <span>Galería</span>
      </Link>
      <Link to="/" className="flex items-center">
        <div className="w-28 h-28">
          <img src="/BlackShark.png" alt="Blackshark logo" />
        </div>
      </Link>
      <Link
        to="/contact"
        className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7"
      >
        <span>Contacto</span>
      </Link>
      {userName ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7"
          >
            <span>{firstName}</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <div className="flex items-center p-4">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="w-6 h-6 rounded-full"
                />
                <span className="ml-3 font-myriad-pro font-medium">
                  Mi Cuenta
                </span>
              </div>
              <hr className="border-t border-gray-300" />

              {userType === 'admin' && userToken ? (
            <>
              <Link
                to="/manageOrders"
                className="block px-4 py-2 text-black font-myriad-pro hover:bg-gray-100"
                onClick={toggleDropdown}
              >
                Gestionar pedidos
              </Link>
              <Link
                to="/inventary"
                className="block px-4 py-2 text-black font-myriad-pro hover:bg-gray-100"
                onClick={toggleDropdown}
              >
                Equipos
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/orders"
                className="block px-4 py-2 text-black font-myriad-pro hover:bg-gray-100"
              >
                Mis pedidos
              </Link>
              <Link
                to="/cart"
                className="block px-4 py-2 text-black font-myriad-pro hover:bg-gray-100"
              >
                Carrito de compras
              </Link>
            </>
            )}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-black font-myriad-pro hover:bg-gray-100"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="font-myriad-pro font-medium transition duration-500 transform hover:scale-110 text-2xl px-2 mr-7"
        >
          <span>Iniciar Sesión</span>
        </Link>
      )}
    </div>
  );
};
