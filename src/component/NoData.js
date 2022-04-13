import React from 'react'
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import ErrorIcon from '@mui/icons-material/Error';

function Nodata() {
  return (
    <Box
      sx={{
        py:6, px:2,
        display:'flex', flexDirection:'column', alignItems:'center',
      }}
    >
      {/* <ErrorIcon sx={{ fontSize: 50 }} color='action'/> */}
      <Typography variant='body1' gutterBottom>No data to display</Typography>
      <Typography variant='body2' gutterBottom>Please create a new consignment</Typography>
      <Link href="/consignment/new">
        <Button
          variant='contained'
          size='large'
          sx={{mt:3}}
        >
          New Consignment
        </Button>
      </Link>
      
    </Box>
  )
}

export default Nodata