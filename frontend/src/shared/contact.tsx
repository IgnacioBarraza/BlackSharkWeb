

export const Contact = () => {
  return (
    <>
    <div className="bg-blue-900 bg-cover bg-center w-full h-screen bg-no-repeat flex flex-col">
      <div className="flex-grow">
          <div className="pt-10 items-center text-center text-5xl py-8">
              <h1 className="font-myriad-pro z-40 text-white font-bold font-size-500">Contactanos</h1> 
          </div>
      </div>
      <div className="flex-grow-0 h-screen bg-blue-900 p-16 grid grid-cols-2 gap-6">
          <div className="bg-blue-300 text-white text-center text-3xl py-4 rounded-lg flex justify-center items-center ">
            <div className="font-myriad-pro text-center items-center">
              <h1>Contacto</h1>
              <h2>Trabajemos juntos</h2>
              <h4>Aquí hay que poner alguna cosa sobre como si la persona desea información nos contacte para ayudarlo y bla bla bla</h4>
              <h4>Buscanos en redes sociales</h4>
            </div>
          </div>
          <div className="bg-blue-300 text-white text-center text-3xl py-4 rounded-lg">
            <div>
              <form className="flex flex-col items-center max-w-400px mx-auto p-20 rounded-lg">
                <span>Nombre</span>
                <input placeholder="Ingresa tu nombre"></input>
              </form>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}
