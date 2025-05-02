/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaReply,
  FaChevronDown,
  FaChevronUp,
  FaStar,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

import { CommentContext } from "../contexts/CommentContext";
import { RateContext } from "../contexts/RateContext";
import Loader from "../shared/Loader";

function CommentItem({ comment, isReply = false, level = 0, rate }) {
  const { likeComment, dislikeComment, createComment } =
    useContext(CommentContext);
  const { likeRate, dislikeRate } = useContext(RateContext);
  const user = useSelector((state) => state.auth.user);

  // Determine if we're rendering a rate or a comment
  const isRate = !!rate;
  const item = isRate ? rate : comment;

  const [showSpoiler, setShowSpoiler] = useState(item?.isSpoiler);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isReplySpoiler, setIsReplySpoiler] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format thời gian
  const formatTimeAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch (_) {
      return "Unknown time";
    }
  };

  const handleSubmitReply = async () => {
    if (!replyContent.trim() || isRate) return;

    setIsSubmitting(true);
    const replyData = {
      movieId: item.movieId,
      content: replyContent,
      isSpoiler: isReplySpoiler,
      movieName: item.movieName,
      parentId: item._id,
      movieThumb: item.movieThumb,
    };

    const success = await createComment(replyData);
    if (success) {
      setReplyContent("");
      setShowReplyForm(false);
    }
    setIsSubmitting(false);
  };

  // Tính toán margin-left dựa trên level
  const marginLeft = level * 2; // 2rem cho mỗi level

  // Tính tổng số replies (bao gồm cả nested replies)
  const getTotalReplies = (comment) => {
    if (!comment?.replies || comment.replies.length === 0) return 0;

    let total = comment.replies.length;
    comment.replies.forEach((reply) => {
      total += getTotalReplies(reply);
    });
    return total;
  };

  const totalReplies = isRate ? 0 : getTotalReplies(item);

  const handleLikeDislike = (action) => {
    if (isRate) {
      if (action === "like") {
        likeRate(item._id, item.movieId);
      } else {
        dislikeRate(item._id, item.movieId);
      }
    } else {
      if (action === "like") {
        likeComment(item._id, item.movieId);
      } else {
        dislikeComment(item._id, item.movieId);
      }
    }
  };

  if (!item) return null;

  return (
    <div className={`comment-item ${isReply ? `ml-[${marginLeft}rem]` : ""}`}>
      <div className="comment-avatar">
        <img src={item?.userId?.avatar} alt={""}></img>
      </div>
      <div className="flex-grow-[1]">
        <div className="relative flex justify-start items-center gap-[.6rem] mb-2">
          {isRate && (
            <div className="rated">
              <span>
                {rate.rateMark === 1
                  ? "🤮"
                  : rate.rateMark === 2
                    ? "☹️"
                    : rate.rateMark === 3
                      ? "😊"
                      : rate.rateMark === 4
                        ? "😘"
                        : rate.rateMark === 5
                          ? "😍"
                          : ""}
              </span>
              {rate.content}
            </div>
          )}
          <div className="text-[1em] font-medium text-white-color whitespace-nowrap">
            {item?.userId?.username}
          </div>
          <div className="text-[11px] opacity-[0.5]">
            {formatTimeAgo(item?.createdAt)}
          </div>
        </div>
        <div className={`text ${!showSpoiler && !isRate ? "spoiler" : ""}`}>
          <span>{item.content}</span>
        </div>
        {!isRate && !item.isSpoiler && (
          <div className="mt-2 text-[.875em] ">
            <Link
              className="text-primary-text"
              onClick={() => setShowSpoiler((prev) => !prev)}
            >
              Xem
            </Link>
          </div>
        )}
        <div className="w-full flex items-center gap-2 text-[12px] mt-2">
          <div className="flex gap-4 items-center">
            <div
              className={`flex justify-center items-center gap-[.4rem] h-[28px] text-[14px] cursor-pointer hover:text-[#25d366] ${
                item.likedBy?.includes(user?._id) ? "text-[#25d366]" : ""
              }`}
              onClick={() => handleLikeDislike("like")}
            >
              <i>
                <FaArrowAltCircleUp />
              </i>
              {item.like > 0 ? <span>{item.like}</span> : ""}
            </div>
            <div
              className={`flex justify-center items-center h-[28px] text-[14px] cursor-pointer hover:text-[#d33d25] ${
                item.dislikedBy?.includes(user?._id) ? "text-[#d33d25]" : ""
              }`}
              onClick={() => handleLikeDislike("dislike")}
            >
              <i>
                <FaArrowAltCircleDown />
              </i>
              {item.dislike > 0 ? <span>{item.dislike}</span> : ""}
            </div>
          </div>
          {!isRate && (
            <button
              type="button"
              className="btn h-[28px] flex items-center gap-[.3rem] py-[.2rem] px-2 text-[12px] font-normal opacity-[0.6] hover:text-white-color hover:opacity-[1]"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <i>
                <FaReply />
              </i>
              <span>Trả lời</span>
            </button>
          )}
        </div>

        {/* Reply Form - Chỉ hiển thị cho comment, không cho rate */}
        {showReplyForm && !isRate && (
          <div className="w-[500px] my-[.6rem] flex flex-col gap-2 p-2 rounded-[.75rem] bg-[#ffffff10]">
            <div className="relative">
              <textarea
                rows={4}
                cols={3}
                maxLength={1000}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Viết bình luận"
                className="form-control v-form-control"
              ></textarea>
              <div className="number-word">{replyContent.length}/1000</div>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2">
                <div
                  className={`toggle-x ${isReplySpoiler ? "on" : "off"}`}
                  onClick={() => setIsReplySpoiler(!isReplySpoiler)}
                >
                  <span></span>
                </div>
                <span className="text-white-color text-[.9em] whitespace-nowrap">
                  Tiết lộ?
                </span>
              </div>
              <button
                className="btn text-primary-text"
                onClick={handleSubmitReply}
                disabled={isSubmitting}
              >
                <span>Gửi</span>
                {isSubmitting ? (
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
        )}

        {/* Hiển thị replies chỉ cho comment, không cho rate */}
        {!isRate && (
          <div className="mt-4">
            {totalReplies > 0 && (
              <Link
                className="text-[12px] text-primary-text inline-flex items-center"
                onClick={() => setShowReplies(!showReplies)}
              >
                <i className="text-[12px] mr-1">
                  {showReplies ? (
                    <FaChevronUp className="w-auto h-auto" />
                  ) : (
                    <FaChevronDown className="w-auto h-auto" />
                  )}
                </i>
                {totalReplies} {totalReplies === 1 ? "bình luận" : "bình luận"}
              </Link>
            )}
            {showReplies && item.replies && item.replies.length > 0 && (
              <div className="replies pt-6">
                {item.replies.map((reply) => (
                  <CommentItem
                    key={reply._id}
                    comment={reply}
                    isReply={true}
                    level={level + 1}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
