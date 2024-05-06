import { Link } from "react-router-dom"
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Navbar } from "../components/NavBar/Navbar";

export const Servicios = () => {
  return (
    <>
       <div className="flex-grow flex items-center justify-center pb-10">
          <div className=" fixed top-0 left-0 p-2">
              <Link to={'/'}>
                <span className="flex items-center justify-center rounded-full w-20 h-20">
                  <FontAwesomeIcon icon={faChevronLeft} size="2xl"/>
                </span>
              </Link>
         </div>
        {/* <div className="text-center text-6xl py-8">
            <h1 className="font-myriad-pro z-40 text-white font-extralight font-size-500 ">Contactanos</h1> 
        </div> */}
        <div className="px-64 py-1 bg-transparent z-100">
        <Navbar/>
        </div>
      </div>
      <div className="mx-auto mt-8 mb-20">
        <h1 className=" text-3xl font-bold mb-4 ml-24 font-myriad-pro text-center">Servicios</h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-24 mr-24">
            <div className="bg-white rounded-lg shadow-lg">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Image 1</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Image 2</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Image 3</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Image 4</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>            <div className="bg-white rounded-lg shadow-lg">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Image 5</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>            <div className="bg-white rounded-lg shadow-lg">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Image 6</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
