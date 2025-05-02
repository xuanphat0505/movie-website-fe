import { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

import { OpenContext } from "../../contexts/OpenContext";
import { PlayListContext } from "../../contexts/PlayListContext";

import "./Dialog.css";
import Loader from "../Loader";

function AddPlayListDialog() {
  const { openAddPlayListDialog, setOpenAddPlayListDialog } =
    useContext(OpenContext);
  const { createPlayList, addToPlayList, isCreating } =
    useContext(PlayListContext);
  const [playListName, setPlayListName] = useState("");

  const handleSubmit = async () => {
    if (!playListName.trim()) return;

    try {
      const success = await createPlayList(playListName.trim());

      if (success) {
        const pendingMovie = localStorage.getItem("pendingMovie");
        if (pendingMovie) {
          const movieData = JSON.parse(pendingMovie);
          await addToPlayList(movieData, playListName.trim());
          localStorage.removeItem("pendingMovie");
        }

        setPlayListName("");
        setOpenAddPlayListDialog(false);
      }
    } catch (error) {
      console.error("Failed to create playlist:", error);
    }
  };

  return (
    <div
      className={`dialog modal-xs ${openAddPlayListDialog ? "show" : ""}`}
      onClick={() => setOpenAddPlayListDialog(false)}
    >
      <div
        className="modal-dialog modal-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <button
            type="button"
            onClick={() => {
              setOpenAddPlayListDialog(false);
              localStorage.removeItem("pendingMovie"); // Xóa phim đang chờ nếu người dùng đóng dialog
            }}
            className="close-dialog"
          >
            <i>
              <FaTimes size={16} />
            </i>
          </button>
          <div className="mb-4">
            <h4 className="heading-xs mb-0">Thêm danh sách mới</h4>
          </div>
          <div className="mb-6">
            <input
              className="v-form-control d-block w-full h-[42px] py-2 px-4 border-[#ffffff10] bg-transparent font-normal leading-[1.5]"
              placeholder="Tên danh sách"
              maxLength={20}
              type="text"
              value={playListName}
              onChange={(e) => setPlayListName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              disabled={isCreating}
            />
          </div>
          <div className="is-footer">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSubmit}
              disabled={!playListName.trim() || isCreating}
            >
              {isCreating ? (
                <Loader />
              ) : (
                <>
                  <i>
                    <FaPlus />
                  </i>
                  Thêm
                </>
              )}
            </button>
            <button
              className="min-w-[80px] btn btn-light btn-sm"
              onClick={() => {
                setOpenAddPlayListDialog(false);
                localStorage.removeItem("pendingMovie");
              }}
              disabled={isCreating}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPlayListDialog;
