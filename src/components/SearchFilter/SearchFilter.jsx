import React from 'react';
import css from './SearchFilter.module.css';
import PropTypes from 'prop-types';

const SearchFilter = ({ filter, onHandleChange }) => {
  return (
    <div>
      <h3 className={css.filter__title}>Find contacts by name</h3>
      <input
        placeholder="Search"
        type="text"
        name="filter"
        value={filter}
        onChange={onHandleChange}
        className={css.filter__input}
      />
    </div>
  );
};

SearchFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
};

export default SearchFilter;