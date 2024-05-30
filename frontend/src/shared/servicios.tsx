import { useContext, useState } from "react";
import { Navbar } from "../components/NavBar/Navbar";
import { UserContext } from "../providers/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const serviciosData = [
  {
    id: 1,
    imgSrc: "/servicio1.jpg",
    title: "Servicio 1",
    description: "Descripción del servicio 1."
  },
  {
    id: 2,
    imgSrc: "/servicio1.jpg",
    title: "Servicio 2",
    description: "Descripción del servicio 2."
  },
  {
    id: 3,
    imgSrc: "/servicio1.jpg",
    title: "Servicio 3",
    description: "Descripción del servicio 3."
  },
  {
    id: 4,
    imgSrc: "/servicio1.jpg",
    title: "Servicio 4",
    description: "Descripción del servicio 4."
  },
  {
    id: 5,
    imgSrc: "/servicio1.jpg",
    title: "Servicio 5",
    description: "Descripción del servicio 5."
  },
  {
    id: 6,
    imgSrc: "/servicio1.jpg",
    title: "Servicio 6",
    description: "Descripción del servicio 6."
  },
  {
    id: 7,
    imgSrc: "/servicio1.jpg",
    title: "Servicio 7",
    description: "Descripción del servicio 7."
  },
  {
    id: 8,
    imgSrc: "/servicio1.jpg",
    title: "Servicio 8",
    description: "Descripción del servicio 8."
  },
  {
    id: 9,
    imgSrc: "/servicio1.jpg",
    title: "Servicio 9",
    description: "Descripción del servicio 9."
  },

];

export const Servicios = () => {
  const [selectedServicio, setSelectedServicio] = useState(null);

  const handleServicioClick = (servicio) => {
    setSelectedServicio(servicio);
  };

  const handleCloseModal = () => {
    setSelectedServicio(null);
  };


  const { userType, userToken } = useContext(UserContext);

  const [showInterface, setShowInterface] = useState(false);

  const handleOpenInterface = () => {
    setShowInterface(true);
  };

  const handleCloseInterface = () => {
    setShowInterface(false);
  };
  
  return (
    <>
      <div className="bg-white bg-cover bg-center w-full h-screen bg-no-repeat flex flex-col">
        <div className="flex-grow flex items-center justify-center pb-10">
          <div className="w-full flex justify-center items-center py-1 bg-transparent z-100 border-b border-gray-300">
            <Navbar />
          </div>
        </div>
        <div className="mx-auto mt-8 mb-20">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ml-4 mr-4 md:ml-24 md:mr-24">

          {userType === "admin" &&  userToken && (
            <>
                <div className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                    <button onClick={handleOpenInterface} className="w-full h-64 flex items-center justify-center rounded-lg shadow-md border hover:bg-gray-200 border-gray-300 transition duration-300 ease-in-out transform hover:scale-105">
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
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 sm:px-0">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-md">
                <h2 className="font-myriad-pro text-xl font-bold mb-4 text-center">Agregar Nuevo Servicio</h2>
                <form action="#" method="POST" className="">
                  <div>

                    <div className="mt-6">
                      <input 
                        id="name" 
                        name="name" 
                        type="text" 
                        placeholder="Ingresa el nombre del servicio" 
                        className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                    </div>

                    <div className="mt-4">
                      <input 
                        id="apellido" 
                        name="apellido" 
                        type="text" 
                        placeholder="Ingresa el precio" 
                        className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                    </div>

                    <div className="border-dashed border-4 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center space-y-4 mt-4">
                      <input type="file" className="hidden" id="image-upload" />
                      <label htmlFor="image-upload" 
                        className="font-myriad-pro cursor-pointer p-2 bg-gray-100 rounded hover:bg-gray-200 transition">
                        Arrastra la imagen aquí o haz clic para subirla
                      </label>
                    </div>
                        
                    <div className="pt-5">
                      <button className="flex items-center justify-center w-full px-[110px] py-2.5 text-xl font-large text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Guardar</button>
                    </div>
                        
                    <div className="flex justify-center mt-4">
                      <button
                        type="button"
                        onClick={handleCloseInterface}
                        className=" hover:text-gray-900 text-medium"
                      >
                        Cancelar
                      </button> 
                    </div>

                  </div>
                </form>
              </div>
            </div>
            )}

            {serviciosData.map((servicio) => (
              <div
                key={servicio.id}
                className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl cursor-pointer"
                onClick={() => handleServicioClick(servicio)}
              >
                <img
                  src={servicio.imgSrc}
                  alt={servicio.title}
                  className="w-full h-48 sm:h-64 md:h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{servicio.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedServicio && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 h-3/4 md:h-auto rounded-lg p-4 md:p-8 flex flex-col md:flex-row overflow-y-auto">
              <div className="w-full md:w-1/2 h-64 md:h-auto flex items-center justify-center">
                <div>

                </div>
                <img
                  src={selectedServicio.imgSrc}
                  alt={selectedServicio.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="md:w-1/2 p-4 md:p-8">
                <h2 className="text-2xl font-bold mb-4">{selectedServicio.title}</h2>
                <p>{selectedServicio.description}</p>
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
    </>
  );
};
