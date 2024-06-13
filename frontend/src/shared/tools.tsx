import { useState } from "react";
import { Navbar } from "../components/NavBar/Navbar";
import { ToolsItem } from "./toolscomponents/toolsItem";
import { useProps } from "../hooks/useProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { UploadToolsModal } from "./toolscomponents/uploadToolsModal";

export const Tools = () => {
    const { userType, userToken } = useProps();

    const [showInterface, setShowInterface] = useState(false);
    
    const [toolsItems, setToolsItems] = useState<{ tool: string }[]>([
        { tool: 'Nombre de la herramienta 1'},
        { tool: 'Nombre de la herramienta 2'},
        { tool: 'Nombre de la herramienta 3'},
        { tool: 'Nombre de la herramienta 4'},
        { tool: 'Nombre de la herramienta 5'},
        { tool: 'Nombre de la herramienta 6'},
        { tool: 'Nombre de la herramienta 7'},
        { tool: 'Nombre de la herramienta 8'},
        { tool: 'Nombre de la herramienta 9'},
        { tool: 'Nombre de la herramienta 10'},
        { tool: 'Nombre de la herramienta 11'},
        { tool: 'Nombre de la herramienta 12'},
    ]);
    
    const removeItem = (index: number) => {
        setToolsItems(toolsItems.filter((_, i) => i !== index));
    };

    const handleInterface = () => {
        setShowInterface(prevState => !prevState);
    };

    
    return (
        <>
            <div className="bg-white bg-cover bg-center w-full flex-grow bg-no-repeat flex flex-col">
                <div className="flex-grow flex items-center justify-center pb-10">
                    <div className="w-full flex justify-center items-center py-1 bg-transparent z-100 border-b border-gray-300">
                        <Navbar />
                    </div>
                </div>
            </div>
            <div className="bg-blue-strong-bs bg-cover bg-center bg-no-repeat w-full h-screen -mt-10 flex flex-col"> 
                <h1 className="text-white text-center text-4xl py-6">Equipos</h1>

                <div className="flex-grow flex flex-col bg-blue-strong-bs p-10 gap-4">
                    {userType === "admin" &&  userToken && (
                        <>
                            <div onClick={handleInterface} className="flex items-center justify-between bg-white rounded shadow mb-4 h-16 hover:shadow-md border hover:bg-gray-200 border-gray-300 transition duration-300 ease-in-out transform hover:scale-x-[1.03] hover:scale-y-[1.03]">
                                <div className="flex items-center">
                                <FontAwesomeIcon icon={faPlus} className="mx-4" size="3x"/>
                                <span>Añadir equipo</span>
                                </div>
                            </div>
                        </>
                    )} 
                    {showInterface && (
                        <UploadToolsModal handleInterface={handleInterface} />
                    )}
                    
                    <div>
                    {toolsItems.length > 0 ? (
                        toolsItems.map((item, index) => (
                        <ToolsItem
                            key={index}
                            tool={item.tool}
                            onRemove={() => removeItem(index)}
                        />
                        ))
                    ) : (
                        <div className="text-center text-white text-xl">No hay equipos de trabajos</div>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
};
