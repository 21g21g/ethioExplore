import React, { useState } from "react";
import { SiEthiopianairlines } from "react-icons/si";
import { TourGuideSidebarData, HotelSidebarData, AdminSidebarData, UserSidebarData } from "../../data/Data";

const Sidebar = (props) => {
  const { role, onMenuItemClick } = props;
  const [selected, setSelected] = useState(0);

  const handleMenuItemClick = (link, index) => {
    setSelected(index);
    onMenuItemClick(link);
  };

  let SidebarData = role === "admin" ? AdminSidebarData : role === "hotel" ? HotelSidebarData :role=="user"?UserSidebarData: TourGuideSidebarData;

  return (
    <div className="bg-green-700 text-white w-64 h-screen  flex-col border-white border-2 lg:block hidden">
      {/* Logo */}
      <div className=" h-16 flex items-center justify-center">
        <SiEthiopianairlines size={25} color="yellow" />
        <span className="ml-2 text-xl font-bold text-yellow-400">Banay-25</span>
      </div>
      <hr className="border-t border-white" />
      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        {/* Menu items */}
        {SidebarData.map((item, index) => (
          <div
            key={index}
            className={`p-4 cursor-pointer flex items-center ${selected === index ? 'bg-green-400 rounded-md' : ''}`}
            onClick={() => handleMenuItemClick(item.link, index)}
          >
            <item.icon className="mr-2" />
            <span>{item.heading}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
