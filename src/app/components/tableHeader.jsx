import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  // <i className="bi bi-caret-down-fill"></i>
  const handleSort = (item) => {
    const newItem = { ...selectedSort };
    if (item === newItem.path) {
      // if the same column selected sort order change
      newItem.order = newItem.order === "asc" ? "desc" : "asc";
    } else {
      newItem.path = item;
      newItem.order = "asc"; // default value for a first time
    }

    onSort(newItem);
  };
  // ? () => handleSort(columns[column].iter)
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && "button" }}
            scope="col"
          >
            {columns[column].name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
