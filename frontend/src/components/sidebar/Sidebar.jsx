import React, { useState } from "react";
import { SiEthiopianairlines } from "react-icons/si";
import { TourGuideSidebarData, ManagerSidebarData, AdminSidebarData, UserSidebarData } from "../../data/Data";
import { IoIosArrowForward } from 'react-icons/io';

const Sidebar = (props) => {

  const { role, onMenuItemClick } = props;
  console.log(role);

  const [selected, setSelected] = useState(0);

  const handleMenuItemClick = (link, index) => {
    setSelected(index);
    onMenuItemClick(link);
  };

  let SidebarData = role === "admin" ? AdminSidebarData : role === "hotelManager" ? ManagerSidebarData : role == "user" ? UserSidebarData : TourGuideSidebarData;

  return (
    <div className="bg-white text-green-950 w-64 h-screen  flex-col   lg:block hidden  shadow-md">
      {/* Logo */}
      <div className=" h-20 flex items-center justify-center">
        <SiEthiopianairlines size={25} color="green" />
        <span className="ml-2 text-xl font-bold text-green-700">Banay-25</span>
      </div>
      <hr className="border-t border-green-200" />
      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        {/* Menu items */}
        {SidebarData.map((item, index) => (
          <div
            key={index}
            className={`p-4 cursor-pointer flex items-center ${selected === index ? ' bg-slate-50 rounded-md text-yellow-500  font-serif font-semibold' : ''}`}
            onClick={() => handleMenuItemClick(item.link, index)}
          >
            {selected === index ?
              <div className=" cursor-pointer flex items-center gap-2">
                <item.icon className="mr-2 text-green-500" /><span>{item.heading}
                </span> <IoIosArrowForward className="mr-2 text-red-500" /> </div> :
              <div className="cursor-pointer flex items-center gap-4 font-serif">
                <item.icon className="mr-2" /><span>{item.heading}</span>
              </div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
