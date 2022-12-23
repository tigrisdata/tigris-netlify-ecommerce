import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisCollectionType,
  TigrisDataTypes
} from '@tigrisdata/core'

@TigrisCollection("products")
 export class Product implements TigrisCollectionType {
    @PrimaryKey(TigrisDataTypes.STRING, {order: 1})
    id: string;

    @Field(TigrisDataTypes.STRING)
    color: string;

    @Field(TigrisDataTypes.STRING)
    description: string;

    @Field(TigrisDataTypes.STRING)
    gender?: string;

    @Field(TigrisDataTypes.STRING)
    name: string;

    @Field(TigrisDataTypes.STRING)
    review: string;

    @Field(TigrisDataTypes.NUMBER)
    starrating: number;

    @Field(TigrisDataTypes.NUMBER)
    price: number;

    @Field(TigrisDataTypes.ARRAY, {elements: TigrisDataTypes.STRING})
    sizes: string[];

    @Field(TigrisDataTypes.STRING)
    img: string;
 };
