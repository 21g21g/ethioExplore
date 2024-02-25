import { Link } from 'react-router-dom';
import { MdLogin, MdPerson} from "react-icons/md"
import Logo from '../../assets/logo1.jpg';
const Header = () => {

  return (
    <>
      <header className='top-header'>
        <div className='flex pl-28'>
        <Link to="http://localhost:5173/" className="sm:mb-0 space-x-3 rtl:space-x-reverse">
        <div className="bg-white rounded-full p-1">
              <img src={Logo} className="h-8 rounded-full" alt="Tourism Logo" />
            </div>          </Link>
          <Link to="/" className="nav-text">Home</Link>
          <Link to="/destinations" className="nav-text">Destinations</Link>
          <Link to="/hotels" className="nav-text">Hotels</Link>
          <Link to="/packages" className="nav-text">Packages</Link>
          <Link to="/bookings" className="nav-text">Bookings</Link>

        </div>

        <nav className="nav-link ">
          <Link to="/auth/login" className="nav-text"><MdLogin size={23} />login</Link>
          <div className="register">
          <Link to="/auth/register" className="nav-text border-white border-2"><MdPerson size={23}/>register</Link>
          </div>
          
        </nav>
      </header>

    </>

  );
};

export default Header;
