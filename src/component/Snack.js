import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Snack = props => {
  const {handleOnClose} = props
  const {
    open=false,
    type,
    message,
    autoHideDuration=5000,
    vertical='bottom',
    horizontal='center'
  } = props.snackSettings

  // TODO: Sliding the snack bar
  return( <>
			<Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleOnClose} anchorOrigin={{ vertical, horizontal }}>
				<MuiAlert onClose={handleOnClose} severity={type} elevation={6} variant="filled">
					{message}
				</MuiAlert>
			</Snackbar>
		</>)
}

export default Snack