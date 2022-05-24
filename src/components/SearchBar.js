import React from 'react';
import { SearchBox } from '../@unbxd-ui/react-search-sdk/';
import unbxdSearchConfig from '../unbxd-search.config.json';

const SearchButton = ({ onSearchBoxSubmit }) => {
  return (
    <button
      onClick={onSearchBoxSubmit}
      className={'UNX-searchbox__button'}
    ></button>
  );
};

const SearchBar = () => {
  return (
    <div className="UNX-header__container">
      <a href="/">
        <span className="UNX-header__logo"></span>
      </a>
      <div className="UNX-header__search" id="searchInput">
        <SearchBox
          submitComponent={<SearchButton />}
          // placeholder={unbxdSearchConfig.searchBoxPlaceholder}
          placeholder="Hello"
        />
      </div>
    </div>
  );
};

export default SearchBar;
