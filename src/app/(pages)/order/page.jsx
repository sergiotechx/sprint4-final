"use client";
import React, { useEffect, useState } from "react";
import "./order.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getDBOrder, getOrdersForUser } from "@/services/orderHistoryData";

const Page = () => {
  const user = useSelector((state) => state.auth);
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  const Orders = async (uid) => {
    const response = await getOrdersForUser(uid);
    setOrders(response);
  };

  useEffect(() => {
    Orders(user.uid);
  }, []);

  const handleClick = (index) => {
    router.push(`/detail/${index}`);
  };

  return (
    <div className="orderContainer">
      <h4>All orders</h4>
      {orders?.map((order) => (
        <div className="orderPrimary" key={order.id}>
          <div className="orderSecundary">
            <div className="divSection">
              <img
                className="imgRestaurant"
                src={order.restaurantLogo}
                alt="Logo restaurante"
              />
              <div>
                <span className="span1 ">{order.restaurantName}</span>
                <span className="span2">{order.TotalPrice}</span>
              </div>
            </div>
            <div
              onClick={() => handleClick(order.orderId)}
              className={order.Status ? "status" : "status2"}
            >
              {order.Status ? " Delivered" : "Cancelled"}
              <i className="bi bi-chevron-compact-right text-dark"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Page;
//
