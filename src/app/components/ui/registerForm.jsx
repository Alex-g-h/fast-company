import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfession] = useState();
  const [qualities, setQualities] = useState([]);

  /**
   * Asynchroniously initialize professions array at the first page render
   */
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfession(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
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
    },
    license: {
      isRequired: {
        message:
          "Your couldn't use our service without confirmation of license agreement"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    // validation
    const isValid = validate();
    if (!isValid) return;

    const { profession, qualities } = data;

    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
  };

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
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
        name="profession"
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
        defaultValue={data.qualities}
      />
      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}
      >
        Confirm the <a>license agreement</a>
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

export default RegisterForm;
