import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { toastError, toastSuccess } from "../shared/Toastify";
import { BASE_URL } from "../config/utils";
import { loginSuccess } from "../redux/authSlice";
import { OpenContext } from "../contexts/OpenContext";
import useAxiosJWT from "../config/axiosConfig";
import Loader from "../shared/Loader";

function MovieUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { setOpenAvatarDialog } = useContext(OpenContext);
  const [data, setData] = useState({
    email: user?.email,
    username: user?.username,
    gender: user?.gender,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({
      ...data,
      [id]: value,
    });
  };
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await axiosJWT.put(`${BASE_URL}/user/update`, data, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const result = res.data;
      if (result.success) {
        setIsUpdating(false);
        dispatch(loginSuccess({ ...user, ...result.data }));
        return toastSuccess(result.message);
      }
    } catch (error) {
      setIsUpdating(false);
      return toastError(error.response.data.message);
    }
  };

  return (
    <div className="box-body py-0 is-profile">
      <div className="box-header flex flex-col items-start gap-2 mb-6">
        <div className="heading-sm mb-0">Tài khoản</div>
        <p className="mb-0 text-text-base">Cập nhật thông tin tài khoản</p>
      </div>
      <div className="w-full">
        <div className="dash-form">
          <form className="v-form" onSubmit={handleUpdateUser}>
            <div className="form-group w-full mb-6">
              <label>Email</label>
              <input
                type="email"
                className="v-form-control"
                id="email"
                value={data.email}
                onChange={handleChange}
                readOnly
              ></input>
            </div>
            <div className="form-group w-full mb-4">
              <label>Tên hiển thị</label>
              <input
                type="text"
                className="v-form-control"
                id="username"
                value={data.username}
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group mb-12">
              <label className="d-block">Giới tính</label>
              <div className="form-check">
                <input
                  type="radio"
                  value="male"
                  checked={data.gender === "male"}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                  id="male"
                />
                <label htmlFor="male">Nam</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  value="female"
                  checked={data.gender === "female"}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                  id="female"
                />
                <label htmlFor="female">Nữ</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  value="other"
                  checked={data.gender === "other"}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                  id="other"
                />
                <label htmlFor="other">Không xác định</label>
              </div>
            </div>
            <button className="btn bg-primary-color text-primary-button-text border-primary-color px-6">
              {isUpdating ? <Loader /> : "Cập nhật"}
            </button>
          </form>
          <div
            className="v-avatar text-center"
            onClick={() => setOpenAvatarDialog(true)}
          >
            <Link className="hover:text-white-color">
              <div className="w-[120px] h-[120px] rounded-[100%] border-[3px] border-white-color mt-7 mb-2 overflow-hidden hover:opacity-[0.8]">
                <img
                  src={user?.avatar}
                  alt=""
                  className="h-full"
                ></img>
              </div>
              <span className="text-[0.875em] text-white-color">
                Đổi ảnh đại diện
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieUser;
