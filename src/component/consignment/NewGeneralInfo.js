import React, { useState }  from 'react'
import { isValid } from 'date-fns'
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import TimePicker from '@mui/lab/TimePicker';
// import DateTimePicker from '@mui/lab/DateTimePicker';
import DatePicker from '@mui/lab/DatePicker';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function NewGeneralInfo({values, setValues, errors={}, setErrors, remarks, setRemarks}) {

  const [showRemarks, setShowRemarks] = useState(false);

  const toggleShowNote = ()=> {
    setShowRemarks(!showRemarks)
  }
  const handleNameChange = event => {
    if(event.target.value < 1) {
      setErrors ({...errors, name: 'Consignment Name is required' })
    }else if(errors.name !== undefined){
      setErrors ({...errors, name: undefined })
    }
    
    setValues({ ...values, name: event.target.value});
  };

  const handleDateChange = (newValue) => {
    setValues({ ...values, date: newValue});
    // TODO: How to make date just the date without the time or always time at 12 GMT OR user selects the time
  };

  const handleInputNumberChange = event => {
    let value = Number(event.target.value)
    
    if(typeof value !== 'number') setErrors ({...errors, [event.target.name]: 'Field should be a number'}) //{errors[event.target.name] = 'Field should be a number';}
    else if(value < 0) setErrors ({...errors, [event.target.name]: 'Cannot be a negative number'})//{errors[event.target.name] = 'Cannot be a negative number';}
    else if (errors[event.target.name] !== undefined){
      setErrors ({...errors,[event.target.name]: undefined })
    }

    setValues({ ...values, [event.target.name]: value});
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box py={2} px={1}
        sx={{
          borderRadius: '5px',
          boxShadow: '2px 2px 8px -1px rgba(0,0,0,0.1)',
          transition: 'box-shadow .3s ease-out',
          bgcolor: 'background.paper',
        }}
      >
        <Grid container >
          <Grid item xs={12} sm={6} md={9} sx={{px:2,py:1.25 }}>
            <TextField
              error = {!(errors.name === undefined)}
              helperText={errors.name}
              onChange={handleNameChange}
              value={values.name}
              fullWidth
              label="Consignment Name"
              name="name"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{px:2,py:1.25 }}>
            <DatePicker
              label="Date"
              // clearable
              // cancelText="Cancel"
              // showTodayButton
              // mask=''
              error = {!(errors.date === undefined)}
              helperText={errors.date}
              disableMaskedInput
              inputFormat="MMM do, yyyy"
              value={values.date} //'Jan 01 2022'//
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth/>}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{px:2,py:1.25 }}>
            <TextField
              error = {!(errors.conversion === undefined)}
              helperText={errors.conversion}
              onChange={handleInputNumberChange}
              value={values.conversion}
              fullWidth
              label="Conversion Rate"
              name="conversion"
              type='number'
              InputProps={{
                inputProps: {min: 0},
                startAdornment: <InputAdornment position="start">GMD</InputAdornment>,
                endAdornment: <InputAdornment position="end">/5000 CFA</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{px:2,py:1.25 }}>
            <TextField
              error = {!(errors.customPayBag === undefined)}
              helperText={errors.customPayBag}
              onChange={handleInputNumberChange}
              value={values.customPayBag}
              fullWidth
              label="Custom"
              name="customPayBag"
              type='number'
              InputProps={{
                inputProps: {min: 0},
                startAdornment: <InputAdornment position="start">GMD</InputAdornment>,
                endAdornment: <InputAdornment position="end">/Bag</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{px:2,py:1.25 }}>
            <TextField
              error = {!(errors.laborBag === undefined)}
              helperText={errors.laborBag}
              onChange={handleInputNumberChange}
              value={values.laborBag}
              fullWidth
              label="Labor"
              name="laborBag"
              type='number'
              InputProps={{
                inputProps: {min: 0},
                startAdornment: <InputAdornment position="start">GMD</InputAdornment>,
                endAdornment: <InputAdornment position="end">/Bag</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{px:2,py:1.25 }}>
            <TextField
              error = {!(errors.transportation === undefined)}
              helperText={errors.transportation}
              onChange={handleInputNumberChange}
              value={values.transportation}
              fullWidth
              label="Transportation"
              name="transportation"
              type='number'
              InputProps={{
                inputProps: {min: 0},
                startAdornment: <InputAdornment position="start">GMD</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
        {(!showRemarks && !remarks) && <Button 
          onClick={toggleShowNote}
          sx={{ml:1, mt:.5}}
        >
          Add Remarks
        </Button>}
        {(showRemarks || remarks) && <div style={{padding:'2px 16px'}}>
          <TextField
            margin='dense'
            error = {!(errors.remarks === undefined)}
            helperText={errors.remarks}
            onChange={(e)=>{setRemarks(e.target.value)}}
            value={remarks}
            fullWidth
            multiline
            minRows={2}
            label="Consignment Remarks"
            name="remarks"
            placeholder='Write a note that you want to remember about this consignment'
          />
        
        </div>}

      </Box>
    </LocalizationProvider>
  )
}

export default NewGeneralInfo;

// TODO: Stop the lagging when typing in inputs