import { Navbar } from "../components/NavBar/Navbar";
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import '../styles/gallery.css';
import { UploadModal } from "./galleryComponents/uploadModal";
import ImageModal from "./galleryComponents/imagemodal";
import { useUser } from "../hooks/useUser";
import { useBackend } from "../hooks/useBackend";
import { Services } from "../utils/interfaces";

const images = [
  "/image_gallery (1).jpeg",
  "/image_gallery (2).jpeg",
  "/image_gallery (3).jpeg",
  "/image_gallery (4).jpeg",
  "/image_gallery (5).jpeg",
  "/image_gallery (6).jpeg",
  "/image_gallery (7).jpeg",
  "/image_gallery (8).jpeg",
  "/image_gallery (9).jpeg",
  "/image_gallery (10).jpeg",
  "/image_gallery (11).jpeg",
  "/image_gallery (12).jpeg",
  "/image_gallery (13).jpeg",
  "/image_gallery (14).jpeg",
  "/image_gallery (15).jpeg"
];


export const Gallery = () => {

  const { userType, userToken } = useUser();
  const { getServices } = useBackend();

  const [showModal, setShowModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [services, setServices] = useState<Services[]>([]);


  const handleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const getServicesData = async () => {
    try {
      const res = await getServices();
      setServices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (services.length == 0) {
      console.log('Getting services...')
      getServicesData();
    } else {
      console.log('Services are ready to go ')
    }
  }, [services])


  return (
    <>
    <div className="bg-white bg-cover bg-center w-full h-screen bg-no-repeat flex flex-col overflow-y-auto">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full flex justify-center items-center py-1 bg-transparent z-100 border-b border-gray-300">
        <Navbar/>
        </div>
      </div>
      <div className=" p-5 md:p-10">
        <div className="columns-1 gap-5 lg:gap-8 sm:columns-2 lg:columns-3 xl:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">

          {userType === "admin" &&  userToken &&(
            <>
              <button  onClick={handleModal} className="w-full height-button-admin flex p-4 sm:p-6 md:p-8 lg:p-10 items-center justify-center bg-transparent hover:bg-gray-200 py-2 px-4 border border-gray-200 hover:border-transparent rounded transition duration-300 ease-in-out transform hover:scale-105">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <FontAwesomeIcon icon={faPlus} style={{color: "#000000",}} size="4x"/>
                  <h1 className="font-myriad-pro font-light text-xl mt-2 text-center">Agregar Nueva Imagen</h1>
                </div>
              </button>
  
            </>
          )} 
          {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt=""
                    className="rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedImage(src)}
                />
            ))}
            {selectedImage && (
                <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
            )}
            
          {showModal && (
            <UploadModal handleModal={handleModal} services={services}/>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
