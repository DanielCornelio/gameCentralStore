import { client } from "./constans"

const favoritesService = {
    addToFavorite: async () => {
        try {
            const response = await client.post("/favoritos", data)
            return { data: response.data, status: response.status, error: false, message: "ok" };
        } catch (error) {
            return { data: null, status: error.response.status, error: true, message: error.response.data.message };
        }
    },
    getFavoritesByEmail: async () => {
        try {
            const response = await client.get("/favoritos")
            return { data: response.data, status: response.status, error: false, message: "ok" };
        } catch (error) {
            return { data: null, status: error.response.status, error: true, message: error.response.data.message };
        }
    }

}

export default favoritesService;