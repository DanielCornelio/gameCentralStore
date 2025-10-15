import { client } from "./constans"

const gamesService = {
    getAllGames: async () => {
        const response = await client.get("/juegos");
        return response.data.results;
    },
    getGameById: async (id) => {
        const response = await client.get(`/juegos/${id}`);
        return response.data.result[0];
    },
    getGamesWithFilters: async () => {

    }
}

export default gamesService;