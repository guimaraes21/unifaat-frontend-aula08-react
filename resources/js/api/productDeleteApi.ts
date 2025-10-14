import axios from "axios";
import catchError from "../services/catchError";

export default async function productDeleteApi(id: number) {
    try {
        await axios.delete(`http://localhost:8080/api/products/${id}`);
        return { success: true };
    } catch (error) {
        return catchError(error);
    }
}
