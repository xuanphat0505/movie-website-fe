import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowTrendUp, FaClapperboard } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { OpenContext } from "../../contexts/OpenContext";

import "./Dialog.css";
function RankMovieDialog() {
  const { setOpenRankDialog, openRankDialog, movies } = useContext(OpenContext);

  return (
    <div
      className={`dialog ${openRankDialog ? "show" : ""}`}
      onClick={() => setOpenRankDialog(false)}
    >
      <div className="modal-md modal-dialog">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button
            className="close-dialog"
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện click lan ra .dialog
              setOpenRankDialog(false);
            }}
          >
            <i>
              <FaTimes size={16} />
            </i>
          </button>
          <div className="rank-title">
            <i>
              <FaClapperboard size={16} className="text-primary-color" />
            </i>
            <span>sôi nổi nhất</span>
          </div>
          <div className="big-chart chart-list">
            {movies?.map((movie, index) => (
              <div
                className="item h-[70px] flex items-center gap-[1rem]"
                key={movie._id}
              >
                <div className="w-[24px] text-[1.2em] font-semibold opacity-[.3]">
                  {index + 1}.
                </div>
                <div>
                  <i>
                    <FaArrowTrendUp size={16} className="text-[#bedc33] " />
                  </i>
                </div>
                <div className="chart-thumbnail w-[36px] h-[50px] rounded-[.2rem] ">
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
                <h4 className="text-[1em] font-normal text-white-color line-clamp-2 leading-[1.5]">
                  <Link to={`/movie/${movie.slug}`} className="capitalize">
                    {movie.name}
                  </Link>
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankMovieDialog;
