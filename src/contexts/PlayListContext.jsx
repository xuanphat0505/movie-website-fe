/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../config/utils";
import useAxiosJWT from "../config/axiosConfig";
import { toastSuccess, toastError } from "../shared/Toastify";

export const PlayListContext = createContext();

function PlayListProvider({ children }) {
  const [playLists, setPlayLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const getAxiosJWT = useAxiosJWT();

  // Lấy danh sách phim
  const getPlayLists = useCallback(async () => {
    if (!user?.accessToken) return;
    setIsLoading(true);
    try {
      const axiosJWT = getAxiosJWT();
      const res = await axiosJWT.get(`${BASE_URL}/play-list`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const result = res.data;
      if (result.success) {
        setPlayLists(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user, getAxiosJWT]);

  // Tạo danh sách mới
  const createPlayList = useCallback(
    async (playListName) => {
      if (!user?.accessToken) {
        toastError("Bạn phải đăng nhập để sử dụng tính năng này");
        return; // Ngừng không call API nếu không có accessToken
      }
      setIsCreating(true);
      try {
        const axiosJWT = getAxiosJWT();
        const res = await axiosJWT.post(
          `${BASE_URL}/play-list/create`,
          { playListName },
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        const result = res.data;
        if (result.success) {
          await getPlayLists();
          toastSuccess("Tạo danh sách thành công!");
          return true;
        }
      } catch (error) {
        toastError(error?.response?.data?.message || "Tạo danh sách thất bại");
        return false;
      } finally {
        setIsCreating(false);
      }
    },
    [user, getAxiosJWT, getPlayLists]
  );

  // Thêm phim vào danh sách
  const addToPlayList = useCallback(
    async (movieData, playListName) => {
      if (!user?.accessToken) return false;
      if (!movieData || !playListName) {
        toastError("Thiếu thông tin phim hoặc danh sách");
        return false;
      }

      try {
        const axiosJWT = getAxiosJWT();
        const res = await axiosJWT.post(
          `${BASE_URL}/play-list/add`,
          {
            movieId: movieData._id,
            slug: movieData.slug,
            playListName,
            movieName: movieData.name,
            thumb_url: movieData.thumb_url,
            poster_url: movieData.poster_url,
          },
          {
            headers: { Authorization: `Bearer ${user?.accessToken}` },
          }
        );
        const result = res.data;
        if (result.success) {
          // Cập nhật state playLists ngay lập tức
          setPlayLists((prevLists) => {
            return prevLists.map((list) => {
              if (list.playListName === playListName) {
                return {
                  ...list,
                  movies: [
                    ...list.movies,
                    {
                      movieId: movieData._id,
                      slug: movieData.slug,
                      movieName: movieData.name,
                      thumb_url: movieData.thumb_url,
                      poster_url: movieData.poster_url,
                    },
                  ],
                };
              }
              return list;
            });
          });

          toastSuccess("Đã thêm phim vào danh sách!");
          return true;
        }
      } catch (error) {
        if (
          error.response?.status === 400 &&
          error.response?.data?.message?.includes("already exists")
        ) {
          toastError("Phim đã có trong danh sách này");
        } else {
          toastError(error?.response?.data?.message || "Thêm phim thất bại");
        }
        return false;
      }
    },
    [user, getAxiosJWT]
  );

  // Thêm hàm mới để xóa phim khỏi playlist
  const removeFromPlayList = useCallback(
    async (playListName, movieId) => {
      if (!user?.accessToken) return false;
      setIsRemoving(true);
      try {
        const axiosJWT = getAxiosJWT();
        const res = await axiosJWT.delete(`${BASE_URL}/play-list/remove`, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            "Content-Type": "application/json",
          },
          data: {
            playListName,
            movieId,
          },
          withCredentials: true,
        });

        if (res.data.success) {
          setIsRemoving(false);
          // Cập nhật state local
          setPlayLists((prevLists) => {
            return prevLists.map((list) => {
              if (list.playListName === playListName) {
                return {
                  ...list,
                  movies: list.movies.filter(
                    (movie) => movie.movieId !== movieId
                  ),
                };
              }
              return list;
            });
          });
          toastSuccess("Đã xóa phim khỏi danh sách!");
          return true;
        }
        return false;
      } catch (error) {
        setIsRemoving(false);
        toastError(error?.response?.data?.message || "Xóa phim thất bại");
        return false;
      }
    },
    [user, getAxiosJWT]
  );

  // Thêm hàm để lấy movies từ một playlist cụ thể
  const getMoviesFromPlayList = useCallback(
    (playListName) => {
      const playlist = playLists.find(
        (list) => list.playListName === playListName
      );
      return playlist?.movies || [];
    },
    [playLists]
  );

  // Thêm hàm cập nhật tên playlist
  const updatePlayListName = useCallback(
    async (oldPlayListName, newPlayListName) => {
      if (!user?.accessToken) return false;
      setIsUpdating(true);

      try {
        const axiosJWT = getAxiosJWT();
        const res = await axiosJWT.put(
          `${BASE_URL}/play-list/update`,
          {
            oldPlayListName,
            newPlayListName,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          // Cập nhật state local
          setPlayLists((prevLists) =>
            prevLists.map((list) =>
              list.playListName === oldPlayListName
                ? { ...list, playListName: newPlayListName }
                : list
            )
          );
          toastSuccess("Cập nhật tên danh sách thành công!");
          return true;
        }
      } catch (error) {
        toastError(
          error?.response?.data?.message || "Cập nhật danh sách thất bại"
        );
        return false;
      } finally {
        setIsUpdating(false);
      }
    },
    [user, getAxiosJWT]
  );

  // Thêm hàm xóa playlist
  const deletePlayList = useCallback(
    async (playListName) => {
      if (!user?.accessToken) return false;

      try {
        const axiosJWT = getAxiosJWT();
        const res = await axiosJWT.delete(`${BASE_URL}/play-list/delete`, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            "Content-Type": "application/json",
          },
          data: { playListName },
          withCredentials: true,
        });

        if (res.data.success) {
          // Cập nhật state local
          setPlayLists((prevLists) =>
            prevLists.filter((list) => list.playListName !== playListName)
          );

          // Refresh lại toàn bộ dữ liệu
          await getPlayLists();

          toastSuccess("Xóa danh sách thành công!");

          // Refresh lại trang
          window.location.reload();

          return true;
        }
      } catch (error) {
        toastError(error?.response?.data?.message || "Xóa danh sách thất bại");
        return false;
      }
    },
    [user, getAxiosJWT, getPlayLists]
  );

  // Thêm hàm mới để kiểm tra phim có trong playlist không
  const isMovieInPlayList = useCallback(
    (playListName, movieSlug) => {
      if (!playLists || !playListName || !movieSlug) return false;

      const playlist = playLists.find(
        (list) => list.playListName === playListName
      );
      if (!playlist) return false;

      return playlist.movies.some((movie) => movie.slug === movieSlug);
    },
    [playLists]
  );

  const value = {
    playLists,
    getPlayLists,
    createPlayList,
    addToPlayList,
    removeFromPlayList,
    getMoviesFromPlayList,
    updatePlayListName,
    deletePlayList,
    isMovieInPlayList,
    isLoading,
    isCreating,
    isUpdating,
    isRemoving
  };

  return (
    <PlayListContext.Provider value={value}>
      {children}
    </PlayListContext.Provider>
  );
}

export default PlayListProvider;
