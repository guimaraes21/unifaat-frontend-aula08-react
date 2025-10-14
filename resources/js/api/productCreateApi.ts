import axios from "axios";
import catchError from "../services/catchError";
import { ProductModel } from "../app.types";

export default async function productCreateApi(name: string, price_times_thousand: number) {
    try {
        const { data } = await axios.post<ProductModel>(
            `http://localhost:8080/api/products`,
            { name, price_times_thousand }
        );
        return data;
    } catch (error) {
        return catchError(error);
    }
}
