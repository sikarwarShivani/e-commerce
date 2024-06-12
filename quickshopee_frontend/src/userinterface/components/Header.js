import { AppBar, Grid, Toolbar } from "@mui/material";
import { useState, useEffect } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStyles } from "./HeaderCss";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";
import {Badge} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  var classes = useStyles();
  // var products=useSelector((state)=>state.products)
  // var totalproducts=Object.keys(products)
  var products=useSelector((state)=>state.products)
  var totalproducts=Object.keys(products)
   const navigate=useNavigate()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));



  return (
    <div className={classes.headermainbox} >
      <Grid container spacing={2}>
        <Grid item xs={6} md={4} >
          <div className={classes.logo}>
             {matches?`QuickShopee`:`QS`}
          </div>
        </Grid>
        <Grid item xs={6} md={4}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Grid>
        <Grid item xs={6} md={3}></Grid>
        <Grid item xs={6} md={1}>
          <div className={classes.icons}>
          <Badge badgeContent={totalproducts.length} color="success">
            <ShoppingCartIcon onClick={()=>navigate("/cart")} />
            </Badge>
            <PersonIcon  />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}