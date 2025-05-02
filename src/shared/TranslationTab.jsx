import { Link } from "react-router-dom";

import movieDetailImg from "../assets/images/movie-detail.webp";
import pdIcon from "../assets/images/pd.svg";

function TranslationTab({ padding, active }) {
  return (
    <div className={`body-box ${padding ? "no-padding" : ""}`}>
      <h3 className="heading-md box-header">Các bản dịch</h3>
      <div>
        <div className="translation-list w-full grid grid-cols-3 gap-4">
          <Link className={`translation-item ${active ? "active" : ""}`}>
            <div className="m-thumbnail">
              <img
                src={movieDetailImg}
                alt=""
                className="w-full h-full object-cover"
              ></img>
            </div>
            <div className="type-info">
              <div className="flex items-center gap-2">
                <div className="w-[20px] h-[20px] flex-shrink-0">
                  <img
                    src={
                      "https://res.cloudinary.com/djmeybzjk/image/upload/v1745254432/pd_jqdze5.svg"
                    }
                    alt=""
                    className="w-full h-full"
                  ></img>
                </div>
                <span>Phụ đề</span>
              </div>
              <div className="text-[1.2em] leading-[1.5] font-semibold line-clamp-2 capitalize">
                hẻm núi
              </div>
              <div className="flex items-center justify-center min-h-[30px] py-[.3rem] px-[.7rem] rounded-[.3rem] bg-white-color text-black border-black text-[12px] font-medium hover:opacity-[.9]">
                Xem bản này
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TranslationTab;
