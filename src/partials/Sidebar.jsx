import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FcApproval,
  FcCollaboration,
  FcDebt,
  FcInTransit,
  FcMoneyTransfer,
} from "react-icons/fc";

import { useUser } from "../hook/useUser";
import { FaCarSide } from "react-icons/fa";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const { user, isLoading } = useUser();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  if (isLoading) return null;

  const isAdmin = user.email.includes("admin");

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>

          {/* Logo */}
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>

            <ul className="mt-3">
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("book-taxi") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/book-taxi"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("book-taxi")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <FaCarSide className="shrink-0 h-6 w-6 text-blue-300" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Book a Taxi
                    </span>
                  </div>
                </NavLink>
              </li>
              {!isAdmin && (
                <>
                  <li
                    className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                      pathname.includes("history") && "bg-slate-900"
                    }`}
                  >
                    <NavLink
                      end
                      to="/history"
                      className={`block text-slate-200 truncate transition duration-150 ${
                        pathname.includes("history")
                          ? "hover:text-slate-200"
                          : "hover:text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <FcApproval className="shrink-0 h-6 w-6" />
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          History
                        </span>
                      </div>
                    </NavLink>
                  </li>
                </>
              )}
              {/* Clients */} {/* Transactions */}
              {isAdmin && (
                <>
                  <li
                    className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                      pathname.includes("clients") && "bg-slate-900"
                    }`}
                  >
                    <NavLink
                      end
                      to="/clients"
                      className={`block text-slate-200 truncate transition duration-150 ${
                        pathname.includes("clients")
                          ? "hover:text-slate-200"
                          : "hover:text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <FcDebt className="shrink-0 h-6 w-6" />
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Clients
                        </span>
                      </div>
                    </NavLink>
                  </li>
                  <li
                    className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                      pathname.includes("transactions") && "bg-slate-900"
                    }`}
                  >
                    <NavLink
                      end
                      to="/transactions"
                      className={`block text-slate-200 truncate transition duration-150 ${
                        pathname.includes("transactions")
                          ? "hover:text-slate-200"
                          : "hover:text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <FcMoneyTransfer className="shrink-0 h-6 w-6" />{" "}
                        {/* Replace with appropriate icon */}
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Transactions
                        </span>
                      </div>
                    </NavLink>
                  </li>
                </>
              )}
              {/* Taxis */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("taxis") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/taxis"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("taxis")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <FcCollaboration className="shrink-0 h-6 w-6" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Drivers
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

const UserRoutes = [
  {
    path: "/book-taxi",
    name: "Book a Taxi",
    icon: <FcInTransit />,
  },
  {
    path: "/history",
    name: "History",
    icon: <FcApproval />,
  },
  {
    path: "/taxis",
    name: "Taxis",
    icon: <FcInTransit />,
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: <FcMoneyTransfer />,
  },
];

const AdminRoutes = [
  {
    path: "/book-taxi",
    name: "Book a Taxi",
    icon: <FcInTransit />,
  },
  {
    path: "/history",
    name: "History",
    icon: <FcApproval />,
  },
  {
    path: "/clients",
    name: "Clients",
    icon: <FcDebt />,
  },
  {
    path: "/taxis",
    name: "Taxis",
    icon: <FcInTransit />,
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: <FcMoneyTransfer />,
  },
];

const SidebarLink = ({ path, name, icon, pathname }) => {
  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        pathname.includes(path) && "bg-slate-900"
      }`}
    >
      <NavLink
        end
        to={path}
        className={`block text-slate-200 truncate transition duration-150 ${
          pathname.includes(path) ? "hover:text-slate-200" : "hover:text-white"
        }`}
      >
        <div className="flex items-center">
          {icon}
          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
            {name}
          </span>
        </div>
      </NavLink>
    </li>
  );
};
