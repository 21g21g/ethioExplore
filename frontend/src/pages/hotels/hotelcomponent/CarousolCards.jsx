import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";

export const PrevArrow = ({ onClick }) => (
  <button onClick={onClick} className="prev-arrow" style={{left:'10px'}}>
    <FaAngleDoubleLeft/>
  </button>
);
export  const NextArrow = ({ onClick }) => (
  <button onClick={onClick}   className="next-arrow" style={{right:"10px"}}>
    <FaAngleDoubleRight/>
  </button>
);

export const sliderSettings = {
        dots: true,
     infinite: true,
    
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
    
}
 

