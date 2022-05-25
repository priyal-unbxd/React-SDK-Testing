import React, {useEffect,useContext } from "react";
import { AppContext } from './context/context.js';
import { SEARCH_ACTION } from "./constants/index.js";
import { BrowserRouter, Routes, Route, useLocation ,useNavigate} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AppProvider } from "./context/context.js";
import unbxdSearchConfig from './unbxd-search.config.json';
import ErrorBoundary from "./components/ErrorBoundary.js";
import Header from "./layout/header.js";
import Home from "./pages/home.js";
import Search from "./pages/search.js";
import Category from "./pages/category.js";
import Product from "./pages/product.js";
import "./style.css";
import "./@unbxd-ui/react-search-sdk/public/dist/css/core.css";
import "./@unbxd-ui/react-search-sdk/public/dist/css/theme.css";
import Container from "@mui/material/Container";

const AppWrapper = () => {
	const { state, dispatch } = useContext(AppContext);
	console.log(state)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
   
  },[])

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search />} />
          <Route path="/category/:categoryType" element={<Category />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppProvider>
          <Header />
          <Container>
            <AppWrapper />
          </Container>
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
