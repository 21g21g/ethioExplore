import { FaRegUser, FaRegClipboard } from "react-icons/fa";
import { MdOutlineLocalHotel } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SmallCard from "../../components/smallcards/smallCards";
import { RiTeamLine } from "react-icons/ri";

const AdminDashboard = () => {

  const url = "http://localhost:5000/api/users";
  return (
    <div className="container mx-auto mt-8">
      {/* Cards for Tourist, Hotels, Bookings, and Tour Guides */}
      <div className="container mx-auto mt-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4">
        {/* Revenue Card */}
        <div className="bg-white p-4 shadow-md rounded-md flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold mb-2">Revenue</h3>
          <div className="w-32 h-32 ">
            <CircularProgressbar
              // Change the epresent the percentage
              text={`${75}%`}
            />
          </div>

          <div className="text-xl font-bold mb-2">Total Revenue</div>
          <div className="text-xl font-bold mb-2">$500,000</div>
          <div className="flex justify-between w-full">
            <div>
              <p className="text-sm text-gray-500">Weekly</p>
              <p className="text-lg font-semibold">+$20,000</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly</p>
              <p className="text-lg font-semibold">+$80,000</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Yearly</p>
              <p className="text-lg font-semibold">+$500,000</p>
            </div>
          </div>
        </div>
        {/* Chart Card */}

      </div>
    </div>
  );
};

export default AdminDashboard;
