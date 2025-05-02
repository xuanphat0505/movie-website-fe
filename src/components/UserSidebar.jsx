/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaRightFromBracket } from "react-icons/fa6";

import { userTab } from "../assets/data/data";
import { BASE_URL } from "../config/utils";
import { logoutStart, logoutSuccess, logoutFailure } from "../redux/authSlice";
import useAxiosJWT from "../config/axiosConfig";
import { toastError } from "../shared/Toastify";

function UserSidebar({ tabLink }) {
  const user = useSelector((state) => state?.auth?.user);
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutStart());
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );

      const result = res.data;
      if (result.success) {
        dispatch(logoutSuccess());
        window.location.href = "/";
      }
    } catch (error) {
      dispatch(logoutFailure());
      return toastError(error?.response?.data?.message || "Lỗi đăng xuất");
    }
  };
  return (
    <div className="user-sidebar">
      <div className="ds-menu flex flex-col gap-4 w-full">
        <div className="heading-sm">Quản lý tài khoản</div>
        <div className="user-tab_list w-full flex flex-col mb-[3rem]">
          {userTab.slice(0, 4).map((tab, index) => (
            <Link
              className={`user-tab_item ${tab.path.includes(tabLink) ? "text-primary-color" : ""}`}
              key={index}
              to={tab.path}
            >
              <i>
                <tab.icon />
              </i>
              <span>{tab.title}</span>
            </Link>
          ))}
        </div>
        <div className="user-menu w-full flex flex-col gap-4">
          <div className="w-[60px] h-[60px] border-2 border-white-color rounded-[50%] overflow-hidden">
            <img src={user?.avatar} alt=""></img>
          </div>
          <div>
            <div className="heading-xs line-clamp-1 mb-0">{user?.username}</div>
            <div className="line-clamp-1 mb-4">{user?.email}</div>
            <div
              className="btn px-0 text-white-color hover:opacity-[0.9]"
              onClick={handleLogout}
            >
              <i>
                <FaRightFromBracket />
              </i>
              <span>Đăng xuất</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSidebar;
