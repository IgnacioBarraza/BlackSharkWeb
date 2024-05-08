import { Navbar } from "../components/NavBar/Navbar";

export const Servicios = () => {
  return (
    <>
    <div className="bg-white bg-cover bg-center w-full h-screen bg-no-repeat flex flex-col">
       <div className="flex-grow flex items-center justify-center pb-10">
        <div className="w-full flex justify-center items-center py-1 bg-transparent z-100 border-b border-gray-300">
        <Navbar/>
        </div>
      </div>
      <div className="mx-auto mt-8 mb-20">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ml-24 mr-24">
            <div className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Servicio 1</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Servicio 2</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Servicio 3</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Servicio 4</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>            
            <div className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Servicio 5</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>            
            <div className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Servicio 6</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Servicio 7</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Servicio 8</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                <img src="/servicio1.jpg" alt="servicio1" className="w-full h-64 object-cover "/>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">Servicio 9</h2>
                    <p className="text-gray-700">Descripcion del servicio</p>
                </div>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
