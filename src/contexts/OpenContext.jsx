import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const OpenContext = createContext();

// eslint-disable-next-line react/prop-types
function OpenProvider({ children }) {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [openRankDialog, setOpenRankDialog] = useState(false);
  const [openRateDialog, setOpenRateDialog] = useState(false);
  const [openPlayListPopUp, setOpenPlayListPopUp] = useState(false);
  const [openAddPlayListDialog, setOpenAddPlayListDialog] = useState(false);
  const [openEditPlayListDialog, setOpenEditPlayListDialog] = useState(false);
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [openRankTypeDialog, setOpenRankTypeDialog] = useState(false);
  const [formDialog, setFormDialog] = useState("");
  const [selectedPlayList, setSelectedPlayList] = useState(null);
  const [movies, setMovies] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    setToggle(false);
  }, [location.pathname]);

  const handleOpenRankMovieDialog = (movies) => {
    setOpenRankDialog(true);
    setMovies(movies);
  };
  const handleOpenRankTypeDialog = (types) => {
    setOpenRankTypeDialog(true);
    setTypes(types);
  };

  return (
    <OpenContext.Provider
      value={{
        toggle,
        movies,
        types,
        openShareDialog,
        openRankDialog,
        openRateDialog,
        openPlayListPopUp,
        openAddPlayListDialog,
        openEditPlayListDialog,
        openAvatarDialog,
        formDialog,
        selectedPlayList,
        openRankTypeDialog,
        setToggle,
        setFormDialog,
        setOpenShareDialog,
        setOpenRankDialog,
        setOpenRateDialog,
        setOpenPlayListPopUp,
        setOpenAddPlayListDialog,
        setSelectedPlayList,
        setOpenEditPlayListDialog,
        setOpenAvatarDialog,
        setOpenRankTypeDialog,
        handleOpenRankMovieDialog,
        handleOpenRankTypeDialog,
      }}
    >
      {children}
    </OpenContext.Provider>
  );
}

export default OpenProvider;
