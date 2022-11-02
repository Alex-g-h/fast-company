import React from "react";
import PropTypes from "prop-types";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ data, columns, onSort, selectedSort, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, columns }} />
          <TableBody {...{ data, columns }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.object,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  children: PropTypes.array
};

export default Table;
