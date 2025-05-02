import { useContext, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";

import { PlayListContext } from "../contexts/PlayListContext";
import { OpenContext } from "../contexts/OpenContext";

function PlayListPopUp({ movie }) {
  const { openPlayListPopUp, setOpenAddPlayListDialog, setOpenPlayListPopUp } =
    useContext(OpenContext);
  const { playLists, getPlayLists, addToPlayList, isMovieInPlayList } =
    useContext(PlayListContext);

  useEffect(() => {
    getPlayLists();
  }, [getPlayLists]);

  const handleCheckboxChange = async (playListName) => {
    await addToPlayList(movie, playListName);
  };

  const handleCreateNewList = () => {
    localStorage.setItem("pendingMovie", JSON.stringify(movie));
    setOpenAddPlayListDialog(true);
  };

  return (
    <div className={`dropdown-menu ${openPlayListPopUp ? "show" : ""}`}>
      <div className="dropdown-blank">
        <span className="flex-grow-[1]">Danh sách</span>
        <small>{playLists.length}/5</small>
      </div>
      {playLists.map((list) => (
        <li className="list-none" key={list._id}>
          <div className="dropdown-checkbox">
            <input
              type="checkbox"
              id={list.playListName}
              checked={isMovieInPlayList(list.playListName, movie?.slug)}
              onChange={() => handleCheckboxChange(list.playListName)}
              disabled={isMovieInPlayList(list.playListName, movie?.slug)}
            />
            <label className="dropdown-label" htmlFor={list.playListName}>
              {list.playListName}
            </label>
          </div>
        </li>
      ))}
      {playLists.length < 5 && (
        <li className="list-none">
          <div className="dropdown-blank">
            <button
              type="button"
              onClick={handleCreateNewList}
              className="btn btn-primary btn-sm w-full"
            >
              <i>
                <FaPlus />
              </i>
              Thêm mới
            </button>
          </div>
        </li>
      )}
    </div>
  );
}

export default PlayListPopUp;
