import { useEffect, useState } from "react";
import { Navbar } from "../components/NavBar/Navbar"
import { Messages } from "../utils/interfaces";
import { useBackend } from "../hooks/useBackend";
import { useProps } from "../hooks/useProps";

export const MessageContact = () => {

const {getMessages} = useBackend()   
const {messagesData, setMessagesData} = useProps();
const [messages, setMessages] = useState<Messages[]>([]);

const getMessagesData = async () => {
    if (messagesData.length > 0) {
      setMessages(messagesData);
      return console.log("Mensajes ya obtenidos..."); // Don't delete!
    }
    try {
      const res = await getMessages();
      setMessages(res.data);
      setMessagesData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMessagesData();
  }, [messagesData]);

  return (
    <>
        <div className="bg-white bg-cover bg-center bg-no-repeat w-full flex-grow flex flex-col overflow-hidden">
            <div className="flex-grow flex items-center justify-center">
              <div className="w-full flex justify-center items-center py-1 bg-transparent z-100 border-b border-gray-300">
                <Navbar/>
              </div>
            </div>
        </div>   
        <div className="bg-blue-strong-bs w-full min-h-screen  flex flex-col p-8">
            <div className="flex flex-wrap -mx-4 items-center justify-center">
                {messages.map((message) => (
                <div className="bg-white p-8 rounded-lg w-full max-w-md mx-4 mb-4">
                    <h1 className="font-myriad-pro text-2xl font-bold mb-6 text-center">Mensaje</h1>
                    <div className="mb-4">
                        <div className="font-myriad-pro block text-sm font-bold mb-2">Nombre</div>
                        <p className="font-myriad-pro text-base">{message.nombre}</p>
                    </div>
                    <div className="mb-4">
                        <div className="font-myriad-pro block text-sm font-bold mb-2">Apellido</div>
                        <p className="font-myriad-pro text-base">{message.apellido}</p>
                    </div>
                    <div className="mb-4">
                        <div className="font-myriad-pro block text-sm font-bold mb-2">Email</div>
                        <p className="font-myriad-pro text-base">{message.correo}</p>
                    </div>
                    <div className="mb-4">
                        <div className="font-myriad-pro block text-sm font-bold mb-2">Teléfono</div>
                        <p className="font-myriad-pro text-base">{message.telefono}</p>
                    </div>
                    <div className="mb-4">
                        <div className="font-myriad-pro block text-sm font-bold mb-2">Mensaje</div>
                        <p className="font-myriad-pro text-base">{message.mensaje}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </>
  )
}
