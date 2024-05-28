import { faBars, faList, faRightToBracket, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons/faCircleUser";
import "../../styles/navbar.css";
import { useContext } from "react";
import { UserContext } from "../../providers/userContext";

export const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const { userName, setUserName, setTokenData, setUserType } = useContext(UserContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const firstName = userName ? userName.split(' ')[0] : '';

  const handleLogout = () => {
    setUserName(null);
    setTokenData(null);
    setUserType(null);
    navigate("/");
    setIsOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen)
  
  const handleClickOutside = (event) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
      setMobileMenuOpen(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col items-center p-2 bg-white w-full">
      {/* Desktop Menu */}
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
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
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

      {/* Mobile Menu Button */}
      <div className="w-full flex justify-around items-center">
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-2xl mr-2">
            <FontAwesomeIcon
              icon={isMobileMenuOpen ? faTimes : faBars}
              size="lg"
            />
          </button>
        </div>
        <Link to="/" className="flex items-center md:hidden">
          <div className="w-20 h-20">
            <img src="/BlackShark.png" alt="Blackshark logo" />
          </div>
        </Link>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="absolute top-[105px] left-[2%] p-4 bg-white z-50 rounded-lg md:hidden shadow-md">
            <Link
              to="/servicios"
              className="block font-myriad-pro font-medium text-2xl py-2 px-4"
              onClick={toggleMobileMenu}
            >
              Servicios
            </Link>
            <Link
              to="/gallery"
              className="block font-myriad-pro font-medium text-2xl py-2 px-4"
              onClick={toggleMobileMenu}
            >
              Galería
            </Link>
            <Link
              to="/contact"
              className="block font-myriad-pro font-medium text-2xl py-2 px-4"
              onClick={toggleMobileMenu}
            >
              Contacto
            </Link>
          </div>
        )}
        {userName ? (
          <div className="relative md:hidden">
            <button
              onClick={toggleDropdown}
              className="block font-myriad-pro font-medium text-2xl"
            >
              <FontAwesomeIcon icon={faCircleUser} size="xl" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-[77px] right-[-40px] bg-white z-50 border-gray-300 shadow-md w-[240px] rounded-lg p-4" onClick={handleLogout}>
                <Link
                  to="/orders"
                  className="block font-myriad-pro text-xl py-2 px-4"
                  onClick={toggleMobileMenu}
                >
                  Mis pedidos
                </Link>
                <Link
                  to="/cart"
                  className="block font-myriad-pro text-xl py-2 px-4"
                  onClick={toggleMobileMenu}
                >
                  Carrito de compras
                </Link>
                <button
                  onClick={handleLogout}
                  className=" w-full text-left font-myriad-pro text-xl py-2 px-4"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="block font-myriad-pro font-medium text-2xl md:hidden"
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon icon={faRightToBracket} size="xl" />
          </Link>
        )}
      </div>
    </div>
  );
};
