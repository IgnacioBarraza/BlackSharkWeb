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

  const firstName = userName ? userName.split(" ")[0] : "";

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
        {userToken &&(
          <>
            <FontAwesomeIcon
            icon={isDropdownOpen ? faTimes : faBars}
            size="lg"
            />
          </>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute flex flex-col items-center top-[80px] right-[0%] bg-white z-50 border-gray-300 shadow-md rounded-l-lg p-2">
            <span 
              className="font-myriad-pro text-xl py-2 px-4 font-bold w-full text-center text-white bg-[#10243c] rounded"
              >
              {firstName}
            </span>

          {userType === "admin" && userToken ? (
            <>
              <Link
                to="/manageOrders"
                className="block w-full px-4 py-2 text-black font-myriad-pro rounded hover:bg-[#10243c] hover:text-white"
                onClick={toggleDropdown}
              >
                Gestionar pedidos
              </Link>
              <Link
                to="/tools"
                className="block w-full px-4 py-2 text-black font-myriad-pro rounded hover:bg-[#10243c] hover:text-white"
                onClick={toggleDropdown}
              >
                Equipos
              </Link>
              <Link
                to="/metrics"
                className="block w-full px-4 py-2 text-black font-myriad-pro rounded hover:bg-[#10243c] hover:text-white"
                onClick={toggleDropdown}
              >
                Metricas
              </Link>
              <Link
                to="/messagecontact"
                className="block w-full px-4 py-2 text-black font-myriad-pro rounded hover:bg-[#10243c] hover:text-white"
                onClick={toggleDropdown}
              >
                Gestionar mensajes
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/servicios"
                className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 rounded hover:bg-[#10243c] hover:text-white"
                onClick={toggleDropdown}
              >
                Servicios
              </Link>
              <Link
                to="/gallery"
                className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 rounded hover:bg-[#10243c] hover:text-white"
                onClick={toggleDropdown}
              >
                Galería
              </Link>
              <Link
                to="/contact"
                className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 rounded hover:bg-[#10243c] hover:text-white"
                onClick={toggleDropdown}
              >
                Contacto
              </Link>
              <Link
                to="/orders"
                className="block w-full font-myriad-pro text-xl py-2 px-4 rounded hover:bg-[#10243c] hover:text-white"
                onClick={toggleDropdown}
              >
                Mis pedidos
              </Link>
              <Link
                to="/cart"
                className="block w-full font-myriad-pro text-xl py-2 px-4 rounded hover:bg-[#10243c] hover:text-white"
                onClick={toggleDropdown}
              >
                Carrito de compras
              </Link>
            </>
          )}
          <button
            onClick={handleLogout}
            className="text-left w-full font-myriad-pro text-lg py-2 px-4 rounded hover:bg-[#10243c] hover:text-white"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};
