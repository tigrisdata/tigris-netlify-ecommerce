import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import { Tigris } from '@tigrisdata/core';
import data from '../static/storedata.json';
import {
  Product,
  PRODUCTS_COLLECTION_NAME,
  ProductSchema
} from '../db/models/product'

async function main() {
  // setup client & register schemas
  const tigrisClient = new Tigris();
  const tigrisDb = tigrisClient.getDatabase();
  await tigrisDb.createOrUpdateCollection(PRODUCTS_COLLECTION_NAME, ProductSchema);

  // load some data in products collection
  const products = tigrisDb.getCollection(PRODUCTS_COLLECTION_NAME);
  const inserted = await products.insertOrReplaceMany(data);
  console.log(`Inserted ${inserted.length} documents`);
}

main()
  .then(async () => {
    console.log("Setup complete ...");
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
