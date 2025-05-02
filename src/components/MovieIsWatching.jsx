import { useContext } from "react";
import { WatchHistoryContext } from "../contexts/WatchHistoryContext";

import MovieBox from "../shared/MovieBox";
import Loading from "../shared/Loading/Loading";

function MovieIsWatching() {
  const { watchHistory,isLoading } = useContext(WatchHistoryContext);
  
  return (
    <div className="box-body py-0">
      <div className="box-header mb-6">
        <div className="heading-sm mb-0">Danh sách xem tiếp</div>
      </div>
      <div className="w-full">
        {isLoading && <Loading height={200} />}
        {!isLoading && (
          <div className="card-grid-wrapper detail-suggest">
            {watchHistory?.map((history, index) => (
              <MovieBox
                key={index}
                type={1}
                removeButton={true}
                movie={history}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieIsWatching;
