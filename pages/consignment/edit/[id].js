import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LinearProgress from '@mui/material/LinearProgress';
import Head from 'next/head'
import Container from '@mui/material/Container'

import Footer from '../../../src/component/Footer'
import AppBar from '../../../src/component/header/AppBar'
import New from '../../../src/component/consignment/New';
import { withProtected } from '../../../src/hooks/route';
import { getConsignmentDetail } from '../../../src/config/firestore';
import Error from '../../../src/component/Error';


function EditConsignment(props) {
  
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
		fetchConsignment()
	}, []);

  const fetchConsignment = async () => {
    setLoading(true)
    const {data, error} = await getConsignmentDetail(id)
    if(error){ setError(error)}
    else{
      setData(data)
    }
    setLoading(false)
  }

  return (
    <div>
      <Head>
        <title>Edit Consignment | Njien Poultry</title>
        <meta name="description" content="Edit details of consignment" />
      </Head> 
      <AppBar />
      <main>
        <Container sx={{minHeight:'80vh'}}>
          {loading ? <div> <LinearProgress /></div>
          : error ? <Error message={error} backLink='/'/>
          : <New initData={{...data,id}} edit={true}/>
          }
        </Container>
      </main>
      <Footer /> 
    </div>
  )
}

export default withProtected(EditConsignment)