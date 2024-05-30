import { Navbar } from "../components/NavBar/Navbar";
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UserContext } from "../providers/userContext";
import { useContext, useState } from "react";
import '../styles/gallery.css';

export const Gallery = () => {

  const { userType, userToken } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
    <div className="bg-white bg-cover bg-center w-full h-screen bg-no-repeat flex flex-col overflow-y-auto">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full flex justify-center items-center py-1 bg-transparent z-100 border-b border-gray-300">
        <Navbar/>
        </div>
      </div>
      <div className=" p-5 md:p-10">
        <div className="columns-1 gap-5 lg:gap-8 sm:columns-2 lg:columns-3 xl:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">

          {userType === "admin" &&  userToken &&(
            <>
              <button  onClick={handleModal} className="w-full height-button-admin flex p-4 sm:p-6 md:p-8 lg:p-10 items-center justify-center bg-transparent hover:bg-gray-200 py-2 px-4 border border-gray-200 hover:border-transparent rounded transition duration-300 ease-in-out transform hover:scale-105">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <FontAwesomeIcon icon={faPlus} style={{color: "#000000",}} size="4x"/>
                  <h1 className="font-myriad-pro font-light text-xl mt-2 text-center">Agregar Nueva Imagen</h1>
                </div>
              </button>
  
            </>
          )} 

          <img src="/paisaje1.jpg" alt="" className="rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"/>
          <img src="/paisaje1.jpg" alt="" className="rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"/>
          <img src="/paisaje1.jpg" alt="" className="rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"/>
          <img src="/paisaje1.jpg" alt="" className="rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"/>
          <img src="/paisaje1.jpg" alt="" className="rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"/>
          <img src="/paisaje1.jpg" alt="" className="rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"/>
          <img src="/paisaje1.jpg" alt="" className="rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"/>
          <img src="/paisaje1.jpg" alt="" className="rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"/>
          <img src="/paisaje1.jpg" alt="" className="rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"/>
          <img src="/paisaje1.jpg" alt="" className="rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"/>
          <img src="/paisaje1.jpg" alt="" className="rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"/>
          <img src="/paisaje1.jpg" alt="" className="rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"/>

          {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 sm:p-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md sm:p-8">
              <h2 className="font-myriad-pro text-2xl mb-4 text-center">Subir nueva imagen</h2>
              <div className="border-dashed border-4 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center space-y-4">
                <input type="file" className="hidden" id="image-upload" />
                <label htmlFor="image-upload"
                className="font-myriad-pro cursor-pointer p-2 bg-gray-100 rounded hover:bg-gray-200 transition ">
                  Arrastra la imagen aquí o haz clic para subirla
                </label>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleModal}
                  className="font-myriad-pro mt-4 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900 transition flex flex-col items-center"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
    </>
  )
}
