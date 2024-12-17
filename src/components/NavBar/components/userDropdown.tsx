import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProps } from "../../../hooks/useProps";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export const UserDropdown = () => {
  const navigate = useNavigate();
  const { userName, userToken, userType, logout } = useProps();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
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

  const handleLoginRedirect = () => {
    if (!userName) {
      navigate("/login");
    }
  };

  return (
    <div className=" md:hidden bg-[#10243c]" ref={dropdownRef}>
      <button
        onClick={userName ? toggleDropdown : handleLoginRedirect}
        className="text-2xl flex text-white mr-6"
      >
        <FontAwesomeIcon
        icon={isDropdownOpen ? faTimes : faBars}
        size="lg"
        />
      </button>
      <div className={`fixed h-full w-[250px] top-0 right-0 bg-white z-50 shadow-md md:translate-x-full transform transition-transform duration-500 ease-in-out ${
        isDropdownOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex justify-center items-center bg-black">
            <img src="/background-auth-photo.jpg" alt="background-photo" className="opacity-70 w-screen h-50"/>
            <div className="absolute flex justify-center">
              <span 
              className="font-myriad-pro text-2xl py-2 px-4 font-bold w-full text-center text-white"
              >
                {userName}
              </span>
            </div>
          </div>
          
        {userType === "admin" && userToken ? (
          <>
            <Link
              to="/servicios"
              className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 hover:bg-blue-strong-bs hover:text-white"
              onClick={toggleDropdown}
            >
              Servicios
            </Link>
            <Link
              to="/gallery"
              className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 hover:bg-blue-strong-bs hover:text-white"
              onClick={toggleDropdown}
            >
              Galería
            </Link>
            <Link
              to="/contact"
              className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 hover:bg-blue-strong-bs hover:text-white"
              onClick={toggleDropdown}
            >
              Contacto
            </Link>
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
              Metricas
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
              to="/servicios"
              className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 hover:bg-blue-strong-bs hover:text-white"
              onClick={toggleDropdown}
            >
              Servicios
            </Link>
            <Link
              to="/gallery"
              className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 hover:bg-blue-strong-bs hover:text-white"
              onClick={toggleDropdown}
            >
              Galería
            </Link>
            <Link
              to="/contact"
              className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 hover:bg-blue-strong-bs hover:text-white"
              onClick={toggleDropdown}
            >
              Contacto
            </Link>
            <Link
              to="/orders"
              className="block w-full font-myriad-pro text-xl py-2 px-4 hover:bg-blue-strong-bs hover:text-white"
              onClick={toggleDropdown}
            >
              Mis pedidos
            </Link>
            <Link
              to="/cart"
              className="block w-full font-myriad-pro text-xl py-2 px-4 hover:bg-blue-strong-bs hover:text-white"
              onClick={toggleDropdown}
            >
              Carrito de compras
            </Link>
          </>
        )}
        <button
          onClick={handleLogout}
          className="text-left w-full font-myriad-pro text-xl py-2 px-4 hover:bg-blue-strong-bs hover:text-white"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
