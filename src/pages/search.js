import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context.js';
import isEqual from 'lodash.isequal';
import CircularProgress from '@mui/material/CircularProgress';
import unbxdSearchConfig from '../unbxd-search.config.json';
import UnbxdSearchWrapper from '../@unbxd-ui/react-search-sdk/';
import SearchBar from '../components/SearchBar';
import ProductsListing from '../components/ProductsListing';

import SpellChecker from '../components/SpellChecker';
import Paginator from '../components/Paginator';
import Sorter from '../components/Sorter';
import MerchandizingBanner from '../components/MerchandizingBanner';
import TextFilters from '../components/TextFilters';
import RangeFilters from '../components/RangeFilters';
import MultilevelFilters from '../components/MultilevelFilters';
import ActiveFilters from '../components/ActiveFilters';
import Crumbs from '../components/Crumbs';
import SearchDescription from '../components/SearchDescription';
import ProductViewTypes from '../components/ProductViewTypes';
import ProductsSize from '../components/ProductsSize';
import FacetApplyClear from '../components/FacetApplyClear';
import MobileModal from '../components/MobileModal';
import MobileMenu from '../components/MobileMenu';

export default function Search() {
  const routeHistory = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [showFilters, setShowFilters] = useState(false);
  const handleClose = () => setShowFilters(false);
  const handleShow = () => setShowFilters(true);
  const searchConfigurations = {
    updateUrls: false,
    searchQueryParam: 'q',
    hashMode: false,
  };


  const handleRouteChange = (searchObj, hash, refreshId) => {
    const { state = {} } = searchObj;
    const { responseObj = {} } = state;
    const { redirect = {} } = responseObj;
    const { type = '', value } = redirect;
    let urlParams = searchObj.getQueryParams();
    let newParams = searchObj.getQueryParams(hash);
    if (!isEqual(urlParams, newParams)) {
      if (routeHistory.action === 'POP') {
        routeHistory(`/search?${hash}`, { replace: true });
      } else {
        routeHistory(`/search?${hash}`);
      }
    }
    return false;
  };

  const onProductClick = (product) => {
    routeHistory(`/product/${product.uniqueId}`);
  };
  
  const { refreshId } = state;
  return (
    <div>
      <UnbxdSearchWrapper
        key={refreshId}
        loaderComponent={<CircularProgress />}
        siteKey={unbxdSearchConfig.siteKey}
        apiKey={unbxdSearchConfig.apiKey}
        refreshId={refreshId}
        searchConfigurations={searchConfigurations}
        onRouteChange={handleRouteChange}
        productType={'SEARCH'}
      >
        <MobileModal showFilters={showFilters} handleClose={handleClose} />

        <MobileMenu handleShow={handleShow} />

        <div className="UNX-search__container">
          <div className="UNX-searchMeta__container">
            <Crumbs />
            <div className="UNX-searchMeta__more">
              <ActiveFilters />
              <ProductViewTypes />
            </div>
          </div>
          <div className="UNX-searchResults__container">
            <div className="UNX-searchFacet__container">
              <MultilevelFilters />
              <RangeFilters />
              <TextFilters />
            </div>

            <div className="UNX-searchResult__container">
              <MerchandizingBanner />
              <SearchDescription />
              <SpellChecker />

              <div className="UNX-searchHeader__container">
                <Sorter />
                <ProductsSize />
                <Paginator />
              </div>

              <ProductsListing onProductClick={onProductClick} />

              <Paginator />
            </div>
          </div>
        </div>
      </UnbxdSearchWrapper>
    </div>
  );
}