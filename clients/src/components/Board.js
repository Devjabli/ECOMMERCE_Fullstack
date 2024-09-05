import React from "react";
import imgOne from "../images/brdOne.png";
import imgTwo from "../images/brdTwo.png";
import imgThree from "../images/brdThree.png";
import imgFour from "../images/brdFour.png";


import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Board() {
  return (
    <div className="">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={imgOne} alt="" className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imgTwo} alt="" className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imgThree} alt="" className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imgFour} alt="" className="w-full" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Board;
