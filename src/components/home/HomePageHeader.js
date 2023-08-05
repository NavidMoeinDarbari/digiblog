import React from "react";
//MUI
import { Typography } from "@mui/material";

const HomePageHeader = () => {
   return (
      <div className='flex flex-col items-center justify-center w-full pb-1 h-150 sm:h-32 md:h-150 400:h-28'>
         <Typography
            className='text-2rem text-center mb-px tracking-tighter sm:text-2.5rem md:text-3rem lg:text-3.5rem'
            component='h1'
            variant='h2'
            fontWeight={500}
            color='black'
         >
            Writings from our team
         </Typography>
         <Typography
            component='p'
            variant='p'
            color='#3b3b3b'
            className='w-90% leading-4 text-center text-sm 500:text-base 500:w-full'
         >
            The latest industry news, interviews, technologies, and resources
         </Typography>
      </div>
   );
};

export default HomePageHeader;
