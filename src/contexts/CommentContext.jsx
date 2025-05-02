/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosJWT from "../config/axiosConfig";
import axios from "axios";

import { BASE_URL } from "../config/utils";
import { toastSuccess, toastError } from "../shared/Toastify";

export const CommentContext = createContext();

function CommentProvider({ children }) {
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();

  const user = useSelector((state) => state.auth.user);
  const [comments, setComments] = useState([]);
  const [newComments, setNewComments] = useState([]);
  const [topComments, setTopComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getComments = async (movieId) => {
    try {
      const res = await axios.get(`${BASE_URL}/comment/${movieId}`, {
        withCredentials: true,
      });
      const result = res.data;
      if (result.success) {
        setComments(result.data);
      }
    } catch (error) {
      return;
    }
  };
  const createComment = async (commentData) => {
    setLoading(true);
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/comment/create`,
        {
          movieId: commentData.movieId,
          content: commentData.content,
          isSpoiler: commentData.isSpoiler,
          movieName: commentData.movieName,
          parentId: commentData.parentId,
          movieThumb: commentData.movieThumb,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        getComments(commentData.movieId);
        setLoading(false);
        return true;
      }
    } catch (error) {
      setLoading(false);
      toastError(error?.response?.data?.message || "Lỗi khi thêm bình luận");
      return false;
    }
  };
  const likeComment = async (commentId, movieId) => {
    if (!user)
      return toastError("Vui lòng đăng nhập để thực hiện hành động này");
    try {
      const res = await axiosJWT.put(`${BASE_URL}/comment/like/${commentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      if (result.success) {
        getComments(movieId);
        return true;
      }
    } catch (error) {
      toastError(error?.response?.data?.message || "Lỗi khi thích bình luận");
      return false;
    }
  };
  const dislikeComment = async (commentId, movieId) => {
    if (!user)
      return toastError("Vui lòng đăng nhập để thực hiện hành động này");
    try {
      const res = await axiosJWT.put(
        `${BASE_URL}/comment/dislike/${commentId}`,
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
        getComments(movieId);
        return true;
      }
    } catch (error) {
      toastError(error?.response?.data?.message || "Lỗi khi thích bình luận");
      return false;
    }
  };
  useEffect(() => {
    const getNewComments = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/comment/newest`, {
          withCredentials: true,
        });
        const result = res.data;
        if (result.success) {
          setNewComments(result.data);
        }
      } catch (error) {
        return;
      }
    };
    getNewComments();
  }, []);

  useEffect(() => {
    const getTopComments = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/comment/top`, {
          withCredentials: true,
        });
        const result = res.data;
        if (result.success) {
          setTopComments(result.data);
        }
      } catch (error) {
        return;
      }
    };
    getTopComments();
  }, []);

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        newComments,
        topComments,
        getComments,
        createComment,
        setNewComments,
        likeComment,
        dislikeComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export default CommentProvider;
