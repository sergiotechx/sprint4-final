"use client";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useForm } from "react-hook-form";
import "./newOrder.scss";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const NewOrder = () => {
  const orders = useSelector((store) => store.order);
  const [count, setCount] = useState(0);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [note, setNote] = useState("");

  const handleRute = () => {
    router.push("/home");
  };

  const decreaseCount = () => {
    setCount(Math.max(count - 1, 0));
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const onSubmit = (data) => {
    const note = data.note;
    console.log(note);
    setNote("");
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const clearNotes = () => {
    setNote("");
  };

  useEffect(() => {
    console.log("Estoy en nueva orden", orders);
  }, []);

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
      <section className="newOrder__section3">metodo de pago</section>
      <section className="newOrder__section4">
        <div>
          <img src="https://cdn.elcocinerocasero.com/imagen/receta/1000/2021-01-22-20-27-44/pizza-vegetal-con-queso-azul.jpeg" />

          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={decreaseCount}
            >
              -
            </button>
            <label className="">{count}</label>
            <button
              type="button"
              className="btn btn-primary"
              onClick={increaseCount}
            >
              +
            </button>
          </div>
          <span>Pizza de vegetales</span>
        </div>
        <span>$ 32.00</span>
      </section>
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
          <span>$60.66</span>
        </div>
        <div>
          <span>Delivey</span>
          <span>$4.5</span>
        </div>
        <div className="rallita">
          <span>Total</span>
          <span>$64.00</span>
        </div>
        <button className="btn bton_order" type="submit">
          Order
        </button>
      </section>
    </div>
  );
};

export default NewOrder;
