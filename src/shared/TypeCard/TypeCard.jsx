/* eslint-disable react/prop-types */
import {  useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

import "./TypeCard.css";
function TypeCard({ type }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/movie/category/${type.path}`, { state: { type } });
  };

  return (
    <div className="type-card text-white-color cursor-pointer" onClick={handleClick}>
      <div className="mask" style={{ backgroundColor: `${type.color}` }}></div>
      <div className="intro relative z-[3] w-full h-full flex flex-col items-start justify-end gap-[.7rem] ">
        <div className="heading-md line-clamp-2 capitalize text-[1.6em] leading-[1.3] m-0 ">
          {type.title}
        </div>
        <div className="info flex gap-[.4rem] items-center min-h-[30px] text-[14px] bg-transparent">
          <span>Xem chủ đề</span>
          <i>
            <FaAngleRight />
          </i>
        </div>
      </div>
    </div>
  );
}

export default TypeCard;
