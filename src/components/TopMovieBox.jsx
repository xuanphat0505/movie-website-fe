import { Link } from "react-router-dom";

import TopItemBox from "../shared/TopItemBox";

function TopMovieBox({ postition, movie, pathImg }) {
  return (
    <div className="top-movie flex items-center justify-between">
      <div className="position">{postition}</div>
      <TopItemBox movie={movie} pathImg={pathImg} />
    </div>
  );
}

export default TopMovieBox;
