import { Link, useNavigate } from "react-router-dom";
import { navbarPath } from "../constants/navbar";
import { useState } from "react";

function Sidebar({ toggle }) {
  const [activePage, setActivePage] = useState(localStorage.getItem("active"));
  const navigate = useNavigate();

  function activePageAdd(path) {
    if (activePage != path) {
      localStorage.setItem("active", path);
      setActivePage(path);
      navigate(path);
    }
  }

  return (
    <div
      className={`${
        toggle ? "w-[68px]" : "w-[256px]"
      }   h-[88vh] overflow-y-hidden sidebar-shadow flex flex-col gap-y-6 pt-6 bg-white rounded-[5px] mt-2`}
    >
      <div
        onClick={() => activePageAdd("/car")}
        className={`${
          toggle ? "pl-2" : "pl-5"
        } text-accentBlue font-semibold text-[18px]  cursor-pointer`}
      >
        KIUT
      </div>
      <hr className="text-lightGray" />
      <ul className="pl-5 flex flex-col gap-y-4">
        {navbarPath.map((nav) => (
          <small key={nav.href} className="">
            <li
              key={nav.href}
              onClick={() => activePageAdd(nav.href)}
              className={`flex gap-x-2 cursor-pointer text-[20px]`}
            >
              <Link
                className={`${activePage == nav.href ? "text-accentBlue" : ""}`}
                to={nav.href}
              >
                {nav.title}
              </Link>
            </li>
          </small>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
