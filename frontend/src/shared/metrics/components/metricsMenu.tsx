import { faMoneyBillTrendUp, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MetricsMenu = () => {
  return (
    <div className="absolute top-48 left-2 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
      <div className="py-1" role="none">
        <a
          href="#service-metrics"
          className="px-4 py-2 hover:bg-gray-100 flex items-center"
          id="menu-item-0"
        >
          <FontAwesomeIcon icon={faMoneyBillTrendUp} size="2xl"/>
          <span className="text-xl font-myriad-pro font-semibold pl-6">Servicios más vendidos</span>
        </a>
        <a
          href="#"
          className="px-4 py-2 hover:bg-gray-100 flex items-center"
          id="menu-item-1"
        >
          <FontAwesomeIcon icon={faUserPlus} size="2xl"/>
          <span className="text-xl font-myriad-pro font-semibold pl-4">Usuarios registrados</span>
        </a>
      </div>
    </div>
  );
};
