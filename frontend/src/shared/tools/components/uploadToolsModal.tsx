import { useEffect, useState } from "react";
import { useFirebase } from "../../../hooks/useFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useBackend } from "../../../hooks/useBackend";
import { useProps } from "../../../hooks/useProps";
import { CreateEquipment, Equipment } from "../../../utils/interfaces";

export const UploadToolsModal = ({ handleInterface, services, addTool, showSuccessToast, showErrorToast }) => {
  const {userToken} = useProps()
  const { uploadServiceImage } = useFirebase(); //Cambiar esto para el equipo
  const { createEquipment } = useBackend()

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");
  const [tool, setTool] = useState({
    toolName: '',
    toolType: ''
  })
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleUploadToolInput = ({ target: { name, value } }) => {
    setTool({...tool, [name]: value})
  }

  const uploadTool = async () => {
    if (selectedServices.length === 0) {
        alert('Selecciona uno más servicios asociados al equipo!')
        return
    } else if (tool.toolName === '') {
        alert('Ingresa un nombre para el equipo!')
        return
    } else if (tool.toolName.length < 5 || tool.toolName.length > 90) {
        alert('El nombre del equipo debe tener entre 5 y 90 carácteres!')
        return
    } else if (tool.toolType.length < 5 || tool.toolType.length > 90) {
        alert('El tipo de equipo ingresado debe contener entre 5 y 90 carácteres!')
        return
    } else if (tool.toolType === '') {
        alert('Debes ingresar el tipo de equipo!')
        return
    }
    const newTool: CreateEquipment = {
      nombre_equipo: tool.toolName,
      tipo_equipo: tool.toolType,
      id_servicios: selectedServices[0]
    }
    try {
      const res = await createEquipment(newTool, userToken)
      const {status, data} = res
      if (status === 201) {
        const formmattedNewTool: Equipment = {
          ...newTool,
          id_equipo: data.id
        }
        addTool(formmattedNewTool)
        showSuccessToast(data.message)
        handleInterface()
      }
    } catch (error) {
      showErrorToast(error.response.data.message)
      console.error(error)
    }
  }

  const handleServiceSelection = (serviceId: string) => {
    if (!selectedServices.includes(serviceId)) {
      setSelectedServices((prev) => [...prev, serviceId]);
    }
    setDropdownOpen(false);
  };

  const removeSelectedService = (id: string) => {
    setSelectedServices((prev) => prev.filter((serviceId) => serviceId !== id));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 sm:px-0">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-md">
        <h2 className="font-myriad-pro text-xl font-bold mb-4 text-center">
          Agregar nuevo equipo
        </h2>
        <div>
          <div>
          {services.length > 0 && (
          <>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full px-4 py-2 text-left bg-gray-200 rounded-md"
              >
                Selecciona un servicio
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                  {services.map((service) => (
                    <div
                      key={service.id_servicios}
                      onClick={() =>
                        handleServiceSelection(service.id_servicios)
                      }
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {service.nombre}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4">
              {selectedServices.map((serviceId) => {
                const service = services.find(
                  (s) => s.id_servicios === serviceId
                );
                return (
                  <div
                    key={serviceId}
                    className="flex items-center justify-between mb-2 p-2 bg-gray-200 rounded"
                  >
                    <span>{service?.nombre}</span>
                    {progress !== 100 && (
                      <button
                        onClick={() => removeSelectedService(serviceId)}
                        className="text-red-500"
                      >
                        <FontAwesomeIcon icon={faXmarkCircle} size="xl" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
            <div className="mt-6">
              <input
                id="toolName"
                name="toolName"
                type="text"
                placeholder="Ingresa el nombre del equipo"
                className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                onChange={handleUploadToolInput}
              />
              <input
                id="toolType"
                name="toolType"
                type="text"
                placeholder="Ingresa el tipo de equipo"
                className="mt-4 w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                onChange={handleUploadToolInput}
              />
            </div>
            <div className="pt-5">
              <button
                onClick={uploadTool}
                className="flex items-center justify-center w-full px-[110px] py-2.5 text-xl font-large text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Guardar
              </button>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={handleInterface}
                className=" hover:text-gray-900 text-medium"
              >
                Cancelar
              </button>
            </div>
            {progress > 0 && (
              <div className="mt-4">
                <progress
                  value={progress}
                  max="100"
                  className="w-full"
                ></progress>
                {progress === 100 && (
                  <p className="text-green-600 mt-2">
                    ¡Imagen subida exitosamente!
                  </p>
                )}
                {error && (
                  <div className="text-red-600 mt-2">
                    Error: {error.message}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
