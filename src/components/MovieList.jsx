import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaRegCirclePlay } from "react-icons/fa6";

import { OpenContext } from "../contexts/OpenContext";
import { PlayListContext } from "../contexts/PlayListContext";
import MovieBox from "../shared/MovieBox";

function MovieList() {
  const {
    setOpenAddPlayListDialog,
    setOpenEditPlayListDialog,
    setSelectedPlayList,
  } = useContext(OpenContext);
  const { playLists, getPlayLists } = useContext(PlayListContext);

  const [movies, setMovies] = useState([]);
  const [playListName, setPlayListName] = useState("");

  useEffect(() => {
    getPlayLists();
  }, []);

  useEffect(() => {
    const selectedList = playLists.find(
      (list) => list.playListName === playListName
    );
    if (selectedList && selectedList.movies) {
      setMovies(selectedList.movies);
    } else if (playLists.length > 0 && !playListName) {
      setPlayListName(playLists[0].playListName);
      setMovies(playLists[0].movies || []);
    }
  }, [playLists, playListName]);

  const handleEditPlayList = (e, list) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
    setSelectedPlayList(list);
    setOpenEditPlayListDialog(true);
  };



  return (
    <div className="body-box py-0">
      <div className="box-header flex justify-start items-center gap-4">
        <div className="heading-sm mb-0">Danh sách</div>
        <Link
          to={"#"}
          onClick={() => setOpenAddPlayListDialog(true)}
          className="btn gap-[.3rem] py-[.2rem] px-[.5rem] min-h-[26px] text-[11px] border-[1px] border-[#ffffff80] rounded-[2rem] hover:text-white-color hover:opacity-[0.9]"
        >
          <i>
            <FaPlus />
          </i>
          <span>Thêm mới</span>
        </Link>
      </div>
      <div className="playlist">
        {playLists.map((list) => (
          <div
            className={`item ${list.playListName === playListName ? "active" : ""}`}
            onClick={() => setPlayListName(list.playListName)}
            key={list._id}
          >
            <div className="line-clamp-2 font-semibold text-[1em] text-white-color">
              {list.playListName}
            </div>
            <div className="inline-flex items-center gap-4 w-full text-[.875em]">
              <div className="flex flex-grow-[1]">
                <i className="mr-1">
                  <FaRegCirclePlay />
                </i>
                {list?.movies?.length || 0} phim
              </div>
              <div
                className="hover:cursor-pointer hover:underline"
                onClick={(e) => handleEditPlayList(e, list)}
              >
                Sửa
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card-grid-wrapper detail-suggest">
        {movies.length > 0 &&
          movies.map((movie) => (
            <MovieBox
              key={movie._id }
              movie={movie}
              type={1}
              removeButton={true}
              playListName={playListName}
            />
          ))}
      </div>
    </div>
  );
}

export default MovieList;
