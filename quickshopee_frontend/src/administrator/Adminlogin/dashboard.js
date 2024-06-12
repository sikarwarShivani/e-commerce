import { useState } from "react";
import { AppBar, Avatar, Grid, Paper, Toolbar } from "@mui/material";
import { serverURL } from "../../NodeServices/FetchNodeServices";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Routes, Route } from 'react-router-dom'
import Category from "../categories/Category";
import DisplayCategory from "../categories/DisplayCategory";
import Product from "../Products/Product";
import ProductList from "../ProductLists/ProductList";
import SubCategory from "../Subcategories/SubCategory";
import DisplaySubcategory from "../Subcategories/DisplaySubcategory";
import DisplayProduct from "../Products/DisplayProduct";
import Banners from "../Banners/Banners";
import Productpicture from "../ProductPictures/Productpicture";
import { useNavigate } from "react-router-dom";
import DisplayProductList from "../ProductLists/DisplayProductList";

export default function Dashboard() {

  const navigate = useNavigate()
  var admin = JSON.parse(localStorage.getItem("ADMIN"))
  return (
    <div>
      <AppBar style={{ backgroundColor: "#dfe6e9" }} >
        <Toolbar>
          <div style={{ color: "#000", fontFamily: "Poppins", letterSpacing: 1, fontWeight: 'bold', fontSize: 24 }}>
            QuickShopee
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '5%' }}>
        <Grid container spacing={3}>
          <Grid item lg={2}>
            <Paper style={{ display: 'flex', flexDirection: 'column', margin: '5', marginBottom: 10 }}>
              <Paper elevation={3} style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'left', width: 190, padding: '15px 15px 10px 15px', marginBottom: 10 }}>

                <Avatar src={`${serverURL}/images/alice.png`} />
                <span style={{ marginLeft: 10, fontFamily: 'Poppins', fontWeight: '700' }}>
                </span>
                <div>
                  {admin.adminname}
                </div>
                <div>
                  {admin.emailid}
                </div>
              </Paper>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate("/dashboard/displaycategory")}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '700' }}>Category</span>} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '700' }}> Sub Category</span>} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '700' }}>Product</span>} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '700' }}>Product List</span>} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '700' }}>Product Picture</span>} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '700' }}>Banner</span>} />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '700' }}>Logout</span>} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item lg={10}>

            <Routes>
              <Route element={<Category />} path="/Category" />
              <Route element={<SubCategory />} path="/SubCategory" />
              <Route element={<DisplayCategory />} path="/DisplayCategory" />
              <Route element={<DisplaySubcategory />} path="/DisplaySubcategory" />
              <Route element={<Product />} path="/Product" />
              <Route element={<DisplayProductList />} path="/DisplayProductList" />
              <Route element={<DisplayProduct />} path="/DisplayProduct" />
              <Route element={<Banners />} path="/Banners" />
              <Route element={<Productpicture />} path="/Productpicture" />
              <Route element={<ProductList />} path="/ProductList" />
            </Routes>


          </Grid>

        </Grid>
      </div>
    </div>
  )
}

