import React, { useContext } from "react";
import { Link } from "react-router-dom";
//MUI
import {Typography, Avatar, CardHeader, Grid,Card, Button} from "@mui/material";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import NorthEastIcon from "@mui/icons-material/NorthEast";
//CONTEXT
import { screenWidthContext } from "../../App";

const AuthorCard = ({ id, slug, avatar, name, field }) => {
   const screenWidth = useContext(screenWidthContext);

   return (
      <Grid item className='w-full 550:w-1/2 730:w-full'>
         <Card
            className='px-2 730:px-0'
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
               {  
                  screenWidth < 900 ?
                  <button
                     title='info'
                     className='flex justify-center bg-white items-center text-base hover:bg-sky-100 hover:text-sky-950 text-sky-950 border border-solid border-sky-700 cursor-pointer font-medium transition duration-200 mr-0.5 p-0 w-7 h-7 rounded-full'
                  >
                     <NorthEastIcon className='text-base' />
                  </button>
                  :
                  <Button
                     variant='outlined'
                     className='w-auto hover:bg-sky-100 hover:text-sky-950 text-sky-950 border-sky-700 flex justify-center items-center rounded-2xl gap-1.5 mt-0.5 py-px px-3'
                  >
                     info
                     <EastRoundedIcon className='text-base flex md:hidden'/>
                  </Button>
               }
            </Link>
         </Card>
      </Grid>
   );
};

export default AuthorCard;
