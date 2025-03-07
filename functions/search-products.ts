import { Handler } from "@netlify/functions";
import { Product } from "../db/models/product";
import tigrisDb from '../lib/tigris'

const handler: Handler = async(event, context) => {
    const searchReq = JSON.parse(event.body);

    if (!searchReq.q) {
        console.log("search keyword is missing");
        return {
            statusCode: 400,
            body: JSON.stringify({
                status: "search keyword is missing"
            })
        }
    }

    try {
        const products = tigrisDb.getCollection<Product>(Product);

        const searchResult = await products.search(searchReq);

        const productHits = [];
        for await (const res of searchResult) {
            res.hits.forEach(hit => productHits.push(hit.document));
        }
        return {
            statusCode: 200,
            body: JSON.stringify(productHits)
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify({
                status: err
            })
        }
    }
};

export { handler };
