import React from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import {Field, Form, FormProps} from "react-final-form";

export interface IReviewPayload {
  productId: string;
  customerName: string;
  rating: number;
  text: string;
}


export const ReviewForm = (props: FormProps) => {
  return (
    <Form {...props}>
      {({handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Field name="customerName">
                {({input}) => (
                  <TextField fullWidth variant="outlined" margin={"dense"} label="Your name" {...input}/>
                )}
              </Field>
            </Grid>

            <Grid item xs={6}>
              <Field name="rating">
                {({input}) => (
                  <TextField fullWidth variant="outlined" margin={"dense"} label="Rating" type="number"
                             inputProps={{min: 0, max: 5}} {...input}/>
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field name="text">
                {({input}) => (
                  <TextField fullWidth multiline rows={5} variant="outlined" margin={"dense"}
                             label="Your review" {...input}/>
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Button variant={"contained"} color="primary" type="submit">Submit review</Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
};
