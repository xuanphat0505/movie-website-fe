/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { OpenContext } from "../contexts/OpenContext";
import { CommentContext } from "../contexts/CommentContext";
import { RateContext } from "../contexts/RateContext";

import Loader from "../shared/Loader";
import Loading from "../shared/Loading/Loading";
import CommentItem from "../shared/CommentItem";

function CommentBox({ type = 1, movieId, movieName, movieThumb, replay = true }) {
  const { setFormDialog } = useContext(OpenContext);
  const { comments, loading, getComments, createComment } =
    useContext(CommentContext);
  const { rates, getRates } = useContext(RateContext);

  const user = useSelector((state) => state.auth.user);
  const [commentData, setCommentData] = useState({
    movieId: movieId,
    content: "",
    isSpoiler: true,
    movieName: movieName,
    movieThumb: movieThumb,
  });
  const [activeTab, setActiveTab] = useState("comment");
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [ratesLoading, setRatesLoading] = useState(false);

  const handleToggleSpoiler = () => {
    setCommentData((prev) => ({ ...prev, isSpoiler: !prev.isSpoiler }));
  };
  const handleChangeComment = (e) => {
    setCommentData({ ...commentData, content: e.target.value });
  };

  const handleSubmitComment = () => {
    if (!commentData.content.trim()) return;

    createComment(commentData);
    setCommentData((prev) => ({
      ...prev,
      content: "",
    }));
  };

  useEffect(() => {
    if (movieId) {
      if (activeTab === "comment") {
        setCommentsLoading(true);
        getComments(movieId).finally(() => setCommentsLoading(false));
      } else if (activeTab === "rate") {
        setRatesLoading(true);
        getRates(movieId).finally(() => setRatesLoading(false));
      }
    }
  }, [movieId, activeTab]);

  return (
    <div className="relative pt-[20px]">
      <div className="w-full min-h-[40px] mb-4 flex items-center gap-4 text-[1.6em] text-white-color font-semibold max-xsm:text-[1.3em]">
        <div className="w-6 h-6 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <g>
              <path
                d="M14.499 0.5H6.50109C3.19363 0.5 0.502686 3.19095 0.502686 6.4984V11.1638C0.502686 14.3596 3.01468 16.9796 6.16784 17.1532V19.9338C6.16784 20.2461 6.42244 20.5 6.73536 20.5C6.88498 20.5 7.02661 20.4407 7.13358 20.3337L7.75875 19.7085C9.40031 18.0666 11.5834 17.1622 13.9054 17.1622H14.499C17.8064 17.1622 20.4974 14.4713 20.4974 11.1638V6.4984C20.4974 3.19095 17.8064 0.5 14.499 0.5ZM6.16784 10.1641C5.4327 10.1641 4.83486 9.56625 4.83486 8.83111C4.83486 8.09597 5.4327 7.49813 6.16784 7.49813C6.90298 7.49813 7.50082 8.09597 7.50082 8.83111C7.50082 9.56625 6.90265 10.1641 6.16784 10.1641ZM10.5 10.1641C9.76488 10.1641 9.16704 9.56625 9.16704 8.83111C9.16704 8.09597 9.76488 7.49813 10.5 7.49813C11.2352 7.49813 11.833 8.09597 11.833 8.83111C11.833 9.56625 11.2348 10.1641 10.5 10.1641ZM14.8322 10.1641C14.0971 10.1641 13.4992 9.56625 13.4992 8.83111C13.4992 8.09597 14.0971 7.49813 14.8322 7.49813C15.5673 7.49813 16.1652 8.09597 16.1652 8.83111C16.1652 9.56625 15.567 10.1641 14.8322 10.1641Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </div>
        <span>
          {activeTab === "comment"
            ? `Bình luận (${comments.length > 0 ? comments.length : 0})`
            : `Đánh giá (${rates.length > 0 ? rates.length : 0})`}
        </span>
        <div className="model-tabs">
          <Link
            className={`tab-item ${activeTab === "comment" ? "active" : ""}`}
            onClick={() => setActiveTab("comment")}
          >
            Bình luận
          </Link>
          <Link
            className={`tab-item ${activeTab === "rate" ? "active" : ""}`}
            onClick={() => setActiveTab("rate")}
          >
            Đánh giá
          </Link>
        </div>
      </div>

      {activeTab === "comment" && type === 2 && (
        <div className={`comment-area ${replay ? "sub-replay" : ""}`}>
          {user ? (
            <div className="comment-user">
              <div className="comment-avatar">
                <img src={user?.avatar} alt={user?.username}></img>
              </div>
              <div className="comment-info">
                <small>Bình luận với tên</small>
                <span>{user?.username}</span>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              Vui lòng {" "}
              <Link
                className="text-primary-text cursor-pointer"
                onClick={() => setFormDialog("login")}
              >
                đăng nhập
              </Link> {" "}
              để tham gia bình luận.
            </div>
          )}

          <div className="w-full flex flex-col gap-2 p-2 rounded-[.75rem] bg-[#ffffff10]">
            <div className="relative">
              <textarea
                rows={4}
                cols={3}
                maxLength={1000}
                value={commentData.content}
                onChange={handleChangeComment}
                placeholder="Viết bình luận"
                className="form-control v-form-control"
              ></textarea>
              <div className="number-word">
                {commentData.content.length}/1000
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2">
                <div
                  className={`toggle-x ${commentData.isSpoiler ? "on" : "off"}`}
                  onClick={handleToggleSpoiler}
                >
                  <span></span>
                </div>
                <span className="text-white-color text-[.9em] whitespace-nowrap">
                  Tiết lộ?
                </span>
              </div>
              <button
                className={`btn text-primary-text `}
                onClick={handleSubmitComment}
              >
                <span>Gửi</span>
                {loading ? (
                  <Loader color={"#ffd875"} />
                ) : (
                  <div className="w-[14px] h-[14px] ml-1 flex-shrink-0">
                    <svg
                      fill="none"
                      height="512"
                      viewBox="0 0 24 24"
                      width="512"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                    >
                      <path
                        d="m22.1012 10.5616-19.34831-9.43824c-.1664-.08117-.34912-.12336-.53427-.12336-.67302 0-1.21862.5456-1.21862 1.21862v.03517c0 .16352.02005.32643.05971.48507l1.85597 7.42384c.05069.2028.22214.3526.42986.3757l8.15756.9064c.2829.0314.4969.2705.4969.5552s-.214.5238-.4969.5552l-8.15756.9064c-.20772.0231-.37917.1729-.42986.3757l-1.85597 7.4238c-.03966.1587-.05971.3216-.05971.4851v.0352c0 .673.5456 1.2186 1.21862 1.2186.18515 0 .36787-.0422.53427-.1234l19.34831-9.4382c.5499-.2682.8988-.8265.8988-1.4384s-.3489-1.1702-.8988-1.4384z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hiển thị loading khi đang tải comments/rates */}
      {commentsLoading || ratesLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loading />
        </div>
      ) : activeTab === "comment" && comments.length > 0 ? (
        <div className="comment-list">
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      ) : activeTab === "rate" && rates.length > 0 ? (
        <div className="rate-list">
          {rates.map((rate) => (
            <CommentItem key={rate._id} rate={rate} />
          ))}
        </div>
      ) : (
        <div className="v-notice">
          <div className="v-notice-icon">
            <img src={"https://res.cloudinary.com/djmeybzjk/image/upload/v1745254865/comment_c6vmkk.svg"} alt="" />
          </div>
          <p className="mb-0 text-text-base">
            Chưa có {activeTab === "comment" ? "bình luận" : "đánh giá"} nào
          </p>
        </div>
      )}
    </div>
  );
}

export default CommentBox;
