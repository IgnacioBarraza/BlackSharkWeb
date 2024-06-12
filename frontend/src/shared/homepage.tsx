import { Footer } from "../components/Footer/Footer"
import { Navbar } from "../components/NavBar/Navbar"
import '../styles/homepage.css';

export const Homepage = () => {
    return (
      <>
      <div className="flex justify-center items-center bg-transparent">
        <Navbar/>
      </div>
      <div className=" bg-[url(/cielo5.jpg)] bg-cover bg-center bg-no-repeat w-full h-screen overflow-hidden overflow-y-auto">
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col justify-center space-y-8 items-center">
              <h1 className=" text-center font-myriad-pro text-white font-bold font-size-100 block text-5xl fade-in sm:text-3xl md:text-4xl lg:text-5xl">Bienvenido a Black Shark Studios </h1>
              <p className="text-center font-myriad-pro text-white text-3xl font-medium fade-in w-1/2 sm:text-2xl md:text-2xl lg:text-3xl">Nos especializamos en potenciar la imagen de tu marca a través de nuestros servicios integrales de fotografía, diseño gráfico y marketing digital.</p>
            </div>
        </div>
      </div>
      <Footer/>
      </>
    )
  }