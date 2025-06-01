import React from "react";
import img from "../assets/react.svg";

const Card = ({ element }) => {
  return (
    <div className="shadow-lg justify-between bg-white w-[30%] h-50 flex flex-col rounded-2xl p-1 m-2">
      {/* Top Side of the card */}
      <div className="flex flex-row items-center gap-3">
        <div className="image">
          <img
            src={element.company.logo}
            className="rounded-full w-24 border p-1.5"
          ></img>
        </div>
        <div>
          <h2>{element.company.name}</h2>
          <p>{element.location}</p>
        </div>
      </div>
      {/* Bot Side of the card */}
      <div className="flex justify-center items-center">
        <p className="font-bold text-lg">{element.title}</p>
      </div>
      <div className="flex justify-end items-end">
        <p className="border-t-2 border-l-2 w-fit p-2">{element.postAt}</p>
      </div>
    </div>
  );
};

export default Card;
