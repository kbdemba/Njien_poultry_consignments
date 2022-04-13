import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LinearProgress from '@mui/material/LinearProgress';
import Head from 'next/head'
import Container from '@mui/material/Container'

import Footer from '../../src/component/Footer'
import AppBar from '../../src/component/header/AppBar'
import Snack from '../../src/component/Snack';
import Detail from '../../src/component/consignment/Detail'
import ConfirmModal from '../../src/component/ConfirmModal';
import { withProtected } from '../../src/hooks/route';
import { getConsignmentDetail, deleteConsignment } from '../../src/config/firestore';
import Error from '../../src/component/Error';

function ConsignmentDetail(props) {

  const router = useRouter();
  const { id, routerSnackMsg  } = router.query;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [snackSettings, setSnackSettings] = useState({open: false});
  const [condirmData, setConfirmData] = useState({open: false });

  useEffect(() => {
    if(routerSnackMsg){
      setSnackSettings({open: true, type:'success', message:routerSnackMsg}) 
    }
		fetchConsignment()
	}, []);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } 
    setSnackSettings({open: false});
  };
  const handleOpenConfirm = () => {
    const confirmData = {
      name: 'Consignment',
      open: true, 
      message: `Do you want to parmanently delete the consignment "${data.name}"?`,
    }
    setConfirmData(confirmData);
  };
  const handleCloseConfirm = () => {
    setConfirmData({open: false});
  };

  const handleDeleteConsignment = async () => {
    setLoading(true)
    const {data, error} = await deleteConsignment(id)
    if(error){ 
      setSnackSettings({open: true, type:'error', message:'Error Deleting data'})
    }
    else{
      handleCloseConfirm()
      setSnackSettings({open: true, type:'success', message:'Successfully deleted consignment'})
      router.push('/')
    }
    setLoading(false)
  }

  const fetchConsignment = async () => {
    setLoading(true)
    const {data, error} = await getConsignmentDetail(id)
    if(error){ 
      setError(error)
    }
    else{
      setData(data)
    }
    setLoading(false)
  }

  return (
    <div>
      <Head>
        <title>Consignment Detail | Njien Poultry</title>
        <meta name="description" content="View details of consignment" />
      </Head>
      <AppBar />

      <main>
        <Snack 
          handleOnClose={handleCloseSnack}
          snackSettings={snackSettings}
        />
        <Container sx={{minHeight:'80vh'}}>
          {loading ? <div> <LinearProgress /></div>
          : error ? <Error message={error} backLink='/'/>
          : <Detail data={{...data,id}} deleteCons={handleOpenConfirm}/>
          }
        </Container>
        <ConfirmModal 
          open={condirmData.open}
          handleClose={handleCloseConfirm}
          handleConfirm={handleDeleteConsignment}
          message={condirmData.message}
          name={condirmData.name}
        />
      </main>
      <Footer />
    </div>
  )
}

export default withProtected(ConsignmentDetail)


// TODO: Delete Modal
// submit
// Loading state
// then sucess or Fail
// If success, show check sign and action to go to where user is supposed to go