import { client } from "./constans"

const gamesService = {
    getAllGames: async () => {
        const response = await client.get('/juegos');
        
        // Transformar los datos del backend (español) al formato que espera useGameFilters (inglés)
        const games = response.data.results.map(game => ({
            // Propiedades en inglés para useGameFilters
            id: game.id,
            title: game.titulo,
            genre: game.genero,
            platform: game.plataforma,
            price: parseFloat(game.precio),
            image: game.portada_url,
            
            // Propiedades en español para GameCard (mantener compatibilidad)
            portada_url: game.portada_url,
            titulo: game.titulo,
            genero: game.genero,
            plataforma: game.plataforma,
            precio: parseFloat(game.precio),
            descripcion: game.descripcion
        }));
        
        return games;
    },
    getGameById: async (id) => {
        const response = await client.get(`/juegos/${id}`);
        return response.data.result[0];
    },
    getGamesWithFilters: async () => {

    }
}

export default gamesService;