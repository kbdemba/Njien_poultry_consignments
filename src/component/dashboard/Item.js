import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function Item({item}) {
  return (
    <Box px={2} py={1.5}
      sx={{
        borderRadius: '5px',
        border: 'solid 1px',
        borderColor: 'divider',
        ":hover": {
          borderColor: 'primary.main',
          // boxShadow: 2,
        },
      }}
    >
      <Typography variant='subtitle1'>{item.name}</Typography>
      <Typography color='textSecondary' gutterBottom variant='subtitle1'>{item.date}</Typography>
      <Typography variant='body2' >
        <span> 
          <Link href={`/consignment/${item.id}`} > 
            <a style={{color: '#27BFD3', textDecoration: 'none'}} >View deatails</a>
          </Link>
        </span>
      </Typography>
    </Box>
  )
}
