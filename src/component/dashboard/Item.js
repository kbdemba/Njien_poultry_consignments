import React from 'react'
import { format } from 'date-fns'
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
        transition: 'all .3s ease-out',
        ":hover": {
          borderColor: 'primary.main',
          boxShadow: '2px 2px 8px -1px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Typography variant='subtitle1'>{item.name}</Typography>
      <Typography color='textSecondary' gutterBottom variant='body2'>{format(item.date.seconds * 1000, 'MMM do, yyyy')}</Typography>
      <Typography variant='body2' >
        <span> 
          <Link href={`/consignment/${item.id}`} > 
            <a style={{color: '#27BFD3', textDecoration: 'none'}} >View details</a>
          </Link>
        </span>
      </Typography>
    </Box>
  )
}
