import React from 'react'
import Head from 'next/head'
import Footer from '../../src/component/Footer'
import NewConsignmnet from '../../src/component/consignment/New'
import AppBar from '../../src/component/header/AppBar'
import Container from '@mui/material/Container'

import { withProtected } from '../../src/hooks/route';


function NewConsignmentHome() {
  return (
    <div>
      <Head>
        <title>New Consignment | Njien Poultry</title>
        <meta name="description" content="Create a new consignment" />
      </Head>
      <AppBar />
      <main>
        <Container sx={{minHeight:'80vh'}}>
          <NewConsignmnet />
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default withProtected(NewConsignmentHome)