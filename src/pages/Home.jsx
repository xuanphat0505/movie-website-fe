import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import axios from "axios";

import { WatchHistoryContext } from "../contexts/WatchHistoryContext";
import RankingTable from "../components/RankingTable";
import Slides from "../components/Slides/Slides";
import TypeList from "../components/TypeList";
import CollectionType1 from "../shared/CollectionType/CollectionType1";
import CollectionType2 from "../shared/CollectionType/CollectionType2";
import RankingTableDialog from "../shared/Dialog/RankMovieDialog";
import TopComment from "../components/TopComment";
import MovieBox from "../shared/MovieBox";
import Loading from "../shared/Loading/Loading";
import useAxios from "../hooks/useAxios";
import RankTypeDialog from "../shared/Dialog/RankTypeDialog";

function Home() {
  const user = useSelector((state) => state.auth.user);
  const { watchHistory, isLoading: historyLoading } =
    useContext(WatchHistoryContext);

  const [newMovies, setNewMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const collections = [
    {
      type: 1,
      apiPath: "https://phimapi.com/v1/api/the-loai/chinh-kich",
      title: "phim chính kịch",
      slug: "chinh-kich",
    },
    {
      type: 1,
      apiPath: "https://phimapi.com/v1/api/the-loai/vien-tuong",
      title: "phim viễn tưởng",
      slug: "vien-tuong",
    },
    {
      type: 1,
      apiPath: "https://phimapi.com/v1/api/the-loai/vo-thuat",
      title: "phim võ thuật",
      slug: "vo-thuat",
    },
    {
      type: 1,
      apiPath: "https://phimapi.com/v1/api/the-loai/phieu-luu",
      title: "phim phiêu lưu",
      slug: "phieu-luu",
    },
    {
      type: 1,
      apiPath: "https://phimapi.com/v1/api/the-loai/tam-ly",
      title: "phim tâm lý",
      slug: "tam-ly",
    },
    {
      type: 1,
      apiPath: "https://phimapi.com/v1/api/the-loai/hai-huoc",
      title: "phim hài hước",
      slug: "hai-huoc",
    },
    {
      type: 1,
      apiPath: "https://phimapi.com/v1/api/the-loai/chien-tranh",
      title: "phim chiến tranh",
      slug: "chien-tranh",
    },
  ];

  const { data: dramaMovies, loading: loadingDrama } = useAxios(
    collections[0].apiPath,
    { page: 1 }
  );
  const { data: fantasyMovies, loading: loadingFantasy } = useAxios(
    collections[1].apiPath,
    { page: 1 }
  );
  const { data: martialArtMovies, loading: loadingMartial } = useAxios(
    collections[2].apiPath,
    { page: 1 }
  );
  const { data: adventureMovies, loading: loadingAdventure } = useAxios(
    collections[3].apiPath,
    { page: 1 }
  );
  const { data: mentalityMovies, loading: loadingMentality } = useAxios(
    collections[4].apiPath,
    { page: 1 }
  );
  const { data: comedyMovies, loading: loadingComedy } = useAxios(
    collections[5].apiPath,
    { page: 1 }
  );
  const { data: warMovies, loading: loadingWar } = useAxios(
    collections[6].apiPath,
    { page: 1 }
  );

  useEffect(() => {
    setIsLoading(
      loadingDrama ||
        loadingFantasy ||
        loadingMartial ||
        loadingAdventure ||
        loadingMentality ||
        loadingComedy ||
        loadingWar
    );
  }, [
    loadingDrama,
    loadingFantasy,
    loadingMartial,
    loadingAdventure,
    loadingMentality,
    loadingComedy,
    loadingWar,
  ]);

  const collectionData = collections.map((collection, index) => ({
    ...collection,
    data: [
      dramaMovies,
      fantasyMovies,
      martialArtMovies,
      adventureMovies,
      mentalityMovies,
      comedyMovies,
      warMovies,
    ][index],
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?page=1"
        );
        const result = res.data;
        setNewMovies(result.items);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="section-page section-page__special">
      <Slides movies={newMovies?.slice(0, 5)} />
      <RankingTableDialog />
      <RankTypeDialog />
      <main className="w-full relative z-[9]">
        <div className="home-container flex flex-col gap-[50px] pb-[160px] px-[20px] max-sm:px-4">
          <TypeList />
          {user && (
            <div className="w-full h-auto px-[20px] effect-fade-in">
              <div className="flex items-center justify-start gap-4 min-h-[44px] mb-[1.2rem]">
                <h3 className="category-name inline-block w-auto">
                  Xem tiếp của bạn
                </h3>
                <div className="cat-more">
                  <Link to="/user-profile/watch-later">
                    <span>Xem thêm</span>
                    <i>
                      <FaAngleRight size={15} />
                    </i>
                  </Link>
                </div>
              </div>
              <div className="w-full">
                {historyLoading ? (
                  <Loading height={200} />
                ) : watchHistory.length > 0 ? (
                  <div className="card-grid-wrapper">
                    {watchHistory.map((history, index) => (
                      <MovieBox
                        key={index}
                        movie={history}
                        type={1}
                        removeButton={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-white-color py-4">
                    Bạn chưa có lịch sử xem phim nào
                  </div>
                )}
              </div>
            </div>
          )}

          <CollectionType2 />
          <div className="table-wrapper max-xl:hidden">
            <TopComment />
            <RankingTable />
          </div>
          {collectionData.map((collection, index) => (
            <CollectionType1
              key={index}
              type={collection.type}
              movies={collection.data}
              title={collection.title}
              slug={collection.slug}
              isLoading={isLoading}
            />
          ))}
        </div>
      </main>
    </section>
  );
}

export default Home;
