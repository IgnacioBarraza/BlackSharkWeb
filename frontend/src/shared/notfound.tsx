import { Link } from "react-router-dom"

export const Notfound = () => {
  return (
    <>
    <div className="h-screen flex flex-col items-center justify-center bg-blue-50">
        <div className="flex items-center justify-center w-80 h-80 mb-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <img src="/NotFound.jpg" alt="ErrorImage" className="rounded" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="font-myriad-pro text-4xl font-bold sm:text-3xl md:text-4xl">Oops!</p>
          <p className="font-myriad-pro text-8xl font-bold sm:text-7xl md:text-8xl">404</p>
          <p className="font-myriad-pro text-2xl font-medium sm:text-2xl md:text-4xl">La página que buscas no existe</p>
          <p className="w-1/2 text-center font-myriad-pro text-2xl font-medium sm:text-3xl md:text-4xl">Es posible que haya sido movida, eliminada o que nunca haya existido.</p>
          <div className="mb-6"></div>
          <Link to={'/'} className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex items-center justify-center w-1/4 py-2.5 text-xl font-large text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <button>Volver al Inicio</button>
          </Link>
        </div>
    </div>
    </>
  )
}
