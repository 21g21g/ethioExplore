import React from "react";
import HotelbyCity from "../../hotels/cities/HotelbyCity";
import HotelbyFeatured from "../../hotels/featured/HotelbyFeatured";
import HotelbyType from "../../hotels/type/HotelbyType";

import DatePickerss from "../../hotels/hotelcomponent/DatePickerss";


const HotelHompage = () => {


  return (
    <div className="flex flex-col gap-3 ml-8 mr-8 md:gap-6 pl-4 pr-4 ">
      <div className="w-full ">
        <DatePickerss />
      </div>
      <div className="w-full  ">
        <HotelbyCity />
      </div>
      <div className="w-full ">
        <HotelbyType />
      </div>
      <div className="w-full ">
        <HotelbyFeatured />
      </div>
    </div>
  );
};

export default HotelHompage;
