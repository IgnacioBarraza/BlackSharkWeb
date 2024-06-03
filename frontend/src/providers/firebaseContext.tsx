import { createContext } from "react"
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useUser } from "../hooks/useUser";

type FirebaseContextType = {
  uploadGalleryImage: (image, onProgress, onError, onComplete) => void
}

export const FirebaseContext = createContext<FirebaseContextType>({
  uploadGalleryImage: () => {}
})

export const FirebaseProvider = ({ children }) => {
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
      alert('No image uploaded');
    }
  };
  return (
    <FirebaseContext.Provider value={{ uploadGalleryImage }}>{children}</FirebaseContext.Provider>
  )
}