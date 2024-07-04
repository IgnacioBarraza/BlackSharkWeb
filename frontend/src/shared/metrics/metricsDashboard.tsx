import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../components/NavBar/Navbar";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { useProps } from "../../hooks/useProps";
import { useState } from "react";
import { MetricsMenu } from "./components/metricsMenu";

export const MetricsDashboard = () => {
  const { userToken } = useProps();
  const [showInterface, setShowInterface] = useState(false);

  const handleInterface = () => {
    setShowInterface((prevState) => !prevState);
  }
  return (
    <>
      <div className="bg-white bg-cover bg-center w-full flex-grow bg-no-repeat flex flex-col">
        <div className="flex-grow flex items-center justify-center pb-10">
          <div className="w-full flex justify-center items-center py-1 bg-transparent z-100 border-b border-gray-300">
            <Navbar />
          </div>
        </div>
      </div>
      <div className="bg-blue-strong-bs bg-cover bg-center bg-no-repeat w-full h-screen -mt-10 flex flex-col p-2">
        <div className="bg-gray-100 rounded-lg h-12 flex items-center justify-between px-4">
          {showInterface ? (
            <>
              <button onClick={handleInterface}>
                <FontAwesomeIcon icon={faX} size="2xl" />
              </button>
            </>
          ) : (
            <>
              <button onClick={handleInterface}>
                <FontAwesomeIcon icon={faBars} size="2xl" />
              </button>
            </>
          )}
          <h1 className="text-center text-4xl text-black font-semibold mx-auto">
            Metricas
          </h1>
          <div className="w-12"></div>
        </div>
        {showInterface && (
          <MetricsMenu />
        )}
        <div className="flex-grow flex flex-col bg-blue-strong-bs pt-2 gap-4">
          <div className="bg-gray-100 w-full h-full rounded-lg"></div>
        </div>
      </div>
    </>
  );
};
