import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';


function Login(props) {
  const { 
    loginWithPassWord,
    loading,
    error
  } = props.auth

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = prop => event => {
    setFormValues({ ...formValues, [prop]: event.target.value});
  };
  const handleSubmit = e => {
		e.preventDefault()
    loginWithPassWord(formValues)
  };

  return (
    <Box >
      <Grid container spacing={2} flexDirection='row-reverse'>
        <Grid item xs={12} md={6}>
          <Box p={2} sx={{minHeight: '100vh', display:'flex', alignItems:'center', justifyContent: 'center'}}>
            <Box sx={{width: '100%', maxWidth: '400px'}}>
              <Box pb={5}>
                <Typography variant='h4'>Salam Aunty</Typography>
                <Typography color='textSecondary' variant='body1'>Please login to continue</Typography>
              </Box>
              <Typography align='center' color='error' variant='body2'>{error.loginError}</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  // className={classes.textField}
                  variant="standard"
                  margin='normal'
                  required
                  error = {!(error.loginError === undefined)}
                  // helperText={errors.email}
                  onChange={handleInputChange("email")}
                  value={formValues.email}
                  fullWidth
                  label="Email Address"
                  name="email"
                  type='email'
                  autoFocus
                />
                <TextField
                  // className={classes.textField}
                  variant="standard"
                  margin='normal'
                  required
                  error = {!(error.loginError === undefined)}
                  // helperText={errors.email}
                  onChange={handleInputChange("password")}
                  value={formValues.password}
                  fullWidth
                  label="Password"
                  name="password"
                  type='password'
                  autoFocus
                />
                <Typography variant='body2' >
                  <span> <Link href='/forgot-password'><a style={{color: '#27BFD3', textDecoration: 'none'}} >Forgot password</a></Link></span>
                </Typography>
                <Box pt={4} pb={2}>
                  <Button
                    size='large'
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{color:'white'}}
                    disabled={loading}
                  >
                    Login
                  </Button>
                  {loading && <LinearProgress />}
                </Box>
              </form>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{background: '#27BFD3', height:'100%',display:'flex', alignItems:'center', justifyContent: 'center', color:'white' }}>
            <Box>
              <div style={{width:'220px', margin:'0 auto 16px'}}>
              <Image 
                priority
                src={ "/njien_logo_white.png"}
                alt="Njien poultry logo"
                width={994}
                height={498}
              />
              </div>
              <Typography variant='h5'>Consignment Data Management</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login;