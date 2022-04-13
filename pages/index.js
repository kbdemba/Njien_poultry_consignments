import Head from 'next/head'
import Footer from '../src/component/Footer'
import Dashboard from '../src/component/dashboard'
import AppBar from '../src/component/header/AppBar'
import Container from '@mui/material/Container'

import { withProtected } from '../src/hooks/route';

function Home() {
  return (
    <div>
      <Head>
        <title>Njien Poultry</title>
        <meta name="description" content="Njien Poultry Data management" />
      </Head>
      <AppBar />
      <main>
        <Container sx={{minHeight:'80vh'}}>
          <Dashboard />
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default withProtected(Home)