"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fillRestaurantTypes } from "@/store/restaurantTypes/thunks";
import { listRestaurants } from "@/store/restaurants/thunks";
import "./style.scss";
import Swal from "sweetalert2";

function Page() {
  const [showForm, setShowForm] = useState(false); // Mostrar/Esconder form de platos
  const [showRestaurantForm, setShowRestaurantForm] = useState(false); // Mostrar/esconder form restaurantes
  const [dishName, setDishName] = useState("");
  const [dishImage, setDishImage] = useState("");
  const [dishIngredients, setDishIngredients] = useState("");
  const [dishesList, setDishesList] = useState([]); // Estado para la lista de platillos
  const [dishprice, setDishPrice] = useState("");
  const [plato, setPlato] = useState("");

  const dispatch = useDispatch();
  const { restaurantTypes } = useSelector((store) => store.restaurantTypes);

  const { restaurants } = useSelector(store => store.restaurants);
  

  useEffect(() => {
    
    dispatch(fillRestaurantTypes());
    dispatch(listRestaurants());
  }, [dispatch]);


  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const toggleRestaurantForm = () => {
    setShowRestaurantForm(!showRestaurantForm);
  };

  const handleRestaurantFormSubmit = (event) => {
    event.preventDefault();

    // Mostrar SweetAlert de "Aguarda Platillo"
    Swal.fire({
      title: "guardado",
      text: "Procesando el agregado del platillo...",
      icon: "info",
    });
  };

  const handleDishFormSubmit = (event) => {
    event.preventDefault();

    const newDish = {
     
      dishName,
      dishImage,
      dishIngredients,
      dishprice,
    };
    setDishesList([...dishesList, newDish]);
  };

  return (
    <div className="admin-page">
      <nav className="navbar">
        <h1>Panel de Administración</h1>
      </nav>
      <main className="content">
        <h2>Bienvenido al Panel de Administración</h2>
        <p>
          En esta sección puedes administrar usuarios, configuraciones y más.
        </p>
        <button onClick={toggleRestaurantForm}>
          Agregar Nuevo Restaurante
        </button>
        {showRestaurantForm && (
          <div className="add-dish-form">
            <h3>Agregar Nuevo Platillo</h3>
            <form onSubmit={handleRestaurantFormSubmit}>
              <label>
                Tipo de restaurante
                <select
                  id=""
                >
                  <option value={null}>Seleccione un tipo</option>
                  {restaurantTypes.length ? (
                    restaurantTypes.map((type) => (
                      <option key={type.id} value={type.Description}>
                        {type.Description}
                      </option>
                    ))
                  ) : (
                    <option value={null}>...Cargando</option>
                  )}
                </select>
              </label>
              <label>
                Nombre del Restaurante:
                <input
                  type="text"
                />
              </label>
              <label>
                Logo del restaurante:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setDishImage(e.target.files[0])}
                />
              </label>
              <label>
                Hora de apertura:
                <input type="time"  />
              </label>
              <label>
                Hora de cierre
                <input
                  type="time"
                  
                />
              </label>
              <label>
                Tiempo de espera:
                <input type="time" />
              </label>
              <label>
                Imagen de su platillo Estrella:
                <input type="file" />
              </label>
              <label>
                Descripcion del restaurante:
                <textarea name="" id="" cols="30" rows="10"></textarea>
              </label>

              <button type="submit">Agregar Restaurante</button>
            </form>
          </div>
        )}

        <button onClick={toggleForm}>Agregar Nuevo Platillo</button>
        {showForm && (
          <div className="add-dish-form">
            <h3>Agregar Nuevo Platillo</h3>
            <form onSubmit={handleDishFormSubmit}>
              <label>
                Nombre del Restaurante:
                <input
                  type="text"
                />
              </label>
              <label>
                Plato a Arreglar:
                <input
                  type="text"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                />
              </label>
              <label>
                Foto del Platillo:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setDishImage(e.target.files[0])}
                />
              </label>
              <label>
                Precio:
                <input
                  type="text"
                  onChange={(e) => setDishPrice(e.target.value)}
                />
              </label>
              <label>
                Ingredientes del Platillo:
                <textarea
                  value={dishIngredients}
                  onChange={(e) => setDishIngredients(e.target.value)}
                />
              </label>
              <button type="submit">Agregar Platillo</button>
            </form>
          </div>
        )}
      </main>
      <div className="lists">
        <div className="restaurants-list">
          <h3>Lista de Restaurantes</h3>
          <table>
            <thead>
              <tr>
                <th>Restaurante</th>
                <th>Tipo</th>
                <th>Hora de apertura</th>
                <th>Hora de cierre</th>
                <th>Descricion del Restaurante</th>
                <th>Tiempo de empera del resturante</th>
              </tr>
            </thead>
            <tbody>
              {restaurants?restaurants.map((restaurant, index) => (
                <tr key={index}>
                  <td>{restaurant.Name}</td>
                  <td>{restaurant.tipo}</td>
                  <td>{restaurant.StartTime}</td>
                  <td>{restaurant.CloseTime}</td>
                  <td>{restaurant.WaitingTime}</td>
                  <td>{restaurant.Description}</td>
                </tr>
              )):<tr><td>...Cargando</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="dishes-list">
          <h3>Lista de Platillos</h3>
          <table>
            <thead>
              <tr>
                <th>Restaurante</th>
                <th>Platillo</th>
                <th>Precio</th>
                <th>Ingredientes</th>
              </tr>
            </thead>
            <tbody>
              {dishesList.map((dish, index) => (
                <tr key={index}>
                  <td>{dish.restaurantName}</td>
                  <td>{dish.dishName}</td>
                  <td>{dish.dishprice}</td>
                  <td>{dish.dishIngredients}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
