import { useEffect, useState } from "react";
import { Navbar } from "../components/NavBar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../hooks/useUser";
import { UploadServiceModal } from "./serviceComponents/uploadServiceModal";
import { useBackend } from "../hooks/useBackend";
import { Services } from "../utils/interfaces";
import { Footer } from "../components/Footer/Footer";

export const Servicios = () => {
  const { userType, userToken, setServicesData, servicesData } = useUser();
  const { getServices } = useBackend()

  const [showInterface, setShowInterface] = useState(false);
  const [selectedServicio, setSelectedServicio] = useState<Services>(null);
  const [services, setServices] = useState<Services[]>([]);

  const handleInterface = () => {
    setShowInterface(prevState => !prevState);
  };

  const handleServicioClick = (servicio) => {
    setSelectedServicio(servicio);
  };

  const handleCloseModal = () => {
    setSelectedServicio(null);
  };

  const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal-container')) {
      handleCloseModal();
    }
  };
  const getServicesData = async () => {
    try {
      const res = await getServices();
      setServices(res.data);
      setServicesData(res.data);
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    if (servicesData.length > 0) {
      setServices(servicesData);
      return console.log("Servicios ya obtenidos...");
    }
    getServicesData();
  }, [])
  
  return (
    <>
      <div className="bg-white bg-cover bg-center w-full h-screen bg-no-repeat flex flex-col">
        <Navbar />
        <div className="mx-auto mt-8 mb-20">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ml-4 mr-4 md:ml-24 md:mr-24">

          {userType === "admin" &&  userToken && (
            <>
                <div className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                    <button onClick={handleInterface} className="w-full h-64 flex items-center justify-center rounded-lg shadow-md border hover:bg-gray-200 border-gray-300 transition duration-300 ease-in-out transform hover:scale-105">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <FontAwesomeIcon icon={faPlus} style={{color: "#000000",}} size="8x"/>
                        </div>
                    </button>
                    <div className="p-4 flex-grow flex items-center justify-center">
                        <h2 className="text-lg font-bold mb-2 text-center">Agregar Servicio</h2>
                    </div>
                </div>
            </>
            )} 

            {showInterface && (
              <UploadServiceModal handleInterface={handleInterface} refreshServices={getServicesData}/>
            )}

            {services.map((servicio) => (
              <div
                key={servicio.id_servicios}
                className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl cursor-pointer"
                onClick={() => handleServicioClick(servicio)}
              >
                <img
                  src={servicio.imagen_link}
                  alt={servicio.nombre}
                  className="w-full h-48 sm:h-64 md:h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{servicio.nombre}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedServicio && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-container" onClick={handleClickOutside}>
            <div className=" bg-white w-11/12 md:w-3/4 lg:w-2/3 h-3/4 md:h-auto rounded-lg p-4 md:p-8 flex flex-col md:flex-row overflow-y-auto" >
              <div className="w-full md:w-1/2 h-64 md:h-auto flex items-center justify-center">
                <img
                  src={selectedServicio.imagen_link}
                  alt={selectedServicio.nombre}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="md:w-1/2 p-4 md:p-8 ">
                <h2 className="text-2xl font-bold mb-4">{selectedServicio.nombre}</h2>
                <p>{selectedServicio.descripcion}</p>
                <p>{selectedServicio.precio}</p>
                <button
                  className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleCloseModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};
