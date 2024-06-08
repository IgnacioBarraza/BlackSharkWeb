import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UploadButton = ({ handleInterface }) => {
  return (
    <div className="bg-white rounded-lg">
      <button
        onClick={handleInterface}
        className="w-full h-80 flex items-center justify-center rounded-lg shadow-md border hover:bg-gray-200 border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <FontAwesomeIcon
            icon={faPlus}
            style={{ color: "#000000" }}
            size="8x"
          />
          <h2 className="text-lg font-bold mb-2 text-center">Agregar Servicio</h2>
        </div>
      </button>
    </div>
  );
};
