import React, { useRef, useContext, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { AppContext } from '../context/context.js';
import { SEARCH_ACTION } from '../constants/index.js';
import categoryMap from '../constants/categoryMap.js';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AppProvider } from "../context/context.js";
import unbxdSearchConfig from '../unbxd-search.config.json';

export default function Header() {
  const { state, dispatch } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState(state.searchTerm);
  let navigate = useNavigate();

  useEffect(()=>{
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
        		return `<div class="no_products"><b>Sorry , No Products found !! :(</b></div>`
      		}
			,onSimpleEnter : function(){
			}
			,onItemSelect : function(data,original){
				if(data.type=='POPULAR_PRODUCTS'){
					navigate(`/product/${data.pid}`)
				}else{
					dispatch({
						type: SEARCH_ACTION,
						searchTerm: data.value,
						refreshId: state.refreshId++,
					  });
        setSearchInput(data.value)
					navigate(`/search?q=${data.value}`)
				}
			}
			,onCartClick : function(data,original){
				return true;
			}
			,inFields:{
				count: 3
        		,type:"separate"
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
				,header: 'Matching Keywords'
				,tpl: ''
			}
			,popularProducts:{
				count: 2
				,price: true
				,priceFunctionOrKey : "price"
				,image: true
				,imageUrlOrFunction: "imageUrl"
				,currency : "Rs."
				,header: 'Popular Finds'
				,tpl: ''
			}
			,filtered : true,
			platform: 'io'
		});
  },[])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link className="header-nav-links logo-text" to="/">
              Unbxd
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Object.keys(categoryMap).map((page) => (
              <Link
                className="header-nav-links"
                key={page}
                to={`/category/${page}`}
              >
                {page}
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Paper
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
              }}
            >
              <InputBase
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                id="searchBox"
                value={searchInput}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for a product"
                inputProps={{ 'aria-label': 'Search for a product' }}
              />
              <IconButton
                onClick={() => {
                  dispatch({
                    type: SEARCH_ACTION,
                    searchTerm: searchInput,
                  });
                  navigate(`/search?q=${searchInput}`);
                }}
                sx={{ p: '10px' }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
