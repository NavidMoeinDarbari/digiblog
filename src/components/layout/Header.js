import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//MUI
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import {
   AppBar,
   Button,
   Container,
   List,
   ListItem,
   Toolbar,
} from "@mui/material";
//IMG
import Logo from "../../images/logo/logo (1).png";

const Header = () => {
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
   const [menuOpen, setMenuOpen] = useState(false);

   const handleScreenWidth = () => {
      setScreenWidth(window.innerWidth);
   };

   const handleMenu = () => {
      setMenuOpen(!menuOpen);
   };

   useEffect(() => {
      window.addEventListener("resize", handleScreenWidth);
      return () => {
         window.removeEventListener("resize", handleScreenWidth);
      };
   }, []);

   return (
      <AppBar
         position='sticky'
         elevation={0}
         color='transparent'
         className='bg-white min-h-fit p-0'
      >
         <Container maxWidth='lg' className='py-0 px-0'>
            <Toolbar className='flex flex-row justify-between gap-6'>
               <Link
                  to='/'
                  className='w-10% h-full min-w-125 flex justify-start items-start'
               >
                  <img
                     className='w-10/12 object-contain'
                     src={Logo}
                     alt='logo'
                  />
               </Link>
               <List className='w-auto flex-row grow justify-start items-center gap-2 font-medium text-black hidden 800:flex'>
                  <Link to='/' className='text-black no-underline'>
                     <ListItem className='listItem'>Home</ListItem>
                  </Link>
                  <Link to='/authors' className='text-black no-underline'>
                     <ListItem className='listItem'>Authors</ListItem>
                  </Link>
                  <Link to='/' className='text-black no-underline'>
                     <ListItem className='listItem'>About us</ListItem>
                  </Link>
               </List>
               <div className='flex flex-row justify-center items-center gap-1.5 800:gap-2 relative'>
                  {screenWidth >= 850 && (
                     <Button
                        className='px-5 py-5px text-base rounded-full font-medium text-black hidden sm:block'
                        variant='text'
                     >
                        Sign up
                     </Button>
                  )}
                  {screenWidth < 800 && (
                     <>
                        <button
                           className='w-8 h-8 border-none bg-mainColor flex justify-center items-center rounded-full shadow-arrowButton cursor-pointer'
                           onClick={handleMenu}
                        >
                           <KeyboardArrowDownRoundedIcon
                              className={`text-2xl text-white ${
                                 menuOpen && "rotate-180"
                              } transition duration-300`}
                           />
                        </button>
                        {menuOpen && (
                           <List className='w-max px-3 py-2 animate-sizeGrow shadow-arrowButton overflow-hidden flex-nowrap flex flex-col  gap-1.5 bg-mainColor text-white rounded-xl absolute top-10 right-0'>
                              <Link to='/' className='no-underline text-white'>
                                 <ListItem
                                    className='menuItem'
                                    onClick={() => setMenuOpen(false)}
                                 >
                                    Home
                                 </ListItem>
                              </Link>
                              <Link
                                 to='/authors'
                                 className='no-underline text-white'
                              >
                                 <ListItem
                                    className='menuItem'
                                    onClick={() => setMenuOpen(false)}
                                 >
                                    Authors
                                 </ListItem>
                              </Link>
                              <ListItem
                                 className='menuItem'
                                 onClick={() => setMenuOpen(false)}
                              >
                                 Resources
                              </ListItem>
                              <ListItem
                                 className='menuItem'
                                 onClick={() => setMenuOpen(false)}
                              >
                                 About us
                              </ListItem>
                              <ListItem
                                 className='menuItem text-red-300 flex gap-1'
                                 onClick={() => setMenuOpen(false)}
                              >
                                 <LogoutRoundedIcon className='text-lg text-red-400' />
                                 Log out
                              </ListItem>
                           </List>
                        )}
                     </>
                  )}
                  <button className='rounded-full w-8 h-8 cursor-pointer 800:px-6 p-1 800:w-auto text-white shadow-arrowButton border-none 800:py-5px flex justify-center items-center text-base font-medium bg-slate-800'>
                     {screenWidth < 800 ? "" : "Log in"}
                     <PersonRoundedIcon className='text-white text-xl 800:hidden' />
                  </button>
               </div>
            </Toolbar>
         </Container>
      </AppBar>
   );
};

export default Header;
