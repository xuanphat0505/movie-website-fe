/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

function Pagination({ pagination, onPageChange }) {
  const [inputPage, setInputPage] = useState(pagination?.currentPage || 1);

  const handlePrev = () => {
    if (pagination?.currentPage > 1) {
      onPageChange(pagination?.currentPage - 1);
      setInputPage(pagination?.currentPage - 1);
    }
  };

  const handleNext = () => {
    if (pagination?.currentPage < pagination?.totalPages) {
      onPageChange(pagination?.currentPage + 1);
      setInputPage(pagination?.currentPage + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputPage(value);
    }
  };

  const applyPageChange = () => {
    let pageNumber = parseInt(inputPage, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > pagination?.totalPages) {
      pageNumber = pagination?.totalPages;
    }
    setInputPage(pageNumber);
    onPageChange(pageNumber);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      applyPageChange();
    }
  };
  
  return (
    <div className="pagination">
      <div className="page-control">
        <button type="button" onClick={handlePrev}>
          <i>
            <FaArrowLeft size={15} />
          </i>
        </button>
        <div className="page-current">
          <div>Trang</div>
          <input
            type="number"
            value={inputPage}
            onChange={handleInputChange}
            onBlur={applyPageChange}
            onKeyDown={handleKeyDown}
            max={pagination?.totalPages}
            min={1}
            step={1}
            required
          ></input>
          <div>/{pagination?.totalPages}</div>
        </div>
        <button type="button" onClick={handleNext}>
          <i>
            <FaArrowRight size={15} />
          </i>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
