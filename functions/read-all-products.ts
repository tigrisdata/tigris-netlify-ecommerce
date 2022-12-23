import { Handler } from "@netlify/functions";
import { Product } from "../db/models/product";
import tigrisDb from '../lib/tigris'


const handler: Handler = async (event, context) => {
    const collection = tigrisDb.getCollection<Product>(Product);

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
