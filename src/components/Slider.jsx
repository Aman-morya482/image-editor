import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactCompareImage from "react-compare-image";
import '../App.css';

import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

export default function App() {
  const compareRef = useRef();

  useEffect(() => {
    const stopPropagation = (e) => {e.stopPropagation()};

    const current = compareRef.current;
    if (current) {
      current.addEventListener("pointerdown", stopPropagation);
      current.addEventListener("touchstart", stopPropagation);
      current.addEventListener("mousedown", stopPropagation);
    }

    return () => {
      if (current) {
        current.removeEventListener("pointerdown", stopPropagation);
        current.removeEventListener("touchstart", stopPropagation);
        current.removeEventListener("mousedown", stopPropagation);
      }
    };
  }, []);

  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="slider-border p-4 overflow-hidden ">
            <div ref={compareRef}>
              <ReactCompareImage
                leftImage="/img/slider-image1.jpg"
                rightImage="/img/slider-image2.jpg"
                containerStyle={{ width: "100%", height: "100%" }}
                leftImageCss={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Make sure it fills the container
                  borderRadius: "15px",
                }}
                rightImageCss={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-border p-4 overflow-hidden">
            <div className='overflow-hidden rounded-xl'>
              <img src="/img/enhance2.jpg" alt="" />
              <img src="/img/enhance1.jpg" alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-border p-4 overflow-hidden">
            <div className='h-80 overflow-hidden rounded-xl'>
              {/* <img src="/img/bg-image1.jpg" alt="" /> */}
              <img src="/img/ai-image2.jpg" alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-border p-4 overflow-hidden">
            <div className='overflow-hidden rounded-xl'>
              {/* <img src="/img/bg-image1.jpg" alt="" /> */}
              <img src="/img/bg-image2.jpg" alt="" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
