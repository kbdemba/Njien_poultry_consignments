import React from 'react'
import { format } from 'date-fns'
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import LargeCard from './LargeCard';
import SideCard from '../SideCard';
import Table from '../Table';

export default function Detail({data, deleteCons}) {
  return (
     <>
      <Box py={2.5} display='flex' flexDirection={{ xs:'column',sm:'row'}} justifyContent={{ sm:'space-between'}}>
        <div>
          <Typography variant='h5'>{data.name}</Typography>
          <Typography variant='body1' color='textSecondary'>{format(data.date.seconds * 1000, 'MMM do, yyyy')}</Typography>
        </div>
        <Box sx={{pt:{xs:2}}}>
          <Link href={`/`} >
            <Button
              size='small'
              // variant='outlined'
              style={{marginRight:'16px'}}
            >
              Go Back
            </Button>
          </Link>
          <Link href={`/consignment/edit/${data.id}`} >
            <Button
              size='small'
              variant='outlined'
              style={{marginRight:'16px'}}
            >
              Edit
            </Button>
          </Link>
          <Button
            onClick={deleteCons}
            size='small'
            color='error'
            variant='outlined'
          >
            delete
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{pt:.5}}> 
        <Grid item xs={12} sm={12} md={9}> 
          <div>
            <Grid container spacing={2} > 
              <Grid item xs={12} md={4}>
                <LargeCard name='Total Cost of Goods' value={data.totalCostGoods}/>
              </Grid>
               <Grid item xs={12} md={4}>
                <LargeCard name='Total Extra Costs' value={data.totalExtaCost}/>
              </Grid>
               <Grid item xs={12} md={4}>
                <LargeCard name='Overall Total Cost' value={data.overallTotalCost}/>
              </Grid>
            </Grid>
          </div>
          <div style={{paddingTop: '20px'}}>
            {/* <Typography color='textSecondary' variant='body1'>Extra Costs</Typography> */}
            <Grid container spacing={2} > 
              <Grid item xs={12} md={3}>
                <LargeCard name='Transportation' value={data.transportation}/>
              </Grid>
               <Grid item xs={12} md={3}>
                <LargeCard name='Total Custom' value={data.totalCustom}/>
              </Grid>
               <Grid item xs={12} md={3}>
                <LargeCard name='Total Labor' value={data.totalLabor}/>
              </Grid>
               <Grid item xs={12} md={3}>
                <LargeCard name='Extra Cost / Good' value={data.extraCostperGood} bgcolorx='#D8F8FC'/>
              </Grid>
              
            </Grid>
          </div>

          <Box pt={1} pb={2} px={1.5} mt={2}
            sx={{
              borderRadius: '5px',
              boxShadow: '2px 2px 8px -1px rgba(0,0,0,0.1)',
              transition: 'box-shadow .3s ease-out',
              bgcolor: 'background.paper',
            }}
        >
          <Typography variant='caption' color='textSecondary'>Remarks</Typography>
          <Typography variant='body2' color='textSecondary'>{data.remarks}</Typography>
        </Box>
        
        </Grid>
        <Grid item xs={12} sm={12} md={3}> 
          <SideCard 
            conversion={data.conversion} customPayBag={data.customPayBag} laborBag={data.laborBag}
            totalItems={data.totalItems} totalBags={data.totalBags} totalweight={data.totalweight}
          />
        </Grid>
      </Grid>
      <div style={{padding: '40px 0 100px'}}>
        <Table 
          title={'Items Bought'}
          data={data.items}
          columns={[
            { field: "name", title: "Name" },
            { field: "numberOfBags", title: "Number of Bags" },
            { field: "weight", title: "Weight" },
            { field: "unitCostCFA", title: "Unit Cost (CFA)" },
            { field: "unitCostGMD", title: "Unit Cost (CFA)" },
            { field: "totalCostCFA", title: "Total Cost (CFA)" },
            { field: "totalCostGMD", title: "Total Cost (GMD)" },
            { field: "trueCostItem", title: "True Cost / Item" },
            // { field: "totlaTrueCost", title: "TotaL True Cost" },            
          ]}
        />
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

  totalItems: 450,
  totalBags: 444,
  totalweight: 444,

  totalCostGoods: 8500,
  totalExtaCost: 3500,  //Show extar cost per good
  overallTotalCost: 12000,

  extraCostperGood: 17,
    
  notes: 'Some Notes about this consignment',

  items:[
    {
      id:'1',
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
      id:'2',
      name: 'churai',
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