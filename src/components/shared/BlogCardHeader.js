import React from "react";
import { Link, useLocation } from "react-router-dom";
//MUI
import { Avatar, CardHeader, Stack, Typography } from "@mui/material";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

const BlogCardHeader = ({ data }) => {
   const location = useLocation();
   
   if (data)
      return (
         <Stack className='w-full px-0.5 h-auto flex flex-row justify-between items-center'>
            <CardHeader
               className='px-0 py-4 pb-3 450:py-4'
               avatar={<Avatar className='scale-105 shadow-sm shadow-black/80' src={data.author.avatar.url} />}
               title={
                  <Typography
                     className="tracking-tighter font-medium"
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
                     className="tracking-tighter font-normal"
                     component='p'
                     variant='p'
                     color='black'
                     fontSize='.8rem'
                  >
                     {location.pathname === "/"
                        ? data.datePublished
                        : data.author.field}
                  </Typography>
               }
            />
            <Typography
               className='flex justify-center items-start gap-1 font-normal   '
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
