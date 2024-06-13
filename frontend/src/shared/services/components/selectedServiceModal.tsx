import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProps } from "../../../hooks/useProps";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

export const SelectedServiceModal = ({
  selectedService,
  handleCloseModal,
  handleClickOutside,
  handleDeleteService,
}) => {
  const { userType } = useProps();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-container"
      onClick={handleClickOutside}
    >
      <div className="relative bg-white w-11/12 md:w-3/4 lg:w-2/3 h-3/4 md:h-auto rounded-lg p-4 md:p-8 flex flex-col md:flex-row overflow-y-auto">
        <button
          className="absolute top-4 right-4 hover:text-gray-700"
          onClick={handleCloseModal}
        >
          <FontAwesomeIcon icon={faXmarkCircle} size="2xl" />
        </button>
        <div className="w-full md:w-1/2 h-64 md:h-auto flex items-center justify-center">
          <img
            src={selectedService.imagen_link}
            alt={selectedService.nombre}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 p-4 md:p-8 ">
          <h2 className="text-2xl font-bold mb-4">{selectedService.nombre}</h2>
          <p className="text-xl font-myriad-pro">
            {selectedService.descripcion}
          </p>
          <p className="text-xl font-myriad-pro font-bold">
            {formatPrice(selectedService.precio)}
          </p>
          {userType === "admin" && (
            <button
              className="mt-8 px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the card click event
                handleDeleteService(selectedService.id_servicios);
              }}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
