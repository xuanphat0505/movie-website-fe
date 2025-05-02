/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import useAxiosJWT from "../config/axiosConfig";

import { BASE_URL } from "../config/utils";
import { toastError } from "../shared/Toastify";

export const RateContext = createContext();

function RateProvider({ children }) {
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();

  const user = useSelector((state) => state.auth.user);

  const [rates, setRates] = useState([]);
  const [rateStats, setRateStats] = useState({ totalRates: 0, avgRate: 0 });
  const [movieRatings, setMovieRatings] = useState({});

  // Khôi phục dữ liệu đánh giá từ localStorage khi load trang
  useEffect(() => {
    const savedRatings = localStorage.getItem("movieRatings");
    if (savedRatings) {
      try {
        setMovieRatings(JSON.parse(savedRatings));
      } catch (error) {
        console.error("Error parsing saved ratings:", error);
      }
    }
  }, []);

  // Lưu dữ liệu đánh giá vào localStorage mỗi khi thay đổi
  useEffect(() => {
    if (Object.keys(movieRatings).length > 0) {
      localStorage.setItem("movieRatings", JSON.stringify(movieRatings));
    }
  }, [movieRatings]);

  const getRates = async (movieId) => {
    try {
      // Trước tiên, kiểm tra cache
      if (movieRatings[movieId]?.rates) {
        setRates(movieRatings[movieId].rates);
        setRateStats(movieRatings[movieId]?.stats);
      }

      const res = await axios.get(`${BASE_URL}/rate/${movieId}`, {
        withCredentials: true,
      });
      const result = res.data;
      if (result.data) {
        setRates(result.data);

        // Calculate statistics
        const total = result.data.length;
        const avg =
          total > 0
            ? result.data.reduce((sum, rate) => sum + rate.rateMark, 0) / total
            : 0;

        const newStats = {
          totalRates: total,
          avgRate: parseFloat(avg.toFixed(1)),
        };

        setRateStats(newStats);

        // Cập nhật cache
        setMovieRatings((prev) => ({
          ...prev,
          [movieId]: {
            rates: result.data,
            stats: newStats,
            lastUpdated: new Date().toISOString(),
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching rates:", error);

      // Nếu có lỗi nhưng có dữ liệu cache, sử dụng dữ liệu cache
      if (movieRatings[movieId]?.rates) {
        setRates(movieRatings[movieId].rates);
        setRateStats(movieRatings[movieId]?.stats);
      }
    }
  };

  // Lấy số điểm đánh giá trung bình cho một phim
  const getAverageRating = (movieId) => {
    if (movieRatings[movieId]?.stats) {
      return movieRatings[movieId]?.stats?.avgRate;
    }

    // Nếu chưa có dữ liệu, trả về 0
    return 0;
  };

  // Lấy tổng số đánh giá cho một phim
  const getTotalRatings = (movieId) => {
    if (movieRatings[movieId]?.stats) {
      return movieRatings[movieId]?.stats?.totalRates;
    }

    // Nếu chưa có dữ liệu, trả về 0x
    return 0;
  };

  const likeRate = async (rateId, movieId) => {
    if (!user) {
      return toastError("Vui lòng đăng nhập để thực hiện hành động này");
    }

    try {
      const res = await axiosJWT.put(`${BASE_URL}/rate/like/${rateId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      if (result.success) {
        getRates(movieId);
        return true;
      }
    } catch (error) {
      toastError(
        error?.response?.data?.message || "Lỗi khi thực hiện hành động"
      );
      return false;
    }
  };

  const dislikeRate = async (rateId, movieId) => {
    if (!user) {
      return toastError("Vui lòng đăng nhập để thực hiện hành động này");
    }

    try {
      const res = await axiosJWT.put(`${BASE_URL}/rate/dislike/${rateId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      if (result.success) {
        getRates(movieId);
        return true;
      }
    } catch (error) {
      toastError(
        error?.response?.data?.message || "Lỗi khi thực hiện hành động"
      );
      return false;
    }
  };

  return (
    <RateContext.Provider
      value={{
        rates,
        rateStats,
        getRates,
        likeRate,
        dislikeRate,
        getAverageRating,
        getTotalRatings,
        movieRatings,
      }}
    >
      {children}
    </RateContext.Provider>
  );
}

export default RateProvider;
