import React, { useState } from "react";
import menu from "../data/sidebar";
import { NavLink } from "react-router-dom";

export default function SidebarItems({ isOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div>
      {menu.map((item, index) =>
        item.path ? (
          <NavLink
            to={item.path}
            key={index}
            className={(navData) =>
              navData.isActive
                ? "flex gap-3 py-2 text-blue-600 px-4 bg-gray-50 cursor-pointer"
                : "flex gap-3 py-2 hover:bg-gray-50 text-gray-100 hover:text-blue-600 px-4 cursor-pointer"
            }
          >
            {item.icon}
            {isOpen && <div className=" font-medium pl-2 ">{item.title}</div>}
          </NavLink>
        ) : (
          <div key={index} className="flex flex-col  w-full ">
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="py-2 px-4 flex gap-3 w-full hover:bg-gray-50 text-gray-100 hover:text-blue-600 cursor-pointer"
            >
              {item.icon}
              {isOpen && <div className=" font-medium pl-2 ">{item.title}</div>}
            </div>
            <div className="bg-blue-500 flex flex-col text-gray-100 text-md pl-5 sm:pl-20">
              {isProfileOpen &&
                isOpen &&
                item.childrens.map((i, ind) => (
                  <NavLink
                    to={i.path}
                    key={ind}
                    className="py-2 hover:underline"
                  >
                    {i.title}
                  </NavLink>
                ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
