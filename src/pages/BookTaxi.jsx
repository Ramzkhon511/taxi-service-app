import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import { useUrlPosition } from "../hook/useUrlPosition";
import { MdMyLocation } from "react-icons/md";
import { useBookTaxi } from "../hook/booking/useBookTaxi";
import { useUser } from "../hook/useUser";
import { useDrivers } from "../hook/drivers/useDrivers";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Loader from "../utils/Loader";

const regions = [
  {
    name: "Bukhara",
    location: [39.7685, 64.455],
  },
  {
    name: "Tashkent",
    location: [41.2995, 69.2401],
  },
  {
    name: "Andijan",
    location: [40.7812, 72.3452],
  },
  {
    name: "Namangan",
    location: [41.0006, 71.6722],
  },
  {
    name: "Fergana",
    location: [40.3848, 71.7842],
  },
  {
    name: "Samarkand",
    location: [39.627, 66.9748],
  },
  {
    name: "Khiva",
    location: [41.3801, 60.359],
  },
  {
    name: "Navoi",
    location: [40.0844, 65.3798],
  },
  {
    name: "Termez",
    location: [37.2246, 67.2782],
  },
  {
    name: "Urgench",
    location: [41.5586, 60.6425],
  },
];

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const BookTaxi = () => {
  const [lat, lng] = useUrlPosition();

  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [mapPosition, setMapPosition] = useState([41.2995, 69.2401]);
  const [driversByRegion, setDriversByRegion] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { user, isLoading } = useUser();
  const { drivers, isLoading: isLoadingDrivers } = useDrivers();
  const { bookTaxi } = useBookTaxi();

  useEffect(() => {
    const fetchLocation = async (lat, lng) => {
      setIsLoadingGeocoding(true);
      const response = await fetch(
        `${BASE_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await response.json();
      const from = data.localityInfo.administrative[2].name;
      setFrom(from);
      setIsLoadingGeocoding(false);
      setIsFormOpen(true);
    };

    if (lat && lng) {
      fetchLocation(lat, lng);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (to.length > 0) {
      const driversByRegion = drivers.filter((driver) => driver.region === to);
      setDriversByRegion(driversByRegion);
    }
  }, [to]);

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      pickup_point: from,
      dropoff_point: to,
      payment_method: e.target.payment_method.value,
      amount: 100,
      location: mapPosition,
      driver_id: e.target.driver_id.value,
      status: "pending",
      user_id: user.id,
      username: user.email.split("@")[0],
      pickup_time: e.target.pickup_time.value,
    };

    try {
      const response = await bookTaxi(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMyLocation = () => {
    if (user.user_metadata.region) {
      const region = regions.find(
        (region) => region.name === user?.user_metadata?.region
      );
      setMapPosition(region.location);

      const from = user?.user_metadata?.region;
      setFrom(from);
    }
  };

  if (isLoading || isLoadingDrivers) {
    return <Loader />;
  }

  return (
    <div className="h-full w-full">
      <div className="z-0">
        <Map
          from={from}
          to={to}
          mapPosition={mapPosition}
          setMapPosition={setMapPosition}
        />
      </div>

      <div className="fixed min-w-full sm:min-w-0 rounded-2xl h-fit bottom-0 z-2 sm:z-0 sm:right-2 p-4 bg-white bg-opacity-90">
        <div className="flex items-center pb-2 justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Book a Taxi</h1>

          <button
            className="px-4 py-1 h-fit w-fit bg-yellow-300 rounded-lg"
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            {isFormOpen ? (
              <IoIosArrowUp className="text-2xl" />
            ) : (
              <IoIosArrowDown className="text-2xl" />
            )}
          </button>
        </div>
        <p className="text-sm hidden sm:flex text-gray-600">
          Book a taxi by selecting your start and end points on the map.
        </p>

        {/* from to */}
        {isLoadingGeocoding && <p>Loading...</p>}
        {isFormOpen && (
          <FormBookTaxi
            {...{
              from,
              to,
              handleToChange,
              handleSubmit,
              driversByRegion,
              handleMyLocation,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BookTaxi;

const FormBookTaxi = ({
  from,
  to,
  handleToChange,
  handleSubmit,
  driversByRegion,
  handleMyLocation,
}) => {
  const handleAmount = (serviceType) => {
    switch (serviceType) {
      case "Economy":
        return 100;
      case "Standart":
        return 180;
      case "Luxury":
        return 300;
      default:
        return 100;
    }
  };

  const [isCard, setIsCard] = useState(false);

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="flex space-x-2">
        <input
          type="text"
          name="from"
          id="from"
          value={from}
          className="p-2 border w-full border-gray-300 rounded outline-none"
          readOnly
          disabled
          required
          defaultValue={from}
        />

        <button
          type="button"
          className="p-2 bg-blue-600 w-12 flex items-center justify-center text-white rounded"
          onClick={handleMyLocation}
        >
          <MdMyLocation className="text-white text-2xl" />
        </button>
      </div>

      {/* pickup_time date */}
      <div className="flex flex-col space-y-2 mt-4">
        <input
          type="datetime-local"
          name="pickup_time"
          id="pickup_time"
          className="p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="flex flex-col space-y-2 mt-4">
        <select
          name="to"
          id="to"
          className="p-2 border border-gray-300 rounded"
          onChange={handleToChange}
          required
        >
          {regions.map((region, index) => (
            <option key={index} value={region.name}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col space-y-2 mt-4">
        <select
          name="driver_id"
          id="driver_id"
          className="p-2 border border-gray-300 rounded"
          required
          placeholder="Select driver"
        >
          {driversByRegion.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name} - {driver.car} - {driver.serviceType} -{" "}
              {handleAmount(driver.serviceType)} 000 UZS
            </option>
          ))}
          {driversByRegion.length === 0 && (
            <option value="" disabled selected>
              No drivers available
            </option>
          )}
        </select>
      </div>

      <div className="flex flex-col space-y-2 mt-4">
        {driversByRegion.length > 0 && (
          <p className="text-lg font-semibold">
            Amount: {handleAmount()} 000 UZS
          </p>
        )}
      </div>

      <div className="flex flex-col space-y-2 mt-4">
        <select
          name="payment_method"
          id="payment_method"
          className="p-2 border border-gray-300 rounded"
          required
          onChange={(e) => {
            if (e.target.value === "card") {
              setIsCard(true);
            } else {
              setIsCard(false);
            }
          }}
        >
          <option value="cash">Cash on delivery</option>
          <option value="card">Card</option>
        </select>

        {isCard && (
          <input
            type="text"
            name="card_number"
            id="card_number"
            className="p-2 border border-gray-300 rounded"
            placeholder="Card number"
            required
          />
        )}
      </div>

      {from.length > 0 && to.length > 0 && (
        <button
          className="w-full mt-4 bg-blue-600 text-white p-2 rounded"
          type="submit"
          disabled={from.length === 0 || to.length === 0}
        >
          Book Taxi
        </button>
      )}
    </form>
  );
};
