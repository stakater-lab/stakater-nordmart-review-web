import React, {useMemo} from 'react';
import {useRouteMatch} from "react-router";
import {Box, Container, Typography} from "@material-ui/core";
import {PRODUCTS} from "../product/ProductDTO";
import {Product} from "../product/product";
import {getSecretAPI} from "./review.service";
import {useAPI} from "../shared/hooks/useAPI";

export const Reviews = () => {
  const {params: {id}} = useRouteMatch<{ id: string }>();
  const $secrets = useMemo(() => getSecretAPI(), []);
  const [secrets] = useAPI($secrets, []);

  return (
    <Container maxWidth="lg">
      <Box paddingTop={10}>
        <Typography color={secrets?.PAGE_TITLE ? "secondary" : "primary"}
                    variant="h4">{secrets.PAGE_TITLE || "Review"}
        </Typography>
      </Box>

      <Box paddingY={10}>
        {PRODUCTS.map(p => (<Product key={p.itemId} product={p} showReviews={p.itemId === id}/>))}
      </Box>
    </Container>
  );
};
