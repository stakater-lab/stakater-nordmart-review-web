import React from 'react';
import {useRouteMatch} from "react-router";
import {Box, Container, Typography} from "@material-ui/core";
import {PRODUCTS} from "../product/ProductDTO";
import {Product} from "../product/product";

export const Reviews = () => {
  const {params: {id}} = useRouteMatch<{ id: string }>();

  return (
    <Container maxWidth="lg">
      <Box paddingTop={10}>
        <Typography color="primary" variant="h4">Review UI</Typography>
      </Box>

      <Box paddingY={10}>
        {PRODUCTS.map(p => (<Product key={p.itemId} product={p} showReviews={p.itemId === id}/>))}
      </Box>
    </Container>
  );
};
