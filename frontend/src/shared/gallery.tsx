import { Navbar } from "../components/NavBar/Navbar";
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UserContext } from "../providers/userContext";
import { useContext } from "react";
import '../styles/gallery.css';

export const Gallery = () => {

  const { userType, userToken } = useContext(UserContext);

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
              <button className="w-full height flex items-center justify-center rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105">
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
        </div>
      </div>
    </div>
    </>
  )
}
