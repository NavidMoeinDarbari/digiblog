import React, { useContext } from "react";
import { Link } from "react-router-dom";
//MUI
import {Typography, Avatar, CardHeader, Grid,Card, Button} from "@mui/material";
//CONTEXT
import { screenWidthContext } from "../../App";

const AuthorCard = ({ id, slug, avatar, name, field }) => {

   return (
      <Grid item className='w-full 550:w-1/2 730:w-full'>
         <Card
            className='px-2 730:px-0 730:pr-0.5'
            elevation={0}
            sx={{
               width: "100%",
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <CardHeader
               className='p-0 py-2.5 550:py-2 730:pl-0.5 lg:pl-5px lg:py-3'
               avatar={
                  <Avatar
                     className='scale-120 550:scale-105 lg:scale-120'
                     src={avatar.url}
                     alt={avatar.url}
                  />
               }
               title={
                  <Typography
                     component='p'
                     variant='p'
                     color='black'
                     fontSize='.9rem'
                     fontWeight='500'
                     gutterBottom
                  >
                     {name}
                  </Typography>
               }
               subheader={
                  <Typography
                     component='p'
                     variant='p'
                     color='GrayText'
                     fontWeight='400'
                     fontSize='.8rem'
                  >
                     {field}
                  </Typography>
               }
            />
            <Link className='no-underline' to={`/authors/${slug}`}>
                  <button
                     className='w-14 h-8 text-black cursor-pointer font-medium text-sm border-mainColor border-solid border-1 hover:bg-slate-100 transition duration-200 bg-white flex justify-center items-center rounded-2xl gap-1.5 mt-0.5 py-px px-0'
                  >
                     info
                  </button>
            </Link>
         </Card>
      </Grid>
   );
};

export default AuthorCard;
