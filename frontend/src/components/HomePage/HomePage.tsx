//import BlackShark from './components/Images/BlackShark.png';
import { Navbar } from "../NavBar/Navbar"

export const Homepage = () => {
    return (
      <>
      <div className=" bg-[url(../../../public/cielo5.jpg)] bg-cover bg-center w-full h-screen bg-no-repeat">
      <header className="px-64 py-1 bg-transparent z-100">
        <Navbar/>
      </header>
        <div className="flex justify-center items-center px-64">
          <div className="pt-60">
              <div className="w-[450px]">
                  <div className="flex items-center">
                      <p className=" items-center text-center font-myriad-pro text-2xl z-40 text-white font-medium font-size-100 block ">Welcome to </p>
                      <h1 className=" items-center text-center font-myriad-pro text-2xl z-40 text-white font-bold font-size-7xl block ">Black Shark Studios</h1>
                  </div>
              </div>
          </div>
        </div>
      </div>
      </>
    )
  }