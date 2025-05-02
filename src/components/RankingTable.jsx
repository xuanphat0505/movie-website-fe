import { useContext, useEffect, useState } from "react";
import {
  FaClapperboard,
  FaHeartCircleCheck,
  FaBolt,
  FaArrowTrendUp,
  FaPlay,
  FaFolderPlus,
  FaArrowTrendDown,
  FaMinus,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { OpenContext } from "../contexts/OpenContext";
import { CommentContext } from "../contexts/CommentContext";
import axios from "axios";
import { hotTypes } from "../assets/data/data";

function RankingTable() {
  const { handleOpenRankMovieDialog, handleOpenRankTypeDialog } =
    useContext(OpenContext);
  const { newComments } = useContext(CommentContext);
  const [excitingMovies, setExcitingMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?page=1"
        );
        const result = res.data;
        return setExcitingMovies(result.items);
      } catch (error) {
        return alert(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-auto ">
      <div className="w-full h-auto flex border-[1px] border-[#fff2] rounded-b-[1rem]  border-t-0">
        <div className="table-col col-01 ">
          <div className="rank-title">
            <i>
              <FaClapperboard size={16} className="text-primary-color" />
            </i>
            <span>sôi nổi nhất</span>
          </div>
          <div className="chart-list">
            {excitingMovies?.slice(0, 5).map((movie, index) => (
              <div
                className="item h-[50px] flex items-center gap-[1rem]"
                key={movie._id}
              >
                <div className="w-[16px] text-[1.2em] font-semibold opacity-[.3] flex-shrink-0">
                  {index + 1}.
                </div>
                <div className="flex-shrink-0">
                  <i>
                    <FaArrowTrendUp size={16} className="text-[#bedc33]" />
                  </i>
                </div>
                <div className="v-thumbnail w-[25px] h-[36px] rounded-[.1rem] pb-[36px] flex-shrink-0">
                  <img
                    src={movie.thumb_url}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `${movie?.poster_url}`;
                    }}
                    alt=""
                  ></img>
                </div>
                <h4 className="text-[1em] font-normal text-white-color line-clamp-1 min-w-0 flex-grow overflow-hidden">
                  <Link
                    to={`/movie/${movie.slug}`}
                    className="capitalize truncate block"
                  >
                    {movie.name}
                  </Link>
                </h4>
              </div>
            ))}
            <div className="w-full mt-2">
              <Link
                onClick={() =>
                  handleOpenRankMovieDialog(excitingMovies?.slice(0, 10))
                }
                className="text-[#fff5] text-[.75rem]"
              >
                Xem thêm
              </Link>
            </div>
          </div>
        </div>
        <div className="table-col col-02">
          <div className="rank-title">
            <i>
              <FaHeartCircleCheck size={16} className="text-primary-color" />
            </i>
            <span>yêu thích nhất</span>
          </div>
          <div className="chart-list">
            {excitingMovies?.slice(10, 15).map((movie, index) => (
              <div
                className="item h-[50px] flex items-center gap-[1rem]"
                key={movie._id}
              >
                <div className="w-[16px] text-[1.2em] font-semibold opacity-[.3] flex-shrink-0">
                  {index + 1}.
                </div>
                <div className="flex-shrink-0">
                  <i>
                    <FaArrowTrendUp size={16} className="text-[#bedc33]" />
                  </i>
                </div>
                <div className="v-thumbnail w-[25px] h-[36px] rounded-[.1rem] pb-[36px] flex-shrink-0">
                  <img
                    src={movie.thumb_url}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `${movie?.poster_url}`;
                    }}
                    alt=""
                    className="w-full h-full"
                  ></img>
                </div>
                <h4 className="text-[1em] font-normal text-white-color line-clamp-1 min-w-0 flex-grow overflow-hidden">
                  <Link
                    to={`/movie/${movie.slug}`}
                    className="capitalize truncate block"
                  >
                    {movie?.name}
                  </Link>
                </h4>
              </div>
            ))}
            <Link
              onClick={() =>
                handleOpenRankMovieDialog(excitingMovies?.slice(10, 20))
              }
              className="text-[#fff5] text-[.75rem]"
            >
              Xem thêm
            </Link>
          </div>
        </div>
        <div className="table-col col-03">
          <div className="rank-title">
            <i>
              <FaFolderPlus size={16} className="text-primary-color" />
            </i>
            <span>sôi nổi nhất</span>
          </div>
          <div className="chart-list">
            {hotTypes.slice(0, 5).map((type, index) => (
              <div
                className="item h-[50px] flex items-center gap-[1rem]"
                key={index}
              >
                <div className="w-[16px] text-[1.2em] font-semibold opacity-[.3] flex-shrink-0">
                  {index + 1}.
                </div>
                <div className="flex-shrink-0">
                  <i>
                    {type.trend === "up" ? (
                      <FaArrowTrendUp size={16} className="text-[#bedc33]" />
                    ) : type.trend === "down" ? (
                      <FaArrowTrendDown size={16} className="text-[#dc328c]" />
                    ) : (
                      <FaMinus size={16} className="text-[#fff3]" />
                    )}
                  </i>
                </div>
                <div
                  className="flex items-center h-[28px] px-[.8rem] text-[13px] rounded-[30px] text-white-color"
                  style={{ background: type.color }}
                >
                  <Link className="capitalize hover:text-current">{type.type}</Link>
                </div>
              </div>
            ))}
            <Link
              onClick={() => handleOpenRankTypeDialog(hotTypes)}
              className="text-[#fff5] text-[.75rem]"
            >
              Xem thêm
            </Link>
          </div>
        </div>
        <div className="table-col col-04">
          <div className="rank-title">
            <i>
              <FaBolt size={16} className="text-primary-color" />
            </i>
            <span>bình luận mới</span>
          </div>
          <div className="relative">
            <Swiper
              className="max-h-[282px]"
              modules={[Autoplay]}
              autoplay={true}
              direction="vertical"
              slidesPerView={4}
              spaceBetween={5}
              loop={true}
            >
              {newComments.map((comment) => (
                <SwiperSlide key={comment._id}>
                  <div className="w-full h-full relative block">
                    <Link className="comment-box relative">
                      <div className="user-avatar">
                        <img src={comment?.userId?.avatar} alt=""></img>
                      </div>
                      <div className="comment text-[12px] line-clamp-1">
                        <span className="text-white-color font-medium">
                          {comment?.userId?.username}{" "}
                        </span>
                        {comment?.content}
                      </div>
                      <div className="comment-movie inline-flex items-center gap-1  text-[12px] leading-[1.5] text-[#fff5]">
                        <small>
                          <i>
                            <FaPlay size={8} className="text-primary-color" />
                          </i>
                        </small>
                        <span className="line-clamp-1 capitalize">
                          {comment?.movieName}
                        </span>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingTable;
