import {jsonProperty} from "../shared/decorators/json-property";

const unEscape = (v?: string) => v?.replace("+", " ");
export class ReviewDTO {
  @jsonProperty()
  id: string;

  @jsonProperty({
    deserializer: unEscape
  })
  customerName: string;

  @jsonProperty()
  rating: number;

  @jsonProperty({
    deserializer: unEscape
  })
  reviewText: string;

  @jsonProperty()
  dateTime: Date;
}
