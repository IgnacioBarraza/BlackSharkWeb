import { useEffect, useState } from "react";
import { useFirebase } from "../../hooks/useFirebase";
import { useBackend } from "../../hooks/useBackend";
import { NewGallery, Services } from "../../utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../hooks/useUser";

export const UploadModal = ({ handleModal, services }) => {

  const { uploadGalleryImage } = useFirebase();
  const { createGallery } = useBackend();
  const { userToken } = useUser();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleUpload = () => {
    if (selectedServices.length > 0) {
      uploadGalleryImage(
        image,
        (progress) => setProgress(progress),
        (error) => setError(error),
        (downloadURL) => setUrl(downloadURL)
      );
      setImage(null);
    } else {
      alert("Debes seleccionar al menos un servicio para asociarlo a la imagen...");
    }
  };

  const handleImageFileUpload = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleServiceSelection = (serviceId: string) => {
    if (!selectedServices.includes(serviceId)) {
      setSelectedServices((prev) => [...prev, serviceId]);
    }
    setDropdownOpen(false);
  };

  const removeSelectedService = (id: string) => {
    setSelectedServices((prev) => prev.filter((serviceId) => serviceId !== id));
  };

  const newGallery = async () => {
    if (url) {
      const formattedIds = JSON.stringify(selectedServices);
      const NewGallery: NewGallery = {
        id_servicios: formattedIds,
        imagen_link: url,
      };
      try {
        const res = await createGallery(NewGallery, userToken);
        const { status, data } = res;
        if (status === 201) {
          alert(data.message);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    newGallery();
  }, [url]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 sm:p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md sm:p-8">
        <h2 className="font-myriad-pro text-2xl mb-4 text-center">
          Subir nueva imagen
        </h2>
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
        <div className="border-dashed border-4 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center space-y-4">
          {!preview ? (
            <>
              <input
                type="file"
                className="hidden"
                id="image-upload"
                onChange={handleImageFileUpload}
              />
              <label
                htmlFor="image-upload"
                className="font-myriad-pro cursor-pointer p-2 bg-gray-100 rounded hover:bg-gray-200 transition"
              >
                Arrastra la imagen aquí o haz clic para subirla
              </label>
            </>
          ) : (
            <div className="relative">
              <img src={preview} alt="Preview" className="w-full h-auto" />
              {progress !== 100 && (
                <button
                  onClick={removeImage}
                  className="absolute top-0 right-0 mt-2 mr-2 bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-center mt-4 flex-col">
          {progress !== 100 && (
            <button
              onClick={handleUpload}
              className="font-myriad-pro mt-4 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900 transition flex flex-col items-center"
            >
              Guardar
            </button>
          )}
          <button
            onClick={handleModal}
            className="font-myriad-pro mt-4 bg-red-800 text-white py-2 px-4 rounded hover:bg-red-900 transition flex flex-col items-center"
          >
            Cerrar
          </button>
        </div>
        {progress > 0 && (
          <div className="mt-4">
            <progress value={progress} max="100" className="w-full"></progress>
            {progress === 100 && (
              <p className="text-green-600 mt-2">
                ¡Imagen subida exitosamente!
              </p>
            )}
            {error && (
              <div className="text-red-600 mt-2">Error: {error.message}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
