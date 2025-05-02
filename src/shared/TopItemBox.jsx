/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function TopItemBox({ movie, pathImg }) {
  return (
    <div className="top-content">
      <div className="w-[80px] h-[120px] flex-shrink-0 rounded-lg overflow-hidden">
        <Link className="w-full h-full">
          <img
            src={
              pathImg
                ? `https://phimimg.com/${movie?.poster_url}`
                : movie?.poster_url
            }
            onError={(e) =>
              (e.target.src = pathImg
                ? `https://phimimg.com/${movie?.thumb_url}`
                : movie?.thumb_url)
            }
            alt=""
            className="h-full"
          ></img>
        </Link>
      </div>
      <div className="flex-grow-[1] py-[.6rem] px-4">
        <h4 className="mb-[.4rem] text-[1em] font-normal leading-[1.5] text-white-color capitalize">
          <Link to={`/movie/${movie?.slug}`}>{movie?.name}</Link>
        </h4>
        <div className="line-clamp-1 mb-2 capitalize">{movie?.origin_name}</div>
        <div className="w-full">
          <div className="tag-small">{movie?.year}</div>
          {movie?.type === "single" && (
            <div className="tag-small">{movie?.time}</div>
          )}
          {movie?.type === "series" && (
            <div className="tag-small">{movie?.episode_current}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopItemBox;
