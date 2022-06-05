import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';


function SideCard(props) {
  const {
    conversion,
    customPayBag,
    laborBag,
    totalItems,
    totalBags,
    totalweight,
  } = props;
  return (
    <Box py={1.5} px={1.5}
      sx={{
        borderRadius: '5px',
        boxShadow: '2px 2px 8px -1px rgba(0,0,0,0.1)',
        transition: 'box-shadow .3s ease-out',
        bgcolor: 'background.paper',
        ":hover": {
          boxShadow: '2px 2px 8px -1px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box py={1} display={'flex'} justifyContent='space-between' alignItems='center'>
        <Typography variant='body2' color='textSecondary'>Conversion / 5000 CFA</Typography>
        <Typography>{conversion}</Typography>
      </Box>
      <Box py={1} display={'flex'} justifyContent='space-between' alignItems='center'>
        <Typography variant='body2' color='textSecondary'>Custom Pay / Bag</Typography>
        <Typography>{customPayBag}</Typography>
      </Box>
      <Box py={1} display={'flex'} justifyContent='space-between' alignItems='center'>
        <Typography variant='body2' color='textSecondary'>Labor / Bag </Typography>
        <Typography>{laborBag}</Typography>
      </Box>
      <Box py={1} display={'flex'} justifyContent='space-between' alignItems='center'>
        <Typography variant='body2' color='textSecondary'>Total Bags</Typography>
        <Typography>{totalBags}</Typography>
      </Box>
      <Box py={1} display={'flex'} justifyContent='space-between' alignItems='center'>
        <Typography variant='body2' color='textSecondary'>Total Weights</Typography>
        <Typography>{totalweight} tons</Typography>
      </Box>
      <Box py={1} display={'flex'} justifyContent='space-between' alignItems='center'>
        <Typography variant='body2' color='textSecondary'>Number of Items</Typography>
        <Typography>{totalItems}</Typography>
      </Box>
      
     
    </Box>
  )
}

export default SideCard;