import React, { useState, useEffect }  from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

import { validateAddItem } from '../../utility/validation';
import { to2decimal, convert } from '../../utility/helpers';


function NewItemModal(props) {
  const {
    open,
    handleClose,
    conversion,
    setItems,
    items,
    setSnackSettings,
    editing
  } = props

  const [errors, setErrors] = useState({});
  const [name, setFeed] = useState('');
  const [numberOfBags, setNoBags] = useState(1);
  const [weight, setWeight] = useState(0);
  const [unitCostGMD, setUnitCostGMD] = useState(0);
  const [totalCostGMD, setTotalCostGMD] = useState(0);
  const [unitCostCFA, setUnitCostCFA] = useState(0);
  const [totalCostCFA, setTotalCostCFA] = useState(0);

  // useEffect when open changes
  // fill the data with the item index
  useEffect(() => {
    if(editing){
      let editingData = items.filter(item => item.name===editing)[0]
      setFeed(editingData.name)
      setNoBags(editingData.numberOfBags)
      setWeight(editingData.weight)
      setUnitCostGMD(editingData.unitCostGMD)
      setTotalCostGMD(editingData.totalCostGMD)
      setUnitCostCFA(editingData.unitCostCFA)
      setTotalCostCFA(editingData.totalCostCFA)
    }else if (name) reset()
  }, [open])
  

  const handleSetFeed = e => {
    setFeed(e.target.value);
  };
  const handleSetBags = e => {
    let value = Number(e.target.value)
    setNoBags(value);
    reCalculate(unitCostGMD, unitCostCFA, value)
  };
  const handleSetWeight = e => {
    setWeight(Number(e.target.value));
  };

  const handleCalc = e => {
    if(e.target.name==='unitCostGMD'){
      let GMD = Number(e.target.value);
      let CFA = convert(GMD, conversion, 'CFA');
      reCalculate(GMD, CFA,numberOfBags)
    }
    if(e.target.name==='unitCostCFA'){
      let CFA = Number(e.target.value);
      let GMD = convert(CFA, conversion, 'GMD');
      reCalculate(GMD, CFA,numberOfBags);
    }
    if(e.target.name==='totalCostGMD'){
      let GMD = Number(e.target.value) / numberOfBags; //TODO: 2 DECIMAL PLACES
      let CFA = convert(GMD, conversion, 'CFA');
      reCalculate(GMD, CFA,numberOfBags);
    }
    if(e.target.name==='totalCostCFA'){
      let CFA = Number(e.target.value) / numberOfBags; //TODO: 2 DECIMAL PLACES
      let GMD = convert(CFA, conversion, 'GMD');
      reCalculate(GMD, CFA,numberOfBags);
    }
  };

  const saveItem = e => {

    let data = {name,numberOfBags,weight,unitCostGMD,totalCostGMD,unitCostCFA,totalCostCFA}
    setErrors({})

    const { errors } = validateAddItem(data, items, editing)
    
    if(errors){
      setErrors(errors)
      return
    }

    if(editing){
      const newItems = items.map(item=> {
        if(item.name === editing) return data;
        return item
      })
      setItems(newItems)
    }else{
      setItems(items=>([
        ...items,
        data
      ]))
    }
    
    reset()
    handleClose()
    setSnackSettings({open: true, type:'success', message:`Successfully ${editing ? 'edited' : 'added'} item`})
  }

  const reset = () => {
    setFeed('')
    setNoBags(1)
    setWeight(0)
    setUnitCostGMD(0)
    setTotalCostGMD(0)
    setUnitCostCFA(0)
    setTotalCostCFA(0)
    setErrors({})
  }

  const reCalculate = (GMD, CFA, numberOfBags)=>{
    setUnitCostCFA( to2decimal( CFA ) ) 
    setTotalCostCFA( to2decimal( CFA * numberOfBags ) )
    setUnitCostGMD( to2decimal( GMD ) )
    setTotalCostGMD( to2decimal( GMD * numberOfBags ) )
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth='sm'
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add new Item
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

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} >
            <TextField
              id="outlined-select-feed"
              error = {!(errors.name === undefined)}
              helperText={errors.name}
              fullWidth
              select
              value={name}
              onChange={handleSetFeed}
              label="Feed Name"
              name="name"
            >
              {allFeeds.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

          </Grid>

          <Grid item xs={12} sm={6} >
            <TextField
              error = {!(errors.numberOfBags === undefined)}
              helperText={errors.numberOfBags}
              onChange={handleSetBags}
              value={numberOfBags}
              fullWidth
              label="Number of Bags"
              name="numberOfBags"
              type='number'
              InputProps={{
                inputProps: {min: 1},
                endAdornment: <InputAdornment position="end">bags</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} >
            <TextField
              error = {!(errors.weight === undefined)}
              helperText={errors.weight}
              onChange={handleSetWeight}
              value={weight}
              fullWidth
              label="Weight (tons)"
              name="weight"
              type='number'
              InputProps={{
                inputProps: {min: 0},
                endAdornment: <InputAdornment position="end">tons</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} >
            <TextField
              error = {!(errors.unitCostGMD === undefined)}
              helperText={errors.unitCostGMD}
              onChange={handleCalc}
              value={unitCostGMD}
              fullWidth
              label="Unit Cost GMD"
              name="unitCostGMD"
              type='number'
              InputProps={{
                inputProps: {min: 0},
                startAdornment: <InputAdornment sx={{mt:.1}} position="start">GMD</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField
              error = {!(errors.totalCostGMD === undefined)}
              helperText={errors.totalCostGMD}
              onChange={handleCalc}
              value={totalCostGMD}
              fullWidth
              label="Total Cost GMD"
              name="totalCostGMD"
              type='number'
              InputProps={{
                inputProps: {min: 0},
                startAdornment: <InputAdornment sx={{mt:.1}} position="start">GMD</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} >
            <TextField
              error = {!(errors.unitCostCFA === undefined)}
              helperText={errors.unitCostCFA}
              onChange={handleCalc}
              value={unitCostCFA}
              fullWidth
              label="Unit Cost CFA"
              name="unitCostCFA"
              type='number'
              InputProps={{
                inputProps: {min: 0},
                startAdornment: <InputAdornment sx={{mt:.1}} position="start">CFA</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField
              error = {!(errors.totalCostCFA === undefined)}
              helperText={errors.totalCostCFA}
              onChange={handleCalc}
              value={totalCostCFA}
              fullWidth
              label="Total Cost CFA"
              name="totalCostCFA"
              type='number'
              InputProps={{
                inputProps: {min: 0},
                startAdornment: <InputAdornment sx={{mt:.1}} position="start">CFA</InputAdornment>,
              }}
            />
          </Grid>

        </Grid>


      </DialogContent>
      <DialogActions>
        
        <Button 
          onClick={reset}  
          color='inherit'
          disableElevation
        >
          Reset Values
        </Button>
        <div style={{flex:1}}></div>
        <Button 
          onClick={handleClose}  
          color='inherit'
          disableElevation
        >
          cancel
        </Button>
        <Button 
          onClick={saveItem}  
          variant='contained'
          disableElevation
          >
            Save {editing ? 'Changes' : "Item"}
          </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewItemModal;


const allFeeds = [
  {value: '', label: 'Select Feed'},
  {value: 'Tenor Ladoum', label: 'Tenor Ladoum'},
  {value: 'Super Ladoum', label: 'Super Ladoum'},
  {value: 'Mix Energie', label: 'Mix Energie'},
  {value: 'Ferlo', label: 'Ferlo'},
  {value: 'Khonte big', label: 'Khonte big'},
  {value: 'Khonte small', label: 'Khonte small'},
  {value: 'Mboteh', label: 'Mboteh'},
  {value: 'Starter (1st age)', label: 'Starter (1st age)'},
  {value: 'Grower (2nd age)', label: 'Grower (2nd age)'},
  {value: 'Layer Mash (Ponduse)', label: 'Layer Mash (Ponduse)'},
  {value: 'Demarrage', label: 'Demarrage'},
  {value: 'Croissance', label: 'Croissance'},
  {value: 'Finition', label: 'Finition'},
];