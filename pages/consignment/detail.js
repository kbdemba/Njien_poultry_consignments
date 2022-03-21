import React from 'react'
import Footer from '../../src/component/Footer'
import Detail from '../../src/component/consignment/Detail'
import AppBar from '../../src/component/header/AppBar'
import Container from '@mui/material/Container'

function HomeLogin() {
  return (
    <div>

      <AppBar />
       <main>
        <Container sx={{minHeight:'80vh'}}>
        <Detail />
        </Container>
       </main>
      <Footer />
    </div>
  )
}

export default HomeLogin