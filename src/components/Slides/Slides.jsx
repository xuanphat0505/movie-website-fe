/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, EffectFade } from "swiper/modules";

import { FavoritesContext } from "../../contexts/FavoritesContext";
import Loading from "../../shared/Loading/Loading";

import "./Slides.css";
function Slides({ movies }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const [isLoading, setIsLoading] = useState(true);

  // Check if movies data is loaded
  useEffect(() => {
    if (movies && movies.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [movies]);

  if (isLoading) {
    return (
      <div className="w-full max-xxl:h-[760px] max-xl:h-[600px] max-md:h-[400px] max-sm:h-[350px] max-xsm:h-[300px] mb-[30px] flex items-center justify-center">
        <Loading height="100%" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative top-slide-wrap">
        <Swiper
          spaceBetween={10}
          modules={[Thumbs, EffectFade]}
          thumbs={{ swiper: thumbsSwiper }}
          slidesPerView={1}
          allowTouchMove={false}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          initialSlide={0}
          className="w-full max-xxl:h-[760px] max-xl:h-[600px] max-md:h-[400px] max-sm:h-[350px] max-xsm:h-[300px] mb-[30px]"
        >
          {movies?.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="slide-element">
                <div
                  className="background-fade"
                  style={{ backgroundImage: `url(${slide.thumb_url})` }}
                ></div>
                <div className="cover-fade">
                  <div className="cover-image">
                    <img className="fade-in" src={slide.thumb_url} alt=""></img>
                  </div>
                </div>
                <div className="safe-area">
                  <div className="slide-content">
                    <div className="w-full h-auto">
                      <h3 className="text-[3em] leading-[1.5] mb-4 font-bold capitalize max-xl:text-[2em] max-sm:mb-3 max-sm:text-[1.6em]">
                        <Link to={`/movie/${slide?.slug}`}>{slide.name}</Link>
                      </h3>
                      <ul className="list mb-3 max-sm:justify-center max-sm:gap-[6px]">
                        <div className="tag">
                          <span>{slide.year}</span>
                        </div>
                        <div className="tag">
                          <span>{slide.time}</span>
                        </div>
                      </ul>
                      <ul className="list mb-6 max-sm:hidden">
                        {slide.category.map((cat, index) => (
                          <li className="tag border-none" key={index}>
                            <Link
                              className="capitalize"
                              to={`/filter/${cat.slug}`}
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="w-full flex items-center gap-[2rem] max-sm:hidden">
                        <Link to={`player/${slide?.slug}`} className="play-btn">
                          <i>
                            <FaPlay />
                          </i>
                        </Link>
                        <div className="inline-flex items-center border-2 border-border-color rounded-[30px]">
                          <Link
                            to={"#"}
                            onClick={() => toggleFavorite(slide)}
                            className="min-w-[68px] h-[50px] flex justify-center items-center px-[.2rem]"
                          >
                            <div
                              className={`w-[20px] h-[20px] ${isFavorite(slide) ? "text-[#ffd875]" : ""}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <g>
                                  <path
                                    d="M10 18.1432L1.55692 9.82794C0.689275 8.97929 0.147406 7.85276 0.0259811 6.64517C-0.0954433 5.43759 0.211298 4.22573 0.892612 3.22133C4.99987 -2.24739 10 4.10278 10 4.10278C10 4.10278 15.0001 -2.24739 19.1074 3.22133C19.7887 4.22573 20.0954 5.43759 19.974 6.64517C19.8526 7.85276 19.3107 8.97929 18.4431 9.82794L10 18.1432Z"
                                    fill="currentColor"
                                  ></path>
                                </g>
                              </svg>
                            </div>
                          </Link>
                          <Link
                            to={`movie/${slide?.slug}`}
                            className="min-w-[68px] h-[50px] flex justify-center items-center px-[.2rem] border-l-2 border-border-color"
                          >
                            <div className="w-[20px] h-[20px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                              >
                                <g>
                                  <path
                                    d="M10 0.75C4.47734 0.75 0 5.22734 0 10.75C0 16.2727 4.47734 20.75 10 20.75C15.5227 20.75 20 16.2727 20 10.75C20 5.22734 15.5227 0.75 10 0.75ZM11.2664 14.9523C11.2664 15.1187 11.2337 15.2833 11.17 15.437C11.1064 15.5906 11.0131 15.7302 10.8955 15.8478C10.7779 15.9654 10.6383 16.0587 10.4846 16.1224C10.331 16.186 10.1663 16.2188 10 16.2188C9.83369 16.2188 9.66901 16.186 9.51537 16.1224C9.36172 16.0587 9.22211 15.9654 9.10452 15.8478C8.98692 15.7302 8.89364 15.5906 8.82999 15.437C8.76635 15.2833 8.73359 15.1187 8.73359 14.9523V9.88633C8.73359 9.72002 8.76635 9.55534 8.82999 9.4017C8.89364 9.24805 8.98692 9.10844 9.10452 8.99084C9.22211 8.87325 9.36172 8.77996 9.51537 8.71632C9.66901 8.65268 9.83369 8.61992 10 8.61992C10.1663 8.61992 10.331 8.65268 10.4846 8.71632C10.6383 8.77996 10.7779 8.87325 10.8955 8.99084C11.0131 9.10844 11.1064 9.24805 11.17 9.4017C11.2337 9.55534 11.2664 9.72002 11.2664 9.88633V14.9523ZM10 7.81406C9.74953 7.81406 9.50468 7.73979 9.29642 7.60063C9.08816 7.46148 8.92584 7.26369 8.82999 7.03229C8.73414 6.80088 8.70906 6.54625 8.75793 6.30059C8.80679 6.05493 8.92741 5.82928 9.10452 5.65217C9.28163 5.47506 9.50728 5.35445 9.75294 5.30558C9.9986 5.25672 10.2532 5.2818 10.4846 5.37765C10.716 5.4735 10.9138 5.63582 11.053 5.84408C11.1921 6.05234 11.2664 6.29718 11.2664 6.54766C11.2665 6.71398 11.2337 6.87868 11.1701 7.03235C11.1065 7.18602 11.0132 7.32565 10.8956 7.44326C10.778 7.56086 10.6384 7.65414 10.4847 7.71777C10.331 7.78139 10.1663 7.81411 10 7.81406Z"
                                    fill="currentColor"
                                  ></path>
                                </g>
                              </svg>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slider thumbnails */}
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={movies?.length}
          watchSlidesProgress
          watchOverflow
          initialSlide={0}
          className="thumbs-wrapper"
        >
          {movies?.map((slide, index) => (
            <SwiperSlide
              key={index}
              className={`thumbs-slide ${index === activeIndex ? "swiper-slide-thumb-active" : ""}`}
            >
              <img
                src={slide.poster_url}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = slide?.thumb_url;
                }}
                className="w-full h-full bg-bg-color-2 rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Slides;
