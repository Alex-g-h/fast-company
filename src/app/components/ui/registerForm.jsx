import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQuality } from "../../hooks/useQuality";
import { useProfession } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

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
  const { professions } = useProfession();
  const { qualities } = useQuality();
  const { signUp } = useAuth();
  const history = useHistory();

  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));
  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }));

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    // validation
    const isValid = validate();
    if (!isValid) return;

    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };

    try {
      await signUp(newData);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
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
        options={professionsList}
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
        options={qualitiesList}
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
