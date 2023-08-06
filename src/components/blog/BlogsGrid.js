import React, { useContext, useEffect, useRef, useState } from "react";
import BlogCard from "../shared/BlogCard";
//REDUX
import { useSelector } from "react-redux";
//MUI
import { Box, Divider, Grid, Pagination, Tab, Tabs, Typography } from "@mui/material";

//GRAPHQL
import { useQuery } from "@apollo/client";
import { GET_BLOGS_INFO } from "../../graphQL/queries";
//CONTEXT
import { screenWidthContext } from "../../App";


const BlogsGrid = () => {
   const { data } = useQuery(GET_BLOGS_INFO);
   const screenWidth = useContext(screenWidthContext)
   const bookmarkedItems = useSelector(state => state.bookmarks.bookmarkedItems)
   const carrousel = useRef(null);

   const [totalPages, setTotalPages] = useState(1);
   const [page, setPage] = useState(1);
   const [category, setCategory] = useState("all");

   const tabsHandler = (event, value) => {
      setCategory(value);
   };

   let filterData = data.posts.filter((post) => {
      if (category === 'all') {
         return post;
      }
      else {
         return post.category === category;
      }
   });

   if(category === 'Bookmarks') filterData = bookmarkedItems

   useEffect(() => {
      if (data)
         setTotalPages(
            Math.round(
               carrousel.current.scrollWidth / carrousel.current.clientWidth
            )
         );
      setPage(1);
   }, [category]);

   useEffect(() => {
      setPage(1)
      carrousel.current.scrollTo(0,0)
   }, [category])

   const pageChangeHandler = (event, value) => {
      if (value > page && page < totalPages) {
         carrousel.current.scrollBy({
            top: 0,
            left: ((value - page) * carrousel.current.scrollWidth) / totalPages,
            behavior: "smooth",
         });
         setPage(value);
      }
      if (value < page && page > 1) {
         carrousel.current.scrollBy({
            top: 0,
            left: -(
               ((page - value) * carrousel.current.scrollWidth) /
               totalPages
            ),
            behavior: "smooth",
         });
         setPage(value);
      }
   };

   if (data)
      return (
         <>
            <Tabs
               value={category}
               textColor='secondary'
               indicatorColor='primary'
               onChange={tabsHandler}
               variant="scrollable"
               scrollButtons="auto"
               allowScrollButtonsMobile
               sx={{'.MuiTabs-scrollButtons.Mui-disabled': {
                  opacity: 0.4
               },
               alignItems: 'center'
               }}
            >
               <Tab
                  value='all'
                  label='All Posts'
                  className='px-1 text-0.95rem sm:text-base 550:px-3'
               />
               <Tab
                  value='Technology'
                  label='Technology'
                  className='px-1 text-0.95rem sm:text-base 550:px-3'
               />
               <Tab
                  value='Health'
                  label='Health'
                  className='px-1 text-0.95rem sm:text-base 550:px-3'
               />
               <Tab
                  value='Lifestyle'
                  label='Lifestyle'
                  className='px-1 text-0.95rem sm:text-base 550:px-3'
               />
                <Tab
                  value='Bookmarks'
                  label='Bookmarks'
                  className='px-1 text-0.9rem sm:text-base 550:px-3'
               />
            </Tabs>
            <Divider className='730:mr-5 h-0.5 bg-sky-100' />
            <Grid
               container
               ref={carrousel}
               className='touch-pan-y pointer-events-auto w-full h-full pt-4 lg:pt-6 relative overflow-x-scroll no-scrollbar grid grid-flow-col auto-rows-auto gap-y-3 grid-cols-100% auto-cols-100% grid-rows-3 lg:grid-cols-50% lg:auto-cols-50% lg:grid-rows-2 lg:gap-y-5'
            >
               {data && 
                  filterData.map((post, index) => (
                     <React.Fragment key={post.id}>
                        <Grid
                           item
                           xs={12}
                           className='flex justify-center 730:justify-start'
                        >
                           <BlogCard {...post} post={post}/>
                        </Grid>
                        {screenWidth >= 1024 && (filterData.length / 2) % 2 !== 0 &&
                           index === filterData.length - 1 && (
                              <Grid item className='row-end-3'></Grid>
                           )}
                     </React.Fragment>
                  ))}
               {
                  filterData.length === 0 && 
                  <Typography className='absolute top-5 730:top-20 w-full text-center text-slate-500'>
                     No Bookmark added!
                  </Typography>
               }
            </Grid>
            <Box
               width={"100%"}
               py={4}
               height={"auto"}
               display={"flex"}
               justifyContent={"center"}
               alignItems={"center"}
            >
               <Pagination
                  count={totalPages}
                  page={page}
                  boundaryCount={1}
                  siblingCount={0}
                  variant='outlined'
                  sx={{
                     Button: {
                        color: "black",
                     },
                     "Button.MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "#2C3C56",
                        color: "white",
                     },
                  }}
                  onChange={pageChangeHandler}
               />
            </Box>
         </>
      );
};

export default BlogsGrid;
