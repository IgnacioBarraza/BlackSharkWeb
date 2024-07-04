import { useState } from "react";
import { Navbar } from "../components/NavBar/Navbar"
import { Messages } from "../utils/interfaces";

export const MessageContact = () => {

const [messages, setMessages] = useState<Messages[]>([]);  

  return (
    <>
        <div className="bg-white bg-cover bg-center w-full flex-grow bg-no-repeat flex flex-col">
            <div className="flex-grow flex items-center justify-center">
            <div className="w-full flex justify-center items-center py-1 bg-transparent z-100 border-b border-gray-300">
                <Navbar/>
            </div>
            </div>
        </div>   
        <div className="bg-blue-strong-bs bg-cover bg-center w-full h-screen bg-no-repeat flex flex-col overflow-hidden overflow-y-automx-auto p-8 ">
            <div className="flex flex-wrap -mx-4 items-center justify-center">
                <div className="bg-white p-8 rounded-lg w-full max-w-md mx-4 mb-4">
                    <h1 className="font-myriad-pro text-2xl font-bold mb-6 text-center">Mensaje</h1>
                    <div className="mb-4">
                        <div className="font-myriad-pro block text-sm font-bold mb-2">Nombre</div>
                        <p className="font-myriad-pro text-base">John</p>
                    </div>
                    <div className="mb-4">
                        <div className="font-myriad-pro block text-sm font-bold mb-2">Apellido</div>
                        <p className="font-myriad-pro text-base">Doe</p>
                    </div>
                    <div className="mb-4">
                        <div className="font-myriad-pro block text-sm font-bold mb-2">Email</div>
                        <p className="font-myriad-pro text-base">john.doe@example.com</p>
                    </div>
                    <div className="mb-4">
                        <div className="font-myriad-pro block text-sm font-bold mb-2">Teléfono</div>
                        <p className="font-myriad-pro text-base">971234587</p>
                    </div>
                    <div className="mb-4">
                        <div className="font-myriad-pro block text-sm font-bold mb-2">Mensaje</div>
                        <p className="font-myriad-pro text-base">Quiero trabajar contigo</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
