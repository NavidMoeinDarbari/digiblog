import React from "react";
import { Link, useLocation } from "react-router-dom";
//MUI
import { Avatar, CardHeader, Stack, Typography } from "@mui/material";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

const BlogCardHeader = ({ data }) => {
   const location = useLocation();
   
   if (data)
      return (
         <Stack className='w-full px-2 h-auto flex flex-row justify-between items-center'>
            <CardHeader
               className='px-0 py-4 pb-3 450:py-4'
               avatar={<Avatar className='shadow-sm shadow-black/80' src={data.author.avatar.url} />}
               title={
                  <Typography
                     component='p'
                     variant='p'
                     color='black'
                     fontSize='.9rem'
                     gutterBottom
                  >
                     {data.author.name}
                  </Typography>
               }
               subheader={
                  <Typography
                     component='p'
                     variant='p'
                     color='black'
                     fontWeight='300'
                     fontSize='.8rem'
                  >
                     {location.pathname === "/"
                        ? data.datePublished
                        : data.author.field}
                  </Typography>
               }
            />
            <Typography
               className='flex justify-center items-start gap-1'
               component='p'
               variant='p'
               color='black'
               fontSize='.9rem'
            >
               <CategoryRoundedIcon className='text-base' />
               {data.category}
            </Typography>
         </Stack>
      );
};

export default BlogCardHeader;
