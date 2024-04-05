import React, { useState } from "react";
import CountByCity from "../hotels/cities/HotelbyCity";
import BottomHeader from "../../../components/header/BottomHeader";
import HotelSearchedList from "../t";

const Hotels = () => {
  const [showSearchedHotel, setShowSearchedHotel] = useState(false);
  const [searchParams, setSearchParams] = useState({
    destination: "",
    date: [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ],
    options: {
      adult: 1,
      children: 0,
      room: 1,
    },
  });

  const handleSearchClick = () => {
    setShowSearchedHotel(true);
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
          {showSearchedHotel ? (
            <HotelSearchedList searchParams={searchParams} />
          ) : (
            <>
              <BottomHeader
                onSearchClick={handleSearchClick}
                setShowSearchedHotel={setShowSearchedHotel}
                setSearchParams={setSearchParams}
              />
              <CountByCity />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
