import { useEffect } from "react"
import { Navbar } from "../components/NavBar/Navbar"
import { useUser } from "../hooks/useUser"

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
          <div className="flex justify-center items-center px-64">
            <div className="grid grid-cols-2">
              <div className="flex justify-center">
                <img className="w-128 h-128" src="/BlackShark.png" alt="logo"/>
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="items-center text-center font-myriad-pro text-white font-bold font-size-100 block text-8xl">Welcome to BlackShark Studios </h1>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }