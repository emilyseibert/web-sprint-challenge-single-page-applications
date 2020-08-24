import React, { useState, useEffect } from "react";
import "./PizzaForm.css";
import axios from "axios";
import * as yup from "yup";

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

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    pepperoni: "",
    green_peppers: "",
    pineapple: "",
    ham: "",
    sausage: "",
    special: "",
  });

  const [ableToSubmit, setAbleToSubmit] = useState(false);

  const formSchema = yup.object().shape({
    name: yup.string().length(2, "name isn't long enough"),
    size: yup.string().oneOf(["xs", "s", "m", "l"], "Please select a size"),
    pepperoni: yup.string(),
    green_peppers: yup.string(),
    pineapple: yup.string(),
    ham: yup.string(),
    sausage: yup.string(),
    special: yup.string(),
  });

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(
        e.target.type === "checkbox" ? e.target.checked : e.target.value
      )
      .then(() => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [e.target.name]: error.errors[0] });
      });
  };

  useEffect(() => {
    formSchema.isValid(form).then((isFormValid) => {
      setAbleToSubmit(isFormValid);
    });
  }, [form]);

  const handleChange = (e) => {
    e.persist();
    validateChange(e);
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

  console.log("errors", errors);
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
      {errors.name ? <span>{errors.name}</span> : null}

      <label htmlFor="size">Size:</label>
      <select id="size" name="size" value={form.size} onChange={handleChange}>
        <option value="----Choose Size----"></option>
        <option value="xs">Extra Small</option>
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
      </select>
      {errors.size ? <span>{errors.size}</span> : null}

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
      <button type="submit" disabled={!ableToSubmit}>
        Add to Order
      </button>
    </form>
  );
};

export default PizzaForm;
