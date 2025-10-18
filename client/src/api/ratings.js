import { client } from "./constans"

const ratingsService = {
    getRatingsByGameId: async(usuario_id) => {
        try {
            const response = await client.get(`/ratings/${usuario_id}`)
            return {data:response.data, status: response.status, error:false, message: "ok"};
        } catch (error) {
            return {data:null, status: error.response.status, error:true, message: error.response.data.message};
        }
    },
    createRatings: async(data) => {
        try {
            const response = await client.post("/ratings", data)
            return { data: response.data, status: response.status, error: false, message: "Se ha registrado el comentario" };
        } catch (error) {
            return { data: null, status: error.response.status, error: true, message: error.response.data.message };
        }
    }
}

export default ratingsService;