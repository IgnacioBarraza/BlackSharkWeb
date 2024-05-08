import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Navbar } from "../components/NavBar/Navbar";


export const Contact = () => {
  return (
    <>
    <div className="bg-white bg-cover bg-center w-full h-screen bg-no-repeat flex flex-col overflow-hidden">
      <div className="flex-grow flex items-center justify-center pb-10 ">
        <div className="w-full flex justify-center items-center py-1 bg-transparent z-100">
        <Navbar/>
        </div>
      </div>
      <div className="flex-grow-0 h-screen bg-blue-900 p-16 grid grid-cols-2 -mt-10">
          <div className="bg-blue-900 text-white text-center text-4xl py-4 rounded-lg flex justify-center items-center ">
            <div className="font-myriad-pro text-center items-center">
              <h1 className="pb-2">Contactanos</h1>
              <h2 className="pb-20">¡Trabaja con nosotros!</h2>
              <h4 className="pt-10">Si deseas más información o colaborar con nosotros, estaremos encantados de ayudarte en todo lo que necesites.</h4>
              <h4 className="pt-36 pb-2">Búscanos en redes sociales</h4>
              <div className="items center justify-center">
                  <a href="https://web.facebook.com/ElLokojara/" className="pl-6 ">
                    <FontAwesomeIcon icon={faSquareFacebook} color="#4267B2" fontSize="50px"/>
                  </a>
                  <a href="https://www.instagram.com/blackshark.studios/?hl=es-la" className="pl-6">
                    <FontAwesomeIcon icon={faInstagram} color="#F56040" fontSize="50px"/>
                  </a>
              </div>
            </div>
          </div>
          <div className="bg-blue-900 text-center text-3xl py-4 rounded-lg">
            <div className=" items-center px-5 py-12 lg:px-20">
              <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
                <div className="mt-8">
                    <form action="#" method="POST" className="space-y-6">
                      <div>
                        <div className="text-left pl-5">
                        <label className="font-light text-lg pl-0"> Nombre </label>
                        </div>
                        <div className="mt-1">
                          <input id="name" name="name" type="text" placeholder="Ingresa tu nombre" className="block w-full px-5 py-3 text-base border border-gray-300 rounded-lg  focus:outline-none focus:border-blue-500"/>
                        </div>
                        <div className="text-left pl-5">
                        <label className="font-light text-lg pl-0"> Apellido </label>
                        </div>
                        <div className="mt-1">
                          <input id="apellido" name="apellido" type="text" placeholder="Ingresa tu apellido" className="block w-full px-5 py-3 text-base border border-gray-300 rounded-lg  focus:outline-none focus:border-blue-500"/>
                        </div>
                        <div className="text-left pl-5">
                        <label className="font-light text-lg pl-0"> Correo </label>
                        </div>
                        <div className="mt-1">
                          <input id="email" name="email" type="email" placeholder="Ingresa tu correo" className="block w-full px-5 py-3 text-base border border-gray-300 rounded-lg  focus:outline-none focus:border-blue-500"/>
                        </div>
                        <div className="text-left pl-5">
                        <label className="font-light text-lg pl-0"> Mensaje </label>
                        </div>
                        <textarea className="font-normal px-12 py-6 text-xs block w-full  border border-gray-300 rounded-lg  focus:outline-none focus:border-blue-500" ></textarea>
                        <div className="pt-5">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-8 transition duration-300 ease-in-out transform hover:scale-105">Enviar</button>
                        </div>
                      </div>
                    </form>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}
