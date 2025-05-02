import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


import FilterGroup from "../components/FilterGroup";
import MovieBox from "../shared/MovieBox";
import Pagination from "../shared/Pagination";

function FilterMovies() {
  const { category } = useParams();
  const [filterMovies, setFilterMovies] = useState([]);
  const [pagination, setPagination] = useState({});

  const [filters, setFilters] = useState({
    type_list: category,
    country: "",
    year: "",
    page: 1,
  });

  useEffect(() => {
    const fetchDB = async () => {
      try {
        const res = await axios.get(
          `https://phimapi.com/v1/api/the-loai/${filters.type_list}`,
          {
            params: {
              page: filters.page,
              country: filters.country,
              year: filters.year,
            },
          }
        );
        const result = res.data;
        setFilterMovies(result.data.items);
        setPagination(result.data.params.pagination);
      } catch (error) {
        return alert(error.message);
      }
    };
    fetchDB();
    window.scrollTo(0, 0);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, ...newFilters };
      return updatedFilters;
    });
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };


  return (
    <section className = "section-page section-page__special ">
      <main className="pt-[5rem] pb-[10rem]">
        <div className="w-full h-auto px-[20px]">
          <div className="collection-title">
            <div className="w-[30px] h-[30px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className="w-full h-full"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.66333 23.3334H13.0033C15.0267 23.3334 16.6667 24.9734 16.6667 26.9967V31.3367C16.6667 33.36 15.0267 35 13.0033 35H8.66333C6.64 35 5 33.36 5 31.3367V26.9967C5 24.9734 6.64 23.3334 8.66333 23.3334Z"
                  stroke="#FFFFFF"
                  strokeWidth="2px"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.9966 23.3334H31.3366C33.3599 23.3334 34.9999 24.9734 34.9999 26.9967V31.3367C34.9999 33.36 33.3599 35 31.3366 35H26.9966C24.9733 35 23.3333 33.36 23.3333 31.3367V26.9967C23.3333 24.9734 24.9733 23.3334 26.9966 23.3334Z"
                  stroke="#FFFFFF"
                  strokeWidth="2px"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.66333 5H13.0033C15.0267 5 16.6667 6.64 16.6667 8.66333V13.0033C16.6667 15.0267 15.0267 16.6667 13.0033 16.6667H8.66333C6.64 16.6667 5 15.0267 5 13.0033V8.66333C5 6.64 6.64 5 8.66333 5Z"
                  stroke="#FFFFFF"
                  strokeWidth="2px"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                ></path>
                <path
                  d="M32.1887 13.8554C30.1637 15.8804 26.8787 15.8804 24.852 13.8554C22.827 11.8287 22.827 8.54542 24.852 6.51875C26.8787 4.49375 30.1637 4.49375 32.1887 6.51875C34.2153 8.54542 34.2153 11.8287 32.1887 13.8554ZM32.1887 13.8554L35 16.6658"
                  stroke="#FFFFFF"
                  strokeWidth="2px"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                ></path>
              </svg>
            </div>
            <h3>duyệt tìm</h3>
          </div>
          <FilterGroup filters={filters} onFilterChange={handleFilterChange} />
          <div>
            <div className="card-grid-wrapper">
              {filterMovies?.map((movie) => (
                <MovieBox key={movie._id} movie={movie} type={1} />
              ))}
            </div>
          </div>
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      </main>
    </section>
  );
}

export default FilterMovies;
