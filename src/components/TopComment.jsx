import { useContext, useEffect, useState } from "react";
import { FaMedal, FaCircleUp, FaCircleDown, FaMessage } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

import { CommentContext } from "../contexts/CommentContext";

function TopComment() {
  const { topComments } = useContext(CommentContext);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    if (topComments.length > 0) {
      setSwiperReady(true);
    }
  }, [topComments]);

  const breakpoints = {
    1400: {
      slidesPerView: 5,
    },
    1600: {
      slidesPerView: 6,
    },
  };

  return (
    <div className="top-comment-wrapper w-full py-[1.5rem] px-[2rem] border-b-[1px] border-[#fff2]">
      <div className="rank-title">
        <i>
          <FaMedal size={16} className="text-primary-color" />
        </i>
        <span>top bình luận</span>
      </div>
      <div className="top-comment_list">
        {swiperReady && (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            breakpoints={breakpoints}
            slidesPerView={4}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: true,
              stopOnLastSlide: false,
            }}
            speed={1000}
            observer={true}
            observeParents={true}
            onSwiper={(swiper) => {
              swiper.autoplay.start();
            }}
          >
            {topComments.map((comment) => (
              <SwiperSlide key={comment._id}>
                <div className="top-comment_item">
                  <div className="top-comment_item-poster">
                    <img src={comment?.movieThumb} alt=""></img>
                  </div>
                  <div className="top-comment_item-info">
                    <div className="user-avatar">
                      <img src={comment?.userId?.avatar} alt=""></img>
                    </div>
                    <div className="top-comment_item-content">
                      <div className="top-comment_item-header">
                        <div className="whitespace-nowrap text-[1em] font-medium text-white-color">
                          {comment?.userId?.username}
                        </div>
                      </div>
                      <div className="line-clamp-2 flex-1 text-[13px] h-[42px] mb-[3px] text-[#fff8]">
                        {comment?.content}
                      </div>
                      <div className="relative text-[12px] mt-[.5rem] flex items-center gap-4">
                        <div className="inline-flex items-center gap-[.3rem]">
                          <i>
                            <FaCircleUp />
                          </i>
                          <span className="text-[12px]">{comment?.like}</span>
                        </div>
                        <div className="inline-flex items-center gap-[.3rem]">
                          <i>
                            <FaCircleDown />
                          </i>
                          <span className="text-[12px]">{comment?.dislike}</span>
                        </div>
                        <div className="inline-flex items-center gap-[.3rem]">
                          <i>
                            <FaMessage />
                          </i>
                          <span className="text-[12px]">
                            {comment?.replies?.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="top-comment_item-thumb">
                    <div className="v-thumbnail">
                      <img src={comment?.movieThumb}></img>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default TopComment;
