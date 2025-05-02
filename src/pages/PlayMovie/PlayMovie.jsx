import { useContext, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import axios from "axios";

import { OpenContext } from "../../contexts/OpenContext";
import { WatchHistoryContext } from "../../contexts/WatchHistoryContext";
import { RateContext } from "../../contexts/RateContext";
import TopItemBox from "../../shared/TopItemBox";
import PlayerBox from "../../shared/PlayerBox";
import ListEpisode from "../../shared/ListEpisode";
import ShareDialog from "../../shared/Dialog/ShareDialog";
import RateDialog from "../../shared/Dialog/RateDialog";
import Loading from "../../shared/Loading/Loading";
import CommentBox from "../../components/CommentBox";

import "./PlayMovie.css";

function PlayMovie() {
  const { id } = useParams();
  const { watchHistory } = useContext(WatchHistoryContext);
  const { setOpenRateDialog } = useContext(OpenContext);
  const { movieRatings } = useContext(RateContext);
  const commentRef = useRef(null); // Add ref for the comment section

  const [movieDetail, setMovieDetail] = useState({});
  const [listEpisode, setListEpisode] = useState([]);
  const [suggestMovie, setSuggestMovie] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [selectedServer, setSelectedServer] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastPlayedTime, setLastPlayedTime] = useState(0);

  // Tạo state để theo dõi xem người dùng đã chọn tập chưa
  const [userSelected, setUserSelected] = useState(false);

  // Xử lý thông tin từ localStorage - ưu tiên cao nhất
  useEffect(() => {
    const savedServer = localStorage.getItem("selectedServer");
    const savedEpisode = localStorage.getItem("currentEpisode");
    const continueWatching = localStorage.getItem("continueWatching");

    if (savedServer !== null && savedEpisode !== null) {
      const serverIndex = parseInt(savedServer);
      const epIndex = parseInt(savedEpisode);

      // Kiểm tra tính hợp lệ của index
      if (
        listEpisode[serverIndex] &&
        listEpisode[serverIndex].server_data[epIndex]
      ) {
        setSelectedServer(serverIndex);
        setCurrentEpisode(epIndex);

        // Nếu continueWatching là true, tìm thời điểm đã xem trong lịch sử
        if (continueWatching === "true" && watchHistory.length > 0) {
          const historyItem = watchHistory.find(
            (item) => item.slug === movieDetail.slug
          );

          if (historyItem) {
            setLastPlayedTime(historyItem.currentTime);
          } else {
            setLastPlayedTime(0);
          }
        } else {
          // Nếu không phải tập đang xem, đặt lại thời gian bắt đầu
          setLastPlayedTime(0);
        }
      }

      // Xóa thông tin đã lưu
      localStorage.removeItem("selectedServer");
      localStorage.removeItem("currentEpisode");
      localStorage.removeItem("continueWatching");
    }
  }, [listEpisode, movieDetail, watchHistory]);
  const currentEpisodeData =
    listEpisode[selectedServer]?.server_data?.[currentEpisode];

  const handleEpisodeSelect = (serverIndex, epIndex) => {
    setSelectedServer(serverIndex);
    setCurrentEpisode(epIndex);
    setLastPlayedTime(0); // Đặt lại thời gian khi chọn tập mới
    setUserSelected(true); // Đánh dấu là người dùng đã chọn tập
  };
  // Xử lý watchHistory - chỉ khi chưa có lựa chọn từ user và sau khi đã có dữ liệu
  useEffect(() => {
    // Chỉ thực hiện khi đã có dữ liệu của phim và danh sách tập
    if (!movieDetail?.slug || !listEpisode.length) return;

    // Chỉ xử lý watchHistory nếu có
    if (watchHistory.length > 0) {
      const historyItem = watchHistory.find(
        (item) => item.slug === movieDetail.slug
      );

      if (historyItem && historyItem.episode && historyItem.episode.name) {
        let foundServer = -1;
        let foundEpisode = -1;

        // Tìm server và episode tương ứng
        listEpisode.forEach((server, serverIndex) => {
          server.server_data.forEach((ep, epIndex) => {
            if (ep.name === historyItem.episode.name) {
              foundServer = serverIndex;
              foundEpisode = epIndex;
            }
          });
        });

        if (foundServer !== -1 && foundEpisode !== -1) {
          setSelectedServer(foundServer);
          setCurrentEpisode(foundEpisode);
          setLastPlayedTime(historyItem.currentTime);
        }
      }
    }
  }, [movieDetail, listEpisode, watchHistory]);

  useEffect(() => {
    const fetchDB = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://phimapi.com/phim/${id}`);
        const result = res.data;
        setMovieDetail(result.movie);
        setListEpisode(result.episodes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert(error.message);
      }
    };
    fetchDB();
  }, [id]);

  useEffect(() => {
    const fetchSuggestMovie = async () => {
      try {
        if (movieDetail?.category?.length > 0) {
          const res = await axios.get(
            `https://phimapi.com/v1/api/the-loai/${movieDetail.category[0].slug}`,
            { page: 1 }
          );
          const result = res.data;
          setSuggestMovie(result.data.items);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    fetchSuggestMovie();
  }, [movieDetail?.category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentEpisode, selectedServer]);

  // Function to scroll to the comments section
  const scrollToComments = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#16151a]">
        <Loading />
      </div>
    );
  }

  return (
    <section className="section-page section-page__special ">
      <ShareDialog />
      <RateDialog movieId={movieDetail._id} />
      <main className="w-full pt-[5rem] pb-[10rem]">
        <div className="player-container relative w-full max-w-[1640px] px-[20px]">
          <div className="inline-flex items-center gap-2 w-full px-[40px] mb-[1.5rem] max-sm:mb-0 max-sm:mt-4 max-sm:px-[16px]">
            <Link
              to={`/movie/${id}`}
              className="inline-flex justify-center items-center text-[18px] w-[30px] h-[30px] p-[.4rem] mr-2 rounded-[50%] bg-transparent text-white-color border-[1px] border-[#ffffff80] hover:text-white-color hover:opacity-[.9]"
            >
              <i>
                <FaAngleLeft />
              </i>
            </Link>
            <h2 className="heading-sm mb-0 font-semibold leading-[1.5] text-white-color max-sm:text-[14px]">
              Xem phim {movieDetail?.name}
            </h2>
          </div>
          <PlayerBox
            episode={currentEpisodeData}
            movie={movieDetail}
            startTime={userSelected ? 0 : lastPlayedTime} // Nếu người dùng đã chọn tập, luôn bắt đầu từ 0
            userSelected={userSelected} // Truyền thêm prop này để PlayerBox biết
          />
        </div>
        <div className="watch-container">
          <div className="wc-main">
            <div className="wm-info w-full flex gap-6 pb-padding-base border-b-[1px] border-border-color">
              <div className="w-[100px] flex-shrink-0">
                <div className="v-thumbnail">
                  <img
                    src={movieDetail?.poster_url}
                    onError={(e) => (e.target.src = movieDetail?.thumb_url)}
                    alt=""
                  ></img>
                </div>
              </div>
              <div className="w-[360px] flex-shrink-0">
                <h2 className="heading-sm mb-2 capitalize">
                  <Link to={`/movie/${movieDetail?.slug}`}>
                    {movieDetail?.name}
                  </Link>
                </h2>
                <div className="text-primary-text mb-5 ">
                  {movieDetail?.origin_name}
                </div>
                <div>
                  <ul className="list mb-3">
                    <div className="tag">
                      <span>{movieDetail.year}</span>
                    </div>
                    <div className="tag">
                      <span>{movieDetail.time}</span>
                    </div>
                    <div className="tag">
                      <span>{movieDetail.episode_current}</span>
                    </div>
                  </ul>
                  <ul className="list mb-3">
                    {movieDetail?.category?.map((cat, index) => (
                      <Link
                        className="tag border-none"
                        key={index}
                        to={`/filter/${cat.slug}`}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex-grow-[1]">
                <div className="line-clamp-4 mb-6">{movieDetail?.content}</div>
                <Link
                  to={`/movie/${movieDetail?.slug}`}
                  className="inline-flex items-center text-primary-text hover:text-primary-text"
                >
                  Thông tin phim
                  <i className="mr-2">
                    <FaAngleRight />
                  </i>
                </Link>
              </div>
            </div>
            {listEpisode.map((episode, index) => (
              <ListEpisode
                key={index}
                padding={false}
                episodes={episode}
                onSelectEpisode={(epIndex) =>
                  handleEpisodeSelect(index, epIndex)
                }
                currentEpisode={selectedServer === index ? currentEpisode : -1}
              />
            ))}
            <div className="pt-[20px]" ref={commentRef}>
              <CommentBox
                type={2}
                movieId={movieDetail?._id}
                movieName={movieDetail.name}
                movieThumb={movieDetail?.thumb_url || movieDetail?.poster_url}
              />
            </div>
          </div>
          <div className="wc-side">
            <div className="w-full flex justify-between gap-4">
              <div className="inline-flex items-start gap-4 text-[13px]">
                <Link
                  className="item-v"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToComments();
                  }}
                >
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M30.36 14.63C30.94 14.06 31.15 13.23 30.9 12.45C30.65 11.67 29.99 11.12 29.18 11L21.46 9.88C21.46 9.88 21.38 9.85 21.37 9.81L17.92 2.81C17.56 2.08 16.83 1.62 16.01 1.62C15.19 1.62 14.46 2.07 14.1 2.81L10.65 9.81C10.65 9.81 10.6 9.87 10.55 9.88L2.83001 11C2.02001 11.12 1.37001 11.67 1.11001 12.45C0.860006 13.23 1.06001 14.06 1.65001 14.63L7.24001 20.08C7.24001 20.08 7.28001 20.15 7.28001 20.19L5.96001 27.88C5.82001 28.68 6.15001 29.48 6.81001 29.96C7.47001 30.44 8.33001 30.5 9.05001 30.12L15.96 26.49C15.96 26.49 16.04 26.47 16.08 26.49L22.99 30.12C23.3 30.29 23.64 30.37 23.98 30.37C24.42 30.37 24.86 30.23 25.23 29.96C25.89 29.48 26.21 28.68 26.08 27.88L24.76 20.19C24.76 20.19 24.76 20.11 24.8 20.08L30.39 14.63H30.36Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <span>Đánh giá</span>
                </Link>
                <div className="v-line"></div>
                <Link
                  className="item-v"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToComments();
                  }}
                >
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <g>
                        <path
                          d="M14.499 0.5H6.50109C3.19363 0.5 0.502686 3.19095 0.502686 6.4984V11.1638C0.502686 14.3596 3.01468 16.9796 6.16784 17.1532V19.9338C6.16784 20.2461 6.42244 20.5 6.73536 20.5C6.88498 20.5 7.02661 20.4407 7.13358 20.3337L7.75875 19.7085C9.40031 18.0666 11.5834 17.1622 13.9054 17.1622H14.499C17.8064 17.1622 20.4974 14.4713 20.4974 11.1638V6.4984C20.4974 3.19095 17.8064 0.5 14.499 0.5ZM6.16784 10.1641C5.4327 10.1641 4.83486 9.56625 4.83486 8.83111C4.83486 8.09597 5.4327 7.49813 6.16784 7.49813C6.90298 7.49813 7.50082 8.09597 7.50082 8.83111C7.50082 9.56625 6.90265 10.1641 6.16784 10.1641ZM10.5 10.1641C9.76488 10.1641 9.16704 9.56625 9.16704 8.83111C9.16704 8.09597 9.76488 7.49813 10.5 7.49813C11.2352 7.49813 11.833 8.09597 11.833 8.83111C11.833 9.56625 11.2348 10.1641 10.5 10.1641ZM14.8322 10.1641C14.0971 10.1641 13.4992 9.56625 13.4992 8.83111C13.4992 8.09597 14.0971 7.49813 14.8322 7.49813C15.5673 7.49813 16.1652 8.09597 16.1652 8.83111C16.1652 9.56625 15.567 10.1641 14.8322 10.1641Z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <span>Bình luận</span>
                </Link>
              </div>
              <div
                className="rating-button"
                onClick={() => setOpenRateDialog(true)}
              >
                <div className="rating-icon"></div>
                <span className="point">
                  {movieRatings[movieDetail._id]?.stats?.avgRate
                    ? (
                        movieRatings[movieDetail._id]?.stats?.avgRate * 2
                      ).toFixed(1)
                    : 0}
                </span>
                <span className="rate-text">Đánh giá</span>
              </div>
            </div>
            <div className="pt-padding-base border-t-[1px] border-border-color">
              <div className="child-header">Diễn viên</div>
              <div className="child-actor-list">
                {movieDetail?.actor?.map((actor, index) => (
                  <div className="actor-item" key={index}>
                    <Link className="actor-image">
                      <img
                        src={
                          "https://res.cloudinary.com/djmeybzjk/image/upload/v1745254290/user-image_gdijb9.avif"
                        }
                        alt=""
                      ></img>
                    </Link>
                    <div>
                      <h4 className="line-clamp-2">
                        <Link>{actor}</Link>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-padding-base border-t-[1px] border-border-color">
              <div className="child-header">
                <span>Đề xuất cho bạn</span>
              </div>
              <div className="w-full h-auto">
                {suggestMovie.map((movie, index) => (
                  <div className="top-movie" key={index}>
                    <TopItemBox movie={movie} pathImg={true} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default PlayMovie;
