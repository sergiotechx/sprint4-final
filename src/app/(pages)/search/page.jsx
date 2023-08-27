"use client";
import React, { useState } from "react";
import "./search.scss";

const Page = () => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handletrash = () => {
    setSearchText("");
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
        <div className="orderSecundary__searxh">
          <img
            className="imgsearch"
            src="https://recetinas.com/wp-content/uploads/2017/10/salchipapas.jpg"
            alt=""
          />
          <div>
            <span className="span1">Salchipapas con todo</span>
            <span className="span2">$ 25.000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
