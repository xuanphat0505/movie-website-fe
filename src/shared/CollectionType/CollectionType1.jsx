/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import MovieBox from "../MovieBox";

import "./CollectionType.css";
function CollectionType1({ type, movies, title, slug, isLoading, colorIndex }) {
  const breakpoints1 = {
    200: {
      slidesPerView: 1,
    },
    300: {
      slidesPerView: 2,
    },
    400: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
    1030: {
      slidesPerView: 6,
      spaceBetween: 16,
    },
    1500:{
      slidesPerView: 7,
      spaceBetween: 16,
    },
    1600:{
      slidesPerView: 8,
      spaceBetween: 16,
    }
  };
  const breakpoints2 = {
    200: {
      slidesPerView: 1,
    },
    300: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    400: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1030: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    1600: {
      slidesPerView: 5,
      spaceBetween: 16,
    },
  };
  const gradientColor = [
    "linear-gradient(235deg, rgb(255, 255, 255) 30%, rgb(103, 65, 150) 130%)",
    "linear-gradient(235deg, rgb(255, 255, 255) 30%, rgb(247, 161, 11) 130%)",
    "linear-gradient(235deg, rgb(255, 255, 255) 30%, rgb(255, 0, 153) 130%)",
  ];

  const MovieSkeleton = () => (
    <div className="w-full">
      <Skeleton height={type === 1 ? 300 : 200} />
      <Skeleton height={20} width={150} style={{ marginTop: 10 }} />
      <Skeleton height={15} width={100} style={{ marginTop: 5 }} />
    </div>
  );

  return (
    <div className="w-full relative">
      <div
        className={`movie-grid-wrapper ${type === 1 ? "flex-col" : "flex-row"}`}
      >
        <div
          className={`collection-title m-0 justify-between ${type === 1 ? "" : "type-2"}`}
        >
          {isLoading ? (
            <Skeleton height={30} width={200} />
          ) : (
            <div
              className={`heading-xs mb-0 ${type === 1 ? "" : "text-gradient"}`}
              style={{ background: gradientColor[colorIndex] }}
            >
              {title}
            </div>
          )}
          {!isLoading && (
            <Link
              to={`/filter/${slug}`}
              className="inline-flex items-center gap-2 text-[14px] leading-[1.6] font-normal"
            >
              <span>Xem toàn bộ</span>
              <i>
                <FaAngleRight />
              </i>
            </Link>
          )}
        </div>
        <div
          className={`${type === 1 ? "w-full relative" : "movie-slide-wrapper"} `}
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={type === 1 ? 6 : 3}
            loop={true}
            spaceBetween={16}
            className="movie-slides"
            breakpoints={type === 1 ? breakpoints1 : breakpoints2}
          >
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <SwiperSlide key={index}>
                      <MovieSkeleton />
                    </SwiperSlide>
                  ))
              : movies?.map((movie) => (
                  <SwiperSlide key={movie._id}>
                    <MovieBox type={type} movieId={movie.id} movie={movie} />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default CollectionType1;
