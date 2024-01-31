import { Swiper, SwiperSlide } from "swiper/react";

import { useState } from "react";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = ({ images }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: any, next: any) => setActiveIndex(next),
  };

  return (
    <div className="flex flex-row gap-20">
      <div>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">prev</div>
          <div className="swiper-button-next slider-arrow">next</div>
          <div className="swiper-pagination"></div>
        </div>
      </div>

      <div>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={false}
          slidesPerView={4}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          // pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {images.map((image: any, i: any) => (
            <SwiperSlide key={i} className="gap-20">
              <img
                src={image}
                alt="slide_image"
                // className="w-[200px] h-[350px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageSlider;
