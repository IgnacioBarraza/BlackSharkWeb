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
      <div className="overflow-hidden">
        <div className=" bg-[url(/cielo5.jpg)] bg-cover bg-center bg-no-repeat w-full h-screen">
          <div className="flex justify-center items-center px-64">
            <div className="pt-60">
                <div className="w-[450px]">
                    <div className="flex items-center">
                        <img src="/BlackShark.png" alt=""/>
                        <p className=" items-center text-center font-myriad-pro text-2xl text-white font-medium font-size-100 block ">Welcome to </p>
                        <h1 className="pl-2 items-center text-center font-myriad-pro text-2xl text-white font-bold font-size-7xl block ">Black Shark Studios</h1>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }