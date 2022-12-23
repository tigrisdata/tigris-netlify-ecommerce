import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisCollectionType,
  TigrisDataTypes
} from '@tigrisdata/core'

@TigrisCollection("products")
 export class Product implements TigrisCollectionType {
    @PrimaryKey({order: 1})
    id: string;

    @Field()
    color: string;

    @Field()
    description: string;

    @Field()
    gender?: string;

    @Field()
    name: string;

    @Field()
    review: string;

    @Field()
    starrating: number;

    @Field()
    price: number;

    @Field({elements: TigrisDataTypes.STRING})
    sizes: string[];

    @Field()
    img: string;
 };
