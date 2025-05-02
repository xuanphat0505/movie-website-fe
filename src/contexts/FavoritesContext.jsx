import { createContext, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import useAxiosJWT from "../config/axiosConfig";
import { BASE_URL } from "../config/utils";
import { toastSuccess, toastError } from "../shared/Toastify";

export const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const getAxiosJWT = useAxiosJWT();

  // Tải danh sách yêu thích từ server khi người dùng đăng nhập
  const loadFavorites = useCallback(async () => {
    if (!user?.accessToken) {
      // Nếu chưa đăng nhập, reset danh sách yêu thích
      setFavorites([]);
      return;
    }

    setIsLoading(true);
    try {
      const axiosJWT = getAxiosJWT();
      const res = await axiosJWT.get(`${BASE_URL}/favorite`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const result = res.data;
      if (result.success) {
        setFavorites(result.data);
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
      toastError(
        error?.response?.data?.message || "Lỗi khi tải danh sách yêu thích"
      );
    } finally {
      setIsLoading(false); // Luôn đặt loading thành false sau khi hoàn thành
    }
  }, [user, getAxiosJWT]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // Kiểm tra nếu một phim đã được yêu thích
  const isFavorite = (movie) => {
    if (!movie || !movie.slug || !user) return false;
    return favorites.some((fav) => fav.slug === movie.slug);
  };

  // Sử dụng API toggle để thêm/xóa phim khỏi danh sách yêu thích
  const toggleFavorite = async (movie) => {
    if (!user) {
      toastError("Vui lòng đăng nhập để quản lý danh sách yêu thích");
      return;
    }

    if (!movie || !movie.slug) return;

    setIsLoading(true);
    try {
      const axiosJWT = getAxiosJWT();
      const res = await axiosJWT.post(
        `${BASE_URL}/favorite/toggle`,
        {
          movieId: movie._id,
          slug: movie.slug,
          name: movie.name,
          thumb_url: movie.thumb_url,
          poster_url: movie.poster_url,
        },
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
        setFavorites(result.data);
        toastSuccess(result.message); // Không return ở đây
      }
    } catch (error) {
      toastError(
        error?.response?.data?.message || "Thao tác yêu thích thất bại"
      );
    } finally {
      setIsLoading(false); // Luôn đặt loading thành false sau khi hoàn thành
    }
  };

  // Sửa lại hàm removeFavorite để nhận movie object thay vì slug
  const removeFavorite = async (slug) => {
    if (!user || !slug) return;
    
    setIsLoading(true);
    try {
      const axiosJWT = getAxiosJWT();
      const res = await axiosJWT.delete(`${BASE_URL}/favorite/remove/${slug}`, {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      if (result.success) {
        setFavorites(result.data);
        toastSuccess(result.message); // Không return ở đây
      }
    } catch (error) {
      toastError(
        error?.response?.data?.message || "Thao tác yêu thích thất bại"
      );
    } finally {
      setIsLoading(false); // Luôn đặt loading thành false sau khi hoàn thành
    }
  };

  // Lấy tất cả phim yêu thích
  const getAllFavorites = () => {
    return favorites;
  };

  const value = {
    favorites,
    isLoading,
    isFavorite,
    toggleFavorite,
    getAllFavorites,
    removeFavorite,
    refreshFavorites: loadFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
