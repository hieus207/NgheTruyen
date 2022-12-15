// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import { Autoplay } from "swiper";
import { TiVolumeUp } from "react-icons/ti";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import StoryCard from "../../helpers/StoryCard";

export default function SlideSection({data}) {
  return (
    <div className={clsx("section")}>
      <div className={clsx("section_name")}>
        <div className={clsx("section_name_left")}>
          Truyện đề cử&nbsp; <TiVolumeUp size={"1.2em"} />
        </div>
        <div>Xem Thêm</div>
      </div>
      <div className={clsx("section_content")}>
        <Swiper
          slidesPerView={6}
          loop={true}
          spaceBetween={0}
          loopFillGroupWithBlank={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className={clsx("section")}>
            {data.map((elm) => (
              <SwiperSlide key={elm.id}>
                <StoryCard data={elm} small />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
