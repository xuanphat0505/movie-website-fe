import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";

import { OpenContext } from "../../contexts/OpenContext";
import { loginSuccess } from "../../redux/authSlice";
import { toastError, toastSuccess } from "../Toastify";
import { BASE_URL } from "../../config/utils";
import { avatarList } from "../../assets/data/data";
import useAxiosJWT from "../../config/axiosConfig";

import "./Dialog.css";
import Loader from "../Loader";
function AvatarDialog() {
  const { openAvatarDialog, setOpenAvatarDialog } = useContext(OpenContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeAvatar = async () => {
    setIsLoading(true);
    try {
      const res = await axiosJWT.put(`${BASE_URL}/user/update`, {
        avatar: selectedAvatar,
      });
      const result = res.data;
      if (result.success) {
        dispatch(loginSuccess({ ...user, avatar: selectedAvatar }));
        setIsLoading(false);
        setOpenAvatarDialog(false);
        return toastSuccess(result.message);
      }
    } catch (error) {
      return toastError(error.response.data.message);
    }
  };

  return (
    <div
      className={`dialog modal-md ${openAvatarDialog ? "show" : ""}`}
      onClick={() => setOpenAvatarDialog(false)}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <button
            type="button"
            className="close-dialog"
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện click lan ra .dialog
              setOpenAvatarDialog(false);
            }}
          >
            <i>
              <FaTimes size={16} />
            </i>
          </button>
          <div className="is-header mb-4">
            <h4 className="heading-sm mb-0">Đổi ảnh đại diện</h4>
          </div>
          <div className="mb-6">
            <div className="avatar-list">
              {avatarList.map((item, index) => (
                <div
                  className={`avatar-item ${
                    selectedAvatar === item.avatar ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedAvatar(item.avatar)}
                >
                  <img src={item.avatar} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="is-footer justify-end gap-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={handleChangeAvatar}
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Lưu lại"}
            </button>
            <button
              className="btn btn-sm btn-light"
              onClick={() => setOpenAvatarDialog(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvatarDialog;
