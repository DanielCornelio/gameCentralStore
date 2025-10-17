import { client } from "./constans"

const carritoService = {
    addToCart: async (item) => {
        const response = await client.post("/carrito", item)
        return response.data;
    }

}

export default carritoService;