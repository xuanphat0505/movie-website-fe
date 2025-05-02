import { Link } from "react-router-dom";
import { typeList } from "../assets/data/data";
import TypeCard from "../shared/TypeCard/TypeCard";

function TypeList() {
  return (
    <div className="w-full">
      <div className="collection-title justify-between">
        <h3>Bạn đang quan tâm gì?</h3>
      </div>
      <div className="w-full topics-grid-wrapper">
        {typeList.slice(0, 6).map((type, index) => (
          <TypeCard key={index} type={type} />
        ))}
        {typeList.length > 6 && (
          <Link to={"/types"} className="type-card more-topic">
            <div className="intro flex justify-center items-center w-full h-fullr leading-[1.8] font-bold text-center">
              <div className="heading-md mb-0">
                +{typeList.length - 6} chủ đề
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default TypeList;
