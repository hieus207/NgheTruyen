// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import { Autoplay } from "swiper";
import { TiVolumeUp } from "react-icons/ti";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styles from "./home.module.scss"
import { STORY_SLIDE } from "../../../constants";
import StoryCardV2 from "../../helpers/StoryCardV2";
import { useMemo } from "react";

export default function SlideSection({data}) {
  
  const SlidePerView = useMemo(()=>{
    if(window.innerWidth<500){
        return Math.max(parseInt((window.innerWidth -180)/210),1)
    }
    return Math.max(parseInt((window.innerWidth -180)/440),1)
  },[])

  return (
    <div className={clsx("section p-10")}>
      <div className={clsx("section_name")}>
        <div className={clsx("section_name_left")}>
          {STORY_SLIDE}&nbsp; <TiVolumeUp size={"1.2em"} />
        </div>
      </div>
      <div className={clsx("section_content")}>
        <Swiper
          slidesPerView={SlidePerView}
          loop={true}
          // spaceBetween={0}
          loopFillGroupWithBlank={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          modules={[Autoplay]}
          className={clsx("section",styles.slideBody)}>
            {data.map((elm) => (
              <SwiperSlide key={"slice"+elm._id}>
                <StoryCardV2 data={elm} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
