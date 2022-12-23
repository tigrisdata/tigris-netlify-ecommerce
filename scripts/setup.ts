import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import { Tigris } from '@tigrisdata/core';
import data from '../static/storedata.json';
import { Product } from '../db/models/product';

async function main() {
  // setup client & register schemas
  const tigrisClient = new Tigris();
  await tigrisClient.registerSchemas([Product]);

  // load some data in products collection
  const products = tigrisClient.getDatabase().getCollection(Product);
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
