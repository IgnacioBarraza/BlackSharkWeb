import { faCircleXmark, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/gallery.css";
import { useEffect } from "react";
import { useProps } from "../../../hooks/useProps";

export const ImageModal = ({ image, onClose, deleteImage }) => {
  const { userType, userToken } = useProps();

  const handleClickOutside = (event) => {
    if (event.target.classList.contains("modal-container")) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 modal-container"
      onClick={handleClickOutside}
    >
      <div className="relative max-w-full max-h-full">
        <img
          src={image.imagen_link}
          alt=""
          className="max-w-full max-h-screen object-contain"
        />
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="absolute top-4 right-4 text-white text-4xl hover:animate-beat-fade"
          onClick={onClose}
        />
        {userType === "admin" && userToken && (
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="absolute top-4 left-4 text-white text-4xl hover:animate-beat-fade"
            onClick={(e) => {
              e.stopPropagation()
              deleteImage(image)
            }}
          />
        )}
      </div>
    </div>
  );
};
