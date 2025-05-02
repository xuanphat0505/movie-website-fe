import { useEffect } from "react";
import { typeList } from "../assets/data/data";
import TypeCard from "../shared/TypeCard/TypeCard";

function TypesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className = "section-page section-page__special ">
      <main className="pt-[5rem] pb-[10rem]">
        <div className="w-full px-[20px]">
          <div className="collection-title">
            <h3>Các chủ đề</h3>
          </div>
          <div className="card-grid-wrapper">
            {typeList.map((type, index) => (
              <TypeCard type={type} key={index} />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}

export default TypesPage;
