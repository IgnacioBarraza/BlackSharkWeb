import { useEffect } from "react"
import { Navbar } from "../components/NavBar/Navbar"
import { useUser } from "../hooks/useUser"
import '../styles/homepage.css';

export const Homepage = () => {
  const { userType, userToken, userName } = useUser()

  useEffect(() => {
    console.log(userType)
    console.log(userToken)
    console.log(userName)
  },[userType, userToken, userName])
    return (
      <>
      <div className="flex justify-center items-center bg-transparent">
        <Navbar/>
      </div>
      <div className=" bg-[url(/cielo5.jpg)] bg-cover bg-center bg-no-repeat w-full h-screen">
        <div className="flex justify-center items-center h-full ">
            <div className="flex flex-col justify-center space-y-8 items-center">
              <h1 className=" text-center font-myriad-pro text-white font-bold font-size-100 block text-7xl fade-in">Bienvenido a BlackShark Studios </h1>
              <p className="text-center font-myriad-pro text-white text-3xl font-medium fade-in w-1/2">En BlackShark Studios, nos especializamos en potenciar la imagen de tu marca a través de nuestros servicios integrales de fotografía, diseño gráfico y marketing digital.</p>
            </div>
        </div>
      </div>
      <div className="hp-background bg-cover bg-center bg-no-repeat w-full h-screen">
        <header className="bsw-background py-16">
          <h1 className="font-myriad-pro text-3xl text-center text-white font-bold">Servicios Principales</h1>
        </header>
        <div className="grid grid-cols-4 gap-2">
          <div className="flex justify-center items-center">
            <h1>Servicio 1</h1>
          </div>
          <div className="flex justify-center items-center">
            <h1>Servicio 2</h1>
          </div>
          <div className="flex justify-center items-center">
            <h1>Servicio 3</h1>
          </div>
          <div className="flex justify-center items-center">
            <h1>Servicio 4</h1>
          </div>
        </div>
      </div>
      </>
    )
  }