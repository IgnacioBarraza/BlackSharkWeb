import { useEffect, useState } from "react";
import { useProps } from "../hooks/useProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Colaborations} from "../utils/interfaces"
import { useBackend } from "../hooks/useBackend";
import { useToast } from "@chakra-ui/react";



export const Colaboration = () => {
  
  const { userType, userToken, servicesData, setServicesData, colaborationsData} = useProps();
  const {getServices, getColaborations, updateColaborations, deleteColaborations} = useBackend();

  const [colaboration] = useState<Colaborations[]>([]);
  
  const getColaboration = async () => {
    try {
      const res = await getColaborations()
      console.log(res)
    
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getColaboration()
  },[])

  return (
      <>
      <div>
        <p className="font-myriad-pro text-8xl font-bold">404</p>
      </div>
      </>
    )
  }