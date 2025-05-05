import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import CollectionType1 from "./CollectionType1";
import Loading from "../../shared/Loading/Loading";

function CollectionType2() {
  const [isLoading, setIsLoading] = useState(true);
  const collections = [
    {
      type: 2,
      apiPath: "https://phimapi.com/v1/api/the-loai/hanh-dong",
      title: "phim hành động",
      slug: "hanh-dong",
    },
    {
      type: 2,
      apiPath: "https://phimapi.com/v1/api/the-loai/kinh-di",
      title: "phim kinh dị",
      slug: "kinh-di",
    },
    {
      type: 2,
      apiPath: "https://phimapi.com/v1/api/the-loai/tinh-cam",
      title: "phim tình cảm",
      slug: "tinh-cam",
    },
  ];

  const { data: actionMovies, loading: loadingAction } = useAxios(
    collections[0].apiPath,
    { page: 1 }
  );
  const { data: cartoonMovies, loading: loadingCartoon } = useAxios(
    collections[1].apiPath,
    { page: 1 }
  );
  const { data: romanceMovies, loading: loadingRomance } = useAxios(
    collections[2].apiPath,
    { page: 1 }
  );

  useEffect(() => {
    setIsLoading(loadingAction || loadingCartoon || loadingRomance);
  }, [loadingAction, loadingCartoon, loadingRomance]);

  const collectionData = collections.map((collection, index) => ({
    ...collection,
    data: [actionMovies, cartoonMovies, romanceMovies][index],
  }));

  if (isLoading) {
    return (
      <div className="w-full h-auto flex justify-center items-center min-h-[400px] p-8 rounded-2xl bg-bg-color-2">
        <Loading />
      </div>
    );
  }

  return (
    // <div className="w-full h-auto flex flex-col gap-8 p-8 rounded-2xl bg-bg-color-2">
    <div className="movie-list">
      {collectionData.map((collection, index) => (
        <CollectionType1
          key={index}
          type={collection.type}
          movies={collection.data}
          title={collection.title}
          slug={collection.slug}
          isLoading={false}
          colorIndex={index }
        />
      ))}
    </div>
  );
}

export default CollectionType2;
