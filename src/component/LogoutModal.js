import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography'


function LogoutModal(props) {
  const {
    open,
    handleClose,
    handleConfirm,
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
        Logout?
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
        <Typography> Are you sure you want to Logout?</Typography>
      </DialogContent>
      <DialogActions>
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
      </DialogActions>
    </Dialog>
  );
}

export default LogoutModal;
