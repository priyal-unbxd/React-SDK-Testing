import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
// import "unbxdAutoSuggest.js"
const AppWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    // (function($){
    //   $.fn.extendedplugin = function(options){
    //     // var defaults = {
    //     // }
    //     // var options = $.extend(defaults,options);
		
	// 	$.fn.unbxdautocomplete.prototype.init = function () {
	// 		console.log("I am getting statretd")
	// 	}
	// 	// console.log(tlr)
    //     return this.each(function(){
	// 		// $.fn.unbxdautocomplete.init()
	// 		let d = $(this).unbxdautocomplete(options)
    //     })
    //   }
    // })($);

	// var elem = document.getElementById('searchBox'),
    // p = new (elem).init();
    $("#searchBox").unbxdautocomplete({
			siteName : `${unbxdSearchConfig.siteKey}`
			,APIKey : `${unbxdSearchConfig.apiKey}` 
			,minChars : 1
			,maxSuggestions: 20
      		,suggestionsHeader: "<h1>Hello</h1>"
			,delay : 200
			,loadingClass : 'unbxd-as-loading'
			,mainWidth : 300
			,sideWidth :300
			,zIndex : 0
			,position : 'absolute'
			,template : "2column"
			,mainTpl: ['inFields', 'topQueries']
			,sideTpl: ['keywordSuggestions', 'popularProducts']
			,sideContentOn : "left"
			,showCarts : true
			,cartType : "inline"
      ,noResultTpl: function (){
        return `<p>NO Results</p>`
      }
			,onSimpleEnter : function(){
			    console.log("Simple enter :: do a form submit")
			}
			,onItemSelect : function(data,original){
			}
			,onCartClick : function(data,original){
				console.log("addtocart", arguments);
				return true;
			}
			,inFields:{
				count: 3
        ,type:"inline"
				,fields:{
					'brand':3
					,'category':3
					,'color':3
				}
				,header: '10% off on everything for Today !!'
				,tpl: ''
			}
			,topQueries:{
				count: 2
				,header: 'Today\'s Top Buys!'
				,tpl: ''
			}
			,keywordSuggestions:{
				count: 2
				,header: 'Keywords'
				,tpl: ''
			}
			,popularProducts:{
				count: 2
				,price: true
				,priceFunctionOrKey : "price"
				,image: true
				,imageUrlOrFunction: "imageUrl"
				,currency : "$"
				,header: 'Popular Finds'
				,tpl: ''
			}
			,filtered : true
		});
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
