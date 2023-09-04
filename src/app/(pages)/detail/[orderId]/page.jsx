"use client";
import React, { useEffect, useState } from "react";
import "./detail.scss";
import { useRouter } from "next/navigation";
import { getDBOrder } from "@/services/orderHistoryData";
import { getDBPlate } from "@/services/plateData";

const Page = ({ params }) => {
  const router = useRouter();
  const [platesDetail, setPlatesDetail] = useState([]);
  const [orderDetatil, setOrderDetatil] = useState("");

  const loadData = async (id) => {
    const results = await getDBOrder(id);
    setOrderDetatil(results);
    const plates = results.Plates;
    let platesDataArray = [];
    if (plates.length == 1) {
      const plateData = await getDBPlate(plates[0]);
      platesDataArray.push(plateData);
      setPlatesDetail(platesDataArray);
    }
    if (plates.length > 1) {
      await Promise.all(
        plates.map(async (plateId) => {
          const plateData = await getDBPlate(plateId);
          platesDataArray.push(plateData);
        })
      );
      setPlatesDetail(platesDataArray);
    }
  };

  useEffect(() => {
    loadData(params.orderId);
  }, []);

  const handleClick = () => {
    router.push("/order");
  };
  return (
    <div className="constainerFirts">
      <div className="containerPrimary">
        <section className="containerPrimary__section1">
          <img
            src="/images/chevron-back-outline.svg"
            alt="back"
            onClick={handleClick}
          />
          <span>{orderDetatil?.DateTime}</span>
        </section>
        {platesDetail?.map((detail, index) => (
          <section className="containerPrimary__section2" key={index}>
            <div>
              <span>* {detail?.Name}</span>
              <span className="value">${detail?.Price}</span>
            </div>
          </section>
        ))}

        <section className="containerPrimary__section3">
          <div>
            <span>Production cost</span>
            <span className="value">${orderDetatil?.TotalPrice}</span>
          </div>
          <div>
            <span>Cost of delivery</span>
            <span className="value">${orderDetatil?.CostDelivery}</span>
          </div>
        </section>
        <section className="containerPrimary__section4">
          <span>Total</span>
          <span>${orderDetatil?.TotalPrice + orderDetatil?.CostDelivery}</span>
        </section>
      </div>
    </div>
  );
};
export default Page;
//
