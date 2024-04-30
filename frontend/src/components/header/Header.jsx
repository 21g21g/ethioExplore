import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose, MdLogin, MdPerson } from 'react-icons/md';
import { SiEthiopianairlines } from "react-icons/si";

const Header = () => {
  const topData = [
    { path: '/', text: 'Home', icon: null },
    { path: '/destinations', text: 'Destinations', icon: null },
    { path: '/hotels', text: 'Hotels', icon: null },
    { path: '/packages', text: 'Packages', icon: null },
    { path: '/bookings', text: 'Bookings', icon: null },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const handleMenuItemClick = (index) => {
    setSelected(index);
    if (menuOpen) {
      setMenuOpen(false);
    }
  };


  return (
    <>
      <header className='top-header  bg-custom-green2 z-50 fixed top-0 right-0 left-0 h-16 flex items-center pl-10 justify-between'>
        <div className='flex gap-2 items-center '>
          <SiEthiopianairlines size={30} color='yellow' />
          <h1 className='text-white text-lg font-bold'>EthioExplore</h1>
        </div>

        <div className='flex items-center pr-5 md:hidden'>
          {menuOpen ? (
            <MdClose
              className='text-white cursor-pointer'
              size={24}
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <MdMenu
              className='text-white cursor-pointer'
              size={24}
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        <nav className='hidden md:flex items-center'>
          {topData.map((item, index) => (
            <>
              <Link
                key={index}
                to={item.path}
                className={`nav-text ${selected === index ? '  rounded-md text-yellow-200  font-serif ' : ''}`}
                onClick={() => handleMenuItemClick(index)}
              >
                {item.text}
              </Link>
            </>
          ))}
        </nav>
        <nav className='nav-link hidden md:flex gap-2'>
          <Link to='/auth/login' className='nav-text'><MdLogin size={23} />Login</Link>
          <Link to='/auth/register' className='nav-text '><MdPerson size={23} />Register</Link>
        </nav>
      </header>
      {menuOpen && (
        <div className='md:hidden bg-green-500 py-6 px-6 mr-6 border-sky-400 rounded-xl fixed top-16 left-0  w-full z-20  '>
          {topData.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className='nav-text'
              onClick={() => handleMenuItemClick(index)}
            >
              {item.text}
            </Link>
          ))}
          <hr />
          <Link to='/auth/login' className='nav-text'><MdLogin size={23} />Login</Link>
          <Link to='/auth/register' className='nav-text '><MdPerson size={23} />Register</Link>
        </div>
      )}
      <div className='pt-16'></div>
    </>
  );
};

export default Header;
