import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QaulityContext = React.createContext();

export const useQuality = () => {
  return useContext(QaulityContext);
};

const QualityProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qualities, setQualities] = useState([]);

  // loading qualities
  useEffect(() => {
    getQualitiesList();
  }, []);

  // processing errors
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  function getQuality(id) {
    return qualities.find((quality) => quality._id === id);
  }

  async function getQualitiesList() {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  return (
    <QaulityContext.Provider value={{ isLoading, getQuality, qualities }}>
      {" "}
      {children}{" "}
    </QaulityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default QualityProvider;
