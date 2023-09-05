"use client";
import React, { useEffect, useState } from "react";
import "./search.scss";
import { getDBPlates } from "@/services/plateData";
import { useRouter } from "next/navigation";

const Page = () => {
  const [searchText, setSearchText] = useState("");
  const [foundSearchText, setFoundSearchText] = useState([]);
  const router = useRouter();

  const handleInputChange = async (event) => {
    const searchParam = event.target.value;
    setSearchText(event.target.value);
    const totalFilter = await plates();
    if (searchParam.length > 3) {
      const filter = totalFilter?.filter((product) =>
        product.Name.toLowerCase().includes(searchParam.toLowerCase())
      );
      setFoundSearchText(filter);
    }
  };

  const handletrash = () => {
    setSearchText("");
    setFoundSearchText([]);
  };

  const handleId = (id) => {
    router.push(`/restaurant/preorder/${id}`);
  };

  const plates = async () => {
    try {
      const response = await getDBPlates();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="input-container">
      <div className="input-group">
        <label
          className="bi bi-search text-body-tertiary"
          htmlFor="search-input"
        ></label>
        <input
          type="text"
          id="search-input"
          value={searchText}
          onChange={handleInputChange}
        />
        {searchText && (
          <label
            className="bi bi-trash text-body-tertiary"
            htmlFor="search-input"
            onClick={handletrash}
          ></label>
        )}
      </div>
      <div className="orderSecundary">
        {foundSearchText?.map((item, index) => (
          <div
            className="orderSecundary__searxh"
            key={index}
            onClick={() => handleId(item.id)}
          >
            <img className="imgsearch" src={item.PlateImage} alt="" />
            <div>
              <span className="span1">{item.Name}</span>
              <span className="span2">$ {item.Price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
