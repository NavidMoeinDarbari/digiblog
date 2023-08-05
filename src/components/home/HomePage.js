import React, { useContext } from "react";
import { Link } from "react-router-dom";
import errorImage from "../../images/illustrations/404 error with a landscape-amico.svg";
import AuthorsGrid from "../author/AuthorsGrid";
import BlogsGrid from "../blog/BlogsGrid";
import Loader from "../shared/Loader";
import HomePageHeader from "./HomePageHeader";
//MUI
import NorthEastIcon from "@mui/icons-material/NorthEast";
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import {Avatar, Box, Button, CardHeader, Container, Stack, Typography} from "@mui/material";
//GRAPHQL
import { useQuery } from "@apollo/client";
import { GET_BLOGS_INFO } from "../../graphQL/queries";
//FUNCTION
import { titleSplitter } from "../../functions/titleSplitter";
//CONTEXT
import { screenWidthContext } from "../../App";
import BlogCardHeader from "../shared/BlogCardHeader";

const HomePage = () => {

   const screenWidth = useContext(screenWidthContext)
   const { data, loading, error } = useQuery(GET_BLOGS_INFO);

   if (loading) {
      return (
         <div className='flex items-center justify-center w-full h-100-header'>
            <Loader size={80} marginTop='mt-0' />
         </div>
      );
   }

   if (error) {
      return (
         <div className='flex flex-col items-center justify-center w-full gap-5 h-100-header'>
            <img src={errorImage} className='w-1/6 min-w-220' alt="404 message"/>
            <Typography
               className='w-full text-center text-lg sm:text-1.4rem'
               component='h2'
               letterSpacing={"-.6px"}
               variant='h4'
               fontWeight={400}
               color='black'
            >
               Oops, something went wrong!
            </Typography>
         </div>
      );
   }

   if (data)
      return (
         <Container maxWidth='lg' className='w-full flex flex-col items-center min-h-100-header'>
            <HomePageHeader />
            <div className='h-350 md:h-450 group shadow-bannerShadow relative flex flex-col items-center justify-center w-full overflow-hidden rounded-xl lg:rounded-2xl'>
               <img
                  src={data.posts[data.posts.length - 1].coverImage.url}
                  className='group-hover:scale-105 transition duration-1000 object-cover w-full h-full'
                  alt={data.posts[data.posts.length - 1].slug}
               />
               <div className='absolute bottom-0 left-0 flex flex-col items-start justify-start w-full h-auto px-3 py-3.5 450:py-5 md:py-6 text-white bg-gradient-to-t from-black/60 from-0 to-transparent bg-opacity-20'>
                  <CardHeader
                     className='hidden 600:flex'
                     avatar={
                        <Avatar
                           className='m-0 md:mb-1 scale-100 lg:scale-110'
                           src={data.posts[data.posts.length - 1].author.avatar.url}
                        />
                     }
                     title={
                        <Typography
                           component='p'
                           variant='p'
                           color='white'
                           fontSize='.9rem'
                           fontWeight={500}
                           gutterBottom
                        >
                           {data.posts[data.posts.length - 1].author.name}
                        </Typography>
                     }
                     subheader={
                        <Typography
                           component='p'
                           variant='p'
                           color='#ececec'
                           fontWeight='400'
                           fontSize='.8rem'
                        >
                           {data.posts[data.posts.length - 1].datePublished}
                        </Typography>
                     }
                  />
                  <Typography
                     className='text-xl leading-6 600:leading-7 600:text-1.4rem sm:text-1.5rem md:text-1.7rem md:leading-9 px-1.5 sm:px-3 md:px-4 lg:w-4/5'
                     letterSpacing={"-.8px"}
                     component='h2'
                     variant='h2'
                     fontWeight='400'
                  >
                     {data.posts[data.posts.length - 1].title}
                  </Typography>
               </div>
               <Box className='absolute top-3 right-3 lg:top-6 lg:right-6 transition duration-300 lg:translate-x-150% lg:group-hover:translate-x-0 lg:group-hover:right-5 w-auto'>
                  <Link className='no-underline' to={`/${data.posts[data.posts.length - 1].slug}`}>
                     <Button
                        variant='contained'
                        className=' justify-center shadow-arrowButton gap-1 text-black bg-sky-100 px-2.5 py-px sm:px-4 sm:py-1 items-center rounded-2xl'
                     >
                        Read post
                        <NorthEastIcon className='text-base' />
                     </Button>
                  </Link>
               </Box>
            </div>
            {screenWidth < 600 && <BlogCardHeader data={data.posts[data.posts.length-1]}/>}
            <Typography
               className='w-full pt-0.5 leading-6 600:pt-6 text-base sm:text-1.05rem'
               component='p'
               variant='p'
               color='black'
               fontWeight={400}
            >
               {titleSplitter(data.posts[data.posts.length - 1].content.text,screenWidth > 600? 60 : 30)}
               <Link
                  className='no-underline'
                  to={`/${data.posts[data.posts.length - 1].slug}`}
               >
                  <Typography
                     className='ml-2 text-sm 600:text-base'
                     component='span'
                     fontWeight={500}
                     variant='p'
                     color='black'
                  >
                     Read more
                  </Typography>
               </Link>
            </Typography>
            <Stack className='flex flex-col 730:flex-row w-full my-4 '>
               <Stack className='w-full 730:w-8/12 p-0 730:pr-1 lg:pr-1.5 lg:w-9/12'>
                  <BlogsGrid />
               </Stack>
               <Stack className='w-full 730:w-4/12 p-0 730:pl-3 lg:w-3/12'>
                  <AuthorsGrid />
               </Stack>
            </Stack>
         </Container>
      );
};

export default HomePage;
