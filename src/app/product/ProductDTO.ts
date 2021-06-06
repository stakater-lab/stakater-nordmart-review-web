import {ReviewDTO} from "../review/ReviewDTO";
import {jsonProperty} from "../shared/decorators/json-property";
import img1 from "../../assets/img/products/Solid Performance Polo.jpg";
import img2 from "../../assets/img/products/16 oz. Vortex Tumbler.jpg";
import img3 from "../../assets/img/products/Forge Laptop Sticker.jpg";
import img4 from "../../assets/img/products/Lytro Camera.jpg";
import img5 from "../../assets/img/products/Oculus Rift.jpg";
import img6 from "../../assets/img/products/Ogio Caliber Polo.jpg";
import img7 from "../../assets/img/products/Pebble Smart Watch.jpg";
import {deserialize} from "../shared/decorators/property-mapper";

export const IMAGE_MAP: any = {
  "165613": img1,
  "165954": img2,
  "329199": img3,
  "444436": img4,
  "444435": img5,
  "165614": img6,
  "444434": img7
}

export class ProductDTO {
  @jsonProperty()
  itemId: string;

  @jsonProperty()
  name: string;

  @jsonProperty()
  description: string;

  @jsonProperty()
  price: number;

  get image() {
    return IMAGE_MAP[this.itemId];
  }

  reviews: ReviewDTO[];
}

export const PRODUCTS = [{
  "itemId": "329199",
  "name": "Forge Laptop Sticker",
  "description": "JBoss Community Forge Project Sticker",
  "price": 8.5
}, {
  "itemId": "165613",
  "name": "Solid Performance Polo",
  "description": "Moisture-wicking, antimicrobial 100% polyester design wicks for life of garment. No-curl, rib-knit collar...",
  "price": 17.8
}, {
  "itemId": "165614",
  "name": "Ogio Caliber Polo",
  "description": "Moisture-wicking 100% polyester. Rib-knit collar and cuffs; Ogio jacquard tape insitem_ide neck; bar-tacked three-button placket with...",
  "price": 28.75
}, {
  "itemId": "165954",
  "name": "16 oz. Vortex Tumbler",
  "description": "Double-wall insulated, BPA-free, acrylic cup. Push-on litem_id with thumb-slitem_ide closure; for hot and cold beverages. Holds 16 oz. Hand wash only. Imprint. Clear.",
  "price": 6.0
}, {
  "itemId": "444434",
  "name": "Pebble Smart Watch",
  "description": "Smart glasses and smart watches are perhaps two of the most exciting developments in recent years. ",
  "price": 24.0
}, {
  "itemId": "444435",
  "name": "Oculus Rift",
  "description": 'The world of gaming has a* Connection #0 to host localhost left intact also undergone some very unique and compelling tech advances in recent years. Virtual reality...',
  "price": 106.0
}, {
  "itemId": "444436",
  "name": "Lytro Camera",
  "description": "Consumers who want to up their photography game are looking at newfangled cameras like the Lytro Field camera, designed to ...",
  "price": 44.3
}].map(p => deserialize(ProductDTO, p));
