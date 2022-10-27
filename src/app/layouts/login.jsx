import React, { useState, useEffect } from "react";
import TextField from "../components/textField";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData((prevData) => ({
      ...prevData,
      [target.name]: target.value
    }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = {};
    for (const fieldName in data) {
      if (data[fieldName].trim() === "") {
        errors[fieldName] = `${fieldName} is required`;
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    // validation
    const isValid = validate();
    if (!isValid) return;

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
