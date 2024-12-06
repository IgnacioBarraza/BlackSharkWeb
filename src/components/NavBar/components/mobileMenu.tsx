import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export const MobileMenu = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);

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
    <div className="w-2/4 flex justify-between items-center">
      <div className="md:hidden flex items-center">
        <button ref={toggleButtonRef} onClick={toggleMobileMenu} className="text-2xl mr-2">
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

      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="absolute top-[90px] left-[0%] p-2 bg-white z-50 rounded-lg md:hidden shadow-md w-[180px]">
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
    </div>
  );
};
