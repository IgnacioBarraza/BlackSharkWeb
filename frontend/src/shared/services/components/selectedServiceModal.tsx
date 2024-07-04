import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProps } from "../../../hooks/useProps";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { Equipment } from "../../../utils/interfaces";
import { EditServiceModal } from "./editServiceModal"; // Asegúrate de importar el componente modal de edición correctamente


export const SelectedServiceModal = ({
  selectedService,
  setSelectedService,
  setServices,
  handleCloseModal,
  handleClickOutside,
  handleDeleteService,
  handleShoppingCart,
  tools
}) => {
  const { userType } = useProps();
  const [editMode, setEditMode] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  const filterToolsByServiceId = (tools: Equipment[], serviceId: string): Equipment[] => {
    return tools.filter(tool => tool.id_servicios === serviceId);
  }

  const filteredTools = filterToolsByServiceId(tools, selectedService.id_servicios);

  const handleEdit = () => {
    setEditMode(true); // Función para abrir el modal de edición
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
          <button
            className="mt-8 px-4 py-2 rounded-lg bg-blue-600"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the card click event
              handleShoppingCart(selectedService);
            }}
          >
            <span className="font-myriad-pro text-lg text-white">Agregar al carrito</span>
          </button>
          {userType === "admin" && (
          <>
            <button
              className="mt-8 px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the card click event
                handleDeleteService(selectedService.id_servicios);
              }}
            >
              Eliminar
            </button>
            <button
              className="mt-8 px-4 py-2 border border-black text-black rounded-lg ml-0"
              onClick={handleEdit}
            >
              Editar
            </button>
            {editMode && (
              <EditServiceModal
                isOpen={editMode}
                onClose={() => setEditMode(false)}
                service={selectedService}
                setServices={setServices}
                setSelectedService={setSelectedService}
              />
            )}
          </>
        )}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Herramientas Asociadas</h3>
            {filteredTools.length > 0 ? (
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Nombre</th>
                    <th className="py-2 px-4 border-b">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTools.map((tool) => (
                    <tr key={tool.id_equipo}>
                      <td className="py-2 px-4 border-b">{tool.nombre_equipo}</td>
                      <td className="py-2 px-4 border-b">{tool.tipo_equipo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay herramientas asociadas a este servicio.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
