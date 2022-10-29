import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Searching users by name. Containing list of success searches.
 * List of success searches stored in LocalStorage and updating when
 * focus lost.
 * @param {*} value Search string value
 * @param {*} searchedUsersLength Length of searched users list
 * @param {*} onChange Callback function for searching in parent component
 * @returns Input for search users by name
 */
const SearchUsers = ({ value, searchedUsersLength, onChange }) => {
  const LOCAL_STORAGE_DATALIST = "searchDatalist";
  const [datalist, setDatalist] = useState([]);

  useEffect(() => {
    // try to initialize datalist from LocalStorage
    const searchDatalistRaw = localStorage.getItem(LOCAL_STORAGE_DATALIST);
    if (searchDatalistRaw) {
      const searchDatalist = JSON.parse(searchDatalistRaw);
      setDatalist(searchDatalist);
    }
  }, []);

  const addSearchData = ({ target }) => {
    // ignore empty string search and empty user list result string search
    if (!target.value || searchedUsersLength === 0) return;

    setDatalist((prevState) => {
      if (!prevState.find((elem) => elem === target.value)) {
        prevState.push(target.value);
      }
      return prevState;
    });

    // update LocalStorage datalist
    localStorage.setItem(LOCAL_STORAGE_DATALIST, JSON.stringify(datalist));
  };

  return (
    <div className="mt-1 shadow-sm input-group">
      <input
        type="search"
        className="form-control"
        list="datalistOptions"
        placeholder="Search ..."
        onChange={onChange}
        onBlur={addSearchData}
        value={value || ""}
      />
      <datalist id="datalistOptions">
        {datalist.map((item, index) => (
          <option key={index} value={item} />
        ))}
      </datalist>
    </div>
  );
};

SearchUsers.propTypes = {
  value: PropTypes.string.isRequired,
  searchedUsersLength: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchUsers;
