import React, { useState } from 'react';
import { MdArrowDropDown, MdNotifications, MdPerson, MdSunny, MdMenu } from 'react-icons/md';
import { AdminSidebarData } from '../../data/Data';

const AdminTopNav = ({ onMenuToggle, renderComponent }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
        onMenuToggle(); // Call the onMenuToggle function from AdminHome
    };

    const handleMenuItemClick = (link) => {
        renderComponent(link);
        setIsMenuOpen(false);
    };

    return (
        <div className="flex justify-between items-center bg-green-700 text-white p-4 border-white border-2 h-16">
            <div className="lg:hidden">
                <MdMenu size={25} onClick={handleMenuToggle} className="cursor-pointer" />
            </div>
            <div className="mx-3 ">
                <input type="text" placeholder="Search..." className="input" />
            </div>
            <div className='flex items-center gap-3 relative'>
                <MdSunny size={25} />
                <MdNotifications size={25} />
                <span className="mr-2">John</span>
                <MdPerson size={25} />
                <MdArrowDropDown size={25} className="cursor-pointer" />
                {isMenuOpen && (
                    <div className="absolute top-16 right-4 bg-green-500 p-2 rounded-md shadow-md">
                        {AdminSidebarData.map((item, index) => (
                            <div key={index} onClick={() => handleMenuItemClick(item.link)} className="cursor-pointer">
                                {item.heading}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTopNav;
