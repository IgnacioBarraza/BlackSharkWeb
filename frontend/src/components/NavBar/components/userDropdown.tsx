import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../providers/userContext";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export const UserDropdown = () => {
  const navigate = useNavigate();
  const { userName, userToken, userType, setUserName, setTokenData, setUserType } = useContext(UserContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const firstName = userName ? userName.split(' ')[0] : '';

  const handleLogout = () => {
    setUserName(null);
    setTokenData(null);
    setUserType(null);
    localStorage.setItem("token", null);
    localStorage.setItem("userType", null);
    localStorage.setItem("userName", null);
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
    <div className="relative md:hidden" ref={dropdownRef}>
      <button
        onClick={userName ? toggleDropdown : handleLoginRedirect}
        className="block font-myriad-pro font-medium text-2xl"
      >
        {userToken ? (
          <FontAwesomeIcon icon={faCircleUser} size="xl" />
        ) : (
          <FontAwesomeIcon icon={faRightToBracket} size="xl" />
        )}
      </button>
      {isDropdownOpen && (
        <div className="absolute top-[77px] right-[-40px] bg-white z-50 border-gray-300 shadow-md w-[240px] rounded-lg p-4">
          <div className="ml-4">
            <FontAwesomeIcon icon={faCircleUser} size="xl" />
            <span className="font-myriad-pro text-xl py-2 px-4 font-bold">{firstName}</span>
          </div>
          <hr className="border-t-2 border-gray-300 mt-2" />
          
          {userType === 'admin' && userToken ? (
        <>
          <Link
            to="/manageOrders"
            className="block font-myriad-pro text-xl py-2 px-4"
            onClick={toggleDropdown}
          >
            Gestionar pedidos
          </Link>
          <Link
            to="/inventary"
            className="block font-myriad-pro text-xl py-2 px-4"
            onClick={toggleDropdown}
          >
            Inventario
          </Link>
        </>
        ) : (
        <>
          <Link
            to="/orders"
            className="block font-myriad-pro text-xl py-2 px-4"
            onClick={toggleDropdown}
          >
            Mis pedidos
          </Link>
          <Link
            to="/cart"
            className="block font-myriad-pro text-xl py-2 px-4"
            onClick={toggleDropdown}
          >
            Carrito de compras
          </Link>
        </>
        )}
          <button
            onClick={handleLogout}
            className="w-full text-left font-myriad-pro text-xl py-2 px-4"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};
