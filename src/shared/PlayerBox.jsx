/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { FaFlag } from "react-icons/fa6";
import ReactPlayer from "react-player";
import Tippy from "@tippyjs/react";

import { OpenContext } from "../contexts/OpenContext";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { WatchHistoryContext } from "../contexts/WatchHistoryContext";
import Loading from "../shared/Loading/Loading";
import PlayListPopUp from "./PlayListPopUp";

function PlayerBox({ episode, movie, startTime = 0, userSelected = false }) {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const {
    toggle,
    setToggle,
    openShareDialog,
    openPlayListPopUp,
    setOpenShareDialog,
    setOpenPlayListPopUp,
  } = useContext(OpenContext);
  const { updateWatchHistory } = useContext(WatchHistoryContext);
  const playerRef = useRef(null);
  const [lastTime, setLastTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const handleTimeUpdate = (state) => {
    const { playedSeconds } = state;
    if (playedSeconds > lastTime + 5) {
      saveWatchProgress(playedSeconds);
      setLastTime(playedSeconds);
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      saveWatchProgress(currentTime);
    }
  };

  const saveWatchProgress = (currentTime) => {
    if (!movie || !movie._id || !movie.slug || !episode) {
      console.error("Missing required movie data:", { movie, episode });
      return;
    }

    if (!playerRef.current) {
      console.error("Player reference is missing");
      return;
    }

    const duration = playerRef.current.getDuration();
    if (!duration || isNaN(duration) || duration <= 0) {
      console.error("Invalid duration:", duration);
      return;
    }

    if (currentTime < 5) {
      return;
    }

    const movieData = {
      _id: movie._id,
      slug: movie.slug,
      name: movie.name || "",
      thumb_url: movie.thumb_url || "",
      poster_url: movie.poster_url || "",
      lang: movie.lang || "",
    };

    const episodeData = {
      name: episode.name || "",
    };
    updateWatchHistory(movieData, currentTime, duration, episodeData);
  };

  useEffect(() => {
    return () => {
      if (playerRef.current && movie && movie._id && movie.slug) {
        const currentTime = playerRef.current.getCurrentTime();
        saveWatchProgress(currentTime);
      }
    };
  }, [movie, episode]);

  useEffect(() => {
    if (playerRef.current && startTime > 5 && !hasStarted && !userSelected) {
      const timer = setTimeout(() => {
        playerRef.current.seekTo(startTime);
        setHasStarted(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [playerRef.current, startTime, hasStarted, episode, userSelected]);

  useEffect(() => {
    setHasStarted(false);
  }, [episode]);

  return (
    <div className="player-ratio relative z-[105]">
      <div className="bg-[#08080a] overflow-hidden rounded-t-[.75rem] w-full max-md:rounded-none">
        {!episode || !episode.link_m3u8 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loading />
          </div>
        ) : (
          <ReactPlayer
            ref={playerRef}
            url={episode.link_m3u8}
            className="react-player"
            width="100%"
            height="100%"
            controls
            playing={!openShareDialog}
            onTimeUpdate={handleTimeUpdate}
            onPause={handlePause}
            progressInterval={10000}
          />
        )}
      </div>
      <div className="player-control">
        <div className="player-content flex items-center gap-4 w-full px-[20px]">
          <Tippy
            placement="top"
            theme="light"
            content={
              <div className="w-[190px] min-h-[50px] p-1 text-center font-normal text-[14px] text-black-color">
                Thêm phim vào danh sách yêu thích để nhận thông báo cập nhận về
                phim nhé
              </div>
            }
          >
            <div
              className={`item ${toggle ? "visible" : ""}`}
              onClick={() => toggleFavorite(movie)}
            >
              <div
                className={`item-icon ${isFavorite(movie) ? "text-[#ffd875]" : ""}`}
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
              <span>Yêu thích</span>
            </div>
          </Tippy>
          <div
            className={`item ${toggle ? "visible" : ""} ${openPlayListPopUp ? "active" : ""} relative`}
            onClick={() => setOpenPlayListPopUp((prev) => !prev)}
          >
            <div className="item-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M89.7273 41.6365H58.3635V10.2727C58.3635 6.81018 55.5534 4 52.0908 4H47.9092C44.4466 4 41.6365 6.81018 41.6365 10.2727V41.6365H10.2727C6.81018 41.6365 4 44.4466 4 47.9092V52.0908C4 55.5534 6.81018 58.3635 10.2727 58.3635H41.6365V89.7273C41.6365 93.1898 44.4466 96 47.9092 96H52.0908C55.5534 96 58.3635 93.1898 58.3635 89.7273V58.3635H89.7273C93.1898 58.3635 96 55.5534 96 52.0908V47.9092C96 44.4466 93.1898 41.6365 89.7273 41.6365Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <span>Thêm vào</span>
            <PlayListPopUp movie={movie} />
          </div>
          <div
            className={`item item-focus ${toggle ? "focus" : ""}`}
            onClick={() => setToggle((prev) => !prev)}
          >
            <span>Rạp phim</span>
            <div className="toggle-basic">{toggle ? "on" : "off"}</div>
          </div>
          <div
            className={`item ${toggle ? "visible" : ""}`}
            onClick={() => setOpenShareDialog((prev) => !prev)}
          >
            <div className="item-icon">
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
            <span>Chia sẻ</span>
          </div>
          <div className="flex-grow-[1]"></div>
          <div className={`item ${toggle ? "visible" : ""}`}>
            <i>
              <FaFlag />
            </i>
            <span>Báo lỗi</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerBox;
