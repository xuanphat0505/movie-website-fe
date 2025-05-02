import { FaFilter } from "react-icons/fa";

import MovieBox from "../shared/MovieBox";
import Pagination from "../shared/Pagination";

function TypeMovie() {
  return (
    <section className = "section-page section-page__special ">
      <main className="pt-[5rem] pb-[10rem]">
        <div className="w-full h-auto px-[20px]">
          <div className="flex items-center justify-start w-full min-h-[44px] mb-[1.2rem] ">
            <h3 className="leading-[1.4] font-semibold text-category-name text-[1.8em]">
              Phim lẻ
            </h3>
          </div>
          <div className="w-full mb-8">
            <div className="inline-flex items-center gap-2 w-auto h-30px text-[1.1em] font-medium cursor-pointer text-white-color hover:opacity-[0.9]">
              <i>
                <FaFilter size={12} />
              </i>
              <span>Bộ lọc</span>
            </div>
          </div>
          <div className="w-full mb-[64px]">
            <div className="card-grid-wrapper">
              {[...Array(10)].map((_, index) => (
                <MovieBox key={index} type={1} />
              ))}
            </div>
          </div>
          <Pagination />
        </div>
      </main>
    </section>
  );
}

export default TypeMovie;
