import { Tigris } from '@tigrisdata/core';
import data from '../static/storedata.json';
import { Product } from '../db/models/product';

async function main() {
  // setup client
  const tigrisClient = new Tigris();
  // ensure branch exists, create it if it needs to be created dynamically
  await tigrisClient.getDatabase().initializeBranch();
  // register schemas
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
