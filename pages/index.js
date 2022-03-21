import Head from 'next/head'
import Image from 'next/image'
import Footer from '../src/component/Footer'
import Dashboard from '../src/component/dashboard'
import AppBar from '../src/component/header/AppBar'
import Container from '@mui/material/Container'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Njien Poultry</title>
        <meta name="description" content="Njien Poultry Data management" />
        <link rel="icon" href="/favicon.ico" />
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
