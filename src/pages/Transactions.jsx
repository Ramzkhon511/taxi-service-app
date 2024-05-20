import React from "react";
import { FcCancel } from "react-icons/fc";
import { IoAlert, IoCheckmark } from "react-icons/io5";
import { useTransactions } from "../hook/useTransactions";
import Loader from "../utils/Loader";

const Transactions = () => {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Orders History
          </h2>
        </header>
        <div className="p-3">
          <div>
            <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
              Today
            </header>
            <ul className="my-1">
              {transactions.map((transaction, k) => (
                <TransactionItem key={k} transaction={transaction} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

const TransactionItem = ({ transaction }) => {
  const {
    driver,
    pickup_point,
    pickup_time,
    dropoff_point,
    amount,
    status,
    username,
  } = transaction;

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
    <li className="flex px-2">
      <StatusBadge status={status} />

      <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
        <div className="grow flex justify-between">
          <div className="self-center">
            <a
              className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
              href="#0"
            >
              {username.charAt(0).toUpperCase() + username.slice(1)}
            </a>{" "}
            {pickup_point} to {dropoff_point} on {pickup_time} with{" "}
            {driver.name} driver
          </div>
          <div className="shrink-0 self-start ml-2">
            <span className="font-medium text-slate-800 dark:text-slate-100">
              {priceByServiceType(driver.serviceType)} 000 UZS
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

const StatusBadge = ({ status }) => {
  return (
    <>
      {status === "completed" && (
        <div className="w-9 h-9 flex items-center justify-center rounded-full shrink-0 bg-emerald-500 my-2 mr-3">
          <IoCheckmark className="w-7 h-7 text-white" />
        </div>
      )}
      {status === "pending" && (
        <div className="w-9 h-9 flex items-center justify-center rounded-full shrink-0 bg-blue-500 my-2 mr-3">
          <IoAlert className="w-7 h-7 text-white" />
        </div>
      )}
      {status === "cancelled" && (
        <div className="w-9 h-9 flex items-center justify-center rounded-full shrink-0 bg-rose-500 my-2 mr-3">
          <FcCancel className="w-7 h-7 fill-current text-rose-50" />
        </div>
      )}
    </>
  );
};
