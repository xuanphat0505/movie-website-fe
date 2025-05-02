/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaCaretDown, FaPlay } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";

function ListEpisode({ padding, episodes, onSelectEpisode, currentEpisode }) {
  const [showSeasonPopup, setShowSeasonPopup] = useState(false);
  return (
    <>
      {Array.isArray(episodes) ? (
        episodes.map((episode, serverIndex) => (
          <div
            className={`body-box ${padding ? "" : "no-padding"}`}
            key={serverIndex}
          >
            <div className="box-header w-full flex items-center gap-8">
              <div className="season-dropdown relative">
                <div className="inline-flex items-center gap-[.6rem] pr-6 text-[1.4em] font-semibold text-white-color border-r-[1px] border-[#ffffff30] cursor-pointer">
                  <i className="text-primary-color">
                    <FaBarsStaggered />
                  </i>
                  Phần 1
                  <i>
                    <FaCaretDown />
                  </i>
                </div>
              </div>
              <div>
                <button className="min-h-[30px] min-w-[auto] inline-flex justify-center items-center gap-2 px-2 text-[12px] rounded-[.4rem] bg-transparent border-[1px] border-white-color text-white-color">
                  <div className="w-[12px] h-[12px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="w-full h-full"
                    >
                      <path
                        d="M15.3333 4.6665C15.3333 4.13584 15.1227 3.62717 14.7473 3.2525C14.3727 2.87717 13.864 2.6665 13.3333 2.6665C10.7787 2.6665 5.22132 2.6665 2.66666 2.6665C2.13599 2.6665 1.62732 2.87717 1.25266 3.2525C0.877322 3.62717 0.666656 4.13584 0.666656 4.6665V11.3332C0.666656 11.8638 0.877322 12.3725 1.25266 12.7472C1.62732 13.1225 2.13599 13.3332 2.66666 13.3332H13.3333C13.864 13.3332 14.3727 13.1225 14.7473 12.7472C15.1227 12.3725 15.3333 11.8638 15.3333 11.3332V4.6665ZM14 4.6665V11.3332C14 11.5098 13.93 11.6798 13.8047 11.8045C13.68 11.9298 13.51 11.9998 13.3333 11.9998H2.66666C2.48999 11.9998 2.31999 11.9298 2.19532 11.8045C2.06999 11.6798 1.99999 11.5098 1.99999 11.3332V4.6665C1.99999 4.48984 2.06999 4.31984 2.19532 4.19517C2.31999 4.06984 2.48999 3.99984 2.66666 3.99984H13.3333C13.51 3.99984 13.68 4.06984 13.8047 4.19517C13.93 4.31984 14 4.48984 14 4.6665ZM3.99999 10.6665H5.33332C5.70132 10.6665 5.99999 10.3678 5.99999 9.99984C5.99999 9.63184 5.70132 9.33317 5.33332 9.33317H3.99999C3.63199 9.33317 3.33332 9.63184 3.33332 9.99984C3.33332 10.3678 3.63199 10.6665 3.99999 10.6665ZM7.99999 10.6665H12C12.368 10.6665 12.6667 10.3678 12.6667 9.99984C12.6667 9.63184 12.368 9.33317 12 9.33317H7.99999C7.63199 9.33317 7.33332 9.63184 7.33332 9.99984C7.33332 10.3678 7.63199 10.6665 7.99999 10.6665ZM11.3333 7.99984H12C12.368 7.99984 12.6667 7.70117 12.6667 7.33317C12.6667 6.96517 12.368 6.6665 12 6.6665H11.3333C10.9653 6.6665 10.6667 6.96517 10.6667 7.33317C10.6667 7.70117 10.9653 7.99984 11.3333 7.99984ZM3.99999 7.99984H8.66666C9.03466 7.99984 9.33332 7.70117 9.33332 7.33317C9.33332 6.96517 9.03466 6.6665 8.66666 6.6665H3.99999C3.63199 6.6665 3.33332 6.96517 3.33332 7.33317C3.33332 7.70117 3.63199 7.99984 3.99999 7.99984Z"
                        fill="currentcolor"
                      ></path>
                    </svg>
                  </div>
                  <span>{episode?.server_name.replace(/^#/, "")}</span>
                </button>
              </div>
            </div>
            <div className="list-episode ">
              {episode?.server_data.map((eps, index) => (
                <Link
                  className={`episode-item ${currentEpisode === index && serverIndex === 0 ? "active" : ""} `}
                  key={index}
                  onClick={() => onSelectEpisode(index)}
                >
                  <div className="inline-flex items-center gap-[.6rem]">
                    <div className="block text-[10px]">
                      <i>
                        <FaPlay />
                      </i>
                    </div>
                    <span className="font-normal">
                      {eps.name === "" ? "Full" : eps.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className={`body-box ${padding ? "" : "no-padding"}`}>
          <div className="box-header w-full flex items-center gap-8">
            <div
              className="season-dropdown relative"
              onClick={() => setShowSeasonPopup((prev) => !prev)}
            >
              <div className="season-popup">
                <div
                  className={`v-dropdown-menu dropdown-menu ${showSeasonPopup ? "show" : ""}`}
                >
                  <div className="dropdown-blank">
                    <span>Danh sách phần</span>
                  </div>
                  <div className="drop-list">
                    <Link className={`dropdown-item active`}>
                      <strong className="font-semibold">Phần 1</strong>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-[.6rem] pr-6 text-[1.4em] font-semibold text-white-color border-r-[1px] border-[#ffffff30] cursor-pointer">
                <i className="text-primary-color">
                  <FaBarsStaggered />
                </i>
                Phần 1
                <i>
                  <FaCaretDown />
                </i>
              </div>
            </div>
            <div>
              <button className="min-h-[30px] min-w-[auto] inline-flex justify-center items-center gap-2 px-2 text-[12px] rounded-[.4rem] bg-transparent border-[1px] border-white-color text-white-color">
                <div className="w-[12px] h-[12px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="w-full h-full"
                  >
                    <path
                      d="M15.3333 4.6665C15.3333 4.13584 15.1227 3.62717 14.7473 3.2525C14.3727 2.87717 13.864 2.6665 13.3333 2.6665C10.7787 2.6665 5.22132 2.6665 2.66666 2.6665C2.13599 2.6665 1.62732 2.87717 1.25266 3.2525C0.877322 3.62717 0.666656 4.13584 0.666656 4.6665V11.3332C0.666656 11.8638 0.877322 12.3725 1.25266 12.7472C1.62732 13.1225 2.13599 13.3332 2.66666 13.3332H13.3333C13.864 13.3332 14.3727 13.1225 14.7473 12.7472C15.1227 12.3725 15.3333 11.8638 15.3333 11.3332V4.6665ZM14 4.6665V11.3332C14 11.5098 13.93 11.6798 13.8047 11.8045C13.68 11.9298 13.51 11.9998 13.3333 11.9998H2.66666C2.48999 11.9998 2.31999 11.9298 2.19532 11.8045C2.06999 11.6798 1.99999 11.5098 1.99999 11.3332V4.6665C1.99999 4.48984 2.06999 4.31984 2.19532 4.19517C2.31999 4.06984 2.48999 3.99984 2.66666 3.99984H13.3333C13.51 3.99984 13.68 4.06984 13.8047 4.19517C13.93 4.31984 14 4.48984 14 4.6665ZM3.99999 10.6665H5.33332C5.70132 10.6665 5.99999 10.3678 5.99999 9.99984C5.99999 9.63184 5.70132 9.33317 5.33332 9.33317H3.99999C3.63199 9.33317 3.33332 9.63184 3.33332 9.99984C3.33332 10.3678 3.63199 10.6665 3.99999 10.6665ZM7.99999 10.6665H12C12.368 10.6665 12.6667 10.3678 12.6667 9.99984C12.6667 9.63184 12.368 9.33317 12 9.33317H7.99999C7.63199 9.33317 7.33332 9.63184 7.33332 9.99984C7.33332 10.3678 7.63199 10.6665 7.99999 10.6665ZM11.3333 7.99984H12C12.368 7.99984 12.6667 7.70117 12.6667 7.33317C12.6667 6.96517 12.368 6.6665 12 6.6665H11.3333C10.9653 6.6665 10.6667 6.96517 10.6667 7.33317C10.6667 7.70117 10.9653 7.99984 11.3333 7.99984ZM3.99999 7.99984H8.66666C9.03466 7.99984 9.33332 7.70117 9.33332 7.33317C9.33332 6.96517 9.03466 6.6665 8.66666 6.6665H3.99999C3.63199 6.6665 3.33332 6.96517 3.33332 7.33317C3.33332 7.70117 3.63199 7.99984 3.99999 7.99984Z"
                      fill="currentcolor"
                    ></path>
                  </svg>
                </div>
                <span>{episodes?.server_name?.replace(/^#/, "")}</span>
              </button>
            </div>
          </div>
          <div className="list-episode">
            {episodes?.server_data?.map((eps, index) => (
              <Link
                className={`episode-item ${currentEpisode === index ? "active" : ""} `}
                key={index}
                onClick={() => onSelectEpisode(index)}
              >
                <div className="inline-flex items-center gap-[.6rem]">
                  <div className="block text-[10px]">
                    <i>
                      <FaPlay />
                    </i>
                  </div>
                  <span className="font-normal">
                    {eps.name === "" ? "Full" : eps.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ListEpisode;
