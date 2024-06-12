
import { useState } from "react";
import { AppBar, Avatar, Grid, Paper } from "@mui/material";
import { serverURL } from "../../NodeServices/FetchNodeServices";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import { useNavigate } from "react-router-dom";


export default function CategoryListComponent({ data ,getSubCategoryId}) {
  const navigate = useNavigate()
  console.log(data)

 const handleClick=(item)=>{
   getSubCategoryId(item.subcategoryid,item.subcategoryname)
 }

  const ListView = () => {
    return (
      data.map((item) => {
        return (
          <ListItem disablePadding>
            <ListItemButton onClick={()=>handleClick(item)}>
              <ListItemIcon>
                <Avatar src={`${serverURL}/images/${item.icon}`} />
              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '500' }}>{item.subcategoryname}</span>} />
            </ListItemButton>
          </ListItem>
        )
      })
    )
  }

  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <div >
        Top Categories
        </div>
      
      <List>
        {ListView()}
      </List>
    </Grid>
    </Grid>
  )
}

