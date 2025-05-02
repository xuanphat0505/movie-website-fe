import { useContext } from "react";

import { FavoritesContext } from "../contexts/FavoritesContext";
import MovieBox from "../shared/MovieBox";

import Loading from "../shared/Loading/Loading";
function MovieFavorite() {
  const { favorites, isLoading, removeFavorite } = useContext(FavoritesContext);
  
  return (
    <div className="body-box py-0">
      <div className="box-header flex flex-col justify-between items-start gap-4">
        <div className="heading-sm mb-0">Yêu thích</div>
        <div>
          <div className="tab-movie active">Phim</div>
          <div className="tab-movie">Diễn viên</div>
        </div>
      </div>
      <div className="w-full">
        {isLoading && <Loading height={200} />}
        {!isLoading && (
          <div className="card-grid-wrapper detail-suggest">
            {favorites.map((movie, index) => (
              <MovieBox
              key={index}
                type={1}
                removeButton={true}
                movie={movie}
                playListName={null}
                removeFavorite={removeFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieFavorite;
