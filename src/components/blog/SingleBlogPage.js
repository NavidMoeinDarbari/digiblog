import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/RichTextStyles.module.css";
import Loader from "../shared/Loader";
import BlogComments from "./BlogComments";
import CommentForm from "./CommentForm";
import BlogCardHeader from "../shared/BlogCardHeader";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { addToArchive, removeFromArchive } from "../../redux/archive/archiveAction";
//MUI
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import BookmarkRemoveRoundedIcon from '@mui/icons-material/BookmarkRemoveRounded';
import NorthEastIcon from "@mui/icons-material/NorthEast";
import {Box, Button, Card, CardHeader, CardMedia, Container, Divider, Stack, Avatar, Typography} from "@mui/material";
//GRAPHQL
import { useQuery } from "@apollo/client";
import { GET_POST_INFO } from "../../graphQL/queries";
//CONTEXT
import { allPostsContext, screenWidthContext } from "../../App";
//FUNCTION
import { titleSplitter } from "../../functions/titleSplitter";
import archiveChecker from "../../functions/archiveChecker";


const SingleBlogPage = () => {
   const screenWidth = useContext(screenWidthContext);
   const allBlogs = useContext(allPostsContext);
   const state = useSelector(state => state.savedArticles)
   const dispatch = useDispatch()
   const { slug } = useParams();
   const [relatedPosts, setRelatedPosts] = useState([]);
   const [page, setPage] = useState(1);

   const { data, loading } = useQuery(GET_POST_INFO, {
      variables: { slug: slug },
   });

   const carrousel = useRef(null);

   useEffect(() => {
      if (allBlogs && data) {
         const items = [];
         allBlogs.posts.map((post) => {
            if (post.category === data.post.category) items.push(post);
         });
         setRelatedPosts(
            items.filter((item) => item.title !== data.post.title)
         );
      }
   }, [data, allBlogs]);

   const scrollHandler = (direction) => {
      if (direction === "right") {
         if (page < Math.ceil(relatedPosts.length / 3)) setPage(page + 1);
         carrousel.current.scrollTo({
            top: 0,
            left: carrousel.current.clientWidth,
            behavior: "smooth",
         });
      }
      if (direction === "left") {
         if (page > 1) setPage(page - 1);
         carrousel.current.scrollTo({
            top: 0,
            left: -carrousel.current.clientWidth,
            behavior: "smooth",
         });
      }
   };

   if (data)
      return (
         <Container
            maxWidth='lg'
            className='flex flex-col items-start justify-center pt-2'
         >
            <Typography
               paddingBottom={1.5}
               textAlign={"center"}
               color={"darkslategray"}
               width='100%'
               component='p'
               variant='p'
               fontWeight='400'
               fontSize='.9rem'
            >
               Date: {data.post.datePublished}
            </Typography>
            <div className='h-300 sm:h-350 md:h-450 relative shadow-bannerShadow flex flex-col items-center justify-center w-full overflow-hidden rounded-2xl'>
               {loading ? (
                  <Loader />
               ) : (
                  <>
                     <img
                        src={data.post.coverImage.url}
                        className='object-cover w-full h-full'
                        alt={data.post.slug}
                     />
                     <div className='absolute bottom-0 left-0 flex flex-col items-start justify-between w-full h-auto px-3 py-4 450:py-5 md:py-6 text-white bg-gradient-to-t from-black/80 from-0 to-transparent'>
                        <div className='w-full h-16 flex flex-row justify-between items-center'>
                           <CardHeader
                              className='hidden 600:flex'
                              avatar={
                                 <Avatar
                                    src={data.post.author.avatar.url}
                                    className='m-0 md:mb-1'
                                 />
                              }
                              title={
                                 <Typography
                                    component='p'
                                    variant='p'
                                    color='white'
                                    fontSize='.9rem'
                                    gutterBottom
                                 >
                                    {data.post.author.name}
                                 </Typography>
                              }
                              subheader={
                                 <Typography
                                    component='p'
                                    variant='p'
                                    fontWeight='300'
                                    fontSize='.8rem'
                                 >
                                    {data.post.author.field}
                                 </Typography>
                              }
                           />
                        </div>
                        <Typography
                           className='text-xl leading-tight 600:text-1.4rem sm:text-1.5rem md:text-1.7rem lg:text-1.8rem px-2 sm:px-3 md:px-4'
                           letterSpacing={"-.8px"}
                           component='h2'
                           variant='h2'
                           fontWeight='400'
                        >
                           {data.post.title}
                        </Typography>
                     </div>
                  </>
               )}
            </div>
            {screenWidth < 600 && <BlogCardHeader data={data.post} />}
            <div className='flex flex-col md:flex-row justify-between w-full my-2 lg:my-4 md:p-0 md:gap-9 900:gap-14 lg:gap-16'>
               <Stack
                  className='w-full md:w-2/3 mt-0 600:mt-6'
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
               >
                  <Typography
                     color='black'
                     fontWeight={400}
                     className='text-base sm:text-1.07rem'
                     lineHeight={"25px"}
                     mb={0}
                     dangerouslySetInnerHTML={{
                        __html: data.post.content.html,
                     }}
                  ></Typography>
                  <BlogComments slug={data.post.slug} />
                  <CommentForm slug={data.post.slug} />
               </Stack>
               {relatedPosts.length >= 1 && (
                  <>
                     <Stack className='w-full m-0 pt-10 md:pt-1 md:mt-2 md:w-1/3'>
                        <Stack
                           width={"100%"}
                           direction={"row"}
                           justifyContent={"space-between"}
                           alignItems={"center"}
                        >
                           <Typography
                              className='text-1.1rem py-1.5 tracking-tight 450:text-1.2rem'
                              component='h3'
                              variant='h3'
                              color='black'
                              fontWeight='500'
                           >
                              Related Posts
                           </Typography>
                           {relatedPosts.length > 3 && (
                              <Box
                                 display={"flex"}
                                 alignItems={"center"}
                                 gap={0.5}
                              >
                                 <ArrowBackIosNewIcon
                                    className='arrowButton'
                                    style={{ opacity: page > 1 ? "1" : "0.6" }}
                                    onClick={() => scrollHandler("left")}
                                 />
                                 <ArrowForwardIosIcon
                                    className='arrowButton'
                                    style={{
                                       opacity:
                                          page ===
                                          Math.ceil(relatedPosts.length / 3)
                                             ? "0.6"
                                             : "1",
                                    }}
                                    onClick={() => scrollHandler("right")}
                                 />
                              </Box>
                           )}
                        </Stack>
                        <Divider className='mt-1.5 h-0.5 bg-sky-100'/>
                        <div
                           ref={carrousel}
                           className='w-full h-auto justify-items-center pt-4 overflow-x-scroll no-scrollbar grid grid-flow-col gap-y-2 grid-cols-100% auto-rows-auto auto-cols-100% grid-rows-3 500:grid-cols-50% md:grid-cols-100% 500:auto-cols-50% md:auto-cols-100% 500:grid-rows-2 md:grid-rows-3'
                        >
                           {relatedPosts &&
                              relatedPosts.map((post) => (
                                 <Card
                                    elevation={0}
                                    key={post.id}
                                    className='flex w-full sm:w-95% flex-col justify-between rounded-t-xl h-265 md:h-275 overflow-hidden'
                                 >
                                    <div className='relative w-full p-0 h-60% min-h-170 350:min-h-175 500:min-h-165 lg:h-2/3 shadow-blogCard rounded-md overflow-hidden'>
                                       {
                                          archiveChecker(state, post.slug) ? 
                                          <span className='absolute animate-bookmarkIconShow left-3 top-3 shadow-arrowButton flex justify-center items-center text-black bg-sky-100 p-0 w-7 h-7 rounded-full'>
                                             <BookmarkAddedRoundedIcon className='text-xl'/>
                                          </span> 
                                          :
                                          <span className='hidden absolute animate-bookmarkIconHide shadow-arrowButton top-3 justify-center items-center text-black bg-sky-100 p-0 w-7 h-7 rounded-full'>
                                             <BookmarkAddedRoundedIcon className='text-xl'/>
                                          </span> 
                                       }
                                       <CardMedia
                                          className='object-cover'
                                          component='img'
                                          image={post.coverImage.url}
                                          alt={slug}
                                          width='100%'
                                          height='100%'
                                       />
                                       <div className='backdrop-blur px-4 rounded-b-md overflow-hidden bg-black bg-opacity-15 border-solid border-0 border-t-0.5 border-white/50 text-white flex justify-between items-center w-full h-11 absolute bottom-0 left-0'>
                                          <Typography
                                             component='p'
                                             variant='p'
                                             fontSize='.8rem'
                                          >
                                             {post.author.name}
                                          </Typography>
                                          <Typography
                                             component='p'
                                             variant='p'
                                             fontSize='.8rem'
                                          >
                                             {post.category}
                                          </Typography>
                                       </div>
                                    </div>
                                    <div className='flex flex-col justify-between w-full p-0 h-40% lg:h-1/3'>
                                       <Typography
                                          component='h5'
                                          variant='h5'
                                          color='black'
                                          fontSize='.95rem'
                                          lineHeight='19px'
                                          fontWeight={500}
                                          marginTop={1.5}
                                       >
                                          {titleSplitter(post.title, 11)}
                                       </Typography>
                                       <Stack className='w-full flex flex-row gap-1 justify-start items-center'>
                                          <Link
                                             className='no-underline'
                                             to={`/${post.slug}`}
                                          >
                                             <Button
                                                variant='outlined'
                                                className='flex items-center justify-center gap-1 px-3 py-0 mb-1 mt-1 text-black rounded-2xl'
                                             >
                                                Read Post
                                                <NorthEastIcon className='text-base' />
                                             </Button>
                                          </Link>
                                          <Button
                                             variant='outlined'
                                             className='flex items-center justify-center gap-1 px-3 py-0 mb-1 mt-1 text-black rounded-2xl'
                                             onClick={archiveChecker(state,post.slug) ? () => dispatch(removeFromArchive(post)) : () => dispatch(addToArchive(post))}
                                          >
                                             {archiveChecker(state, post.slug)
                                                ? "Unbookmark"
                                                : "Bookmark"}
                                             {archiveChecker(state, post.slug) ? (
                                                <BookmarkRemoveRoundedIcon className='text-lg' />
                                             ) : (
                                                <BookmarkAddRoundedIcon className='text-lg' />
                                             )}
                                          </Button>
                                       </Stack>
                                    </div>
                                 </Card>
                              ))}
                        </div>
                     </Stack>
                  </>
               )}
            </div>
         </Container>
      );
};

export default SingleBlogPage;
