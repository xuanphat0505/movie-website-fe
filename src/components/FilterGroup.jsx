import { FaFilter } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import { filterCategory } from "../assets/data/data";
import { useEffect, useState } from "react";

function FilterGroup({ onFilterChange, filters }) {
  const [show, setShow] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(filters);

  const filterKeyMap = {
    "Quốc gia": "country",
    "Thể loại": "type_list",
    "Năm sản xuất": "year",
  };

  // Đồng bộ selectedFilters khi filters từ props thay đổi
  useEffect(() => {
    setSelectedFilters(filters);
  }, [filters]);

  const handleFilterClick = (filterName, slug) => {
    const filterKey = filterKeyMap[filterName]; // Lấy key tương ứng từ filterKeyMap
    if (!filterKey) return;

    setSelectedFilters((prev) => {
      // Nếu filter đang active (đã chọn), thì loại bỏ nó (gán "")
      const newValue = prev[filterKey] === slug ? "" : slug;
      return { ...prev, [filterKey]: newValue };
    });
  };

  const applyFilters = () => {
    onFilterChange(selectedFilters);
  };


  return (
    <div className="w-full mb-8">
      <div
        className=" h-[30px] inline-flex items-center gap-2 pr-3 pl-2 text-[1.1em] font-medium rounded-[.3rem] bg-bg-color text-white-color cursor-pointer select-none"
        onClick={() => setShow((prev) => !prev)}
      >
        <i className="text-primary-color">
          <FaFilter size={12} />
        </i>
        <span>Bộ lọc</span>
      </div>
      <div
        className={`${show ? "hidden" : "block"} filter-elements w-full pt-4 mt-[-15px] mb-12 border-[1px] border-border-color rounded-[.75rem]`}
      >
        {filterCategory.map((filter, index) => {
          return (
            <div className="filter-row" key={index}>
              <div className="filter-name">{filter.name}:</div>
              <div className="filter-result">
                {filter.categories.map((category, i) => {
                  const filterKey = filterKeyMap[filter.name]; // Lấy key tương ứng
                  const isActive = selectedFilters[filterKey] === category.slug; // Kiểm tra trạng thái active

                  return (
                    <div
                      key={i}
                      className={`filter-item ${isActive ? "active" : ""}`}
                      onClick={() =>
                        handleFilterClick(filter.name, category.slug)
                      }
                    >
                      {category.name}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="filter-row filter-row-last">
          <div className="filter-name"></div>
          <div className="flex-grow-[1]">
            <button className="btn btn-left" onClick={applyFilters}>
              Lọc kết quả
              <i>
                <FaArrowRight size={13} />
              </i>
            </button>
            <button className="btn btn-right">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterGroup;
