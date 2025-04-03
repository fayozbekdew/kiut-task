import { Outlet } from "react-router-dom";
import Navbar from "../sections/Navbar";
import Sidebar from "../sections/Sidebar";
import { ToggleIcon } from "../assets";
import { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";

function MainLayout() {
  const [toggle, setToggle] = useState(() => {
    return JSON.parse(localStorage.getItem("toggle")) || false;
  });
  function toggleChecker() {
    setToggle((prev) => !prev);
  }
  useEffect(() => {
    localStorage.setItem("toggle", JSON.stringify(toggle));
  }, [toggle]);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="w-full pb-4 bg-lightGray h-full flex flex-col">
        <Navbar />
        <div className="flex flex-grow overflow-hidden">
          <div className="relative">
            <Sidebar toggle={toggle} />
            <button
              onClick={toggleChecker}
              className="flex mt-auto p-1 rounded-md items-center bg-white absolute top-2 right-[-40px]"
            >
              <img className="w-5 h-5" src={ToggleIcon} alt="toggle icon" />
            </button>
          </div>
          <div className="flex flex-col flex-grow p-2 overflow-hidden mt-9">
            <BreadCrumb />
            <div className="flex-grow h-[88vh] overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
