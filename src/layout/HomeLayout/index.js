import React from 'react';
import { AppBar, Box, Container, Divider, Toolbar, useMediaQuery } from '@material-ui/core';
import Header from '../HomeLayout/Header';

function HomeLayout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <Divider />

      <Container sx={{ mt: 5 }}>
        <Box>{children}</Box>
      </Container>
    </React.Fragment>
  );
}

export default HomeLayout;
