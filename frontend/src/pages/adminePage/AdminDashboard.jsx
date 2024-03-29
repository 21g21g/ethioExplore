import { FaRegUser, FaRegClipboard } from "react-icons/fa";
import { MdOutlineLocalHotel } from "react-icons/md";
import "react-circular-progressbar/dist/styles.css";
import SmallCard from "../../components/smallcards/smallCards";
import { RiTeamLine } from "react-icons/ri";
import Mychart from "../../components/charts/Mychart";
import Progress from "../../components/charts/circularProgress";

const AdminDashboard = () => {

  const url = "http://localhost:5000/api/users";
  return (
    <div className="container mx-auto ">
      {/* Cards for Tourist, Hotels, Bookings, and Tour Guides */}
      <div className="container mx-auto mt-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Tourist Card */}
          <SmallCard
            icon={<RiTeamLine className="text-2xl text-green-900" />}
            title="Tourist"
            linkTo="/tourist"
            role="user"
            linkText="See Details"
            apiEndpoint={url}
          />
          {/* Hotels Card */}
          <SmallCard
            icon={<MdOutlineLocalHotel className="text-2xl text-green-900" />}
            title="Hotels"
            role="hotelManager"
            linkTo="/hotels"
            linkText="See Details"
            apiEndpoint={url}
          />
          {/* Bookings Card */}
          <SmallCard
            icon={<FaRegClipboard className="text-2xl text-green-900" />}
            title="Bookings"

            linkTo="/bookings"
            linkText="See Details"
          />
          {/* Tour Guides Card */}
          <SmallCard
            icon={<FaRegUser className="text-2xl text-green-900" />}
            title="Tour Guides"
            role='tourGuide'
            apiEndpoint={url}
            linkTo="/tour-guides"
            linkText="See Details"
          />
        </div>
      </div>

      {/* Revenue and Chart Cards */}
      <div className="flex flex-col md:flex-row mt-4 gap-4">
        <div className="md:w-2/5 h-full">
          <Progress />
        </div>
        <div className="md:w-full mt-4 md:mt-0 h-full">
          <Mychart />
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
