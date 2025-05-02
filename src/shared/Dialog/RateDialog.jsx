import { useSelector } from "react-redux";
import { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";

import { OpenContext } from "../../contexts/OpenContext";
import { rateIcons } from "../../assets/data/data";
import { RateContext } from "../../contexts/RateContext";
import { BASE_URL } from "../../config/utils";
import useAxiosJWT from "../../config/axiosConfig";
import Loader from "../../shared/Loader";

import "./Dialog.css";
import { toastError, toastSuccess } from "../Toastify";

function RateDialog({ movieId }) {
  const user = useSelector((state) => state.auth.user);
  const { openRateDialog, setOpenRateDialog } = useContext(OpenContext);
  const { rateStats, getRates, movieRatings } = useContext(RateContext);
  const [rateLoading, setRateLoading] = useState(false);
  const [rateData, setRateData] = useState({
    movieId: movieId,
    content: "",
    rateMark: 0,
  });
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();

  const handleRateClick = (index) => {
    setRateData({
      ...rateData,
      rateMark: index + 1,
    });
  };
  const handleChange = (e) => {
    setRateData({
      ...rateData,
      content: e.target.value,
    });
  };

  const handleSubmit = async (rateData) => {
    if (!user) {
      return toastError("Vui lòng đăng nhập để đánh giá");
    }

    setRateLoading(true);
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/rate/create`,
        {
          movieId: rateData.movieId,
          content: rateData.content,
          rateMark: rateData.rateMark,
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
      if (result) {
        getRates(rateData.movieId);
        setRateLoading(false);
        toastSuccess("Đánh giá thành công");
        setOpenRateDialog(false);
        return true;
      }
    } catch (error) {
      setRateLoading(false);
      toastError(
        error?.response?.data?.message || "Có lỗi xảy ra khi đánh giá"
      );
      return false;
    }
  };

  return (
    <div
      className={`dialog ${openRateDialog ? "show" : ""}`}
      onClick={() => setOpenRateDialog(false)}
    >
      <div
        className="modal-lg modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenRateDialog(false);
            }}
            className="close-dialog"
          >
            <i>
              <FaTimes size={16} />
            </i>
          </button>
          <div className="mb-2">
            <h4 className="heading-sm text-center capitalize mb-0">
              Đánh giá phim
            </h4>
          </div>
          <div className="modal-body mb-12">
            <div className="flex items-center justify-center w-full gap-2 mb-6">
              <div className="rating-icon"></div>
              <strong className="text-white-color">
                {(movieRatings[movieId]?.stats?.avgRate * 2).toFixed(1)}
              </strong>
              <span>
                / {movieRatings[movieId]?.stats?.totalRates} lượt đánh giá
              </span>
            </div>
            <div className="rate-emo">
              {rateIcons.map((rate, index) => (
                <div
                  className={`emo-item ${rateData.rateMark === index + 1 ? "active" : ""}`}
                  key={index}
                  onClick={() => handleRateClick(index)}
                >
                  <div className="emo">
                    <img src={rate.icon} alt={rate.text} />
                  </div>
                  <span className="capitalize">{rate.text}</span>
                </div>
              ))}
            </div>
            <div className="rate-comment w-full mt-6">
              <textarea
                className="v-form-control"
                rows={3}
                cols={3}
                onChange={handleChange}
                value={rateData.content}
                placeholder="Viết nhận xét về phim (tùy chọn)"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer w-full flex justify-center items-center gap-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSubmit(rateData)}
            >
              {rateLoading ? <Loader /> : "Gửi đánh giá"}
            </button>
            <button
              className="btn bg-white-color text-primary-button-text"
              onClick={() => setOpenRateDialog(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RateDialog;
