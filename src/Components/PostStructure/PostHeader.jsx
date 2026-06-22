import React from "react";
import userImg from "../../assets/Sample_User_Icon.png";

export default function PostHeader({ photo, name, date }) {
  return (
    <>
      <div className="flex">
        <img
          className=" rounded-full w-10 h-10 mr-3 border"
          src={photo}
          alt={name}
          onError={(e) => {
            e.target.src = userImg;
          }}
        />
        <div>
          <h3 className="text-md font-semibold ">{name}</h3>
          <p className="text-xs text-gray-500">
            {date.split(".", 1).join().replace("T", " ")}
          </p>
        </div>
      </div>
    </>
  );
}
