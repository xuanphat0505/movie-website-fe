import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import axios from "axios";

import { OpenContext } from "../../contexts/OpenContext";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import MovieBox from "../../shared/MovieBox";
import CommentBox from "../../components/CommentBox";
import SideBarMovie from "../../components/SideBarMovie/SideBarMovie";
import ListEpisode from "../../shared/ListEpisode";
import ShareDialog from "../../shared/Dialog/ShareDialog";
import RateDialog from "../../shared/Dialog/RateDialog";
import Loading from "../../shared/Loading/Loading";
import PlayListPopUp from "../../shared/PlayListPopUp";
import { WatchHistoryContext } from "../../contexts/WatchHistoryContext";

import "./MovieDetail.css";
import { RateContext } from "../../contexts/RateContext";
function MovieDetail() {
  const { id } = useParams();

  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const { setOpenShareDialog, setOpenRateDialog, setOpenPlayListPopUp } =
    useContext(OpenContext);
  const { movieRatings } = useContext(RateContext);
  const [tabLink, setTabLink] = useState("tapphim");
  const [listEpisode, setListEpisode] = useState([]);
  const [movieDetail, setMovieDetail] = useState({});
  const [suggestMovie, setSuggestMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { watchHistory } = useContext(WatchHistoryContext);
  
  // Reference to the comments section
  const commentRef = useRef(null);
  
  const scrollToComments = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectEpisode = (serverIndex, episodeIndex) => {
    // Hiển thị loading trước khi chuyển trang
    document.getElementById("body-load").style.display = "flex";

    const selectedEpisodeName =
      listEpisode[serverIndex]?.server_data[episodeIndex]?.name;

    // Kiểm tra xem tập này có trong lịch sử xem không
    let continueWatching = false;

    // Nếu đang chọn tập 1 hoặc tập nào đó đã xem dở
    if (watchHistory && watchHistory.length > 0 && movieDetail?.slug) {
      const historyItem = watchHistory.find(
        (item) => item.slug === movieDetail.slug
      );

      // Nếu phim này có trong lịch sử và đang chọn tập giống như trong lịch sử
      if (
        historyItem &&
        historyItem.episode &&
        historyItem.episode.name === selectedEpisodeName
      ) {
        continueWatching = true;
        // Lưu thêm thông tin flagContinueWatch để PlayMovie biết là tiếp tục xem
        localStorage.setItem("continueWatching", "true");
      }
    }

    if (!continueWatching) {
      // Nếu không phải tập đã xem dở, đặt lại thời gian
      localStorage.setItem("continueWatching", "false");
    }

    // Lưu thông tin tập phim vào localStorage
    localStorage.setItem("selectedServer", serverIndex);
    localStorage.setItem("currentEpisode", episodeIndex);

    // Chuyển hướng đến trang PlayMovie
    window.location.href = `/player/${movieDetail?.slug}`;
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`https://phimapi.com/phim/${id}`);
        const result = res.data;
        setMovieDetail(result.movie);
        setListEpisode(result.episodes);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetail();
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

          // Filter out the current movie
          const filteredMovies = result.data.items.filter(
            (movie) => movie.slug !== movieDetail.slug
          );

          // Ensure we have at least 10 unique movies
          if (filteredMovies.length < 10) {
            // Fetch from other categories if needed
            for (let i = 1; i < movieDetail.category.length; i++) {
              const additionalRes = await axios.get(
                `https://phimapi.com/v1/api/the-loai/${movieDetail.category[i].slug}`,
                { page: 1 }
              );
              const additionalResult = additionalRes.data;

              const additionalFilteredMovies =
                additionalResult.data.items.filter(
                  (movie) =>
                    movie.slug !== movieDetail.slug &&
                    !filteredMovies.some(
                      (filteredMovie) => filteredMovie.slug === movie.slug
                    )
                );

              // Add unique movies to the filteredMovies array
              filteredMovies.push(...additionalFilteredMovies);
              // Break if we have enough movies
              if (filteredMovies.length >= 10) {
                break;
              }
            }
          }
          setSuggestMovie(filteredMovies.slice(0, 10));
        }
      } catch (error) {
        alert(error.message);
      }
    };
    fetchSuggestMovie();
  }, [movieDetail.category, movieDetail.slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
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
      <div className="top-wrapper">
        <div className="cover-fade">
          <div
            className="cover-image"
            style={{
              backgroundImage: `url(${movieDetail.thumb_url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </div>
      <main className="relative z-[9] pb-[10rem]">
        <div className="detail-container relative flex justify-between w-full max-w-[1640px] px-[20px] z-[3] mt-[-100px]">
          <SideBarMovie movie={movieDetail} />
          <div className="detail-main w-full flex flex-col flex-grow-[1] p-[30px]">
            <div className="dm-bar w-full flex items-center justify-between gap-8 pb-[30px]">
              <Link
                to={`/player/${movieDetail?.slug}`}
                className="play-btn w-auto flex-shrink-0 text-[18px] gap-4 py-[.95rem] px-[2rem] h-[60px] rounded-[2rem] font-medium"
              >
                <i>
                  <FaPlay size={15} />
                </i>
                <span className="capitalize">xem ngay</span>
              </Link>
              <div className="touch-group flex-grow-[1] flex items-center justify-between gap-8">
                <div className="flex items-center justify-start gap-4 max-sm:gap-6">
                  <Tippy
                    content={
                      <div className="w-[190px] min-h-[50px] p-1 text-center font-normal text-[14px] text-black-color">
                        Thêm phim vào danh sách yêu thích để nhận thông báo cập
                        nhận về phim nhé
                      </div>
                    }
                    placement="top"
                    theme="light"
                  >
                    <div className="button-item">
                      <Link
                        to={"#"}
                        onClick={() => toggleFavorite(movieDetail)}
                      >
                        <div
                          className={`icon-box ${isFavorite(movieDetail) ? "text-[#ffd875]" : ""}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                          >
                            <g>
                              <path
                                d="M10 18.1432L1.55692 9.82794C0.689275 8.97929 0.147406 7.85276 0.0259811 6.64517C-0.0954433 5.43759 0.211298 4.22573 0.892612 3.22133C4.99987 -2.24739 10 4.10278 10 4.10278C10 4.10278 15.0001 -2.24739 19.1074 3.22133C19.7887 4.22573 20.0954 5.43759 19.974 6.64517C19.8526 7.85276 19.3107 8.97929 18.4431 9.82794L10 18.1432Z"
                                fill="currentColor"
                              ></path>
                            </g>
                          </svg>
                        </div>
                        <span className="text-white-color">Yêu thích</span>
                      </Link>
                    </div>
                  </Tippy>
                  <div className="button-item relative">
                    <Link
                      to={"#"}
                      onClick={() => setOpenPlayListPopUp((prev) => !prev)}
                    >
                      <div className="icon-box">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100"
                          height="100"
                          viewBox="0 0 100 100"
                        >
                          <path
                            d="M89.7273 41.6365H58.3635V10.2727C58.3635 6.81018 55.5534 4 52.0908 4H47.9092C44.4466 4 41.6365 6.81018 41.6365 10.2727V41.6365H10.2727C6.81018 41.6365 4 44.4466 4 47.9092V52.0908C4 55.5534 6.81018 58.3635 10.2727 58.3635H41.6365V89.7273C41.6365 93.1898 44.4466 96 47.9092 96H52.0908C55.5534 96 58.3635 93.1898 58.3635 89.7273V58.3635H89.7273C93.1898 58.3635 96 55.5534 96 52.0908V47.9092C96 44.4466 93.1898 41.6365 89.7273 41.6365Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-white-color">Thêm vào</span>
                    </Link>
                    <PlayListPopUp movie={movieDetail} />
                  </div>
                  <div className="button-item">
                    <Link onClick={() => setOpenShareDialog((prev) => !prev)}>
                      <div className="icon-box">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                        >
                          <path
                            d="M16.3628 0.651489C15.946 0.223669 15.3291 0.0642849 14.7538 0.232058L1.34002 4.13277C0.733102 4.30139 0.302926 4.78541 0.187045 5.4003C0.0686637 6.02609 0.482166 6.82049 1.02239 7.15268L5.2166 9.73051C5.64678 9.99475 6.20201 9.92848 6.55799 9.56945L11.3608 4.73676C11.6026 4.4851 12.0027 4.4851 12.2445 4.73676C12.4862 4.98003 12.4862 5.37429 12.2445 5.62595L7.43334 10.4595C7.07653 10.8177 7.00984 11.3755 7.27245 11.8084L9.83516 16.0446C10.1353 16.548 10.6522 16.8332 11.2191 16.8332C11.2858 16.8332 11.3608 16.8332 11.4275 16.8248C12.0777 16.7409 12.5946 16.2963 12.7864 15.6671L16.763 2.2705C16.9381 1.70007 16.7797 1.07931 16.3628 0.651489Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-white-color">Chia sẻ</span>
                    </Link>
                  </div>
                  <div className="button-item max-sm:hidden">
                    <Link onClick={scrollToComments}>
                      <div className="icon-box">
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
                      <span className="text-white-color">Bình luận</span>
                    </Link>
                  </div>
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
                  <span className="rate-text max-sm:hidden">Đánh giá</span>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-[40px] px-[10px] max-md:p-0">
              <div className="movie-body">
                <div className="tab-list w-full flex flex-wrap border-b-[1px] border-border-color">
                  <Link
                    className={`nav-link ${tabLink === "tapphim" ? "active" : ""}`}
                    onClick={() => setTabLink("tapphim")}
                  >
                    Tập phim
                  </Link>
                  <Link
                    className={`nav-link ${tabLink === "dienvien" ? "active" : ""}`}
                    onClick={() => setTabLink("dienvien")}
                  >
                    Diễn viên
                  </Link>
                  <Link
                    className={`nav-link ${tabLink === "dexuat" ? "active" : ""}`}
                    onClick={() => setTabLink("dexuat")}
                  >
                    Đề xuất
                  </Link>
                </div>
                <div className="tab-content">
                  <div
                    className={`fade tab-element ${tabLink === "tapphim" ? "show" : ""}`}
                  >
                    {listEpisode.map((episode, index) => (
                      <ListEpisode
                        key={index}
                        padding={true}
                        episodes={episode}
                        onSelectEpisode={(epIndex) =>
                          handleSelectEpisode(index, epIndex)
                        }
                      />
                    ))}
                  </div>
                  <div
                    className={`fade tab-element ${tabLink === "dienvien" ? "show" : ""}`}
                  >
                    <div className="body-box">
                      <h3 className="heading-md box-header">Diễn viên</h3>
                      <div className="detail-actors grid ">
                        {movieDetail?.actor?.map((actor, index) => (
                          <div
                            className="item-actor relative rounded-[.6rem] overflow-hidden"
                            key={index}
                          >
                            <div className="w-full flex flex-col items-center gap-0 text-center">
                              <Link className="v-actor">
                                <img src="https://res.cloudinary.com/djmeybzjk/image/upload/v1745254290/user-image_gdijb9.avif" alt=""></img>
                              </Link>
                              <div className="relative py-3 px-2 mt-[-40px] z-[2]">
                                <h4 className="mb-[.4rem] text-white-color text-[1em] font-normal leading-[1.5]">
                                  <Link className="capitalize">{actor}</Link>
                                </h4>
                                <div className="text-[.9em]">
                                  <span className="capitalize text-[#f0adb1]">
                                    {actor}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`fade tab-element ${tabLink === "dexuat" ? "show" : ""}`}
                  >
                    <div className="body-box">
                      <h3 className="heading-md box-header">
                        Có thể bạn sẽ thích
                      </h3>
                      <div>
                        <div className="card-grid-wrapper detail-suggest">
                          {suggestMovie.map((movie, index) => (
                            <MovieBox key={index} type={1} movie={movie} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div ref={commentRef}>
                <CommentBox
                  movieId={movieDetail._id}
                  movieName={movieDetail.name}
                  movieThumb={movieDetail?.thumb_url || movieDetail?.poster_url}
                  type={2}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default MovieDetail;
