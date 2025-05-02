import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import {
  FaMagnifyingGlass,
  FaBell,
  FaCircleXmark,
  FaRightFromBracket,
} from "react-icons/fa6";
import axios from "axios";

import { subMenu, userTab } from "../../assets/data/data";
import { OpenContext } from "../../contexts/OpenContext";
import { BASE_URL } from "../../config/utils";
import { toastSuccess } from "../../shared/Toastify";
import {
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "../../redux/authSlice";
import useAxiosJWT from "../../config/axiosConfig";
import Loading from "../../shared/Loading/Loading";

import "./Header.css";
function Header() {
  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();

  const navigate = useNavigate();
  const { setFormDialog } = useContext(OpenContext);
  const [menuToggle, setMenuToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNavigation = (sub) => {
    setMenuToggle(false);
    navigate(`/movie/category/${sub.path}`, { state: { type: sub } });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      if (keyWord.length > 0) {
        fetchMovieList();
      } else {
        setMovieList([]);
      }
    }, 1000);

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [keyWord]);

  const fetchMovieList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://phimapi.com/v1/api/tim-kiem?keyword=${keyWord}`,
        { params: { page: 1 } }
      );
      const result = res.data;

      setMovieList(result.data.items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return alert(error.message);
    }
  };

  const handleLogout = async () => {
    dispatch(logoutStart());

    // Kiểm tra kết nối trước khi thử logout
    if (!navigator.onLine) {
      const confirmOfflineLogout = window.confirm(
        "Bạn đang offline. Bạn có muốn đăng xuất khỏi thiết bị này không? (Lưu ý: Bạn sẽ cần đăng nhập lại khi có kết nối)"
      );

      if (confirmOfflineLogout) {
        // Người dùng xác nhận muốn đăng xuất ngay cả khi offline
        dispatch(logoutSuccess());
        setMenuToggle(false);
        return toastSuccess("Đã đăng xuất (offline mode)");
      } else {
        // Người dùng không muốn đăng xuất khi offline
        dispatch(logoutFailure());
        return;
      }
    }

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
          timeout: 3000,
        }
      );

      const result = res.data;
      if (result.success) {
        dispatch(logoutSuccess());
        return toastSuccess(result.message);
      }
    } catch (error) {
      console.error("Logout error:", error);

      // Xử lý khi server không phản hồi
      if (
        error.code === "ECONNABORTED" ||
        error.message.includes("Network Error")
      ) {
        const confirmOfflineLogout = window.confirm(
          "Không thể kết nối với server. Bạn có muốn đăng xuất khỏi thiết bị này không? (Lưu ý: Bạn sẽ cần đăng nhập lại khi có kết nối)"
        );

        if (confirmOfflineLogout) {
          dispatch(logoutSuccess());
          setMenuToggle(false);
          return toastSuccess("Đã đăng xuất (offline mode)");
        } else {
          dispatch(logoutFailure());
          return;
        }
      } else {
        // Lỗi khác từ server
        dispatch(logoutFailure());
        return alert(error?.response?.data?.message || "Lỗi đăng xuất");
      }
    }
  };

  // Kiểm tra server khi component mount
  useEffect(() => {
    const checkServer = async () => {
      if (!user) return;

      try {
        await axios.get(`${BASE_URL}/health-check`, { timeout: 2000 });
      } catch (error) {
        console.log(
          "Server không hoạt động khi tải trang - đăng xuất người dùng"
        );
        // Đăng xuất người dùng khi server không phản hồi
        dispatch(logoutSuccess());
      }
    };

    checkServer();
  }, []);

  return (
    <header
      className={`${scroll ? "bg-footer-bg" : "bg-transparent"} fixed top-0 left-0 z-[1000] w-full h-[60px] `}
    >
      <div
        className={`header-element relative w-full h-full px-[6px] flex ${searchToggle ? "justify-end" : "justify-between"} items-center`}
      >
        <div className="search">
          <div
            className={`${searchToggle ? "hidden" : "block"} search-element w-auto h-full flex items-center`}
          >
            <div
              className={`${menuToggle ? "toggled" : ""} w-[40px] h-[40px] flex justify-center items-center cursor-pointer`}
              onClick={() => setMenuToggle((prev) => !prev)}
            >
              <div className="icon-menu relative w-[20px] h-[20px] py-[3px]">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="w-auto h-[36px] ml-4">
              <Link to={"/"} className="inline-block w-full h-full">
                <img src={"https://res.cloudinary.com/djmeybzjk/image/upload/v1745742495/logo_szf2ca.svg"} alt="" className="w-full h-full"></img>
              </Link>
            </div>
          </div>
          <div
            className={`overflow-hidden h-auto ${searchToggle ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none"} will-change-opacity`}
          >
            <div className="search-modal">
              {loading && <Loading height={100} />}
              {movieList.length > 0 ? (
                <div className="show-group">
                  <div className="flex items-center justify-between text-[.9em] text-text-base mb-3">
                    Danh sách tìm kiếm
                  </div>
                  <div className="flex flex-col gap-0">
                    {movieList?.slice(0, 5).map((movie) => (
                      <Link
                        className="movie-item"
                        key={movie._id}
                        to={`movie/${movie?.slug}`}
                        onClick={() => setSearchToggle(false)}
                      >
                        <div className="v-thumbnail-s">
                          <div className="v-thumbnail">
                            <img
                              src={`https://phimimg.com/${movie?.poster_url}`}
                              onError={(e) => {
                                e.target.src = movie?.thumb_url;
                              }}
                              alt=""
                            ></img>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h4 className="mb-[.4rem] text-white-color text-[1em] font-normal leading-[1.5] line-clamp-2">
                            {movie?.name}
                          </h4>
                          <div className="mb-2 line-clamp-2">
                            {movie?.origin_name}
                          </div>
                          <div className="block">
                            <div className="tag-small">{movie?.year}</div>
                            {movie?.type !== "single" && (
                              <div className="tag-small">
                                {movie?.episode_current}
                              </div>
                            )}
                            <div className="tag-small">{movie?.time}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                !loading &&
                keyWord.length > 0 && (
                  <Link className="block bg-[#ffffff10] leading-[50px] text-center">
                    Không tìm thấy kết quả nào
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
        <div
          className={`${searchToggle ? "toggled" : ""} w-auto h-[40px] flex justify-center items-center gap-4 cursor-pointer`}
        >
          {user && (
            <Link
              to={"/user-profile/notification"}
              className={`icon-search ${searchToggle ? "hidden" : ""} hover:text-white-color`}
            >
              <i>
                <FaBell />
              </i>
            </Link>
          )}
          <div
            className="w-[40px] h-[40px] flex justify-center items-center"
            onClick={() => setSearchToggle((prev) => !prev)}
          >
            <div className="icon-search relative w-[20px] h-[20px]">
              <span></span>
              <span></span>
              <i>
                <IoSearch size={20} color="#fff" />
              </i>
            </div>
          </div>
        </div>
        <div
          className={`sub-menu ${menuToggle ? "toggled" : ""} flex-col items-start gap-[1rem] shadow-shadow-large`}
        >
          {!user && (
            <div className="w-full h-auto">
              <div
                className="button-user cursor-pointer flex justify-center items-center gap-[.5rem] min-w-[125px] py-[.5rem] px-[.8rem] bg-white text-primary-button-text hover:text-primary-button-text"
                onClick={() => setFormDialog("login")}
              >
                <i>
                  <FaUser />
                </i>
                <span>Thành viên</span>
              </div>
            </div>
          )}
          {user && (
            <div className="user-logged">
              <div className="w-full relative">
                <div className="head-user">
                  <div className="head-user_avatar">
                    <img src={user?.avatar} alt="" className="w-full h-full" />
                  </div>
                </div>
                <ul className="user-dropdown">
                  <div className="dropdown-blank">
                    <div className="text-[.9em]">Chào,</div>
                    <div className="d-block line-clamp-1">
                      <strong className="font-semibold">
                        {user?.username}
                      </strong>
                    </div>
                  </div>
                  {userTab.slice(0, 4).map((tab, index) => (
                    <Link className="dropdown-item" key={index} to={tab.path}>
                      <div className="line-center">
                        <i>
                          <tab.icon />
                        </i>
                        <span>{tab.title}</span>
                      </div>
                    </Link>
                  ))}
                  <Link
                    className="dropdown-item"
                    to={"#"}
                    onClick={handleLogout}
                  >
                    <div className="line-center">
                      <i>
                        <FaRightFromBracket />
                      </i>
                      <span>Đăng xuất</span>
                    </div>
                  </Link>
                </ul>
              </div>
            </div>
          )}
          <div className="flex justify-start items-center gap-[.75rem] w-full h-auto py-[.5rem] px-[.6rem] cursor-pointer bg-white/10 rounded-[.6rem]">
            <div className="w-[36px] h-[36px] text-primary-color">
              <svg
                id="Pc"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M10.9998 16.8992C11.1655 16.8992 11.2998 16.7649 11.2998 16.5992V11.5982C11.2998 9.28322 13.1838 7.39922 15.4998 7.39922H18.7998C18.9238 7.39922 19.0446 7.41106 19.1616 7.43327C19.3745 7.47368 19.5998 7.32682 19.5998 7.11012V6.69922C19.5998 6.67022 19.5968 6.64022 19.5918 6.61222C19.2488 4.66722 17.4468 3.19922 15.4008 3.19922H6.79982C4.42882 3.19922 2.49982 5.12822 2.49982 7.49922V12.5982C2.49982 14.9692 4.42882 16.8992 6.79982 16.8992H8.24282L7.86182 19.2492H5.85982C5.44582 19.2492 5.10982 19.5852 5.10982 19.9992C5.10982 20.4132 5.44582 20.7492 5.85982 20.7492H10.7598C11.1738 20.7492 11.5098 20.4132 11.5098 19.9992C11.5098 19.5852 11.1738 19.2492 10.7598 19.2492H9.38082L9.76182 16.8992H10.9998Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M17.1912 18.4564C16.7712 18.4564 16.4302 18.1154 16.4302 17.6954C16.4302 17.2754 16.7712 16.9344 17.1912 16.9344C17.6112 16.9344 17.9522 17.2754 17.9522 17.6954C17.9522 18.1154 17.6112 18.4564 17.1912 18.4564ZM18.8002 8.90039H15.5002C14.0362 8.90039 12.8002 10.1364 12.8002 11.5994V18.0994C12.8002 19.5884 14.0112 20.7994 15.5002 20.7994H18.8002C20.2892 20.7994 21.5002 19.5884 21.5002 18.0994V11.5994C21.5002 10.1364 20.2642 8.90039 18.8002 8.90039Z"
                  fill="#ffffff"
                ></path>
              </svg>
            </div>
            <div className="flex flex-col gap-[.3rem] text-[12px] leading-[1.1] text-white-color">
              <span>Tải ứng dụng</span>
              <strong className="text-[14px]">RoPhim</strong>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-2 w-full h-auto">
            <li className="leading-[1.2] py-[.6rem] text-[13px]">
              <Link to={"/types"} className="block font-medium">
                Chủ đề
              </Link>
            </li>
            {subMenu.map((sub, index) => (
              <li className="leading-[1.2] py-[.6rem] text-[13px]" key={index}>
                <div
                  className="block font-medium text-white-color cursor-pointer"
                  onClick={() => handleNavigation(sub)}
                >
                  <Link>{sub.title}</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`${searchToggle ? "block" : "hidden"} absolute left-[10px] right-[50px] w-auto max-w-none z-2`}
        >
          <div className="relative">
            <div className="absolute left-4 top-[50%] translate-y-[-50%] text-white-color p-[3px] text-[1rem]">
              <i>
                <FaMagnifyingGlass size={16} />
              </i>
            </div>
            <input
              type="text"
              id="search-input"
              value={keyWord}
              placeholder="Tìm kiếm phim, diễn viên"
              onChange={(e) => setKeyWord(e.target.value)}
            ></input>
            {keyWord.length > 0 && (
              <div className="remove-icon" onClick={() => setKeyWord("")}>
                <i>
                  <FaCircleXmark size={16} />
                </i>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
