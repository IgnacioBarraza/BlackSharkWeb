import { Navbar } from "../components/NavBar/Navbar";

export const Gallery = () => {
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
