import React from 'react'

import Table from '../Table';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function NewTable(props) {
  return (
    <div style={{padding: '8px 0 24px'}}>
      <Table 
        {...props}
        options={{search: false, toolbar: false}}
        // data={data}
        columns={[
            { field: "name", title: "Name" },
            { field: "numberOfBags", title: "Number of Bags" },
            { field: "weight", title: "Weight" },
            { field: "unitCostCFA", title: "Unit Cost(CFA)" },
            { field: "unitCostGMD", title: "Unit Cost(GMD)" },
            { field: "totalCostCFA", title: "Total Cost(CFA)" },
            { field: "totalCostGMD", title: "Total Cost(GMD)" },
            { field: "trueCostItem", title: "True Cost/Item" },
            // { field: "totalTrueCost", title: "Total True Cost" },
          ]}
        
        
        />
    </div>
  )
}

export default NewTable;
