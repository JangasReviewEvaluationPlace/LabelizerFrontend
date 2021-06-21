import React from 'react';

import Nav from './nav.jsx';
import Footer from './footer.jsx';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';


export default function Base(props){
  return (
    <>
      <CssBaseline />
      <Nav />
      <main style={{marginTop: '80px'}}>
        <Container>
          {props.children}
        </Container>
      </main>
      <Footer />
    </>
  )
}