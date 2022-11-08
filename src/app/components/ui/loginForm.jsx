import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
// import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevData) => ({
      ...prevData,
      [target.name]: target.value
    }));
  };

  const validateScheme = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])/,
        "Password doesn't contain at least one capital letter"
      )
      .matches(/(?=.*[0-9])/, "Password doesn't contain at least one digit")
      .matches(
        /(?=.*[!@#$%^&*])/,
        "Password must contains one of special symbols '!@#$%^&*'"
      )
      .matches(/(?=.{8,})/, "Password must be at least 8 symbols"),
    email: yup
      .string()
      .required("Email is required")
      .email("Wrong email address")
  });

  // const validatorConfig = {
  //   email: {
  //     isRequired: { message: "Email is required" },
  //     isEmail: { message: "Wrong email address" }
  //   },
  //   password: {
  //     isRequired: { message: "Password is required" },
  //     isCapitalSymbol: {
  //       message: "Password doesn't contain at least one capital letter"
  //     },
  //     isContainDigit: {
  //       message: "Password doesn't contain at least one digit"
  //     },
  //     min: {
  //       message: "Password must be at least 8 symbols",
  //       value: 8
  //     }
  //   }
  // };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    // const errors = validator(data, validatorConfig);
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((error) => setErrors({ [error.path]: error.message }));
    // setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

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
        // type="email"
        type="text"
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
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Keep on login
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
