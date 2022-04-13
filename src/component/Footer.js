import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
function Footer() {
  return (
    <Box sx={{bgcolor: 'primary.main', p: '32px 0', mt:'56px', color:'white',}}>
      <Typography variant='body1' align='center'>
        Copyright © Njien Poultry 2022
      </Typography>
    </Box>
  )
}

export default Footer