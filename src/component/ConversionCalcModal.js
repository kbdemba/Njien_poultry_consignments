import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';

import {convert, to2decimal} from '../utility/helpers';

function LogoutModal(props) {
  const {
    open,
    handleClose,
  } = props

  const [conversion, setConversion] = useState(450);
  const [gmd, setGMD] = useState(0);
  const [cfa, setCFA] = useState(0);
  const [errors, setErrors] = useState({});

  const handleInputNumberChange = e => {
    let GMD, CFA;

    if(e.target.name==='gmd'){
      GMD = Number(e.target.value);
      CFA = convert(GMD, conversion, 'CFA');
      // setValues({gmd,cfa,conversion})
    }
    if(e.target.name==='cfa'){
      CFA = Number(e.target.value);
      GMD = convert(CFA, conversion, 'GMD');
      // setValues({gmd,cfa,conversion})
    }
    if(e.target.name==='conversion'){
      if(e.target.value < 1) {
        return
      }
      CFA = cfa;
      GMD = convert(cfa, conversion, 'GMD');
      setConversion(Number(e.target.value))
    }
    console.log(CFA, GMD)
    setGMD(to2decimal( GMD ))
    setCFA(to2decimal( CFA ))
    // if(typeof value !== 'number') setErrors ({...errors, [event.target.name]: 'Field should be a number'}) //{errors[event.target.name] = 'Field should be a number';}
    // else if(value < 0) setErrors ({...errors, [event.target.name]: 'Cannot be a negative number'})//{errors[event.target.name] = 'Cannot be a negative number';}
    // else if (errors[event.target.name] !== undefined){
    //   setErrors ({...errors,[event.target.name]: undefined })
    // }
    // setValues({ ...values, [event.target.name]: value});


  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="convertion-rate-calculator"
      open={open}
      fullWidth={true}
      maxWidth='xs'
    >
      <DialogTitle id="convertion-rate-calculator">
        Conversion Rate Calculator
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
      </DialogTitle>
        
      <DialogContent >
        {/* <div style={{margin:'px'}}></div> */}
        <TextField
          margin='normal'
          error = {!(errors.conversion === undefined)}
          helperText={errors.conversion}
          onChange={handleInputNumberChange}
          value={conversion}
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
        <div style={{display:'flex', gap:'16px', margin:'16px 0 24px'}}>
        <TextField
          margin='normal'
          error = {!(errors.cfa === undefined)}
          helperText={errors.cfa}
          onChange={handleInputNumberChange}
          value={cfa}
          fullWidth
          label="CFA"
          name="cfa"
          type='number'
          InputProps={{
            inputProps: {min: 0},
            startAdornment: <InputAdornment position="start">CFA</InputAdornment>,
          }}
        />
        <TextField
          margin='normal'
          error = {!(errors.gmd === undefined)}
          helperText={errors.gmd}
          onChange={handleInputNumberChange}
          value={gmd}
          fullWidth
          label="GMD (Dalasis)"
          name="gmd"
          type='number'
          InputProps={{
            inputProps: {min: 0},
            startAdornment: <InputAdornment position="start">GMD</InputAdornment>,
          }}
        />
        </div>
      
      
      </DialogContent>
      
      
      
      {/* <DialogActions>
        <Button 
          onClick={handleClose}  
          color='inherit'
        >
          No, Cancel
        </Button>
        <Button
          onClick={handleConfirm}  
          variant='contained'
          disableElevation
        >
          Yes, Logout
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}

export default LogoutModal;
