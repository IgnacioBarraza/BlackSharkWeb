import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useProps } from "../../../hooks/useProps";

export const MobileMenu = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const { userName} = useProps();

  const handleClickOutsideMobileMenu = (event) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(event.target)
    ) {
      setMobileMenuOpen(false);
      document.removeEventListener("mousedown", handleClickOutsideMobileMenu);
    }
  };

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutsideMobileMenu);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMobileMenu);
    }
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex justify-between items-center">
      {!userName &&( 
        <div className="md:hidden flex items-center px-4">
          <button ref={toggleButtonRef} onClick={toggleMobileMenu} className="text-2xl flex mr-2 text-white">
            <FontAwesomeIcon
              icon={isMobileMenuOpen ? faTimes : faBars}
              size="lg"
            />
          </button>
        </div>
      )}

      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="absolute flex flex-col items-center top-[80px] right-[0%] p-2 bg-white z-50 rounded-l-lg md:hidden shadow-md ">
          <Link
            to="/servicios"
            className="block w-full font-myriad-pro font-medium text-2xl py-2 px-4 rounded hover:bg-[#10243c] hover:text-white"
            onClick={toggleMobileMenu}
          >
            Servicios
          </Link>
          <Link
            to="/gallery"
            className="block w-full font-myriad-pro font-medium text-2xl py-2 px-4 rounded hover:bg-[#10243c] hover:text-white"
            onClick={toggleMobileMenu}
          >
            Galería
          </Link>
          <Link
            to="/contact"
            className="block w-full font-myriad-pro font-medium text-2xl py-2 px-4 rounded hover:bg-[#10243c] hover:text-white"
            onClick={toggleMobileMenu}
          >
            Contacto
          </Link>
          <Link
            to="/login"
            className="block w-full font-myriad-pro font-medium text-2xl py-2 px-4 rounded hover:bg-[#10243c] hover:text-white"
            onClick={toggleMobileMenu}
          >
            Iniciar Sesion
          </Link>
          <Link
            to="/signup"
            className="block w-full font-myriad-pro font-medium text-2xl py-2 px-4 rounded hover:bg-[#10243c] hover:text-white"
            onClick={toggleMobileMenu}
          >
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
};
