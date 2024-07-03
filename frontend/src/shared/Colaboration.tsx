import { useEffect, useState } from "react";
import { useProps } from "../hooks/useProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Colaborations, CreateColaborations, Services, UpdateColaborations} from "../utils/interfaces"
import { useBackend } from "../hooks/useBackend";
import { useToast } from "@chakra-ui/react";
import { useFirebase } from "../hooks/useFirebase";



export const Colaboration = () => {
  
  const { userType, userToken, servicesData, setServicesData, colaborationsData, setColaborationsData} = useProps();
  const {getServices, getColaborations, updateColaborations, deleteColaborations, createColaborations} = useBackend();
  const { deleteImageFromCollaboration, uploadCollaborationImage } = useFirebase()
  const [colaboration, setColaboration] = useState<Colaborations[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const toast = useToast()
  
  const [showModal, setShowModal] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");


  const getColaboration = async () => {
    
    if(colaborationsData.length > 0){
      setColaboration(colaborationsData);
      return console.log("La colaboracion ya fue obtenida...")
    }
    try {
      const res = await getColaborations()
      const { status, data } = res;
      if(status === 200){
        setColaboration(data)
        setColaborationsData(data)
      }

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getColaboration()
  },[])


const handleModal = () => {
  setShowModal(prevState => !prevState)
}
const handleUpload = () => {
  if (colaboration[0].fecha_colaboracion === '') return errorToastNotification("Debe ingresar una fecha para la colaboracion");
  if (colaboration[0].imagen_link === '') return errorToastNotification("Debe ingresar una imagen para la colaboracion");
  if (colaboration[0].id_servicios === '') return errorToastNotification("Debe ingresar un servicio ejercido en la colaboracion");
  if (colaboration[0].nombre_empresa === '') return errorToastNotification("Debe ingresar el nombre de la empresa a la que se realizo la colaboracion");
  uploadCollaborationImage(
    image,
    (progress) => setProgress(progress),
    (error) => setError(error),
    (downloadURL) => setUrl(downloadURL)
  );
  setImage(null);
};

const handleImageFileUpload = (e) => {
  if (e.target.files[0]) {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }
};
const removeImage = () => {
  setImage(null);
  setPreview(null);
};
const handleUploadServiceInput = ({ target: { name, value } }) => {
  setColaboration({...colaboration, [name]: value})
}
  const extractImageNameFromURL = (url) => {
    const decodedURL = decodeURIComponent(url);
    const parts = decodedURL.split('/');
    const fileNameWithToken = parts.pop();
    const fileName = fileNameWithToken.split('?')[0];
    return fileName;
  };

  const handleAddColaboration = (newCollaboration) => {
    setColaboration((prevColaboration) => {
      const updatedColaboration = prevColaboration ? [...prevColaboration, newCollaboration] : [newCollaboration];
      setColaborationsData(updatedColaboration); // Set the new state directly
      return updatedColaboration;
    });
  };
  const uploadCollaboration = async () => {
    const newCollaboration: CreateColaborations = {
      nombre_empresa: colaboration[0].nombre_empresa,
      fecha_colaboracion: colaboration[0].fecha_colaboracion,
      id_servicios: colaboration[0].id_servicios,
      imagen_link: url
    }
    try {
      const res = await createColaborations(newCollaboration, userToken)
      const { status, data } = res
      if (status === 201) {
        successToastNotification(data.message)
        const transformedColaboration = {
          ...newCollaboration,
          id_servicios: data.id // Add id_servicios to the services
        };
        handleAddColaboration(transformedColaboration);
      }
    } catch (error) {
      console.error(error)
      errorToastNotification(error.response.data.message)
    }
  }
  const deleteCollaborationsImage = async (id_collaboration) => {

    const collaborationToDelete = colaboration.filter(colaboration =>colaboration.id_collaboration === id_collaboration)
    const imagename = extractImageNameFromURL(collaborationToDelete[0].id_collaboration)
    try{
      const res =await deleteColaborations(id_collaboration, userToken)
      const {status, data} = res
      if(status === 200){
        deleteImageFromCollaboration(imagename)
        const updateColaborations = colaboration.filter(colaboration => colaboration.id_collaboration !== id_collaboration)
        setColaboration(updateColaborations);
        setColaborationsData(updateColaborations);
        successToastNotification(data.message)

      }
    } catch(error){
      errorToastNotification(error.response.data.message)
      console.error(error)
    }

  };
  const successToastNotification = (message: string) => {
    toast({
      title: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const errorToastNotification = (message: string) => {
    toast({
      title: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }
  const UpdateColaborations = async (id_collaboration: string, updatedColaborations: UpdateColaborations) => {
    const originalColaborations = [...colaborationsData]
    const updateColaboration = colaborationsData.map(colaboration => {
      if (colaboration.id_collaboration === id_collaboration) {
        return {
            ...colaboration,
            nombre_empresa: updatedColaborations.nombre_empresa,
            imagen_link: updatedColaborations.imagen_link,
            fecha_colaboracion: updatedColaborations.fecha_colaboracion
        }
      }
      return Colaboration;
    })
    // Optimistically updating the items:
    //setColaboration(updateColaboration);
    //setColaborationsData(updateColaboration);

    try {
      const res = await updateColaborations(id_collaboration, userToken, updatedColaborations);
      const { status, data } = res;
      if (status === 200) {
        successToastNotification(data.message);
      }
      return true
    } catch (error) {
        errorToastNotification(error.response.data.message);
        console.log('There was an error updating the tool: ', error);

        // If theres an error, go back to the previous data:
        setColaboration(originalColaborations)
        setColaborationsData(originalColaborations)
        return false
    }
  }

  return (
      <>
      <div>
        <p className="font-myriad-pro text-8xl font-bold">404</p>
      </div>
      </>
    );
}