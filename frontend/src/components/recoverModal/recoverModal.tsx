import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const RecoverModal = ({closeModal}) => {
  return (
    <div className="h-auto w-[500px] bg-white p-4 rounded-xl">
      <div className="modal-header flex justify-between items-center">
        <span className="font-myriad-pro text-2xl font-extrabold">Correo enviado!</span>
        <button onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} size="xl"/>
        </button>
      </div>
      <hr className="border-t border-gray-300" />
      <div className="modal-instructions">
        <span className="font-myriad-pro ">Sigue las instrucciones que te enviamos al correo para reestablecer tu contraseña</span>
      </div>
    </div>
  )
}