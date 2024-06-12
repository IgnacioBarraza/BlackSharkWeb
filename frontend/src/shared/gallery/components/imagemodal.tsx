import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const ImageModal = ({ src, onClose }) => {
    const handleClickOutside = (event) => {
        if (event.target.classList.contains('modal-container')) {
          onClose();
        }
      };

    return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 modal-container"
      onClick={handleClickOutside}
    >
      <div className="relative max-w-full max-h-full">
        <img src={src} alt="" className="max-w-full max-h-screen object-contain" />
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="absolute top-4 right-4 text-white text-4xl hover:animate-beat-fade"
          onClick={onClose}
        />
      </div>
    </div>
  );
};