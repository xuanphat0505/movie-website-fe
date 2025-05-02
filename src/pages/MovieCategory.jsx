import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieBox from "../shared/MovieBox";
import Pagination from "../shared/Pagination";
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function MovieCategory() {
  const location = useLocation();
  const { type } = location.state || {};
  const [page, setPage] = useState(1);
  const [categoryMovies, setCategoryMovies] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://phimapi.com/v1/api/danh-sach/${type.path}`,
          {
            params: { page },
          }
        );
        const result = res.data;
        setCategoryMovies(result.data.items);
        setPagination(result.data.params.pagination);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
    window.scrollTo(0, 0);
  }, [type.path, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const MovieSkeleton = () => (
    <div className="w-full">
      <Skeleton height={300} />
      <Skeleton height={20} width={150} style={{ marginTop: 10 }} />
      <Skeleton height={15} width={100} style={{ marginTop: 5 }} />
    </div>
  );

    
  return (
    <section className = "section-page section-page__special ">
      <main className="pt-[5rem] pb-[10rem]">
        <div
          className="topic-background"
          style={{ backgroundColor: `${type.color}` }}
        ></div>
        <div className="w-full px-[20px]">
          <div className="collection-title">
            {isLoading ? (
              <Skeleton height={50} width={200} />
            ) : (
              <h3
                className="text-gradient text-[3rem]"
                style={{
                  background: `linear-gradient(
      235deg,
      rgb(255, 255, 255) 30%,
      ${type.color} 130%
    )`,
                }}
              >
                {type.title}
              </h3>
            )}
          </div>
          <div className="w-full">
            <div className="card-grid-wrapper">
              {isLoading
                ? Array(12).fill(0).map((_, index) => (
                    <MovieSkeleton key={index} />
                  ))
                : categoryMovies?.map((movie) => (
                    <MovieBox key={movie._id} type={1} movie={movie} />
                  ))}
            </div>
            {!isLoading && (
              <Pagination pagination={pagination} onPageChange={handlePageChange} />
            )}
          </div>
        </div>
      </main>
    </section>
  );
}

export default MovieCategory;
