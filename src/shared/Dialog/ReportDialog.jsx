import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { OpenContext } from "../../contexts/OpenContext";
import { submitReport } from "../../apis/reportApi";
import { toastSuccess, toastError } from "../Toastify";
import useAxiosJWT from "../../config/axiosConfig";

import "./Dialog.css";

// Danh sách loại lỗi người dùng có thể báo cáo
const REPORT_TYPES = [
  { value: "video_error", label: "🎬 Lỗi video (không phát được)" },
  { value: "audio_error", label: "🔊 Lỗi âm thanh (không có / bị lệch)" },
  { value: "subtitle_error", label: "📝 Phụ đề sai / thiếu" },
  { value: "content_violation", label: "🚫 Nội dung vi phạm" },
  { value: "other", label: "💬 Lỗi khác" },
];

function ReportDialog({ movie, episode }) {
  const { openReportDialog, setOpenReportDialog } = useContext(OpenContext);
  const user = useSelector((state) => state.auth.user);
  const getAxiosJWT = useAxiosJWT();

  const [selectedType, setSelectedType] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Đóng dialog và reset form
  const handleClose = () => {
    setOpenReportDialog(false);
    setSelectedType("");
    setNote("");
  };

  // Gửi báo cáo lỗi lên server
  const handleSubmit = async () => {
    if (!selectedType) {
      return toastError("Vui lòng chọn loại lỗi");
    }

    setIsSubmitting(true);
    try {
      const axiosJWT = getAxiosJWT();
      await submitReport(axiosJWT, user?.accessToken, {
        movieId: movie?.slug || "",
        movieName: movie?.name || "",
        episodeName: episode?.name || "",
        type: selectedType,
        note: note.trim(),
      });
      toastSuccess("Báo cáo đã được ghi nhận. Cảm ơn bạn!");
      handleClose();
    } catch (error) {
      toastError(error?.response?.data?.message || "Gửi báo cáo thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      className={`dialog ${openReportDialog ? "show" : ""}`}
      onClick={handleClose}
    >
      <div
        className="modal-sm modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <button
            type="button"
            onClick={handleClose}
            className="close-dialog"
          >
            <i>
              <FaTimes size={16} />
            </i>
          </button>

          <div className="mb-4">
            <h4 className="heading-sm text-center">Báo lỗi</h4>
            {movie?.name && (
              <p className="text-center text-[.9em] text-[#ffffff80] mb-0 mt-1 line-clamp-1">
                {movie.name}
                {episode?.name ? ` — ${episode.name}` : ""}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 mb-4">
            {REPORT_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setSelectedType(type.value)}
                className={`w-full text-left px-4 py-3 rounded-[.6rem] text-[.95em] transition-all
                  ${
                    selectedType === type.value
                      ? "bg-[#3556b6] text-white"
                      : "bg-[#ffffff10] text-[#ffffffcc] hover:bg-[#ffffff18]"
                  }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <textarea
            className="w-full px-4 py-3 rounded-[.6rem] bg-[#ffffff08] border border-[#ffffff15] text-white text-[.9em] resize-none mb-4 focus:outline-none focus:border-[#ffffff30]"
            rows={3}
            placeholder="Ghi chú thêm (tuỳ chọn)..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={500}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-[.5rem] bg-[#ffffff10] text-white text-[.9em] hover:bg-[#ffffff18] transition-all"
            >
              Huỷ
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedType}
              className="px-5 py-2 rounded-[.5rem] bg-[#3556b6] text-white text-[.9em] hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi báo cáo"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

ReportDialog.propTypes = {
  movie: PropTypes.object,
  episode: PropTypes.object,
};

export default ReportDialog;
