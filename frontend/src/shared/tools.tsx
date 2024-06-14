import { useEffect, useState } from "react";
import { Navbar } from "../components/NavBar/Navbar";
import { ToolsItem } from "./toolscomponents/toolsItem";
import { useProps } from "../hooks/useProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { UploadToolsModal } from "./toolscomponents/uploadToolsModal";
import { Equipment, Services } from "../utils/interfaces";
import { useBackend } from "../hooks/useBackend";
import { useToast } from "@chakra-ui/react";

export const Tools = () => {
  const { userType, userToken, servicesData, setServicesData, toolsData, setToolsData } = useProps();
  const { getServices, getEquipments, deleteEquipment } = useBackend();

  const [showInterface, setShowInterface] = useState(false);
  const [services, setServices] = useState<Services[]>([]);

  const [toolsItems, setToolsItems] = useState<Equipment[]>([]);
  const toast = useToast()

  const removeItem = async (id_tool: string) => {
    const updateItems = toolsItems.filter(tool => tool.id_equipo !== id_tool)
    try {
      const res = await deleteEquipment(id_tool, userToken);
      const {status, data} = res
      if (status === 200) {
        alert(data.message)
        setToolsItems(updateItems);
        setToolsData(updateItems);
      }
    } catch (error) {
      console.error("Error deleting equipment:", error);
    }
  };

  const handleInterface = () => {
    setShowInterface((prevState) => !prevState);
  };

  const addTool = (newTool) => {
    setToolsItems((prevTool) => {
      const updatedTools = prevTool ? [...prevTool, newTool] : [newTool];
      setToolsData(updatedTools); // Set the new state directly
      return updatedTools;
    });
  }

  const getEquipmentsData = async () => {
	if (toolsData.length > 0) {
		setToolsItems(toolsData);
		return console.log("Equipos ya obtenidos..."); // Don't delete!
	}
	try {
		const res = await getEquipments()
		const {status, data} = res
		if (status === 200) {
			setToolsItems(data)
			setToolsData(data)
		}
	} catch (error) {
		console.error(error)
	}
  }

  const getServicesData = async () => {
    if (servicesData.length > 0) {
      setServices(servicesData);
      return console.log("Servicios ya obtenidos..."); // Don't delete!
    }
    try {
      const res = await getServices();
      setServices(res.data);
      setServicesData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toastNotification = (message: string) => {
    toast({
      title: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  useEffect(() => {
	getServicesData()
	getEquipmentsData()
  }, []);

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
          {userType === "admin" && userToken && (
            <>
              <div
                onClick={handleInterface}
                className="flex items-center justify-between bg-white rounded shadow mb-4 h-16 hover:shadow-md border hover:bg-gray-200 border-gray-300 transition duration-300 ease-in-out transform hover:scale-x-[1.03] hover:scale-y-[1.03]"
              >
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faPlus} className="mx-4" size="3x" />
                  <span>Añadir equipo</span>
                </div>
              </div>
            </>
          )}
          {showInterface && (
            <UploadToolsModal handleInterface={handleInterface} services={services} addTool={addTool} showToast={toastNotification}/>
          )}

          <div>
            {toolsItems.length > 0 ? (
              toolsItems.map((item, index) => (
                <ToolsItem
                  key={index}
                  tool={item}
                  onRemove={() => removeItem(item.id_equipo)}
                />
              ))
            ) : (
              <div className="text-center text-white text-xl">
                No hay equipos de trabajos
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
