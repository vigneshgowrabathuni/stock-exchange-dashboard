import { IStock, SearchBarProps } from '../../types';
import './SearchBar.scss';

const SearchBar = ({
  handleSearch,
  handleSelect,
  options,
  handleOnChange,
  searchTerm,
}: SearchBarProps) => {
  return (
    <div className="search-container">
      <div className="search-inner">
        <input
          type="text"
          className="form-control"
          value={searchTerm}
          placeholder="Enter stock name"
          onChange={handleOnChange}
        ></input>
        <button
          type="button"
          className="btn btn-dark"
          name="search"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {options.length > 0 && (
        <ul className="list-group dropdown">
          {options.map((option: IStock) => (
            <li
              key={option.symbol}
              className="list-group-item dropdown-item"
              onClick={() => handleSelect(option.symbol)}
            >
              {option.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
