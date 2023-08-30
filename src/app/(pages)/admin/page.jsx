'use client'

import React, { useState, useEffect } from 'react';
import './style.scss';
import Swal from 'sweetalert2';

function Page() {
  const [showForm, setShowForm] = useState(false); // Mostrar/Esconder form de platos
  const [showRestaurantForm, setShowRestaurantForm] = useState(false);// Mostrar/esconder form restaurantes
  const [restaurantName, setRestaurantName] = useState('');

  const [dishName, setDishName] = useState('');
  const [dishImage, setDishImage] = useState('');
  const [dishIngredients, setDishIngredients] = useState('');


  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const toggleRestaurantForm = () => {
    setShowRestaurantForm(!showRestaurantForm);
    
    Swal.fire({
      title: 'restaurante nuevo',
      text: 'Procesando para el nuevo restaurante',
      icon: 'info',
      allowOutsideClick: false,
      
    });
  };
  

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Mostrar SweetAlert de "Aguarda Platillo"
    Swal.fire({
      title: 'Aguarda',
      text: 'Procesando el agregado del platillo...',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    // Simular una espera de 2 segundos (puedes reemplazar esto con tu lógica real)
    setTimeout(() => {
      // Aquí puedes manejar el envío de datos del formulario
      console.log({
        restaurantName,
        dishName,
        dishImage,
        dishIngredients,
      });

      // Cerrar el SweetAlert
      Swal.close();

      // Reiniciar los valores del formulario
      setRestaurantName('');
      setDishName('');
      setDishImage('');
      setDishIngredients('');
      setShowForm(false);
    }, 2000);
  };

  return (
    <div className="admin-page">
      <nav className="navbar">
        <h1>Panel de Administración</h1>
      </nav>
      <main className="content">
        <h2>Bienvenido al Panel de Administración</h2>
        <p>En esta sección puedes administrar usuarios, configuraciones y más.</p>
        <button onClick={toggleRestaurantForm}>Agregar Nuevo Restaurante</button>
        {showRestaurantForm && (
          <div className="add-dish-form">
            <h3>Agregar Nuevo Platillo</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                  Tipo de restaurante
                  <select name="" id="">
                    <option value="">
                      china
                    </option>
                  </select>
                </label>
              <label>
                Nombre del Restaurante:
                <input type="text" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} />
              </label>
              <label>
                Logo del restaurante:
                <input type="file" accept="image/*" onChange={(e) => setDishImage(e.target.files[0])} />
                </label>
                <label>
                  Hora de apertura:
                  <input type="time" />
                </label>
                <label>
                  Hora de cierre
                  <input type="time" />
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
            <form onSubmit={handleFormSubmit}>
              <label>
                Nombre del Restaurante:
                <input type="text" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} />
              </label>
              <label>
                Plato a Arreglar:
                <input type="text" value={dishName} onChange={(e) => setDishName(e.target.value)} />
              </label>
              <label>
                Foto del Platillo:
                <input type="file" accept="image/*" onChange={(e) => setDishImage(e.target.files[0])} />
                </label>
              <label>
                Ingredientes del Platillo:
                <textarea value={dishIngredients} onChange={(e) => setDishIngredients(e.target.value)} />
              </label>
              <button type="submit">Agregar Platillo</button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}

export default Page;
