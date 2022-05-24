import React, { createContext, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  SEARCH,
  CATEGORY,
  SEARCH_ACTION,
  CATEGORY_TYPE,
} from '../constants/index.js';

const AppContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case SEARCH: {
      return { ...state, type: SEARCH };
    }
    case CATEGORY: {
      return { ...state, type: CATEGORY };
    }
    case CATEGORY_TYPE: {
      return { ...state, categoryType: action.categoryType };
    }
    case SEARCH_ACTION: {
      return {
        ...state,
        type: SEARCH,
        categoryType: '',
        searchTerm: action.searchTerm,
        refreshId: state.refreshId++,
      };
    }
    default: {
      return state;
    }
  }
}
function AppProvider({ children }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [state, dispatch] = useReducer(reducer, {
    type:
      window.location.pathname.indexOf('/category') === 0 ? CATEGORY : SEARCH,
    searchTerm: query || '',
    categoryType: '',
    refreshId: 0,
  });
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
