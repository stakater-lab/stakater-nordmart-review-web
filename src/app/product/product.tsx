import React, {useMemo, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, styled, Typography} from "@material-ui/core";
import {ProductDTO} from "./ProductDTO";
import {useHistory} from "react-router";
import {ExpandMore} from "@material-ui/icons";
import {grey} from "@material-ui/core/colors";
import {useAPI} from "../shared/hooks/useAPI";
import {addReviewAPI, getReviewAPI} from "../review/review.service";
import {Rating} from "@material-ui/lab";
import {IReviewPayload, ReviewForm} from "./review-form";
import {Similar} from "../typings";
import {FormApi} from "final-form";

interface IProductProps {
  product: ProductDTO;
  showReviews?: boolean;
}

export const Product = ({product, showReviews}: IProductProps) => {
  const history = useHistory();
  const [reload, setReload] = useState<any>();
  const $reviews = useMemo(() => getReviewAPI(product.itemId), [product, reload]);
  const [reviews] = useAPI($reviews, []);

  const viewReview = () => {
    if (showReviews) {
      history.push(`/reviews`)
    } else {
      history.push(`/reviews/${product.itemId}`)
    }
  }

  const addReview = (payload: Similar<IReviewPayload>, form: FormApi) => {
    addReviewAPI({
      productId: product.itemId,
      ...payload
    } as any).subscribe(() => {
      form.reset();
      setReload({});
    });
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Box bgcolor="white">
          <img style={{
            width: "100%",
            height: "auto",
            maxHeight: 250,
            objectFit: "scale-down"
          }} src={product.image}/>
        </Box>
      </Grid>
      <Grid container item xs={12} md={8} key={product.itemId}>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="column" height="100%">
            <Typography variant="h6" gutterBottom>
              {product.name}
            </Typography>

            <Typography gutterBottom>
              {product.description}
            </Typography>

            <Box marginTop="auto">
              <Review expanded={showReviews}>
                <AccordionSummary
                  expandIcon={<ExpandMore/>}
                  onClick={viewReview}
                >
                  <Typography>Reviews</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Grid container>
                    <Grid item xs={12}>
                      {reviews.map(review => (
                        <Box key={review.id} paddingX={2} paddingY={1}>
                          <Box display="flex" justifyContent="space-between">
                            <Typography>
                              <b>{review.customerName}</b>
                            </Typography>

                            <Rating size="small" value={review.rating} readOnly/>
                          </Box>
                          <Typography>
                            {review.reviewText}
                          </Typography>
                        </Box>
                      ))}
                    </Grid>

                    <Grid item xs={12}>
                      <Box padding={2}>
                        <Divider/>
                        <br/>
                        <Typography gutterBottom>
                          <b>Add your review</b>
                        </Typography>

                        <ReviewForm onSubmit={addReview}/>
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Review>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Review = styled(Accordion)({
  backgroundColor: grey[100]
});
