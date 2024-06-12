import { ReactNode, createContext } from "react"
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useUser } from "../hooks/useUser";

type FirebaseContextType = {
  uploadGalleryImage: (image, onProgress, onError, onComplete) => void;
  uploadServiceImage: (image, onProgress, onError, onComplete) => void;
  deleteImageFromServices: (image_name: string) => Promise<void>;
  deleteImageFromGallery: (image_name:string) => Promise<void>
}

type FirebaseProviderProps = {
  children: ReactNode;
};

export const FirebaseContext = createContext<FirebaseContextType>({
  uploadGalleryImage: () => {},
  uploadServiceImage: () => {},
  deleteImageFromServices: async () => {},
  deleteImageFromGallery: async () => {}
})

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const { userToken, userType} = useUser()

  const uploadGalleryImage = (image, onProgress, onError, onComplete) => {
    if (image) {

      if (!userToken && userType === 'admin') return alert('Permisos insuficientes para subir imagenes.')

      const storageRef = ref(storage, `gallery/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          if (onError) onError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (onComplete) onComplete(downloadURL);
          });
        }
      );
    } else {
      alert('Debe cargar una imagen para continuar...');
    }
  };

  const uploadServiceImage = (image, onProgress, onError, onComplete) => {
    if (image) {
      if (!userToken && userType === 'admin') return alert('Permisos insuficientes para subir imagenes.')

      const storageRef = ref(storage, `service/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          if (onError) onError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (onComplete) onComplete(downloadURL);
          });
        }
      );
    } else {
      alert('Debe cargar una imagen para continuar...');
    }
  }

  const deleteImageFromServices = async (image_name: string): Promise<void> => {
    const imageRef = ref(storage, `service/${image_name}`)
    await deleteObject(imageRef)
  }

  const deleteImageFromGallery = async (image_name: string): Promise<void> => {
    const imageRef = ref(storage, `gallery/${image_name}`)
    await deleteObject(imageRef)
  }
  return (
    <FirebaseContext.Provider value={{ uploadGalleryImage, uploadServiceImage, deleteImageFromServices, deleteImageFromGallery }}>{children}</FirebaseContext.Provider>
  )
}