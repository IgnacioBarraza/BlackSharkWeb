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
      <header className="w-full flex justify-center items-center py-1 bg-transparent z-100">
        <Navbar/>
      </header>
      <div className="overflow-hidden">
      <div className=" bg-[url(/cielo5.jpg)] bg-cover bg-center bg-no-repeat w-[1920px] h-[840px]">
        <div className="flex justify-center items-center px-64">
          <div className="pt-60">
              <div className="w-[450px]">
                  <div className="flex items-center">
                      <p className=" items-center text-center font-myriad-pro text-2xl z-40 text-white font-medium font-size-100 block ">Welcome to </p>
                      <h1 className="pl-2 items-center text-center font-myriad-pro text-2xl z-40 text-white font-bold font-size-7xl block ">Black Shark Studios</h1>
                  </div>
              </div>
          </div>
        </div>
      </div>
      </div>
      </>
    )
  }