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
            nombre_empresa: Colaboration[0].nombre_empresa,
            imagen_link: Colaboration[0].imagen_link,
            fecha_colaboracion: Colaboration[0].fecha_colaboracion
        }
      }
      return colaboration;
    })
    // Optimistically updating the items:
    setColaboration(updateColaboration);
    setColaborationsData(updateColaboration);

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
      <div className="flex justify-center p-4 bg-gray-100 h-[750px] w-full">
        <div className="pt-16 grid grid-cols-4 gap-12">
          {userType === "admin" && userToken && (
            <button onClick={handleModal} className="w-[100px] md:w-[300px] h-64 flex items-center justify-center rounded-lg shadow-md border hover:bg-gray-200 border-gray-300 transition duration-300 ease-in-out transform hover:scale-105">
              <div className="flex flex-col items-center justify-center space-y-4">
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ color: "#000000" }}
                  size="8x"
                />
                <h2 className="text-lg font-bold mb-2 text-center">Agregar Colaboracion</h2>
              </div>
            </button>
          )}
  
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 sm:px-0 z-10">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-md">
                {/* Contenido del modal */}
                <h2 className="font-myriad-pro text-xl font-bold mb-4 text-center">
                  Agregar Nuevo Servicio
                </h2>
                <div className="mt-6">
                  <input
                    id="serviceName"
                    name="serviceName"
                    type="text"
                    placeholder="Ingresa el nombre del servicio"
                    className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    onChange={handleUploadServiceInput}
                  />
                </div>
                <div className="mt-4">
                  <input
                    id="price"
                    name="price"
                    type="text"
                    placeholder="Ingresa el precio"
                    className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    onChange={handleUploadServiceInput}
                  />
                </div>
                <div className="border-dashed border-4 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center space-y-4 mt-4">
                  <input
                    type="file"
                    className="hidden"
                    id="image-upload"
                    onChange={handleImageFileUpload}
                  />
                  <label
                    htmlFor="image-upload"
                    className="font-myriad-pro cursor-pointer p-2 bg-gray-100 rounded hover:bg-gray-200 transition"
                  >
                    Arrastra la imagen aquí o haz clic para subirla
                  </label>
                </div>
                <div className="pt-5">
                  <button
                    onClick={handleUpload}
                    className="flex items-center justify-center w-full px-[110px] py-2.5 text-xl font-large text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Guardar
                  </button>
                </div>
                <div className="flex justify-center mt-4">
                  <div
                    onClick={handleModal}
                    className=" hover:text-gray-900 text-medium"
                    >
                    Cancelar
                  </div>
                </div>
              </div>
            </div>
          )}
            {colaboration.map(colaboration => (
              <div key={colaboration.id_collaboration} className="flex flex-col items-center">
                <img src={colaboration.imagen_link} alt={`Logo ${colaboration.id_collaboration}`} className="h-64 w-64 flex items-center justify-center text-white font-bold rounded-lg" />
                <p className="mt-2 text-center">{colaboration.nombre_empresa}</p>
                {userType === "admin" && userToken && (
                <button onClick={() => deleteCollaborationsImage(colaboration.id_collaboration)} className="mt-2 text-red-500 hover:text-red-700">Eliminar</button>
              )}
              </div>
          ))}
  
          <div className="flex flex-col items-center">
            <img src="ruta/de/tu/imagen1.jpg" alt="Logo 1" className="h-64 w-64 flex items-center justify-center text-white font-bold rounded-lg" />
            <p className="mt-2 text-center">Nombre de la Marca 1</p>
          </div>
  
          <div className="flex flex-col items-center">
            <img src="/bsw_logo_icon.png" alt="Logo 2" className="h-64 w-64 flex items-center justify-center text-white font-bold rounded-lg" />
            <p className="mt-2 text-center">pastita micky</p>
          </div>
        </div>
      </div>
    </>
  );
};