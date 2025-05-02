import { createContext, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../config/utils";
import useAxiosJWT from "../config/axiosConfig";
import { toastSuccess } from "../shared/Toastify";

export const WatchHistoryContext = createContext();

function WatchHistoryProvider({ children }) {
  const [watchHistory, setWatchHistory] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const getAxiosJWT = useAxiosJWT();

  // Tách việc tải lịch sử xem thành một hàm riêng biệt
  const loadWatchHistory = useCallback(async () => {
    if (isInitialized) return; // Chỉ tải một lần

    try {
      if (user && user?.accessToken) {
        // Bắt đầu loading
        setIsLoading(true);
        
        // Nếu đã đăng nhập, lấy lịch sử từ server
        const axiosJWT = getAxiosJWT();
        try {
          const res = await axiosJWT.get(`${BASE_URL}/history`, {
            headers: { Authorization: `Bearer ${user?.accessToken}` },
          });
          const result = res.data;
          if (result.success) {
            setWatchHistory(result.data);
          }
        } catch (error) {
          console.error(
            "Failed to fetch watch history:",
            error.response?.data?.message || error.message
          );
          setWatchHistory([]);
        } finally {
          // Kết thúc loading dù thành công hay thất bại
          setIsLoading(false);
        }
      } else {
        // Khi chưa đăng nhập, không tải lịch sử và đặt mảng rỗng
        setWatchHistory([]);
      }
      setIsInitialized(true);
    } catch (error) {
      console.error("Error loading watch history:", error);
      setIsInitialized(true);
      setIsLoading(false);
    }
  }, [user, getAxiosJWT, isInitialized]);

  // Load history khi component được mount hoặc user thay đổi
  useEffect(() => {
    loadWatchHistory();
  }, [loadWatchHistory]);

  // Lưu lịch sử xem mới
  const updateWatchHistory = useCallback(
    async (movieData, currentTime, duration, episode = null) => {
      // Kiểm tra đầy đủ dữ liệu trước khi xử lý
      if (!user || !user?.accessToken) return;
      if (!movieData || !movieData._id || !movieData.slug) {
        console.error("Invalid movie data:", movieData);
        return;
      }

      // Tính phần trăm tiến độ xem
      const progressPercent = (currentTime / duration) * 100;

      // Tạo object mới cho lịch sử xem
      const historyItem = {
        movieId: movieData._id,
        slug: movieData.slug,
        name: movieData.name,
        thumb_url: movieData.thumb_url,
        poster_url: movieData.poster_url,
        lang: movieData.lang || "",
        currentTime,
        duration,
        progressPercent,
        updatedAt: new Date().toISOString(),
        episode: episode,
      };

      // Cập nhật state - luôn ghi đè thông tin cũ
      const existingIndex = watchHistory.findIndex(
        (item) => item.slug === movieData.slug
      );
      let newHistory;

      if (existingIndex !== -1) {
        // Cập nhật bản ghi hiện có và giữ vị trí
        newHistory = [...watchHistory];
        newHistory[existingIndex] = historyItem;

        // Di chuyển phim lên đầu danh sách
        const [item] = newHistory.splice(existingIndex, 1);
        newHistory.unshift(item);
      } else {
        // Thêm phim mới vào đầu danh sách
        newHistory = [historyItem, ...watchHistory].slice(0, 20);
      }

      setWatchHistory(newHistory);

      // Đồng bộ với server
      try {
        const axiosInstance = getAxiosJWT();
        await axiosInstance.post(
          `${BASE_URL}/history`,
          historyItem,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error(
          "Failed to save watch history to server:",
          error.response?.data || error
        );
      }
    },
    [watchHistory, user, getAxiosJWT]
  );

  // Xóa một phim khỏi lịch sử xem
  const removeFromHistory = useCallback(
    async (slug) => {
      // Chỉ xử lý khi người dùng đã đăng nhập
      if (!user || !user?.accessToken) return;

      const newHistory = watchHistory.filter((item) => item.slug !== slug);
      setWatchHistory(newHistory);

      try {
        const axiosInstance = getAxiosJWT();
        const res = await axiosInstance.delete(`${BASE_URL}/history/${slug}`, {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
          withCredentials: true,
        });
        const result = res.data;
        if (result.success) {
          return toastSuccess(result.message);
        }
      } catch (error) {
        console.error("Failed to remove watch history from server:", error);
      }
    },
    [watchHistory, user, getAxiosJWT]
  );

  // Thêm chức năng xóa tất cả lịch sử
  const clearAllHistory = useCallback(async () => {
    // Chỉ xử lý khi người dùng đã đăng nhập
    if (!user || !user?.accessToken) return;

    setWatchHistory([]);

    try {
      const axiosJWT = getAxiosJWT();
      await axiosJWT.delete(`${BASE_URL}/history`);
    } catch (error) {
      console.error("Failed to clear watch history from server:", error);
    }
  }, [user, getAxiosJWT]);

  const value = {
    watchHistory,
    updateWatchHistory,
    removeFromHistory,
    clearAllHistory,
    isLoading,
  };

  return (
    <WatchHistoryContext.Provider value={value}>
      {children}
    </WatchHistoryContext.Provider>
  );
}

export default WatchHistoryProvider;
