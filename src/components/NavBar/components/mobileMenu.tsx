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
    <div className="relative flex justify-between items-center ">
      {!userName &&( 
        <div className="md:hidden flex items-center px-4">
          <button 
            onClick={toggleMobileMenu} 
            className=" relative text-2xl flex mr-2 text-white">
            <FontAwesomeIcon
              icon={faBars}
              size="lg"
            />
          </button>
        </div>
      )}
        <div 
          ref={mobileMenuRef}
          className={`fixed h-full w-[250px] top-0 right-0 bg-white z-50 shadow-md md:translate-x-full transform transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <div ref={toggleButtonRef} className="flex justify-center items-center bg-black">
            <img src="/background-auth-photo.jpg" alt="background-photo" className="opacity-70 w-screen h-50"/>
            <div className="absolute flex justify-center">
              <span className="font-myriad-pro text-2xl py-2 px-4 font-bold w-full text-center text-white">Agencia Publicitaria</span>
            </div>
          </div>
          <Link
            to="/servicios"
            className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 hover:bg-[#10243c] hover:text-white"
            onClick={toggleMobileMenu}
          >
            Servicios
          </Link>
          <Link
            to="/gallery"
            className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 hover:bg-[#10243c] hover:text-white"
            onClick={toggleMobileMenu}
          >
            Galería
          </Link>
          <Link
            to="/contact"
            className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 hover:bg-[#10243c] hover:text-white"
            onClick={toggleMobileMenu}
          >
            Contacto
          </Link>
          <Link
            to="/login"
            className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 hover:bg-[#10243c] hover:text-white"
            onClick={toggleMobileMenu}
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/signup"
            className="block w-full font-myriad-pro font-medium text-xl py-2 px-4 hover:bg-[#10243c] hover:text-white"
            onClick={toggleMobileMenu}
          >
            Registrarse
          </Link>
        </div>
    </div>
  );
};
