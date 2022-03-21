import React from 'react'
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import LargeCard from './LargeCard';
import SideCard from './SideCard';

export default function Detail({consignmentx}) {
  return (
     <>
      <Box py={2.5} display='flex' justifyContent='space-between'>
        <div>
          <Typography variant='h5'>{consignment.name}</Typography>
          <Typography variant='body1' color='textSecondary'>{consignment.date}</Typography>
        </div>
        <div>
          <Button
            size='small'
            variant='outlined'
            style={{marginRight:'16px'}}
          >
            Edit
          </Button>
          <Button
            size='small'
            color='error'
            variant='outlined'
          >
            delete
          </Button>
        </div>
      </Box>

      <Grid container spacing={2} sx={{pt:.5}}> 
        <Grid item xs={12} sm={12} md={9}> 
          <div>
            <Grid container spacing={2} > 
              <Grid item xs={12} md={4}>
                <LargeCard name='Total Cost of Goods' value={consignment.totalCostGoods}/>
              </Grid>
               <Grid item xs={12} md={4}>
                <LargeCard name='Total Extra Costs' value={consignment.totalExtaCost}/>
              </Grid>
               <Grid item xs={12} md={4}>
                <LargeCard name='Overall Total Cost' value={consignment.overallTotalCost}/>
              </Grid>
            </Grid>
          </div>
          <div style={{paddingTop: '20px'}}>
            {/* <Typography color='textSecondary' variant='body1'>Extra Costs</Typography> */}
            <Grid container spacing={2} > 
              <Grid item xs={12} md={3}>
                <LargeCard name='Transportation' value={consignment.transportation}/>
              </Grid>
               <Grid item xs={12} md={3}>
                <LargeCard name='Total Custom' value={consignment.totalCustom}/>
              </Grid>
               <Grid item xs={12} md={3}>
                <LargeCard name='Total Labor' value={consignment.totalLabor}/>
              </Grid>
               <Grid item xs={12} md={3}>
                <LargeCard name='Extra Cost / Good' value={consignment.extraCostperGood} bgcolorx='#D8F8FC'/>
              </Grid>
              
            </Grid>
          </div>
          <div style={{paddingTop: '16px'}}>
            <Button>View Notes</Button>
          </div>
        
        </Grid>
        <Grid item xs={12} sm={12} md={3}> 
          <SideCard 
            conversion={consignment.conversion} customPayBag={consignment.customPayBag} laborBag={consignment.laborBag}
            totalItems={consignment.totalItems} totalBags={consignment.totalBags} totalweight={consignment.totalweight}
          />
        </Grid>
      </Grid>
      <div>
        Table in here
      </div>
    </>
  )
}


const consignment = {
  // Save everything
  name: 'Consignment for January 2020',
  date: 'January 16, 2020',

  conversion: 450,
  customPayBag: 12, //Ask if she pay in Senegal
  laborBag: 5, //Ask if she pay in Senegal

  transportation: 450,
  totalCustom: 444,
  totalLabor: 444,

  extraCostperGood: 17,

  totalItems: 450,
  totalBags: 444,
  totalweight: 444,

  totalCostGoods: 8500,
  totalExtaCost: 3500,  //Show extar cost per good
  overallTotalCost: 12000,

  
  notes: 'Some Notes about this consignment',

  item:[
    {
      name: 'Ladoum',
      numberOfBags: 230,
      weight: 2,
      unitCostCFA: 7800,
      unitCostGMD: 500,
      totalCostCFA: 7800,
      totalCostGMD: 500,
      trueCostItem: 525, //remove
      totlaTrueCost: 544545, //remove
    },
    {
      name: 'Ladoum',
      numberOfBags: 230,
      weight: 2,
      unitCostCFA: 7800,
      unitCostGMD: 500,
      totalCostCFA: 7800,
      totalCostGMD: 500,
      trueCostItem: 525, //remove
      totlaTrueCost: 544545, //remove
    }
  ]
}