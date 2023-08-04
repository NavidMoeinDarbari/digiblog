import React from "react";
//MUI
import { Avatar, Box, Divider, Grid, Stack, Typography } from "@mui/material";
//GRAPHQL
import { useQuery } from "@apollo/client";
import { GET_POST_COMMENTS } from "../../graphQL/queries";
import Loader from "../shared/Loader";

const BlogComments = ({ slug }) => {
   const { data, loading, errors } = useQuery(GET_POST_COMMENTS, {
      variables: { slug },
   });

   if (data)
      return (
         <Grid container className='w-full sm:w-5/6 lg:w-2/3' rowGap={1} paddingTop={4}>
            <Typography
               className='text-1.1rem tracking-tight 450:text-1.2rem'
               paddingBottom={1}
               width={'100%'}
               component='h5'
               variant='h5'
               fontWeight='500'
               color='black'
            >
               All Comments ({data.comments.length})
            </Typography>
            {data && data.comments.length ? (
               data.comments
                  .slice()
                  .reverse()
                  .map((comment) => (
                     <Grid
                        item
                        xs={12}
                        key={comment.id}
                        className='bg-sky-100/60 p-3 lg:p-4 rounded-2xl'
                     >
                        <Stack className='flex flex-row justify-between items-center mb-2 lg:mb-3'>
                           <Box className='flex flex-row items-center gap-2'>
                              <Avatar className='bg-mainColor font-light text-base text-slate-200 w-8 h-8'>
                                 {comment.name[0]}
                              </Avatar>
                              <Typography
                                 component='p'
                                 variant='p'
                                 fontSize={'.95rem'}
                                 fontWeight={400}
                              >
                                 {comment.name}
                              </Typography>
                           </Box>
                           <Typography
                              className='text-xs font-normal pr-1 md:text-0.8rem'
                              component='span'
                              color={'GrayText'}
                              variant='p'
                           >
                              {`${comment.createdAt.slice(2,10)} ${comment.createdAt.slice(11, 16)}`}
                           </Typography>
                        </Stack>
                        <Typography
                           className='pl-1 lg:p-0 text-0.9rem sm:text-base leading-5'
                           component='p'
                           variant='p'
                           fontWeight={400}
                        >
                           {comment.text}
                        </Typography>
                     </Grid>
                  ))
            ) : (
               <Stack
                  className={
                     "w-full flex justify-center items-center `${data ? bg-slate-100/70 : bg-transparent}` rounded-2x p-5 rounded-2xl"
                  }
               >
                  {data ? (
                     <Typography
                        className='text-base 450:text-1.05rem'
                        component='p'
                        variant='p'
                        color={'GrayText'}
                        fontWeight={500}
                     >
                        No one commented on this post yet
                     </Typography>
                  ) : (
                     <Loader size={70} />
                  )}
               </Stack>
            )}
         </Grid>
      );
};

export default BlogComments;
