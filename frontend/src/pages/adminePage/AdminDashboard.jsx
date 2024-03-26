import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaHotel, FaClipboardList, FaUserTie } from "react-icons/fa";
import {MdOutlineLocalHotel} from "react-icons/md";
import { Bar } from "react-chartjs-2";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SmallCard from "../../components/smallcards/smallCards";

const AdminDashboard = () => {


  return (
    <div className="container mx-auto mt-8">
      {/* Cards for Tourist, Hotels, Bookings, and Tour Guides */}
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Tourist Card */}
          <SmallCard
            icon={<FaRegUser className="text-2xl text-green-400" />}
            title="Tourist"
            value="1000"
            linkTo="/tourist"
            linkText="See Details"
          />
          {/* Hotels Card */}
          <SmallCard
            icon={<MdOutlineLocalHotel className="text-2xl text-green-400" />}
            title="Hotels"
            value="50"
            linkTo="/hotels"
            linkText="See Details"
          />
          {/* Bookings Card */}
          <SmallCard
            icon={<FaClipboardList className="text-2xl text-green-400" />}
            title="Bookings"
            value="500"
            linkTo="/bookings"
            linkText="See Details"
          />
          {/* Tour Guides Card */}
          <SmallCard
            icon={<FaUserTie className="text-3xl text-green-400" />}
            title="Tour Guides"
            value="20"
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
              value={75} // Change the value to represent the percentage
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
        {/* <div className="bg-white p-4 shadow-md rounded-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Revenue Report</h3>
          <Bar data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
              label: 'Revenue',
              data: [50000, 80000, 100000, 90000, 120000, 110000, 150000],
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1
            }]
          }} />
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
