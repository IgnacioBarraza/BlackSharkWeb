import { Link } from "react-router-dom";

export const RecoverModal = ({closeModal}) => {
  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="font-myriad-pro text-2xl leading-6 font-medium text-gray-900" id="modal-headline">
                  Correo enviado!
                </h3>
                <hr className="border-t border-gray-300 mt-2" />
                <div className="mt-2">
                  <p className="font-myriad-pro text-sm text-gray-500">
                    Se ha enviado un correo electrónico con las instrucciones para recuperar tu contraseña. Por favor, revisa tu bandeja de entrada y de spam.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:justify-center">
            <Link to={'/login'} onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}