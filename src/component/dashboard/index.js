import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';
import LinearProgress from '@mui/material/LinearProgress';
import ErrorIcon from '@mui/icons-material/Error';

import Item from './Item'
import {getConsignments} from '../../config/firestore';
import Error from '../Error';
import NoData from '../NoData';

function Dashboard(props) {

  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsignments()
  }, [])

  const fetchConsignments = async () => {
    setLoading(true)
    const {data, error} = await getConsignments()
    setLoading(false)
    if(error){ setError(error.message)}
    else{
      setData(data)
    }
  } 

  return (
    <div>
      <Box py={4} display='flex' justifyContent='space-between'>
        <Typography variant='h5' color='textSecondary'>Hello Aunty</Typography>
        <Link href="/consignment/new">
          <Button
            variant='contained'
            size='large'
          >
            New Consignment
          </Button>
        </Link>
      </Box>
      {loading && <LinearProgress />}
      <Box
        sx={{
          px:2, pt:2, pb:6, mb:10,
          borderRadius: '5px',
          boxShadow: '2px 2px 8px -1px rgba(0,0,0,0.1)',
          transition: 'box-shadow .3s ease-out',
          bgcolor: 'background.paper',
        }}
      >
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <Typography variant='h6'> All Consignments</Typography>
          {/* TODO: Search and filter */}
          <IconButton
            aria-label="account of current user"
            onClick={fetchConsignments}
          >
              <ReplayIcon color='action'/>
            </IconButton>
        </div>
        {error ? <Error message={error}/>
        : data.length < 1 && !loading ? <NoData />
        : <Grid container spacing={2} sx={{pt:2.5}}>
          {data.map(item=> (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Item item={item}/>
            </Grid>
          ))}
          </Grid>
        }
      </Box>
    
    </div>
  )
}

export default Dashboard
// TODO: Global Toast