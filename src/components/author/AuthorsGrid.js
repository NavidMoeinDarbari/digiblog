import React from "react";
import { Link } from "react-router-dom";
import AuthorCard from "../shared/AuthorCard";
//MUI
import {
   Typography,
   Avatar,
   CardHeader,
   Grid,
   Card,
   Divider,
   Button,
} from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
//GRAPHQL
import { useQuery } from "@apollo/client";
import { GET_AUTHORS_INFO } from "../../graphQL/queries";

const AuthorsGrid = () => {
   const { data, loading, error } = useQuery(GET_AUTHORS_INFO);

   return (
      <>
         <Typography
            className='flex justify-between items-center text-1.1rem 450:text-1.2rem'
            paddingY='9.5px'
            color='black'
            fontWeight='500'
         >
            Authors
            <Link className='no-underline' to='/authors'>
               <Button
                  variant='text'
                  className='py-0.5 px-0 hover:bg-transparent hover:text-slate-950 text-sky-900 border-sky-600 rounded-2xl gap-1'
               >
                  See all
                  <NorthEastIcon className='text-base' />
               </Button>
            </Link>
         </Typography>
         <Divider className='h-0.5 bg-sky-100' />
         <Grid container className='w-full pt-3 lg:pt-4 gap-y-1 items-center'>
            {data &&
               data.authors.map((author) => (
                  <AuthorCard {...author} key={author.id} />
               ))}
         </Grid>
      </>
   );
};

export default AuthorsGrid;
