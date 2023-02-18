import {ReviewDTO} from "./ReviewDTO";
import {httpClient} from "../shared/services/client";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {deserialize} from "../shared/decorators/property-mapper";
import {Similar} from "../typings";
import {IReviewPayload} from "../product/review-form";

export const getReviewAPI = (productId: string): Observable<ReviewDTO[]> => {
  return httpClient.get("/api/review/{productId}", {params: {productId}})
    .pipe(map(res => res.response?.body?.map((r: Similar<ReviewDTO>) => deserialize(ReviewDTO, r))));
};

export const addReviewAPI = (review: IReviewPayload) => {
  return httpClient.post("/api/review/{productId}/{customerName}/{rating}/{text}", {}, {params: review as any});
};

export const getSecretAPI = (): Observable<any> => {
  return httpClient.get("/api/secrets")
    .pipe(map(res => res.response));
};
