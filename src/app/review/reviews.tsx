import React, {useEffect} from 'react';
import {useRouteMatch} from "react-router";
import {Box, Container, Typography} from "@material-ui/core";
import {PRODUCTS} from "../product/ProductDTO";
import {Product} from "../product/product";
import {useMatomo} from "@datapunt/matomo-tracker-react";

declare var VERSION: string;

export const Reviews = () => {
  const {params: {id}} = useRouteMatch<{ id: string }>();
  const {trackPageView} = useMatomo()

  // Track page view
  useEffect(() => {
    trackPageView({
      customDimensions: [
        {
          id: 1,
          value: `v${VERSION}`,
        },
      ],
    })
  }, []);

  return (
    <Container maxWidth="lg">
      <Box paddingTop={10}>
        <Typography color="primary" variant="h4">Review</Typography>
      </Box>

      <Box paddingY={10}>
        {PRODUCTS.map(p => (<Product key={p.itemId} product={p} showReviews={p.itemId === id}/>))}
      </Box>
    </Container>
  );
};
