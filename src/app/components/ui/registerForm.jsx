import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: []
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfession] = useState();
  const [qualities, setQualities] = useState({});

  /**
   * Asynchroniously initialize professions array at the first page render
   */
  useEffect(() => {
    api.professions.fetchAll().then((profs) => setProfession(profs));
    api.qualities.fetchAll().then((quals) => setQualities(quals));
  }, []);

  const handleChange = (target) => {
    setData((prevData) => ({
      ...prevData,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required" },
      isEmail: { message: "Wrong email address" }
    },
    password: {
      isRequired: { message: "Password is required" },
      isCapitalSymbol: {
        message: "Password doesn't contain at least one capital letter"
      },
      isContainDigit: {
        message: "Password doesn't contain at least one digit"
      },
      min: {
        message: "Password must be at least 8 symbols",
        value: 8
      }
    },
    profession: {
      isRequired: { message: "Profession is required" }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    for (const fieldName in data) {
      let isEmpty = false;
      if (Array.isArray(data[fieldName])) {
        isEmpty = data[fieldName].length === 0;
      } else {
        isEmpty = data[fieldName].trim() === "";
      }

      if (isEmpty) {
        errors[fieldName] = `${fieldName} is required`;
      }
    }
    setErrors(errors);
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
      <SelectField
        label="Choose your profession"
        value={data.profession}
        onChange={handleChange}
        defaultOption="Choose ..."
        options={professions}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" }
        ]}
        value={data.sex}
        name="sex"
        label="Choose your sex"
        onChange={handleChange}
      />
      <MultiSelectField
        label="Choose your qualities"
        options={qualities}
        onChange={handleChange}
        name="qualities"
      />
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

export default RegisterForm;
