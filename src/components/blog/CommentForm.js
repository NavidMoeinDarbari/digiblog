import React, { useState } from "react";
//MUI
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Button, Grid, TextField, Typography } from "@mui/material";
//GRAPHQL
import { useMutation } from "@apollo/client";
import { SEND_COMMENT } from "../../graphQL/mutation";
//TOASTIFY
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../shared/Loader";

const CommentForm = ({ slug }) => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [commentText, setCommentText] = useState("");

   const [sendComment, { loading }] = useMutation(SEND_COMMENT, {
      variables: { name, email, text: commentText, slug },
   });

   const sendCommentHandler = () => {
      if (name && email && commentText) {
         sendComment();
         toast.success(
            "Comment posted!, It will be published as soon as it is approved",
            { position: "top-center", transition: Zoom }
         );
         setName("");
         setEmail("");
         setCommentText("");
      } else {
         toast.error("Complete required fields!", { position: "top-center" });
      }
   };

   return (
      <Grid container width={"100%"} rowGap={1} paddingTop={3}>
         <Typography
            className='text-1.1rem tracking-tight 450:text-1.2rem'
            paddingBottom={1}
            width={"100%"}
            component='h5'
            variant='h5'
            fontWeight='500'
            color='black'
         >
            Leave a comment
         </Typography>
         <Grid item className='w-full 550:w-1/2 sm:w-full'>
            <TextField
               value={email}
               onChange={(event) => setEmail(event.target.value)}
               InputProps={{ style: { borderRadius: 12, fontSize: '0.95rem' }}}
               className='w-full sm:w-1/2 md:w-2/3 lg:w-35%'
               size='small'
               label='Email'
               placeholder='example@gmail.com'
               variant='outlined'
            />
         </Grid>
         <Grid item className='w-full 550:w-1/2 550:pl-2 sm:p-0 sm:w-full'>
            <TextField
               value={name}
               onChange={(event) => setName(event.target.value)}
               InputProps={{ style: { borderRadius: 12, fontSize: '0.95rem' }}}
               className='w-full sm:w-1/2 md:w-2/3 lg:w-35%'
               size='small'
               label='Name'
               variant='outlined'
            />
         </Grid>
         <Grid item xs={12}>
            <TextField
               value={commentText}
               onChange={(event) => setCommentText(event.target.value)}
               InputProps={{ style: { borderRadius: 12} }}
               sx={{ fontSize: "1rem" }}
               className='w-full sm:w-5/6 lg:w-2/3'
               size='small'
               multiline
               minRows={3}
               maxRows={5}
               placeholder='Write your comment'
               variant='outlined'
            />
         </Grid>
         <Grid item xs={12}>
            <Button
               variant='contained'
               disabled={loading ? true : false}
               className='rounded-full px-4 py-1 gap-3 text-white bg-mainColor shadow-md shadow-black/25'
               onClick={sendCommentHandler}
            >
               {loading ? "Sending..." : "Send"}
               {loading ? (
                  <Loader size={20} />
               ) : (
                  <SendRoundedIcon className='text-base' />
               )}
            </Button>
         </Grid>
         <ToastContainer />
      </Grid>
   );
};

export default CommentForm;
