import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function LargeCard({name, value, bgcolor='background.paper'}) {
  return (
    <Box py={1.5} px={2}
      sx={{
        borderRadius: '5px',
        boxShadow: '1px 1px 5px -2px rgba(0,0,0,0.1)',
        transition: 'box-shadow .3s ease-out, background .3s ease-out',
        bgcolor,
        ":hover": {
          // boxShadow: '2px 2px 8px -1px rgba(0,0,0,0.1)',
          bgcolor:'primary.light'
        },
      }}
    >
      <Typography variant='caption' color='textSecondary' >{name}</Typography>
      <Typography style={{fontWeight: 500, fontSize:'1.1rem'}} gutterBottom> <span style={{paddingRight:'3px' ,fontWeight: 100, fontSize:'.8rem'}}>GMD</span>{value}</Typography>
    </Box>
  )
}

export default LargeCard;