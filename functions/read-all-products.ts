import "reflect-metadata";
import { Handler } from "@netlify/functions";
import { Tigris } from "@tigrisdata/core";
import { Product, PRODUCTS_COLLECTION_NAME } from '../db/models/product'

const tigrisClient = new Tigris();
const tigrisDb = tigrisClient.getDatabase();

const handler: Handler = async (event, context) => {
    const collection = tigrisDb.getCollection<Product>(PRODUCTS_COLLECTION_NAME);

    try {
        const productCursor = collection.findMany();
        const products = await productCursor.toArray();
        return {
            statusCode: 200,
            body: JSON.stringify(products)
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                status: err
            })
        }
    }
};

export {handler};
