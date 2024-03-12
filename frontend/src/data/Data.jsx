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

import { TfiPackage } from "react-icons/tfi";
import { BiTaxi } from "react-icons/bi";


export const AdminSidebarData = [
  {
    icon: RxDashboard,
    heading: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    icon: FaEject,
    heading: "Hotels",
    link: "/admin/hotels",
  },
  {
    icon: FaCarAlt,
    heading: "Cars",
    link: "/admin/cars",
  },
  {
    icon: FaThList,
    heading: "Booking",
    link: "/admin/bookings",
  },
  {
    icon: AiOutlineUsergroupAdd,
    heading: "Tourists",
    link: "/admin/tourists",
  },
  {
    icon: AiOutlineUsergroupAdd,
    heading: "GuideCompanies",
    link: "/admin/guides",
  },

  {
    icon: AiOutlineHome,
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
export const UserNavData = [
  {
    heading: "Dashboard",
    link: "/user/dashboard",
  },
  {
    heading: "Bookings",
    link: "/user/bookings",
  },
  {
    heading: "Destinations",
    link: "/user/destinations",
  },
  {
    heading: "Packages",
    link: "/user/packages",
  },
  {
    heading: "Hotels",
    link: "/hotels",
  },
  {
    heading: "Cars",
    link: "/user/cars",
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
