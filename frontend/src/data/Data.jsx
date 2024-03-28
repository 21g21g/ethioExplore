import { RxDashboard } from "react-icons/rx";
import { TbBrandBooking } from "react-icons/tb";

import { AiOutlineHome, AiOutlineUsergroupAdd } from "react-icons/ai";
import {
  FaUserFriends,
  FaCarAlt,
  FaHouseUser,
  FaThList,
  FaEject,
} from "react-icons/fa";
import {
  RiDashboardLine,
  RiHotelBedLine,
  RiCarLine,
  RiBook2Line,
  RiUserLine,
  RiTeamLine,
  RiMapPin2Line
} from 'react-icons/ri';

import { TfiPackage } from "react-icons/tfi";
import { BiTaxi } from "react-icons/bi";


export const AdminSidebarData = [
  {
    icon: RiDashboardLine,
    heading: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    icon: RiHotelBedLine,
    heading: "Hotels",
    link: "/admin/hotels",
  },
  {
    icon: RiBook2Line,
    heading: "Bookings",
    link: "/admin/bookings",
  },
  {
    icon: RiUserLine,
    heading: "Tourists",
    link: "/admin/tourists",
  },
  {
    icon: RiTeamLine,
    heading: "TourGuides",
    link: "/admin/guides",
  },
  {
    icon: RiMapPin2Line,
    heading: "Destinations",
    link: "/admin/destinations",
  },
];

export const TourGuideSidebarData = [
  {
    icon: RxDashboard,
    heading: "Dashboard",
    link: "/tourGuide/dashboard",
  },
  {
    icon: TbBrandBooking,
    heading: "Bookings",
    link: "/tourGuide/bookings",
  },
  {
    icon: AiOutlineUsergroupAdd,
    heading: "Customers",
    link: "/tourGuide/tourists",
  },
  {
    icon: AiOutlineUsergroupAdd,
    heading: "Guides",
    link: "/tourGuide/guides",
  },
  {
    icon: TfiPackage,
    heading: "Packages",
    link: "/tourGuide/packages",
  },
  {
    icon: AiOutlineHome,
    heading: "Hotels",
    link: "/hotels",
  },
  {
    icon: BiTaxi,
    heading: "Cars",
    link: "/tourGuide/cars",
  },
];
export const UserSidebarData = [
  {
    icon: RiDashboardLine,
    heading: "Dashboard",
    link: "/user/dashboard",
  },
  {
    icon: RiBook2Line,
    heading: "Bookings",
    link: "/user/bookings",
  },

  {
    icon: TfiPackage,
    heading: "Packages",
    link: "/user/packages",
  },
  {
    icon: RiHotelBedLine,
    heading: "Hotels",
    link: "/user/hotels",
  },

];

export const HotelSidebarData = [
  {
    icon: RxDashboard,
    heading: "Dashboard",
    link: "/hotel/dashboard",
  },
  {
    icon: TbBrandBooking,
    heading: "Bookings",
    link: "/hotel/bookings",
  },

  {
    icon: TfiPackage,
    heading: "Packages",
    link: "/hotel/packages",
  },
  {
    icon: AiOutlineHome,
    heading: "Hotels",
    link: "/hotel/hotels",
  },



];
