import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-4 relative w-full justify-center">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 md:w-2/5 border-t border-t-1 border-white" />
            <a href="https://www.facebook.com/ElLokojara" aria-label="Facebook" className="text-white hover:text-gray-400" target="_blank">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://www.instagram.com/blackshark.studios/" aria-label="Instagram" className="text-white hover:text-gray-400" target="_blank">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 md:w-2/5 border-t border-white" />
          </div>
          <div className="text-center text-2xl md:text-3xl lg:text-4xl">
            Black Shark Studios
          </div>
        </div>
    </footer>
    </>
  )
}