import React from "react";
//MUI
import { Container, Stack, Typography } from "@mui/material";
//IMG
import Logo from "../../images/logo/logo.png";
//ICON
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = () => {
   return (
      <Container maxWidth='lg' className='mt-8'>
         <footer className='w-full sm:h-300 h-auto px-1 sm:px-0'>
            <div className='w-full sm:h-75% h-full flex sm:flex-row flex-col gap-1 justify-between items-center pt-8 border-solid border-0 border-b border-slate-500'>
               <Stack className='sm:w-1/2 w-full sm:h-full h-fit flex flex-col justify-start gap-1 py-3 sm:py-0'>
                  <div className='w-full flex justify-start'>
                     <img src={Logo} className='w-1/5 min-w-120' />
                  </div>
                  <Typography
                     className='sm:w-60% w-full text-base sm:text-1.05rem'
                     component='p'
                     variant='h6'
                     fontWeight={600}
                     color='#3b3b3b'
                     gutterBottom
                  >
                     Enjoy reading the latest news and articles on all topics
                     around the world.
                  </Typography>
                  <Typography component='p' variant='p' fontSize='.9rem'>
                     DIGIBLOG ,2023.
                  </Typography>
               </Stack>
               <Stack className='sm:w-1/2 w-full h-full flex flex-row sm:justify-center justify-between items-start gap-6 sm:pt-4 py-3 sm:py-0 sm:border-none border-solid border-0 border-t j'>
                  <ul className='footerUl'>
                     <li className='font-semibold text-sm sm:text-base'>
                        Categories
                     </li>
                     <li className='cursor-pointer'>Health</li>
                     <li className='cursor-pointer'>Technology</li>
                     <li className='cursor-pointer'>Art</li>
                     <li className='cursor-pointer'>Movie</li>
                  </ul>
                  <ul className='footerUl'>
                     <li className='font-semibold text-sm sm:text-base'>
                        Resources
                     </li>
                     <li className='cursor-pointer'>Documentation</li>
                     <li className='cursor-pointer'>Articles</li>
                     <li className='cursor-pointer'>Conferences</li>
                  </ul>
                  <ul className='footerUl'>
                     <li className='font-semibold text-sm sm:text-base'>
                        Legal
                     </li>
                     <li className='cursor-pointer'>About us</li>
                     <li className='cursor-pointer'>Privacy Policy</li>
                     <li className='cursor-pointer'>Cookies Policy</li>
                  </ul>
               </Stack>
            </div>
            <div className='w-full sm:h-25% h-auto flex sm:flex-row flex-col-reverse gap-3 sm:gap-0 justify-between items-center py-3 sm:py-0'>
               <Typography
                  component='p'
                  variant='p'
                  fontWeight={500}
                  className='text-sm sm:text-0.9rem'
               >
                  2023 DIGIBLOG Inc. All rights reserved.
               </Typography>
               <Stack className='flex flex-row items-center gap-6'>
                  <TelegramIcon color='primary' />
                  <TwitterIcon color='primary' />
                  <YouTubeIcon color='primary' />
                  <FacebookIcon color='primary' />
               </Stack>
            </div>
         </footer>
      </Container>
   );
};

export default Footer;
