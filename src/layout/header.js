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

export default function Header() {
  const { state, dispatch } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState(state.searchTerm);
  let navigate = useNavigate();
// console.log(document.getElementById('searchInput  '))
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
