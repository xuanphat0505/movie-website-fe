import { useEffect } from "react";
import { useParams } from "react-router-dom";

import MovieFavorite from "../../components/MovieFavorite";
import MovieList from "../../components/MovieList";
import MovieIsWatching from "../../components/MovieIsWatching";
import MovieUser from "../../components/MovieUser";
import UserSidebar from "../../components/UserSideBar";

import "./User.css";
function User() {
  const params = useParams();
  const { tab } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);

  return (
    <section className="section-page section-page__special ">
      <main className="pt-[5rem] pb-[10rem]">
        <div className="dashboard-container">
          <UserSidebar tabLink={tab} />
          <div className="user-main">
            {tab === "favorite" && <MovieFavorite />}
            {tab === "list" && <MovieList />}
            {tab === "watch-later" && <MovieIsWatching />}
            {tab === "account" && <MovieUser />}
          </div>
        </div>
      </main>

    </section>
  );
}

export default User;
