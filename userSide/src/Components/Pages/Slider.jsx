import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
// import "../Layout/App.css";

const Slider = () => {
  const images = [
    {
      src: "https://blog.engram.us/content/images/size/w760h400/2023/12/query.png",
      alt: "Protable outdoor bluetooth speaker",
      text: "Your Personalized Recommendations Awaiting!",
    },
    {
      src: "https://kinsta.com/wp-content/uploads/2016/08/query-monitor-3-1024x512.png",
      alt: "Explore What Others Recommend for You",
      text: "Explore What Others Recommend for You",
    },
    {
      src: "https://miro.medium.com/v2/resize:fit:1400/1*806NY7TXHwi2DvSjuYdHIg.jpeg",
      alt: "Find Products Tailored to Your Interests",
      text: "Find Products Tailored to Your Interests",
    },
    {
      src: "https://media.licdn.com/dms/image/C5612AQG-cIHxdF3e2w/article-cover_image-shrink_720_1280/0/1644479555076?e=2147483647&v=beta&t=Qir9_lyLb5Ms0U7SIKDyl78l4HnK8ysuttrJFZHJn4U",
      alt: "Recommended Just for You – Check Them Out!",
      text: "Recommended Just for You – Check Them Out!",
    },
    {
      src: "https://miro.medium.com/v2/resize:fit:1000/1*zEcZkWeQKuu0Dek-HJkslw.png",
      alt: "Discover Your Next Favorite with Recommendations!",
      text: "Discover Your Next Favorite with Recommendations!",
    },
  ];

  return (
    <div className="sliders h-[400px] lg:h-[500px]  py-8 flex flex-col items-center justify-center">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.2}
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="w-11/12 md:w-3/4"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-3xl lg:text-4xl font-bold text-center">
                {image.text}
              </h3>
            </div>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
