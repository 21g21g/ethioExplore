import React, { useState } from 'react';
import { MdArrowDropDown, MdNotifications, MdPerson, MdSunny, MdMenu, MdClose } from 'react-icons/md';


const TopNav = ({ roleData, onMenuToggle, onMenuClick, searchPlaceholder, userName }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
        onMenuToggle(); // Call the onMenuToggle function passed as prop
    };

    const handleMenuClick = (link) => {
        setIsMenuOpen(false);
        onMenuClick(link);
    };

    return (
        <div className="flex justify-between items-center text-green-500 bg-white ml-1 py-1 px-2 border-white border-2 rounded-md shadow-md">
            <div className="lg:hidden">
                {isMenuOpen ? (
                    <MdClose size={25} onClick={handleMenuToggle} className="cursor-pointer" />
                ) : (
                    <MdMenu size={25} onClick={handleMenuToggle} className="cursor-pointer" />
                )}
            </div>
            <div className="mx-3">
                <input type="text" placeholder={searchPlaceholder || "Search..."} className="input" />
            </div>
            <div className='flex items-center gap-3 '>
                <span className="text-green-300">{userName}</span>
                <MdSunny size={25} />
                <MdNotifications size={25} />
                <MdPerson size={25} />
                <MdArrowDropDown size={25} className="cursor-pointer" />
                {isMenuOpen && (
                    <div className="absolute w-full top-16 right-2 px-4 left-1  bg-white p-2 z-50 rounded-md shadow-md">
                        {roleData.map((item, index) => (
                            <div key={index} onClick={() => handleMenuClick(item.link)} className="cursor-pointer p-2 hover:bg-green-600 active:bg-green-800 ">
                                {item.heading}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopNav;
