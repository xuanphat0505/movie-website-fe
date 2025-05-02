import React from "react";
import "./Loading.css";

const Loading = ({ height }) => {
  return (
    <div className="v-loader-area" style={{ height: height }}>
      <div className="v-loader"></div>
    </div>
  );
};

export default Loading;
