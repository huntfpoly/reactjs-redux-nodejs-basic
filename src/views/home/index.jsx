import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import React from 'react';
function index() {
  return (
    <React.Fragment>
      <Grid>
        <Card sx={{ maxWidth: '100%' }}>
          <CardActionArea>
            <CardMedia
              sx={{ height: 500 }}
              image="https://images.unsplash.com/photo-1621184315241-2f8eebaaa6a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              title="Contemplative Reptile"
            />
          </CardActionArea>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

export default index;
