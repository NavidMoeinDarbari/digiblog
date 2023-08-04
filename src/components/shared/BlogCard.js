import React, { useContext } from "react";
import { Link } from "react-router-dom";
//REDUX
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../../features/bookmarks/bookmarksSlice";
//MUI
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import BookmarkRemoveRoundedIcon from "@mui/icons-material/BookmarkRemoveRounded";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import {
   Avatar,
   Button,
   Card,
   CardActions,
   CardContent,
   CardHeader,
   CardMedia,
   Stack,
   Typography,
} from "@mui/material";
//Function
import { titleSplitter } from "../../functions/titleSplitter";
import archiveChecker from "../../functions/archiveChecker";
//CONTEXT
import { screenWidthContext } from "../../App";

const BlogCard = ({
   post,
   author,
   category,
   coverImage,
   slug,
   title,
   datePublished,
   content,
}) => {
   const screenWidth = useContext(screenWidthContext);
   const state = useSelector((state) => state.bookmarks.bookmarkedItems);
   const dispatch = useDispatch();

   return (
      <Card
         className='w-full sm:w-95% h-350 sm:h-400 rounded-xl lg:rounded-2xl overflow-hidden'
         elevation={0}
      >
         <div className='w-full h-55% shadow-blogCard rounded-md 450:h-60% p-0 relative overflow-hidden'>
            {archiveChecker(state, slug) ? (
               <span className='absolute animate-bookmarkIconShow left-3 top-3 shadow-arrowButton flex justify-center items-center text-black bg-sky-100 p-0 w-7 h-7 rounded-full'>
                  <BookmarkAddedRoundedIcon className='text-xl' />
               </span>
            ) : (
               <span className='hidden absolute animate-bookmarkIconHide shadow-arrowButton top-3 justify-center items-center text-black bg-sky-100 p-0 w-7 h-7 rounded-full'>
                  <BookmarkAddedRoundedIcon className='text-xl' />
               </span>
            )}
            <CardMedia
               className='object-cover w-full h-full'
               component='img'
               image={coverImage.url}
               alt={slug}
            />
            <div
               className={
                  "w-full h-auto overflow-hidden rounded-b-md backdrop-blur border-solid border-0 border-t-0.5 border-white/50 px-1 bg-black bg-opacity-15 text-white flex justify-between items-center absolute bottom-0 left-0"
               }
            >
               <CardHeader
                  className='p-3 sm:p-4'
                  avatar={
                     author && screenWidth > 400 ? (
                        <Avatar
                           className='scale-100 lg:scale-105 shadow-md shadow-black/70'
                           src={author.avatar.url}
                        />
                     ) : (
                        ""
                     )
                  }
                  title={
                     author && (
                        <Typography
                           className='text-sm 450:text-0.9rem'
                           component='p'
                           variant='p'
                           color={"white"}
                           gutterBottom
                        >
                           {author.name}
                        </Typography>
                     )
                  }
                  subheader={
                     <Typography
                        component='p'
                        variant='p'
                        color='#ececec'
                        fontWeight='400'
                        fontSize='.8rem'
                     >
                        {datePublished}
                     </Typography>
                  }
               />
               <Typography
                  className='text-sm 450:text-0.9rem'
                  component='p'
                  variant='p'
                  color={"white"}
                  paddingRight={1.5}
               >
                  {category}
               </Typography>
            </div>
         </div>
         <CardContent className='w-full flex flex-col justify-start h-35% 450:h-30% px-0 sm:mb-2'>
            <Typography
               className='text-base leading-tight 600:text-1.07rem lg:text-1.1rem'
               component='h3'
               variant='h5'
               letterSpacing='-.5px'
               fontWeight='500'
               color='black'
               gutterBottom
            >
               {title}
            </Typography>
            <Typography
               component='p'
               variant='p'
               fontSize='.85rem'
               fontWeight='400'
               lineHeight='17px'
            >
               {screenWidth >= 400 &&
                  titleSplitter(
                     content.text,
                     screenWidth < 640
                        ? "18"
                        : screenWidth < 1024
                        ? "25"
                        : screenWidth < 1115
                        ? "13"
                        : "25"
                  )}
               {screenWidth < 400 &&
                  titleSplitter(content.text, screenWidth > 350 ? "12" : "8")}
            </Typography>
         </CardContent>
         <CardActions className='flex items-center justify-start w-full p-0 h-max'>
            <Stack className='bg-white w-full flex flex-row gap-1 justify-start items-center'>
               <Link className='no-underline' to={`/${slug}`}>
                  <Button
                     variant='outlined'
                     className='flex justify-center items-center gap-1 rounded-2xl text-black mt-0.5 py-px px-3'
                  >
                     Read post
                     <NorthEastIcon className='text-base' />
                  </Button>
               </Link>
               <Button
                  variant='outlined'
                  className='flex items-center justify-center gap-1 px-3 py-px mt-0.5 text-black rounded-2xl'
                  onClick={
                     archiveChecker(state, slug)
                        ? () => dispatch(remove(post))
                        : () => dispatch(add(post))
                  }
               >
                  {archiveChecker(state, slug) ? "Unbookmark" : "Bookmark"}
                  {archiveChecker(state, slug) ? (
                     <BookmarkRemoveRoundedIcon className='text-lg' />
                  ) : (
                     <BookmarkAddRoundedIcon className='text-lg' />
                  )}
               </Button>
            </Stack>
         </CardActions>
      </Card>
   );
};

export default BlogCard;
