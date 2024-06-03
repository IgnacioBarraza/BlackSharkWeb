import { useState } from "react";
import { useFirebase } from "../../hooks/useFirebase";

export const UploadModal = ({handleModal}) => {
  const { uploadGalleryImage } = useFirebase()

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState('');
  
  const handleUpload = () => {
    uploadGalleryImage(
      image,
      (progress) => setProgress(progress),
      (error) => setError(error),
      (downloadURL) => setUrl(downloadURL)
    );
    setImage(null)
  }

  const handleImageFileUpload = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      setPreview(URL.createObjectURL(file));
    }
  }

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 sm:p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md sm:p-8">
        <h2 className="font-myriad-pro text-2xl mb-4 text-center">
          Subir nueva imagen
        </h2>
        <div className="border-dashed border-4 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center space-y-4">
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
        <div className="flex justify-center mt-4 flex-col">
          {progress !== 100 && (
            <button
              onClick={handleUpload}
              className="font-myriad-pro mt-4 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900 transition flex flex-col items-center"
            >
              Guardar
            </button>
          )}
          <button
            onClick={handleModal}
            className=" hover:text-gray-900 text-medium mt-4"
          >
            Cerrar
          </button>
        </div>
        {progress > 0 && (
          <div className="mt-4">
            <progress value={progress} max="100" className="w-full"></progress>
            {progress === 100 && (
              <p className="text-green-600 mt-2">¡Imagen subida exitosamente!</p>
            )}
            {error && <div className="text-red-600 mt-2">Error: {error.message}</div>}
          </div>
        )}
      </div>
    </div>
  );
}