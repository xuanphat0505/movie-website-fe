/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

import { WatchHistoryContext } from "../contexts/WatchHistoryContext";
import { PlayListContext } from "../contexts/PlayListContext";
import Loader from "../shared/Loader";

function MovieBox({ movie, type, removeButton, removeFavorite, playListName }) {
  const { removeFromHistory } = useContext(WatchHistoryContext);
  const { removeFromPlayList } = useContext(PlayListContext);
  const parts = movie?.lang
    ? movie?.lang
        .split(" + ")
        .map((part) =>
          part === "Vietsub" ? "P.Đề" : part === "Thuyết Minh" ? "T.Minh" : ""
        )
    : [];

  // Hàm kiểm tra và chuẩn hóa URL
  const getImageUrl = (url) => {
    // Nếu URL đã bắt đầu bằng http hoặc https, trả về nguyên vẹn
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      return url;
    }
    // Ngược lại, thêm domain
    return `https://phimimg.com/${url}`;
  };

  // Hàm định dạng thời gian từ seconds sang "Xh Xm"
  const formatTime = (seconds) => {
    if (!seconds) return "00m";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes > 0 ? minutes + "m" : ""}`;
    } else {
      return `${minutes}m`;
    }
  };

  const handleRemove = async () => {
    if (removeFavorite) {
      await removeFavorite(movie?.slug);
    } else if (playListName) {
      await removeFromPlayList(playListName, movie?.movieId);
    } else {
      await removeFromHistory(movie?.slug);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 relative ">
      {removeButton && (
        <div className="pin-remove" onClick={handleRemove}>
          <i>
            <FaTimes />
          </i>
        </div>
      )}
      <Link
        className={`v-thumbnail ${type === 1 ? "" : "v-thumbnail-2"} hover:text-white-color `}
      >
        <img
          src={getImageUrl(movie?.thumb_url)}
          alt=""
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getImageUrl(movie?.poster_url);
          }}
        ></img>
        {(parts?.[0] || parts?.[1]) && (
          <div className="absolute bottom-0 left-[50%] translate-x-[-50%] flex justify-center items-center rounded-t-[.3rem] z-[3] overflow-hidden">
            {parts?.[0] && (
              <div className="inline-block py-[.2rem] px-[.5rem] text-[11px] font-normal bg-[#5E606F]">
                {parts[0]}
              </div>
            )}
            {parts?.[1] && (
              <div className="inline-block py-[.2rem] px-[.5rem] text-[11px] font-normal bg-[#2ca35d]">
                {parts[1]}
              </div>
            )}
          </div>
        )}
      </Link>
      <div className="w-full">
        {movie?.currentTime && movie?.duration && (
          <>
            <div className="watched-bar mt-1">
              <span style={{ width: `${movie.progressPercent}%` }}></span>
            </div>
            <div className="watched-info">
              <div className="w-item">{movie.episode?.name}</div>
              <div className="w-item">
                {formatTime(movie.currentTime)}{" "}
                <span className="opacity-[0.4]">
                  / {formatTime(movie.duration)}
                </span>
              </div>
            </div>
          </>
        )}
        <h4 className={`${type === 1 ? "text-center" : ""} text-[1em] font-normal leading-[1.5] text-white-color line-clamp-1`}>
          <Link className="capitalize" to={`/movie/${movie?.slug}`}>
            {movie?.name}
          </Link>
        </h4>
        <h4 className={`${type === 1 ? "text-center" : ""} text-[.9em] mt-[5px] line-clamp-1`}>
          <Link className="capitalize text-text-base hover:text-text-base" to={`/movie/${movie?.slug}`}>
            {movie?.origin_name}
          </Link>
        </h4>
      </div>
    </div>
  );
}

export default MovieBox;
