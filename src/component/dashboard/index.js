import React from 'react'
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'; 

import Item from './Item'

export default function Dashboard() {
  return (
    <div>
      <Box py={4} display='flex' justifyContent='space-between'>
        <Typography variant='h5'>Hello Aunty</Typography>
        <Button
          variant='contained'
          size='large'
        >
          New Consignment
        </Button>
      </Box>
      <Paper sx={{px:2, py:2, mb:10}}>
        <Typography variant='h6'> All Consignments</Typography>
        <Grid container spacing={2} sx={{pt:2.5}}>
          {items.map(item=> (
            <Grid item xs={12} sm={6} md={4}>
              <Item item={item}/>
            </Grid>
          ))}
        </Grid>
      </Paper>
    
    </div>
  )
}

const items = [
  {name: 'Consignment in day1', date:'0039302020', id: 1,},
  {name: 'Consignment in day1', date:'0039302020', id: 2,},
  {name: 'Consignment in day1', date:'0039302020', id: 3,},
  {name: 'Consignment in day1', date:'0039302020', id: 4,},
  {name: 'Consignment in day1', date:'0039302020', id: 5,},
  {name: 'Consignment in day1', date:'0039302020', id: 6,},
  {name: 'Consignment in day1', date:'0039302020', id: 7,},
]