import React, { useState } from "react";
import { useBooking } from "../hook/booking/useBookings";
import { NavLink } from "react-router-dom";

import Image01 from "../../public/taxis/comfort.png";
import Image02 from "../../public/taxis/standart.png";
import Image03 from "../../public/taxis/luxury.png";
import { useUpdateDriver } from "../hook/drivers/useUpdateDriver";
import Loader from "../utils/Loader";

const History = () => {
  const { isLoading, bookingHistory } = useBooking();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { updateDriver } = useUpdateDriver();

  if (isLoading) {
    return <Loader />;
  }

  const handleReview = (e) => {
    e.preventDefault();
    let review = e.target.review.value;
    let driverId = e.target.driverId.value;
    let bookingId = e.target.bookingId.value;

    const reviewData = {
      review,
      driverId,
      bookingId,
    };

    let driverReview = bookingHistory.find((booking) => booking.id == bookingId)
      .driver.review;

    updateDriver({
      driverId: driverId,
      review: [...driverReview, reviewData],
    });
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
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            History
          </h2>
        </header>

        {/* card */}
        <div className="flex flex-col p-3 gap-2">
          {bookingHistory.map((booking) => {
            return (
              <div className="h-fit w-full rounded-xl border">
                <div className="flex flex-col gap-4 justify-between p-2">
                  <NavLink
                    to={`/active/${booking.id}`}
                    key={booking.id}
                    className="hover:bg-gray-100"
                  >
                    <div className="flex items-center w-full">
                      <div className="flex flex-col items-center">
                        <img
                          src={imgByServiceType(booking.driver.serviceType)}
                          alt="driver"
                          className="w-fit h-20 rounded-full"
                        />
                        <p className="text-sm font-semibold">Toyota Camry</p>
                      </div>
                      <div className="ml-auto flex flex-col gap-1">
                        <p className="text-lg font-semibold">
                          {booking.driver.name}
                        </p>
                        <p className="text-lg font-light">comfort</p>
                        <p className="text-lg font-normal">
                          <span className="text-lg font-light">
                            {priceByServiceType(booking.driver.serviceType)} 000
                          </span>
                          <span className="text-sm"> UZS</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-400">From</span>
                        <span className="text-lg font-semibold">
                          {booking.pickup_point}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-400">To</span>
                        <span className="text-lg font-semibold">
                          {booking.dropoff_point}
                        </span>
                      </div>
                    </div>
                  </NavLink>

                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-400">Payment Method</span>
                      <span className="text-lg font-semibold">
                        {booking.payment_method}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-400">Status</span>
                      <span className="text-lg font-semibold">
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Did you satisfied?
                    </h3>
                    <div className="flex gap-2 justify-between">
                      <button
                        className="bg-green-500 text-white p-2 rounded"
                        onClick={() => setIsReviewOpen(!isReviewOpen)}
                      >
                        Yes
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded"
                        onClick={() => handleReview(booking.id)}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  {/* review textarea */}
                  {isReviewOpen && (
                    <form
                      className="flex flex-col gap-2"
                      onSubmit={handleReview}
                    >
                      <textarea
                        className="border p-2 rounded"
                        placeholder="Write a review..."
                        name="review"
                        id="review"
                      ></textarea>
                      <input
                        type="hidden"
                        name="bookingId"
                        value={booking.id}
                      />
                      <input
                        type="hidden"
                        name="driverId"
                        value={booking.driver.id}
                      />

                      <button
                        className="bg-indigo-500 text-white p-2 rounded"
                        type="submit"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
