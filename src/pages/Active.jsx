import React, { useState } from "react";
import { useActiveBooking } from "../hook/booking/useActiveBooking";
import { MapContainer, TileLayer } from "react-leaflet";
import RoutineMachine from "../components/RoutingMachine";
import { useUpdateBooking } from "../hook/booking/useUpdateBooking";

import Image01 from "../../public/taxis/comfort.png";
import Image02 from "../../public/taxis/standart.png";
import Image03 from "../../public/taxis/luxury.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
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
];

const Active = () => {
  const { activeBooking: booking, isLoading } = useActiveBooking();
  const { updateBooking } = useUpdateBooking();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  const handleCancelBooking = () => {
    updateBooking({
      bookingId: booking.id,
      status: "cancelled",
    });
  };

  const handleCompleteBooking = () => {
    updateBooking({
      bookingId: booking.id,
      status: "completed",
    });

    navigate("/history");
  };

  const imgByServiceType = (serviceType) => {
    switch (serviceType) {
      case "Economy":
        return Image01;
      case "Standart":
        return Image02;
      case "Luxury":
        return Image03;
      default:
        return Image01;
    }
  };

  const priceByServiceType = (serviceType) => {
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

  return (
    <div className="h-full w-full">
      <div className="border h-full flex flex-col justify-between w-full">
        {/* From To */}
        {/* Map */}
        <div className="h-full w-full z-0">
          <MapContainer
            doubleClickZoom={false}
            id="mapId"
            zoom={14}
            center={booking?.location}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}" />

            <RoutineMachine
              from={booking?.location}
              to={
                regions.find((region) => region.name === booking?.dropoff_point)
                  .location
              }
            />
          </MapContainer>
        </div>
        {/* Status and button */}
        <div className="bg-white fixed bottom-0 right-0 sm:w-2/5 w-full rounded-t-2xl border-t flex flex-col space-y-5 p-4">
          <div className="flex justify-between">
            <div>
              <span className="text-sm font-normal text-gray-400">
                Booking Details
              </span>
              <h1 className="text-xl font-semibold text-gray-800">
                {booking?.pickup_point} to {booking?.dropoff_point}
              </h1>
            </div>
            <button
              className="px-4 py-1 h-fit w-fit bg-slate-100 rounded-lg"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              {isFormOpen ? (
                <IoIosArrowUp className="text-2xl" />
              ) : (
                <IoIosArrowDown className="text-2xl" />
              )}
            </button>
          </div>

          {isFormOpen && (
            <>
              <div className="flex border h-fit pr-4 rounded-lg bg-slate-50 justify-between">
                <div className="flex items-center w-full">
                  <div className="flex flex-col items-center">
                    <img
                      src={imgByServiceType(booking.driver.serviceType)}
                      alt="driver"
                      className="w-fit h-20 rounded-full"
                    />
                    <p className="text-sm font-semibold">
                      {booking.driver.car}
                    </p>
                  </div>
                  <div className="ml-auto flex flex-col gap-1">
                    <p className="text-lg font-semibold">
                      {booking.driver.name}
                    </p>
                    <p className="text-lg font-light">
                      {booking.driver.serviceType}
                    </p>
                    <p className="text-lg font-normal">
                      <span className="text-lg font-semibold">
                        {priceByServiceType(booking.driver.serviceType)} 000
                      </span>
                      <span className="text-sm"> UZS</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Pickup Time</span>
                  <span className="text-lg font-semibold">
                    {booking.pickup_time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Method</span>
                  <span className="text-lg font-semibold">
                    {booking.payment_method}
                  </span>
                </div>
              </div>

              {booking?.status === "pending" && (
                <div className="flex flex-col gap-4">
                  <button
                    className="py-4 sm:text-lg rounded-xl w-full bg-yellow-300 text-black text-xl font-semibold"
                    onClick={handleCompleteBooking}
                  >
                    Complete Trip
                  </button>
                  <button
                    className="py-4 sm:text-lg rounded-xl w-full bg-slate-300 text-black text-xl font-semibold"
                    onClick={handleCancelBooking}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Active;
