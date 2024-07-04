import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../components/NavBar/Navbar";
import { faBars, faChevronDown, faChevronUp, faX } from "@fortawesome/free-solid-svg-icons";
import { useProps } from "../../hooks/useProps";
import { useEffect, useRef, useState } from "react";
import { MetricsMenu } from "./components/metricsMenu";
import { useBackend } from "../../hooks/useBackend";
import dayjs from "dayjs";
import { MetricsService, periods } from "../../utils/interfaces";


export const MetricsDashboard = () => {
  const { userToken } = useProps();
  const { getServiceMetricsByDate } = useBackend();

  const [showInterface, setShowInterface] = useState(false);
  const [metrics, setMetrics] = useState<MetricsService[]>([]);
  const [period, setPeriod] = useState('lastMonth');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleInterface = () => {
    setShowInterface((prevState) => !prevState);
  };

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowInterface(false);
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    }
  };

  useEffect(() => {
    if (showInterface) {
      document.addEventListener("mousedown", handleClickOutsideDropdown);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [showInterface]);

  const getPeriodDates = (period) => {
    const endDate = dayjs().format('YYYY-MM-DD');
    let startDate;
    switch (period) {
      case 'lastMonth':
        startDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
        break;
      case 'last3Months':
        startDate = dayjs().subtract(3, 'month').format('YYYY-MM-DD');
        break;
      case 'last6Months':
        startDate = dayjs().subtract(6, 'month').format('YYYY-MM-DD');
        break;
      case 'allTime':
        startDate = dayjs('1970-01-01').format('YYYY-MM-DD');
        break;
      default:
        startDate = endDate;
    }
    return { startDate, endDate };
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    setDropdownOpen(false);
  };

  const getMetricsByDateData = async () => {
    try {
      const { startDate, endDate } = getPeriodDates(period);
      const res = await getServiceMetricsByDate(startDate, endDate, userToken)
      const {status, data} = res;
      if (status === 200) {
        setMetrics(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const { startDate, endDate } = getPeriodDates(period);
    console.log(`Getting data for period: ${period}, startDate: ${startDate}, endDate: ${endDate}`);
    getMetricsByDateData()
  }, [period]);

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
        <div ref={dropdownRef}>
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
          {showInterface && <MetricsMenu />}
        </div>
        <div className="flex-grow flex flex-col bg-blue-strong-bs pt-2 gap-4">
          <div className="bg-gray-100 w-full h-full rounded-lg p-4">
            <div className="relative inline-block text-left mb-4">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {periods[period]}
                  <FontAwesomeIcon icon={dropdownOpen ? faChevronUp : faChevronDown} className="ml-2" />
                </button>
              </div>
              {dropdownOpen && (
                <div
                  className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1">
                    {Object.keys(periods).map((key) => (
                      <button
                        key={key}
                        className={`text-gray-700 block px-4 py-2 text-sm w-full text-left ${key === period ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                        onClick={() => handlePeriodChange(key)}
                      >
                        {periods[key]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-center">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Nombre</th>
                    <th className="py-2 px-4 border-b">Fecha de compra</th>
                    <th className="py-2 px-4 border-b">Precio</th>
                    <th className="py-2 px-4 border-b">Total compra</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((metric, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{metric.nombre}</td>
                      <td className="py-2 px-4 border-b">{metric.fecha_compra}</td>
                      <td className="py-2 px-4 border-b">{metric.precio}</td>
                      <td className="py-2 px-4 border-b">{metric.total_compra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
