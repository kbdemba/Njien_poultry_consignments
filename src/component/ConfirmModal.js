import React  from 'react';
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

function ConfirmModal(props) {
  const {
    open,
    handleClose,
    handleConfirm,
    message,
    name
  } = props

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="confirm-dialog"
      open={open}
      fullWidth={true}
      maxWidth='xs'
    >
      <DialogTitle id="confirm-dialog">
        Remove item?
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
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClose}  
          color='inherit'
        >
          No, Cancel
        </Button>
        <Button 
          color='error'
          onClick={handleConfirm}  
          variant='contained'
          disableElevation
        >
          Delete {name || 'item'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;
