import { useQuery } from "@apollo/client";
import React, { useContext, useRef, useState } from "react";
import BlogCard from "../shared/BlogCard";
import Loader from "../shared/Loader";
//MUI
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {
   Box,
   CardHeader,
   Container,
   Divider,
   Grid,
   Stack,
   Typography,
} from "@mui/material";
//GRAPHQL
import { useParams } from "react-router-dom";
import { GET_AUTHOR_INFO } from "../../graphQL/queries";
//CONTEXT
import { screenWidthContext } from "../../App";

const SingleAuthorPage = () => {
   const screenWidth = useContext(screenWidthContext);
   const { slug } = useParams();
   const [leftEnd, setLeftEnd] = useState(true);
   const [RightEnd, setRightEnd] = useState(false);
   const { data, loading, error } = useQuery(GET_AUTHOR_INFO, {
      variables: { slug },
   });
   const carrousel = useRef(null);

   const scrollHandler = (direction) => {
      const leftScrollSpace =
         carrousel.current.scrollWidth - carrousel.current.scrollLeft;
      if (
         leftScrollSpace === carrousel.current.scrollWidth &&
         carrousel.current.scrollLeft === 0
      )
         setLeftEnd(true);
      if (leftScrollSpace === carrousel.current.clientWidth) setRightEnd(true);
      if (direction === "right") {
         setLeftEnd(false);
         carrousel.current.scrollBy({
            top: 0,
            left: screenWidth < 640 ? carrousel.current.clientWidth : 385,
            behavior: "smooth",
         });
      }
      if (direction === "left") {
         setRightEnd(false);
         carrousel.current.scrollBy({
            top: 0,
            left: screenWidth < 640 ? -carrousel.current.clientWidth : -385,
            behavior: "smooth",
         });
      }
   };

   if (data)
      return (
         <Container
            maxWidth='lg'
            className='flex min-h-screen justify-start flex-col items-start pt-2 gap-5 lg:gap-6'
         >
            {loading ? (
               <Loader />
            ) : (
               <>
                  <div className='w-full shadow-lg shadow-black/30 flex flex-col h-350 md:h-450 overflow-hidden rounded-xl lg:rounded-2xl relative'>
                     <img
                        src={data.author.avatar.url}
                        className='w-full h-full object-cover'
                        alt={data.author.slug}
                     />
                     <div className='w-full h-1/3 py-8 pb-6 bg-gradient-to-t from-black/70 to-transparent text-white flex flex-row justify-between items-center absolute bottom-0 left-0'>
                        <CardHeader
                           title={
                              <Typography
                                 className='text-2.5rem sm:text-3rem md:text-3.5rem md:pl-2'
                                 component='h2'
                                 variant='h2'
                                 color='white'
                                 letterSpacing={-2.5}
                              >
                                 {data.author.name}
                              </Typography>
                           }
                           subheader={
                              <Typography
                                 className='pl-0.5 md:pl-3'
                                 component='p'
                                 variant='p'
                                 fontWeight='300'
                                 fontSize='1.1rem'
                                 color='white'
                              >
                                 {data.author.field}
                              </Typography>
                           }
                        />
                     </div>
                  </div>
                  <Grid container>
                     <Grid item xs={12}>
                        <Typography
                           className='text-1.1rem 450:text-1.2rem'
                           component='h5'
                           variant='h5'
                           fontWeight='500'
                           color='black'
                           gutterBottom
                        >
                           Biography
                        </Typography>
                        <Typography
                           className='text-base sm:text-1.05rem'
                           color='black'
                           fontWeight={400}
                           lineHeight={"24px"}
                        >
                           {data.author.description.text}
                        </Typography>
                     </Grid>
                     <Grid item xs={12} className='w-full relative mt-6'>
                        {data.author.posts.length > 0 && (
                           <Stack className='flex flex-row justify-between items-start'>
                              <Typography
                                 className='text-1.1rem 450:text-1.2rem pb-1.5'
                                 component='h5'
                                 variant='h5'
                                 fontWeight='500'
                                 color='black'
                              >
                                 Articles published by {data.author.name}
                              </Typography>
                              {data.author.posts.length > 3 && (
                                 <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={0.6}
                                    className='absolute -bottom-8 w-full sm:w-auto justify-center sm:static'
                                 >
                                    <NavigateBeforeIcon
                                       className='arrowButton'
                                       style={{
                                          opacity: leftEnd ? "0.6" : "1",
                                       }}
                                       onClick={() => scrollHandler("left")}
                                    />
                                    <NavigateNextIcon
                                       className='arrowButton'
                                       style={{
                                          opacity: RightEnd ? "0.6" : "1",
                                       }}
                                       onClick={() => scrollHandler("right")}
                                    />
                                 </Box>
                              )}
                           </Stack>
                        )}
                        {data.author.posts.length > 0 && (
                           <Divider className='mt-1.5 h-0.5 bg-sky-100' />
                        )}
                        <div
                           ref={carrousel}
                           className={
                              "touch-pan-y pointer-events-auto sm:touch-auto w-full py-3 pt-4 px-0 h-auto grid grid-flow-col gap-y-3 grid-cols-100% auto-rows-auto auto-cols-100% grid-rows-3 sm:grid-cols-390 sm:auto-cols-390 justify-items-center sm:justify-items-start sm:grid-rows-1 `${data.author.posts.length > 3 && screenWidth < 640 ? custom-scrollbar : no-scrollbar }` overflow-y-hidden"
                           }
                        >
                           {data.author.posts &&
                              data.author.posts.map((post) => (
                                 <BlogCard
                                    category={post.category}
                                    coverImage={post.coverImage}
                                    relatedPostSlug={post.slug}
                                    title={post.title}
                                    slug={post.slug}
                                    datePublished={post.datePublished}
                                    content={post.content}
                                    key={post.id}
                                    post={post}
                                 />
                              ))}
                        </div>
                     </Grid>
                  </Grid>
               </>
            )}
         </Container>
      );
};

export default SingleAuthorPage;
