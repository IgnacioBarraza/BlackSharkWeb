import { useEffect, useState } from "react";
import { useProps } from "../hooks/useProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { Colaborations, Services } from "../utils/interfaces"
import { useBackend } from "../hooks/useBackend";
import { useToast } from "@chakra-ui/react";
import { useFirebase } from "../hooks/useFirebase";
import { ImageModal } from "./gallery/components/imagemodal";

export const Colaboration = () => {
  const { userType, userToken, servicesData, setServicesData, colaborationsData, setColaborationsData} = useProps();
  const { getServices, getColaborations, deleteColaborations, createColaborations } = useBackend();
  const { deleteImageFromCollaboration, uploadCollaborationImage } = useFirebase();

  const toast = useToast();
  
  const [showModal, setShowModal] = useState(false);
  
  const [colaboration, setColaboration] = useState<Colaborations[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [selectedCollab, setSelectedCollab] = useState<Colaborations | null>(null);

  const getColaboration = async () => {
    try {
      const res = await getColaborations();
      const { status, data } = res;
      if (status === 200){
        setColaboration(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleModal = () => {
    setShowModal(prevState => !prevState)
  }

  const handleUpload = async () => {    
    if (url) {
      const formattedIds = JSON.stringify(selectedServices);
      const newCollaboration: Colaborations = {
        nombre_empresa: companyName,
        id_servicios: formattedIds,
        imagen_link: url,
      }
      try {
          const res = await createColaborations(newCollaboration, userToken);
          const { status, data } = res;
          if (status === 201) {
            successToastNotification(data.message);
          }
          handleModal();
          const newCollab = {
              ...newCollaboration,
              id_collaboration: data.id,
              fecha_colaboracion: new Date()
          }
          setColaboration(prev => [...prev, newCollab]);
          removeImage();
      } catch (error) {
          errorToastNotification(error.response.data.message);
      }
    }
  };

  const handleImageUpload = () => {
    if (selectedServices.length === 0) return alert('Debes seleccionar al menos un servicio asociado a la colaboración!');
    uploadCollaborationImage(
      image,
      (progress) => setProgress(progress),
      (error) => setError(error),
      (downloadUrl) => setUrl(downloadUrl)
    );
    setImage(null);
  }

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
    setProgress(0);
    setSelectedServices([]);
  };

  const extractImageNameFromURL = (url) => {
    const decodedURL = decodeURIComponent(url);
    const parts = decodedURL.split('/');
    const fileNameWithToken = parts.pop();
    const fileName = fileNameWithToken.split('?')[0];
    return fileName;
  };

  const deleteCollaborationsImage = async (item) => {
    if (confirm('¿Quieres eliminar esta colaboración?')) {
        const imageName = extractImageNameFromURL(item.imagen_link);
        try {
          const res = await deleteColaborations(item.id_collaboration, userToken);
          const {status, data} = res;
          if (status === 200) {
            deleteImageFromCollaboration(imageName);
            setSelectedCollab(null);
            const updatedCollabs = colaboration.filter(colab => colab.id_collaboration !== item.id_collaboration);
            setColaboration(updatedCollabs);
            setColaborationsData(updatedCollabs);
            successToastNotification(data.message);
          }
        } catch (error) {
          errorToastNotification(error.response.data.message)
          console.error(error)
        }
    }
  }

  const errorToastNotification = (message: string) => {
    toast({
      title: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  const successToastNotification = (message: string) => {
    toast({
      title: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  }

  const getServicesData = async () => {
    try {
      const res = await getServices();
      const { data } = res;
      setServices(data);
      setServicesData(data);
    } catch (error) {
      console.error(error);
    }
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

  useEffect(() => {
    if (colaborationsData.length > 0) {
      setColaboration(colaborationsData);
      console.log("Colaboraciones ya obtenidas...");
    } else {
      getColaboration();
    }

    if (servicesData.length > 0) {
      setServices(servicesData);
      console.log("Servicios para las colaboraciones ya obtenidas...");
    } else {
      getServicesData();
    }
}, [])

    useEffect(() => {
      if (url && progress === 100) {
        handleUpload();
      }
    }, [url])

  return (
    <>
      <div className="flex justify-center bg-gray-100 fit w-full">
        <div className=" grid grid-cols-2 gap-20 py-10">
          {userType === "admin" && userToken && (
            <button onClick={handleModal} className="w-[100px] md:w-[300px] h-64 flex items-center justify-center rounded-lg shadow-md border hover:bg-gray-200 border-gray-300 transition duration-300 ease-in-out transform hover:scale-105">
              <div className="flex flex-col items-center justify-center space-y-4">
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ color: "#000000" }}
                  size="8x"
                />
                <h2 className="text-lg font-bold mb-2 text-center">Agregar Colaboración</h2>
              </div>
            </button>
          )}
  
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 sm:px-0 z-10">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-md">
                <h2 className="font-myriad-pro text-xl font-bold mb-4 text-center">
                  Agregar Nueva Colaboración
                </h2>
                <div className="mt-6 mb-4">
                  <input
                    id="collabName"
                    name="collabName"
                    type="text"
                    placeholder="Ingresa el nombre de la empresa"
                    className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    onChange={event => setCompanyName(event.target.value)}
                  />
                </div>
                
                {/*  */}
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
                    {/*  */}

                <div className="border-dashed border-4 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center space-y-4 mt-4">
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
                      onClick={handleImageUpload}
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
          )}
          {colaboration.map((colaboration, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={colaboration.imagen_link}
                  alt={`Logo ${index}`}
                  onClick={() => setSelectedCollab(colaboration)}
                  className="h-64 w-64 flex items-center justify-center text-white font-bold rounded-full object-cover" />
                <p className="mt-2 text-center">{colaboration.nombre_empresa}</p>
              </div>
          ))}
          {selectedCollab && (
            <ImageModal
              image={selectedCollab}
              onClose={() => setSelectedCollab(null)}
              deleteImage={deleteCollaborationsImage}
            />
          )}
        </div>
      </div>
    </>
  );
};