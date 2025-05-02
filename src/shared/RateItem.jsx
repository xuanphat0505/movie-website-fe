/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaStar,
} from "react-icons/fa";

import { RateContext } from "../contexts/RateContext";

function RateItem({ rate }) {
  const { likeRate, dislikeRate } = useContext(RateContext);
  const user = useSelector((state) => state.auth.user);

  // Format thời gian
  const formatTimeAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch (error) {
      return "Unknown time";
    }
  };

  return (
    <div className="rate-item mb-4">
      <div className="flex items-start gap-3">
        <div className="rate-avatar">
          <img src={rate?.userId?.avatar} alt={""}></img>
        </div>
        <div className="flex-grow-1">
          <div className="relative flex justify-start items-center gap-[.6rem] mb-2">
            <div className="text-[1em] font-medium text-white-color whitespace-nowrap">
              {rate?.userId?.username}
            </div>
            <div className="text-[11px] opacity-[0.5]">
              {formatTimeAgo(rate?.createdAt)}
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-yellow-400">{rate.rateMark}</span>
              <FaStar className="text-yellow-400" />
            </div>
          </div>
          <div className="text">
            <span>{rate.content}</span>
          </div>
          <div className="w-full flex items-center gap-2 text-[12px] mt-2">
            <div className="flex gap-4 items-center">
              <div
                className={`flex justify-center items-center gap-[.4rem] h-[28px] text-[14px] cursor-pointer hover:text-[#25d366] ${
                  rate.likedBy?.includes(user?._id) ? "text-[#25d366]" : ""
                }`}
                onClick={() => likeRate(rate._id, rate.movieId)}
              >
                <i>
                  <FaArrowAltCircleUp />
                </i>
                {rate.like > 0 ? <span>{rate.like}</span> : ""}
              </div>
              <div
                className={`flex justify-center items-center h-[28px] text-[14px] cursor-pointer hover:text-[#d33d25] ${
                  rate.dislikedBy?.includes(user?._id) ? "text-[#d33d25]" : ""
                }`}
                onClick={() => dislikeRate(rate._id, rate.movieId)}
              >
                <i>
                  <FaArrowAltCircleDown />
                </i>
                {rate.dislike > 0 ? <span>{rate.dislike}</span> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RateItem; 