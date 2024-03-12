import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose, MdLogin, MdPerson, MdAirlines, MdAirplanemodeActive } from 'react-icons/md';
import { SiEthiopianairlines } from "react-icons/si"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className='top-header fixed top-0 left-0 right-0 z-10 shadow-md bg-green-700 border-white border-2 text-white h-16 flex items-center pl-10 justify-between'>
        <div className='flex gap-2 items-center '>
          <SiEthiopianairlines size={30} color='yellow' />
          <h1 className='text-yellow-200 text-lg font-bold'>Banay-25</h1>
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
          <Link to='/' className='nav-text'>Home</Link>
          <Link to='/destinations' className='nav-text'>Destinations</Link>
          <Link to='/hotels' className='nav-text'>Hotels</Link>
          <Link to='/packages' className='nav-text'>Packages</Link>
          <Link to='/bookings' className='nav-text'>Bookings</Link>
        </nav>
        <nav className='nav-link hidden md:flex gap-2'>
          <Link to='/auth/login' className='nav-text'><MdLogin size={23} />Login</Link>
          <Link to='/auth/register' className='nav-text '><MdPerson size={23} />Register</Link>
        </nav>
      </header>
      {/* Mobile menu */}
      {menuOpen && (
        <div className='md:hidden bg-green-500 py-6 px-6 mr-6 border-sky-400 rounded-xl fixed top-16 left-0  w-full z-20  '>
          <Link to='/' className='nav-text'>Home</Link>
          <Link to='/destinations' className='nav-text'>Destinations</Link>
          <Link to='/hotels' className='nav-text'>Hotels</Link>
          <Link to='/packages' className='nav-text'>Packages</Link>
          <Link to='/bookings' className='nav-text'>Bookings</Link>
          <hr />
          <Link to='/auth/login' className='nav-text'><MdLogin size={23} />Login</Link>
          <Link to='/auth/register' className='nav-text '><MdPerson size={23} />Register</Link>
        </div>

      )}
      <div className='pt-16'>
      </div>
    </>
  );
};

export default Header;
