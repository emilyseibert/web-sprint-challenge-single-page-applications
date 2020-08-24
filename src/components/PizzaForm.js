import React, { useState } from "react";
import "./PizzaForm.css";
import axios from "axios";

const PizzaForm = () => {
  const [form, setForm] = useState({
    name: "",
    size: "",
    pepperoni: false,
    green_peppers: false,
    pineapple: false,
    ham: false,
    sausage: false,
    special: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", form)
      .then((r) => console.log("submitted!", r));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={form.name}
        name="name"
        onChange={handleChange}
        placeholder="Enter name."
      />

      <label htmlFor="size">Size:</label>
      <select id="size" name="size" value={form.size} onChange={handleChange}>
        <option value="----Choose Size----"></option>
        <option value="xs">Extra Small</option>
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
      </select>

      <label htmlFor="toppings">Toppings:</label>
      <div className="toppings">
        <label className="topping">
          <input
            name="pepperoni"
            type="checkbox"
            checked={form.pepperoni}
            onChange={handleChange}
          />
          Pepperoni
        </label>
        <label className="topping">
          <input
            name="green_peppers"
            type="checkbox"
            checked={form.green_peppers}
            onChange={handleChange}
          />
          Green Peppers
        </label>
        <label className="topping">
          <input
            name="pineapple"
            type="checkbox"
            checked={form.pineapple}
            onChange={handleChange}
          />
          Pineapple
        </label>
        <label className="topping">
          <input
            name="ham"
            type="checkbox"
            checked={form.ham}
            onChange={handleChange}
          />
          Ham
        </label>
        <label className="topping">
          <input
            name="sausage"
            type="checkbox"
            checked={form.sausage}
            onChange={handleChange}
          />
          Sausage
        </label>
      </div>

      <label htmlFor="special">Special Instructions:</label>
      <textarea
        name="special"
        value={form.special}
        id="special"
        onChange={handleChange}
        placeholder="Enter special instructions"
      ></textarea>
      <button type="submit">Add to Order</button>
    </form>
  );
};

export default PizzaForm;
