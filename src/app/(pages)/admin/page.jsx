"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fillRestaurantTypes } from "../../../store/restaurantTypes/thunks";
import { listRestaurants } from "@/store/restaurants/thunks";
import "./style.scss";
import Swal from "sweetalert2";
import { getDBRestaurantPlates, updateDbRestaurant, newDbRestaurant } from "@/services/restaurantsData";
import fileUpload from "@/services/fileUpload";
import { Rating } from '@mantine/core';

function Page() {
  const [showForm, setShowForm] = useState(false); // Mostrar/Esconder form de platos
  const [showRestaurantForm, setShowRestaurantForm] = useState(false); // Mostrar/esconder form restaurantes
  const [dishName, setDishName] = useState("");
  const [dishImage, setDishImage] = useState("");
  const [logoImage, setLogoImage] = useState('');
  const [dishIngredients, setDishIngredients] = useState("");
  const [dishesList, setDishesList] = useState([]); // Estado para la lista de platillos
  const [dishprice, setDishPrice] = useState("");
  const [plato, setPlato] = useState("");
  const [restaurantForm, setRestaurantFormName] = useState({});
  const [platilloForm, setPlatilloForm] = useState({});
  const [operation, setOperation] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [restaurantType, setRestaurantType] = useState({});
  const [rating, setRating] = useState(0);


  const dispatch = useDispatch();
  const { restaurantTypes } = useSelector((store) => store.restaurantTypes);
  const { restaurants } = useSelector((store) => store.restaurants);

  useEffect(() => {
    dispatch(fillRestaurantTypes());
    dispatch(listRestaurants());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fillRestaurantTypes());
    dispatch(listRestaurants());
  }, [refresh]);

  /////////////////////////////////////////////
  //funcion para traer los platos al seleccionar un restaurante
  const getRestaurantPLates = async (restaurantID) => {
    const reponse = await getDBRestaurantPlates(restaurantID);
    setDishesList(reponse);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const toggleForm2 = () => {
    setOperation("New");
    setShowForm(!showForm);
  };

  const toggleRestaurantForm = () => {
    setShowRestaurantForm(!showRestaurantForm);
  };

  const toggleRestaurantForm2 = () => {
    setOperation("New");
    setShowRestaurantForm(!showRestaurantForm);
  };

  const handleRestaurantEditClick = async (restaurantId) => {
    // Aquí puedes personalizar tu alerta de edición
    let userResponse = await Swal.fire({
      title: "Editar Restaurante",
      text: "¿Quieres editar este restaurante?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });
    if (userResponse.isConfirmed) {
      let restaurantInfo = restaurants.find(
        (restaurant) => restaurant.id == restaurantId
      );
      if (Object.keys(restaurantInfo).length > 0) {
        setRestaurantFormName(restaurantInfo);
        toggleRestaurantForm();
      }
    }
  };
  const handlePlatilloEditClick = async (platetId) => {
    // Aquí puedes personalizar tu alerta de edición
    let userResponse = await Swal.fire({
      title: "Editar Restaurante",
      text: "¿Quieres editar este platillo?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });
    if (userResponse.isConfirmed) {

      let PlatilloInfo = dishesList.find((dish) => dish.id == platetId);

      if (Object.keys(PlatilloInfo).length > 0) {
        setPlatilloForm(PlatilloInfo);
        setOperation("Edit");
        toggleForm();
      }
    }
  };

  const handleDeleteClick = () => {
    // Aquí puedes personalizar tu alerta de eliminación
    Swal.fire({
      title: "Eliminar Restaurante",
      text: "¿Estás seguro de que quieres eliminar este restaurante?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      dangerMode: true, // Para mostrar el botón de eliminar en rojo
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes realizar la lógica de eliminación
        // Por ejemplo, puedes enviar una solicitud para eliminar el restaurante
      }
    });
  };
  const handleRestaurantFormSubmit = async (event) => {
    try {
      event.preventDefault();


      if (operation == 'Edit') {
        if (logoImage != '') {
          const logoImageURL = await fileUpload(logoImage);
          restaurantForm.LogoImg = logoImageURL;
        }
        if (dishImage != '') {
          const dishImageURL = await fileUpload(dishImage);
          restaurantForm.FoodImg = dishImageURL;
        }
        const updateRestaurant = await updateDbRestaurant(restaurantForm)
        if (updateRestaurant == undefined) {
          const response = await Swal.fire({
            title: "Operacion exitosa",
            text: "Cambios guardados exitosamente",
            icon: "success",
          });
          setShowRestaurantForm(!showRestaurantForm);
          setRefresh(!refresh)
        }
      }
      else {

        if (logoImage != '') {
          const logoImageURL = await fileUpload(logoImage);
          restaurantForm.LogoImg = logoImageURL;
        }
        if (dishImage != '') {
          const dishImageURL = await fileUpload(dishImage);
          restaurantForm.FoodImg = dishImageURL;
        }

        let result = await newDbRestaurant(restaurantForm)

        if (Object.keys(result).length > 0) {
          const response = await Swal.fire({
            title: "Operacion exitosa",
            text: "Cambios guardados exitosamente",
            icon: "success",
          });
          setShowRestaurantForm(!showRestaurantForm);
          setRefresh(!refresh)
        }
      }
    }
    catch (error) {
      Swal.fire({
        title: "Error de sitema",
        text: error.message,
        icon: "error",
      });

    }



  };

  const handleDishFormSubmit = (event) => {
    event.preventDefault();

    const newDish = {};
    setDishesList([...dishesList, newDish]);
  };

  const handleSelectChange = (event) => {
    let temp = JSON.parse(JSON.stringify(restaurantForm))
    if (operation == 'Edit') {
      temp.RestaurantTypeId._key.path.segments[6] = event.target.value;
      setRestaurantType(event.target.value)
      setRestaurantFormName(temp);
    }
    else {
      let temp = JSON.parse(JSON.stringify(restaurantForm))
      temp = ({ ...temp, RestaurantTypeId: event.target.value });
      setRestaurantType(event.target.value)
      setRestaurantFormName(temp);
    }

  };
  const handleSetRating=(value)=>{
   setRating(value)
   let temp = JSON.parse(JSON.stringify(restaurantForm))
   temp = ({ ...temp, Rating: Number(value) });
   setRestaurantFormName(temp);
  }

  return (
    <div className="admin-page">
      <div className="main">
      <nav className="navbar">
        <h1>Panel de Administración</h1>
      </nav>
      <main className="content">
        <h2>Bienvenido al Panel de Administración</h2>
        <p>
          En esta sección puedes administrar usuarios, configuraciones y más.
        </p>
        <button onClick={toggleRestaurantForm2}>
          Agregar Nuevo Restaurante
        </button>
        {showRestaurantForm && (
          <div className="add-dish-form">
            {operation == 'New' ?
              <h3>Agregar Nuevo Restaurante</h3> :
              <h3>Editar Restaurante</h3>
            }

            <form onSubmit={handleRestaurantFormSubmit}>

              <label>

                Tipo de restaurante

                <select value={restaurantType} onChange={handleSelectChange}>

                  <option value={null}>Seleccione un tipo</option>
                  {restaurantTypes.length ? (
                    restaurantTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.Description}
                      </option>

                    ))
                  )
                    : (
                      <option value={null}>...Cargando</option>
                    )
                  }

                </select>
              </label>
              <label>
                Nombre del Restaurante:
                <input
                  type="text"
                  value={restaurantForm.Name}
                  onChange={(event) =>
                    setRestaurantFormName({
                      ...restaurantForm,
                      Name: event.target.value,
                    })
                  }
                />
              </label>
              <label>
                Logo del restaurante:

                {operation == 'Edit' &&
                  <img id='logoImg' src={restaurantForm?.LogoImg} />
                }
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoImage(e.target.files[0])}

                />
              </label>
              <label>
                Hora de apertura:
                <input
                  type="time"
                  value={restaurantForm.StartTime}
                  onChange={(event) =>
                    setRestaurantFormName({
                      ...restaurantForm,
                      StartTime: event.target.value,
                    })
                  }
                />
              </label>
              <label>
                Hora de cierre

                <input
                  type="time"
                  value={restaurantForm.CloseTime}
                  onChange={(event) =>
                    setRestaurantFormName({
                      ...restaurantForm,
                      CloseTime: event.target.value,
                    })
                  }
                />
              </label>
              <label>
                Tiempo de espera:
                <input
                  value={restaurantForm.WaitingTime}
                  onChange={(event) =>
                    setRestaurantFormName({
                      ...restaurantForm,
                      WaitingTime: event.target.value,
                    })
                  }
                />
              </label>
              <label>
                Imagen de su platillo Estrella:
                {operation == 'Edit' &&
                  <img id='foodImg' src={restaurantForm?.FoodImg} />
                }
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setDishImage(e.target.files[0])}
                />
              </label>
              <label>
                Descripcion del restaurante:
                <textarea
                  name=""
                  id=""
                  value={restaurantForm.Description}
                  onChange={(event) =>
                    setRestaurantFormName({
                      ...restaurantForm,
                      Description: event.target.value,
                    })
                  }
                ></textarea>
              </label>
              <label>
                Calificacion
              <Rating value={rating} onChange={(event)=>handleSetRating(event)} />
              </label>

              {operation === "New" ? (
                <button type="submit">Agregar Restaurante</button>
              ) : (
                <button type="submit">Actualizar Restaurante</button>
              )}
            </form>
          </div>
        )}

        <button onClick={toggleForm2}>Agregar Nuevo Platillo</button>

        {showForm && (
          <div className="add-dish-form">
            <h3>Agregar Nuevo Platillo</h3>
            <form onSubmit={handleDishFormSubmit}>
              <label>
                Nombre del Restaurante:
                <input
                  value={platilloForm.RestaurantName}
                  onChange={(event) =>
                    setPlatilloForm({
                      ...platilloForm,
                      RestaurantName: event.target.value,
                    })
                  }
                  type="text"
                />
              </label>
              <label>
                Plato a Arreglar:
                <input
                  type="text"
                  value={platilloForm.Name}
                  onChange={(event) =>
                    setPlatilloForm({
                      ...platilloForm,
                      Name: event.target.value,
                    })
                  }
                />
              </label>
              <label>
                Foto del Platillo:
                <input type="file" />
              </label>
              <label>
                Precio:
                <input
                  value={platilloForm.Price}
                  onChange={(event) =>
                    setPlatilloForm({
                      ...platilloForm,
                      Price: event.target.value,
                    })
                  }
                  type="text"
                />
              </label>
              <label>
                Descripcion del Platillo:
                <textarea
                  value={platilloForm.Description}
                  onChange={(event) =>
                    setPlatilloForm({
                      ...platilloForm,
                      Description: event.target.value,
                    })
                  }
                />
              </label>
              {operation === "New" ? (
                <button type="submit">Agregar Platillo</button>
              ) : (
                <button type="submit">Actualizar Platillo</button>
              )}

            </form>
          </div>
        )}
      </main>
      </div>
      <div className="lists">
        <div className="restaurants-list">
          <h3>Lista de Restaurantes</h3>
          <table>
            <thead>
              <tr>
                <th>Restaurante</th>
                <th className="neno">Horario de Atencion</th>
                <th className="neno">Tiempo de espera en el resturante</th>
                <th className="none"> Descricion del Restaurante</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {restaurants ? (
                restaurants.map((restaurant, index) => (
                  <tr key={index}>
                    <td
                      id="RestaurantName"
                      onClick={() => getRestaurantPLates(restaurant.id)}
                    >
                      {restaurant.Name}
                    </td>
                    <td className="neno">
                      {restaurant.StartTime} a {restaurant.CloseTime}
                    </td>
                    <td className="neno">{restaurant.WaitingTime} Minutos</td>
                    <td className="none">{restaurant.Description}</td>
                    <td>
                      <div className="icon-container">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          className="edit-icon"
                          onClick={() => {
                            setOperation("Edit");
                            setLogoImage('')
                            setDishImage('')
                            setRating(restaurant.Rating)
                            setRestaurantType(restaurant.RestaurantTypeId._key.path
                              .segments[6])
                            handleRestaurantEditClick(restaurant.id);
                          }} // Agrega el evento de clic
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </div>
                    </td>
                    <td>
                      <div className="icon-container">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          className="edit-icon"
                          onClick={handleDeleteClick} // Agrega el evento de clic
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>...Cargando</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="dishes-list">
          <h3>Lista de Platillos</h3>
          <table>
            <thead>
              <tr>
                <th>Platillo</th>
                <th className="neno">Precio</th>
                <th className="neno">Delivery</th>
                <th className="none">Descripcion del platillo</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {dishesList.map((dish, index) => (
                <tr key={index}>
                  <td>{dish.Name}</td>
                  <td className="neno">${dish.Price}</td>
                  <td className="neno">{dish.DeliveryTime} Minutos</td>
                  <td className="none">{dish.Description}</td>
                  <td>
                    <div className="icon-container">
                      {" "}
                      <svg
                        onClick={() => handlePlatilloEditClick(dish.id)} // Agrega el evento de clic
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="edit-icon"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                      </svg>
                    </div>
                  </td>
                  <td>
                    <div className="icon-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="edit-icon"
                        onClick={handleDeleteClick} // Agrega el evento de clic
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </div>
                  </td>
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
