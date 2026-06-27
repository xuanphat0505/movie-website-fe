import { useContext, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { OpenContext } from "./contexts/OpenContext";
import { ToastContainer } from "react-toastify";

import TopButton from "./components/TopButton";
// components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// pages
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import TypesPage from "./pages/TypesPage";
import FilterMovies from "./pages/FilterMovies";
import MovieCategory from "./pages/MovieCategory";
import PlayMovie from "./pages/PlayMovie/PlayMovie";
import ChangePassword from "./pages/ChangePassword";
import User from "./pages/User/User";
import MaintenancePage from "./pages/MaintenacePage";
// dialogs
import LoginFormDialog from "./shared/Dialog/LoginFormDialog";
import RegisterFormDialog from "./shared/Dialog/RegisterFormDialog";
import ForgetFormDialog from "./shared/Dialog/ForgetFormDialog";
import AddPlayListDialog from "./shared/Dialog/AddPlayListDialog";
import EditPlayListDialog from "./shared/Dialog/EditPlayListDialog";
import AvatarDialog from "./shared/Dialog/AvatarDialog";

// service
import axios from "axios";
import { BASE_URL } from "./config/utils";

function App() {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "admin";

  // Kiểm tra trạng thái bảo trì từ máy chủ mỗi khi người dùng thay đổi đường dẫn trang
  useEffect(() => {
    const checkMaintenanceMode = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/setting`);
        const data = res.data;
        if (data.success && data.data) {
          setIsMaintenance(!!data.data.maintenanceMode);
        }
      } catch (err) {
        console.error("Lỗi kiểm tra chế độ bảo trì:", err);
      }
    };
    checkMaintenanceMode();
  }, [location.pathname]);
  const {
    toggle,
    openShareDialog,
    openRankDialog,
    openRateDialog,
    openAddPlayListDialog,
    openEditPlayListDialog,
    openAvatarDialog,
    selectedPlayList,
    formDialog,
    openRankTypeDialog,
  } = useContext(OpenContext);

  const isAnyDialogOpen =
    openRankTypeDialog ||
    openShareDialog ||
    openRankDialog ||
    openRateDialog ||
    openAddPlayListDialog ||
    openEditPlayListDialog ||
    openAvatarDialog ||
    formDialog !== "";
  if (isMaintenance && !isAdmin) {
    return <MaintenancePage />;
  }

  return (
    <div id="App">
      <div id="body-load">
        <div className="bl-logo">
          <img
            src={
              "https://res.cloudinary.com/djmeybzjk/image/upload/v1745742495/logo_szf2ca.svg"
            }
            alt=""
          ></img>
        </div>
      </div>
      <div className={`focus-backdrop ${toggle ? "dark-mode" : ""}`}></div>
      <div className={`modal-backdrop ${isAnyDialogOpen ? "show" : ""}`}></div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/types" element={<TypesPage />}></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>

        <Route path="/user-profile/:tab" element={<User />}></Route>
        <Route path="/filter/:category" element={<FilterMovies />}></Route>
        <Route path="/movie/:id" element={<MovieDetail />}></Route>
        <Route path="/player/:id" element={<PlayMovie />}></Route>
        <Route
          path="/movie/category/:category"
          element={<MovieCategory />}
        ></Route>
      </Routes>
      <Footer />
      <LoginFormDialog />
      <RegisterFormDialog />
      <ForgetFormDialog />
      <AddPlayListDialog />
      <AvatarDialog />
      <EditPlayListDialog playList={selectedPlayList} />
      <ToastContainer />
      <TopButton />
    </div>
  );
}

export default App;
