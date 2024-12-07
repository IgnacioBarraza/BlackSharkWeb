import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UploadGalleryButton = ({handleModal}) => {
  return (
    <button
      onClick={handleModal}
      className="w-full height-button-admin flex p-4 sm:p-6 md:p-8 lg:p-10 items-center justify-center bg-transparent hover:bg-gray-200 py-2 px-4 border border-gray-200 hover:border-transparent rounded transition duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <FontAwesomeIcon icon={faPlus} style={{ color: "#000000" }} size="4x" />
        <h1 className="font-myriad-pro font-light text-xl mt-2 text-center">
          Agregar Nueva Imagen
        </h1>
      </div>
    </button>
  );
};
