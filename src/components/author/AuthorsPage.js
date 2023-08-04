import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../shared/Loader";
import errorImage from "../../images/illustrations/404 error with a landscape-amico.svg";
//MUI
import {Avatar, Box, Button, Card, CardHeader, Container, Divider, Grid, IconButton, InputAdornment, OutlinedInput, Stack, TextField, Typography} from "@mui/material";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import NorthEastIcon from "@mui/icons-material/NorthEast";
//GRAPHQL
import { useQuery } from "@apollo/client";
import { GET_AUTHORS_INFO } from "../../graphQL/queries";


const AuthorsPage = () => {
   const [searchKey, setSearchKey] = useState("");
   const [searchedItems, setSearchedItems] = useState([]);
   const { data, loading, error } = useQuery(GET_AUTHORS_INFO);
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

   const handleScreenWidth = () => {
      setScreenWidth(window.innerWidth);
   };

   useEffect(() => {
      window.addEventListener("resize", handleScreenWidth);
      return () => {
         window.removeEventListener("resize", handleScreenWidth);
      };
   }, []);

   useEffect(() => {
      if (data && searchKey.length > 2) {
         setSearchedItems(
            data.authors.filter((author) =>
               author.name.toLowerCase().includes(searchKey.toLowerCase())
            )
         );
      } else {
         setSearchedItems([]);
      }
   }, [searchKey]);

   if (error) {
      return (
         <div className='flex flex-col items-center justify-center w-full gap-6 h-100-header'>
            <img src={errorImage} className='w-1/6' alt="404 error"/>
            <Typography
               component='h2'
               fontSize={"1.5rem"}
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
         <Container maxWidth='lg'>
            <div className='flex flex-col items-center justify-center w-full sm:h-32 md:h-150 h-110'>
               <Typography
                  className='text-2rem tracking-tighter sm:text-2.5rem md:text-3rem lg:text-3.5rem'
                  component='h1'
                  variant='h2'
                  fontWeight={500}
                  color='black'
                  mb={1}
               >
                  Our team Authors
               </Typography>
               <Typography component='p' variant='p' color='#3b3b3b' className='w-90% text-center text-sm 500:text-base 500:w-full'>
                  The best writers from all over the world, in our team
               </Typography>
            </div>
            <Grid
               container
               className='gap-y-2 sm:gap-y-3'
               width={"100%"}
               justifyContent={"center"}
               alignContent={"center"}
               justifyItems={"center"}
               position={"relative"}
            >
               <Stack
                  width={"100%"}
                  display={"flex"}
                  gap={3}
                  justifyContent={"center"}
                  alignItems={"center"}
                  mb={searchedItems.length > 0 ? 2 : 3}
               >
                  <OutlinedInput
                     onChange={(e) => setSearchKey(e.target.value)}
                     className='group w-2/3 sm:w-60% md:w-40%'
                     type='text'
                     size='small'
                     sx={{
                        borderRadius: "15px",
                        paddingRight: 2,
                     }}
                     placeholder='Search'
                     endAdornment={
                        <InputAdornment position='end'>
                           <IconButton edge='end'>
                              <PersonSearchRoundedIcon />
                           </IconButton>
                        </InputAdornment>
                     }
                  />
                  {searchedItems.length > 0 && (
                     <>
                        <Grid
                           container
                           columnGap={2}
                           justifyContent={"center"}
                           className='w-full h-auto gap-y-3 500:gap-y-4 transition-all duration-500'
                        >
                           {searchedItems.map((item) => (
                              <Grid item xs={"auto"}>
                                 <Card
                                    elevation={3}
                                    className='flex flex-row items-center relative justify-between w-full px-3 pr-4 bg-white rounded-2xl'
                                 >
                                    <CardHeader
                                       sx={{
                                          paddingLeft: "5px",
                                          paddingY: "10px",
                                       }}
                                       avatar={
                                          <Avatar
                                             sx={{ scale: "110%" }}
                                             src={item.avatar.url}
                                             alt={item.avatar.url}
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
                                             {item.name}
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
                                             {item.field}
                                          </Typography>
                                       }
                                    />
                                    <Link
                                       className='no-underline'
                                       to={`/authors/${item.slug}`}
                                    >
                                       <Box className='flex items-center justify-center p-0 transition duration-150 border border-solid rounded-full w-7 h-7 hover:bg-sky-100 hover:text-sky-950 border-sky-600'>
                                          <NorthEastIcon className='text-base' />
                                       </Box>
                                    </Link>
                                 </Card>
                              </Grid>
                           ))}
                        </Grid>
                        <Divider className='w-full h-0.5 bg-sky-100' />
                     </>
                  )}
               </Stack>
               {data ? (
                  data.authors.map((author) => (
                     <Grid
                        item
                        className={`h-150 sm:h-170 md:h-200 px-1 sm:px-1.5 transition-opacity duration-300 ${
                           searchedItems.length ? "opacity-100" : "opacity-100"
                        } w-full`}
                        key={author.id}
                        xs={6}
                        sm={4}
                        md={3}
                     >
                        <Card className='relative flex items-end w-full h-full overflow-hidden group rounded-2xl'>
                           <img
                              src={author.avatar.url}
                              className='w-full lg:brightness-95 lg:group-hover:brightness-100 lg:group-hover:w-110% h-full lg:group-hover:h-110% absolute transition-all duration-300 object-cover bottom-0 flex justify-center'
                              alt={author.name}
                           />
                           <Stack className='z-10 flex flex-row items-end justify-between w-full h-auto sm:p-4 sm:pr-5 py-2.5 px-3 bg-gradient-to-t from-black/70 to-transparent'>
                              <Typography
                                 component='h3'
                                 variant='h5'
                                 className='flex flex-col items-start text-lg sm:text-1.4rem justify-start sm:w-1/2 w-full sm:gap-1 gap-0 sm:leading-6 leading-none tracking-tighter text-white'
                              >
                                 {author.name}
                                 <Typography
                                    component='span'
                                    lineHeight={"15px"}
                                    variant='span'
                                    className='text-xs sm:text-0.8rem'
                                    width={"100%"}
                                    padding={0}
                                 >
                                    {author.field}
                                 </Typography>
                              </Typography>
                              <Link to={`/authors/${author.slug}`}>
                                 {screenWidth <= 768 ? (
                                    <button
                                       title='info'
                                       className='flex border-none justify-center items-center shadow-arrowButton text-base absolute cursor-pointer top-2 left-2 font-medium text-black bg-sky-100 hover:bg-sky-200 transition duration-200 p-0 w-7 h-7 rounded-full'
                                    >
                                       <NorthEastIcon className='text-base' />
                                    </button>
                                 ) : (
                                    <Button
                                       variant='contained'
                                       className='group-hover:translate-y-0 transition duration-300 translate-y-11 w-auto justify-center gap-1 text-black bg-sky-100 px-3 py-0.5 items-center rounded-2xl'
                                    >
                                       info
                                       <NorthEastIcon className='text-base' />
                                    </Button>
                                 )}
                              </Link>
                           </Stack>
                        </Card>
                     </Grid>
                  ))
               ) : (
                  <Loader size={70} marginTop={"mt-2"} />
               )}
            </Grid>
         </Container>
      );
};

export default AuthorsPage;
