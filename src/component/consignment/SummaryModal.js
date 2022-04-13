import React, { useState }  from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { format } from 'date-fns'

function ConfirmModal(props) {
  const {
    open,
    handleClose,
    handleConfirm,
    finalData,
    loading,
    edit
  } = props

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="confirm-dialog"
      open={open}
      fullWidth={true}
      maxWidth='sm'
    >
      <DialogTitle sx={{ m: 0, py: 1.5 }} id="confirm-dialog-title">
        Review Summary
        <Typography variant='body2'>Review the Information below before you submit</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Divider style={{marginTop: '4px'}}/>
      </DialogTitle>
        
      <DialogContent >

        <Box py={1} display='flex' justifyContent='space-between'>
          <div>
            <Typography variant='body2' color='textSecondary'>Name</Typography>
            <Typography variant='body1'>{finalData.name}</Typography>
          </div>
          <div>
            <Typography variant='body2' color='textSecondary' >Date</Typography>
            {finalData.date &&
              <Typography variant='body1'>{format(finalData.date, 'MMM do, yyyy')}</Typography>
            }
          </div>
        </Box>
        <Divider style={{marginTop: '8px'}}/>
        <Grid container spacing={3} sx={{py:2}} justifyContent='space-between'> 
          <Grid item xs={12} sm={6} md={6}>
            {/* <Wrapper> */}
              <FlexData label='Conversion / 5000 CFA' value={`GMD ${finalData.conversion}`}/>
              <FlexData label='Custom Pay / Bag' value={`GMD ${finalData.customPayBag}`}/>
              <FlexData label='Labor / Bag' value={`GMD ${finalData.laborBag}`}/>
              <FlexData label='Total Bags' value={`${finalData.totalBags} bags`}/>
              <FlexData label='Total Weight' value={`${finalData.totalweight} tons`}/>
              <div style={{padding:'6px 0'}} />
              <FlexData label='Transportation' value={`GMD ${finalData.transportation}`}/>
              <FlexData label='Total Custom' value={`GMD ${finalData.totalCustom}`}/>
              <FlexData label='Total Labor' value={`GMD ${finalData.totalLabor}`}/>
              <FlexData label='Extra Cost / Good' value={`GMD ${finalData.extraCostperGood}`}/>
            {/* </Wrapper> */}
          </Grid>
          {/* <Grid item xs={12} sm={6} md={6}> */}
            {/* <Wrapper> */}
              {/* <FlexData label='Transportation' value={`GMD ${finalData.transportation}`}/>
              <FlexData label='Total Custom' value={`GMD ${finalData.totalCustom}`}/>
              <FlexData label='Total Labor' value={`GMD ${finalData.totalLabor}`}/>
              <FlexData label='Extra Cost / Good' value={`GMD ${finalData.extraCostperGood}`}/> */}
            {/* </Wrapper> */}
          {/* </Grid> */}
          <Grid item xs={12} sm={4} md={4}>
            <Wrapper>
              <Typography variant='body2' color='textSecondary'>Total Cost of Goods</Typography>
              <Typography variant='body1'>{`GMD ${finalData.totalCostGoods}`}</Typography>
            </Wrapper>
          {/* </Grid>
          <Grid item xs={12} sm={4} md={4}> */}
            <Wrapper>
              <Typography variant='body2' color='textSecondary'>Total Extra Cost</Typography>
              <Typography variant='body1'>{`GMD ${finalData.totalExtaCost}`}</Typography>
            </Wrapper>
          {/* </Grid>
          <Grid item xs={12} sm={4} md={4}> */}
            <Wrapper>
              <Typography variant='body2' color='textSecondary'>Overall Total Cost</Typography>
              <Typography variant='body1'>{`GMD ${finalData.overallTotalCost}`}</Typography>
            </Wrapper>
          </Grid>
        </Grid>
        
      </DialogContent>
      {loading && <LinearProgress />}
      <DialogActions>
        <Button 
          onClick={handleClose}  
          color='inherit'
          disabled={loading}
        >
          Cancel and Edit
        </Button>
        <Button
          size='large'
          onClick={handleConfirm}  
          variant='contained'
          disabled={loading}
          // disableElevation
        >
          Save {edit ? 'Changes' : "Data"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;

const FlexData = ({label,value}) => {
  return(
     <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'4px'}}>
      <Typography variant='body2' color='textSecondary'>{label}</Typography>
      <Typography variant='body2' style={{marginLeft:'6px'}}>{value}</Typography>
    </div>
  )
}

const Wrapper = ({children}) => {
  return (
    <Box 
      sx={{
        px:1, py:.9, mb:1,
        borderRadius: '5px',
        border: '1px solid',
        borderColor: 'divider'
        // boxShadow: '2px 2px 8px -1px rgba(0,0,0,0.1)',
        // bgcolor: 'divider',
      }}
    >
    {children}
    </Box>
  )
}
