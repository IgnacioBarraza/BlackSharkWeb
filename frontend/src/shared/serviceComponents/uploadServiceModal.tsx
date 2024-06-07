import { useEffect, useState } from "react";
import { useFirebase } from "../../hooks/useFirebase";
import { useBackend } from "../../hooks/useBackend";
import { NewService } from "../../utils/interfaces";
import { useUser } from "../../hooks/useUser";

export const UploadServiceModal = ({ handleInterface, refreshServices }) => {
  const { uploadServiceImage } = useFirebase();
  const { createService } = useBackend();
  const { userToken } = useUser();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");
  const [service, setService] = useState({
    serviceName: '',
    price: 0,
    description: '',
  })

  const handleUpload = () => {
    if (service.serviceName === '') return alert("Debe ingresar un nombre para el servicio");
    if (service.price === 0) return alert("Debe ingresar un precio para el servicio");
    if (service.description === '') return alert("Debe ingresar una descripción para el servicio");
    uploadServiceImage(
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
    setService({...service, [name]: value})
  }

  const uploadService = async () => {
    const newService: NewService = {
      nombre: service.serviceName,
      precio: Number(service.price),
      descripcion: service.description,
      imagen: url
    }
    try {
      const res = await createService(newService, userToken)
      console.log(res)
      const { status, data } = res
      if (status === 201) {
        alert(data.message)
        refreshServices();
        handleInterface();
      }
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }
  }

  useEffect(() => {
    if (url && progress === 100) {
      uploadService();
    }
  }, [progress, url]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 sm:px-0">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-md">
        <h2 className="font-myriad-pro text-xl font-bold mb-4 text-center">
          Agregar Nuevo Servicio
        </h2>
        <div>
          <div>
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

            <div className="mt-4">
              <textarea
                className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                placeholder="Ingrese el descripción"
                name="description"
                onChange={handleUploadServiceInput}
              />
            </div>

            <div className="border-dashed border-4 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center space-y-4 mt-4">
              {!preview ? (
                <>
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
                </>
              ) : (
                <div className="relative">
                  <img src={preview} alt="Preview" className="w-full h-auto" />
                  {progress !== 100 && (
                    <button
                      onClick={removeImage}
                      className="absolute top-0 right-0 mt-2 mr-2 bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="pt-5">
              {progress !== 100 && (
                <button
                  onClick={handleUpload}
                  className="flex items-center justify-center w-full px-[110px] py-2.5 text-xl font-large text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Guardar
                </button>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <div
                onClick={handleInterface}
                className=" hover:text-gray-900 text-medium"
              >
                Cancelar
              </div>
            </div>
            {progress > 0 && (
              <div className="mt-4">
                <progress
                  value={progress}
                  max="100"
                  className="w-full"
                ></progress>
                {progress === 100 && (
                  <p className="text-green-600 mt-2">
                    ¡Imagen subida exitosamente!
                  </p>
                )}
                {error && (
                  <div className="text-red-600 mt-2">
                    Error: {error.message}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
