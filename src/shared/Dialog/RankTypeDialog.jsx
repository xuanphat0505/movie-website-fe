import { useContext } from "react";
import { FaMinus, FaTimes } from "react-icons/fa";

import { OpenContext } from "../../contexts/OpenContext";
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaFolderPlus,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

function RankTypeDialog() {
  const { openRankTypeDialog, setOpenRankTypeDialog, types } =
    useContext(OpenContext);

  return (
    <div
      className={`dialog ${openRankTypeDialog ? "show" : ""}`}
      onClick={() => setOpenRankTypeDialog(false)}
    >
      <div className="modal-md modal-dialog">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button
            className="close-dialog"
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện click lan ra .dialog
              setOpenRankTypeDialog(false);
            }}
          >
            <i>
              <FaTimes size={16} />
            </i>
          </button>
          <div className="rank-title">
            <i>
              <FaFolderPlus size={16} className="text-primary-color" />
            </i>
            <span>sôi nổi nhất</span>
          </div>
          <div className="big-chart chart-list">
            {types.map((type, index) => (
              <div
                className="item h-[50px] flex items-center gap-[1rem]"
                key={index}
              >
                <div className="w-[16px] text-[1.2em] font-semibold opacity-[.3] flex-shrink-0">
                  {index + 1}.
                </div>
                <div className="flex-shrink-0">
                  <i>
                    {type.trend === "up" ? (
                      <FaArrowTrendUp size={16} className="text-[#bedc33]" />
                    ) : type.trend === "down" ? (
                      <FaArrowTrendDown size={16} className="text-[#dc328c]" />
                    ) : (
                      <FaMinus size={16} className="text-[#fff3]" />
                    )}
                  </i>
                </div>
                <div
                  className="flex items-center h-[28px] px-[.8rem] text-[13px] rounded-[30px] text-white-color"
                  style={{ background: type.color }}
                >
                  <Link className="capitalize hover:text-current">
                    {type.type}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankTypeDialog;
