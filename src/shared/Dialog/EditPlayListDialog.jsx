/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, useRef } from "react";
import { FaTimes, FaPen, FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

import { OpenContext } from "../../contexts/OpenContext";
import { PlayListContext } from "../../contexts/PlayListContext";
import Loader from "../Loader";

import "./Dialog.css";

function EditPlayListDialog({ playList }) {
  const { openEditPlayListDialog, setOpenEditPlayListDialog } =
    useContext(OpenContext);
  const { updatePlayListName, deletePlayList, isUpdating } =
    useContext(PlayListContext);

  const [newPlayListName, setNewPlayListName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const inputRef = useRef(null);

  // Xử lý cập nhật tên danh sách
  const handleUpdateName = async () => {
    if (!newPlayListName.trim() || !playList) return;

    // Kiểm tra nếu tên không thay đổi
    if (newPlayListName === playList.playListName) {
      setOpenEditPlayListDialog(false);
      return;
    }

    const success = await updatePlayListName(
      playList.playListName,
      newPlayListName.trim()
    );

    if (success) {
      setOpenEditPlayListDialog(false);
    }
  };

  // Xử lý xóa danh sách
  const handleDeletePlayList = async () => {
    if (!playList) return;

    setIsDeleting(true);
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa danh sách này?"
    );

    if (confirmed) {
      const success = await deletePlayList(playList.playListName);
      if (success) {
        setOpenEditPlayListDialog(false);
      }
    }

    setIsDeleting(false);
  };

  // Cập nhật tên danh sách khi playList thay đổi
  useEffect(() => {
    if (playList) {
      setNewPlayListName(playList.playListName || "");
    }
  }, [playList]);

  // Tự động focus input khi dialog mở
  useEffect(() => {
    if (openEditPlayListDialog && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openEditPlayListDialog]);

  return (
    <div
      className={`dialog modal-xs ${openEditPlayListDialog ? "show" : ""}`}
      onClick={() => setOpenEditPlayListDialog(false)}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <button
            className="close-dialog"
            onClick={() => setOpenEditPlayListDialog(false)}
          >
            <i>
              <FaTimes size={16} />
            </i>
          </button>
          <div className="form-header">
            <h4 className="heading-xs mb-0">Cập nhật Playlist</h4>
          </div>
          <div className="mb-6">
            <div className="form-w-icon relative">
              <i>
                <FaPen size={14} />
              </i>
              <input
                ref={inputRef}
                type="text"
                placeholder="Tên danh sách"
                className="v-form-control d-block w-full h-[42px] py-2 px-4 border-[#ffffff10] bg-transparent font-normal leading-[1.5]"
                value={newPlayListName}
                onChange={(e) => setNewPlayListName(e.target.value)}
                disabled={isUpdating || isDeleting}
              />
            </div>
          </div>
          <div className="is-footer ">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleUpdateName}
              disabled={!newPlayListName.trim() || isUpdating || isDeleting}
            >
              {isUpdating ? (
                <Loader />
              ) : (
                <>
                  <i>
                    <FaCheck />
                  </i>
                  Lưu
                </>
              )}
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={handleDeletePlayList}
              disabled={isUpdating || isDeleting}
            >
              {isDeleting ? (
                <Loader />
              ) : (
                <>
                  <i>
                    <FaTrash />
                  </i>
                  Xóa
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPlayListDialog;
