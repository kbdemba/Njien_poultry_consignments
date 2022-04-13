import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import ErrorIcon from '@mui/icons-material/Error';


function Error({message}) {
  return (
    <Box
      sx={{
        py:5, px:2,
        display:'flex', flexDirection:'column', alignItems:'center',
      }}
    >
      <ErrorIcon sx={{ fontSize: 50 }} color='action'/>
      <Typography variant='body2' gutterBottom>OOPS!! Something went wrong</Typography>
      <Typography variant='body1'>{message}</Typography>
      
    </Box>
  )
}

export default Error