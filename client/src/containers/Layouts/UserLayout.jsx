import { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import {
  TemplateIcon,
  MenuIcon,
  XIcon,
  ChevronLeftIcon,
} from "@heroicons/react/outline";

const UserLayout = () => {
  const [navbarState, setNavbarState] = useState(false);
  const handleNavbar = () => setNavbarState(!navbarState);

  const menu = [
    {
      title: "Dashboard",
      Icon: TemplateIcon,
    },
    {
      title: "History",
      Icon: TemplateIcon,
      gap: true,
    },
    {
      title: "Notes",
      Icon: TemplateIcon,
    },
    {
      title: "Profile",
      Icon: TemplateIcon,
      gap: true,
    },
    {
      title: "Preferences",
      Icon: TemplateIcon,
    },
  ];
  return (
    <>
      <div className="flex">
        <div
          className={`${
            navbarState ? "w-72" : "w-20"
          } h-screen bg-gray-600 relative duration-500`}
        >
          <ChevronLeftIcon
            onClick={handleNavbar}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-slate-500 text-white bg-slate-800 ${
              !navbarState && "rotate-180"
            }`}
          />
          <nav className="p-2">
            <div className="flex gap-x-4 items-center">
              <img
                src={logo}
                alt=""
                className={`ml-3 w-9 duration-500 cursor-pointer ${
                  navbarState && "rotate-[360deg]"
                }`}
              />
              <span
                className={`text-2xl text-gray-200 origin-left font-medium ${
                  !navbarState && "scale-0"
                }`}
              >
                FutFund
              </span>
            </div>
            <ul className="font-body mt-16 flex flex-col text-md">
              {menu.map(({ title, Icon, gap }) => (
                <li
                  className={`p-2 m-2 border-b hover:bg-secondary-100 hover:rounded-md hover:text-gray-700 gap-x-4 ${
                    gap ? "mt-9" : "mt-2"
                  }`}
                >
                  <span className="align-center">
                    <Icon className="w-5 inline-block cursor-pointer" />
                    <a
                      href="/"
                      className={`${!navbarState && "hidden"} duration-300 p-2`}
                    >
                      {title}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <main className="bg-blue-100 flex-1 h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserLayout;
