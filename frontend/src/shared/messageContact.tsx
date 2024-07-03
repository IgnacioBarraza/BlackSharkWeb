
export const MessageContact = () => {
  return (
    <>
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Mensajes</h1>
        <div className="mb-4">
            <div className="block text-sm font-bold mb-2">Nombre</div>
            <p className="text-base">John</p>
        </div>
        <div className="mb-4">
            <div className="block text-sm font-bold mb-2">Apellido</div>
            <p className="text-base">Doe</p>
        </div>
        <div className="mb-4">
            <div className="block text-sm font-bold mb-2">Email</div>
            <p className="text-base">john.doe@example.com</p>
        </div>
        <div className="mb-4">
            <div className="block text-sm font-bold mb-2">Teléfono</div>
            <p className="text-base">971234587</p>
        </div>
        <div className="mb-4">
            <div className="block text-sm font-bold mb-2">Mensaje</div>
            <p className="text-base">Quiero trabajar contigo</p>
        </div>
    </div>
    </>
  )
}
