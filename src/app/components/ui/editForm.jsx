import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../store/qualities";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../store/professions";

const EditForm = ({ id }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [errors, setErrors] = useState({});
  const [professionsWrapped, setProfessionWrapped] = useState();
  const [qualitiesWrapped, setQualitiesWrapped] = useState([]);

  const { getUserById, updateUser } = useUser();

  const professions = useSelector(getProfessions());
  const isLoadingProfession = useSelector(getProfessionsLoadingStatus());

  const qualities = useSelector(getQualities());
  const isLoadingQualities = useSelector(getQualitiesLoadingStatus());

  const getQualityById = (id) => qualities.find((qual) => qual._id === id);

  const history = useHistory();

  useEffect(() => {
    if (isLoadingQualities || isLoadingProfession || data) return;

    const qualitiesList = qualities.map((quality) => ({
      label: quality.name,
      value: quality._id,
      color: quality.color
    }));
    setQualitiesWrapped(qualitiesList);

    const professionsList = professions.map((profession) => ({
      label: profession.name,
      value: profession._id
    }));
    setProfessionWrapped(professionsList);

    const user = getUserById(id);

    // convert qualities from data storage format to component format
    const newQualities = user.qualities?.map((qualityId) => {
      const quality = getQualityById(qualityId);
      return {
        label: quality.name,
        value: quality._id,
        color: quality.color
      };
    });

    const newUser = {
      ...user,
      qualities: newQualities
    };
    setData(newUser);
  }, [isLoadingQualities, isLoadingProfession, data]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  const handleChange = (target) => {
    setData((prevData) => ({
      ...prevData,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    name: {
      isRequired: { message: "Name is required" }
    },
    email: {
      isRequired: { message: "Email is required" },
      isEmail: { message: "Wrong email address" }
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
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    // validation
    const isValid = validate();
    if (!isValid) return;

    // convert qualities to data storage format
    const qualitiesId = data.qualities.map((quality) => quality.value);

    const updatedUser = {
      ...data,
      qualities: qualitiesId
    };

    updateUser(updatedUser);
    history.push(`/users/${id}`);
  };

  if (isLoading || !professionsWrapped || qualitiesWrapped.length === 0) {
    return <h5>Loading ...</h5>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Email"
        // type="email"
        type="text"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <SelectField
        label="Choose your profession"
        name="profession"
        value={data.profession}
        onChange={handleChange}
        defaultOption="Choose ..."
        options={professionsWrapped}
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
        options={qualitiesWrapped}
        onChange={handleChange}
        name="qualities"
        defaultValue={data.qualities}
      />
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Update
      </button>
    </form>
  );
};

EditForm.propTypes = {
  id: PropTypes.string.isRequired
};

export default EditForm;
