import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

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
// dialogs
import LoginFormDialog from "./shared/Dialog/LoginFormDialog";
import RegisterFormDialog from "./shared/Dialog/RegisterFormDialog";
import ForgetFormDialog from "./shared/Dialog/ForgetFormDialog";
import AddPlayListDialog from "./shared/Dialog/AddPlayListDialog";
import EditPlayListDialog from "./shared/Dialog/EditPlayListDialog";
import AvatarDialog from "./shared/Dialog/AvatarDialog";

function App() {
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
  return (
    <div id="App">
      <div id="body-load">
        <div className="bl-logo">
          <img src={"https://res.cloudinary.com/djmeybzjk/image/upload/v1745742495/logo_szf2ca.svg"} alt=""></img>
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
