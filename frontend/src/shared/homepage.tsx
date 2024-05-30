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
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-2 space-x-12">
            <div className="flex justify-center">
              <img className="w-128 h-128 fade-in" src="/BlackShark.png" alt="logo"/>
            </div>
            <div className="flex flex-col justify-center space-y-8">
              <h1 className=" text-center font-myriad-pro text-white font-bold font-size-100 block text-5xl fade-in">Welcome to BlackShark Studios </h1>
              <p className="text-center font-myriad-pro text-white text-2xl font-medium fade-in">En BlackShark Studios, nos especializamos en potenciar la imagen de tu marca a través de nuestros servicios integrales de fotografía, diseño gráfico y marketing digital.</p>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }