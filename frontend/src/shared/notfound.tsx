import { Navbar } from "../components/NavBar/Navbar";

export const Notfound = () => {
  return (
    <>
    <div className="bg-white bg-cover bg-center w-full h-screen bg-no-repeat">
      <Navbar/>
      <div>
        <div className="w-28 h-28">
          <img src="/NotFound.jpg" alt="ErrorImage" />
        </div>
        <h1>404</h1>
        <p>Error 404 - Page Not Found</p>
        <p>La página solicitada no se pudo encontrar</p>
      </div>
    </div>
    </>
  )
}
