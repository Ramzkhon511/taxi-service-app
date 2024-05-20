import React, { useEffect, useState } from "react";
import Image01 from "../../public/taxis/comfort.png";
import Image02 from "../../public/taxis/standart.png";
import Image03 from "../../public/taxis/luxury.png";
import ModalForm from "../components/ModalForm";
import { useDrivers } from "../hook/drivers/useDrivers";
import { useCreateDriver } from "../hook/drivers/useCreateDriver";
import { useUser } from "../hook/useUser";
import { useDeleteDriver } from "../hook/drivers/useDeleteDriver";
import Loader from "../utils/Loader";

const Taxis = () => {
  const [addDriverModal, setAddDriverModal] = useState(false);

  const { drivers, isLoading } = useDrivers();
  const { createDriver, isCreating } = useCreateDriver();
  const { user, isLoading: isUserLoading } = useUser();
  const { deleteDriver } = useDeleteDriver();

  if (isLoading || isUserLoading) return <Loader />;

  const handleAddDriver = (newDriver) => {
    createDriver(newDriver);
    setAddDriverModal(false);
  };

  const isAdmin = user.email.includes("admin");

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

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Taxi drivers
          </h2>
          {isAdmin && (
            <button
              className="btn-xs bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-300 hover:text-slate-600 dark:hover:text-slate-200"
              onClick={() => setAddDriverModal(true)}
            >
              Add new driver
            </button>
          )}

          {addDriverModal && (
            <ModalForm
              setAddDriverModal={setAddDriverModal}
              handleAddDriver={handleAddDriver}
            />
          )}
        </header>
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Phone</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Car</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Service Type</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Regions</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Reviews</div>
                  </th>
                  {isAdmin && (
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  )}
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                {drivers.map((customer) => {
                  return (
                    <tr key={customer.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 h-16 flex items-center justify-center shrink-0 mr-2 sm:mr-3">
                            <img
                              className="rounded-full"
                              src={imgByServiceType(customer.serviceType)}
                              width="80"
                              height="80"
                              alt={customer.name}
                            />
                          </div>
                          <div className="font-medium text-slate-800 dark:text-slate-100">
                            {customer.name}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.phone}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">
                          {customer.car}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.serviceType}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">
                          {customer.region}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">
                          {customer?.review?.length || 0} reviews
                        </div>
                      </td>

                      {isAdmin && (
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <button
                              className="btn-xs bg-red-500 text-white hover:bg-red-600"
                              onClick={() => deleteDriver(customer.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taxis;
