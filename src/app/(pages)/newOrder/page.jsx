"use client";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useForm } from "react-hook-form";
import "./newOrder.scss";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setNoteAct, updateOrderAct } from "@/store/order/orderActions.";
import { newDbOrderHistory } from "@/services/orderHistoryData";

const NewOrder = () => {
  const orders = useSelector((store) => store.order);
  const auth = useSelector((store) => store.auth);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [note, setNote] = useState("");
  const [labelNote, setLabelNote] = useState("");
  const [printnote, setPrintNote] = useState("");
  const ordersIndex = orders.orders;
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState(
    ordersIndex.map((indexDetail) => indexDetail.Quantity)
  );
  const [totalProducts, setTotalProducts] = useState(0);

  const handleRute = () => {
    router.push("/home");
  };

  const decreaseCount = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 1) {
      updatedQuantities[index] -= 1;
      setQuantities(updatedQuantities);
      let order = JSON.parse(JSON.stringify(orders.orders[index]));
      let initialPrice = order.TotalPrice / order.Quantity;
      order.Quantity = order.Quantity - 1;
      order.TotalPrice = initialPrice * order.Quantity;
      dispatch(updateOrderAct(order));
    }
  };

  const increaseCount = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] += 1;
    setQuantities(updatedQuantities);
    let order = JSON.parse(JSON.stringify(orders.orders[index]));
    let initialPrice = order.TotalPrice / order.Quantity;
    order.Quantity = order.Quantity + 1;
    order.TotalPrice = initialPrice * order.Quantity;
    dispatch(updateOrderAct(order));
  };

  const onSubmit = (data) => {
    const note = data.note;
    setLabelNote(note);
    setPrintNote(note);
    setNote("");
    dispatch(setNoteAct(note));
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const clearNotes = () => {
    setNote("");
  };

  let upNewOrder = {
    Address: null,
    CostDelivery: null,
    DateTime: null,
    Plates: [],
    RestaurantId: null,
    Status: null,
    Toppings: [],
    TotalPrice: null,
    UserId: null,
  };

  const buttonOrder = async () => {
    try {
      console.log("mostrar data", ordersIndex);
      upNewOrder.Address = "882 Well St, New-York";
      upNewOrder.CostDelivery = Number("4000");
      upNewOrder.DateTime = "fecha";
      upNewOrder.Plates = [];
      ordersIndex.forEach((order) => {
        upNewOrder.Plates.push(order.PlateId);
      });
      upNewOrder.RestaurantId = ordersIndex[0].RestaurantId;
      upNewOrder.Status = true;
      ordersIndex.forEach((order) => {
        order.Toppings.forEach((topping) => {
          if (topping.Selected) {
            upNewOrder.Toppings.push(topping.ToppingId);
          }
        });
      });
      const totalPriceSum = ordersIndex.reduce((accumulator, order) => {
        return accumulator + order.TotalPrice;
      }, 0);

      upNewOrder.TotalPrice = totalPriceSum + 4000;
      upNewOrder.UserId = auth.uid;

      console.log(upNewOrder);
      await newDbOrderHistory(upNewOrder); // Esperar a que se complete la función
      //router.push("/orderAcepted");
    } catch (error) {
      console.error("Error al crear nueva orden:", error);
    }
  };

  const calculateTotalProducts = () => {
    let total = 0;
    for (let i = 0; i < ordersIndex.length; i++) {
      total += ordersIndex[i].Price * quantities[i];
    }
    return total;
  };

  useEffect(() => {
    const total = calculateTotalProducts();
    setTotalProducts(total);
    setLabelNote(orders.note);
  }, [quantities]);

  return (
    <div className="newOrder">
      <section className="newOrder__section1">
        <i onClick={handleRute} className="bi bi-chevron-compact-left"></i>
        <span>New order</span>
      </section>
      <section className="newOrder__section2">
        <h3>Delivery to</h3>
        <div>
          <span>
            <i className="bi bi-pin-map-fill "></i>
            882 Well St, New-York
          </span>
          <i className="bi bi-chevron-compact-right"></i>
        </div>
      </section>
      <section className="newOrder__section3">
        <span>Payment</span>
        <div>
          <button className="bn button1">Cash</button>
          <button className="button2">
            <img src="/images/LTC.png" alt="targeta de credito" />
            23598
          </button>
          <button className="button2">
            <img src="/images/LPayPal.png" alt="targeta de credito" />
            paypal
          </button>
        </div>
      </section>
      {ordersIndex.map((indexDetail, index) => (
        <section className="newOrder__section4" key={index}>
          <div>
            <img src={indexDetail.PlateImage} />

            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => decreaseCount(index)}
              >
                -
              </button>
              <label className="">{quantities[index]}</label>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => increaseCount(index)}
              >
                +
              </button>
            </div>
            <span>{indexDetail?.Name}</span>
          </div>
          <span>$ {indexDetail?.TotalPrice * quantities[index]}</span>
        </section>
      ))}
      <p>{labelNote}</p>
      <form className="newOrder__section5" onSubmit={handleSubmit(onSubmit)}>
        <label>Note</label>
        <input
          type="text"
          placeholder="Write something"
          {...register("note")}
          onChange={handleNoteChange}
          value={note}
        />
        {note && (
          <label
            onClick={clearNotes}
            className="bi bi-trash position text-body-tertiary"
            htmlFor="search-input"
          ></label>
        )}
        {note && (
          <button className="btn btn-notas " type="submit">
            Enviar notas
          </button>
        )}
      </form>
      <section className="newOrder__section6">
        <div>
          <span>Products</span>
          <span>$ {totalProducts}</span>
        </div>
        <div>
          <span>Delivey</span>
          <span>$ 4000</span>
        </div>
        <div className="rallita">
          <span>Total</span>
          <span>$ {totalProducts + 4000}</span>
        </div>
        <button onClick={buttonOrder} className="btn bton_order" type="button">
          Order
        </button>
      </section>
    </div>
  );
};

export default NewOrder;
