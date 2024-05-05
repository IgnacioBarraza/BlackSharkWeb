import { Link } from "react-router-dom"
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Navbar } from "../components/NavBar/Navbar";

export const Servicios = () => {
  return (
    <>
       <div className="flex-grow flex items-center justify-center pb-10">
          <div className=" fixed top-0 left-0 p-2">
              <Link to={'/'}>
                <span className="flex items-center justify-center rounded-full w-20 h-20">
                  <FontAwesomeIcon icon={faChevronLeft} size="2xl"/>
                </span>
              </Link>
         </div>
        {/* <div className="text-center text-6xl py-8">
            <h1 className="font-myriad-pro z-40 text-white font-extralight font-size-500 ">Contactanos</h1> 
        </div> */}
        <div className="px-64 py-1 bg-transparent z-100">
        <Navbar/>
        </div>
      </div>
      <div>Hola</div>
    </>
  )
}
