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
            stock: game.stock,
            
            // Propiedades en español para GameCard (mantener compatibilidad)
            portada_url: game.portada_url,
            titulo: game.titulo,
            genero: game.genero,
            plataforma: game.plataforma,
            precio: parseFloat(game.precio),
            descripcion: game.descripcion,
            stock: game.stock
        }));
        
        return games;
    },
    getGameById: async (id) => {
        const response = await client.get(`/juegos/${id}`);
        return response.data.result[0];
    },
    createGame: async (data) => {
        try {
            const response = await client.post("/juegos", data)
            return { data: response.data, status: response.status, error: false, message: "Se ha registrado el juego" };
        } catch (error) {
            return { data: null, status: error.response.status, error: true, message: error.response.data.message };
        }
    },
    deleteGame: async(id)=>{
        try {
            const response = await client.delete(`/juegos/${id}`)
            return { data: response.data, status: response.status, error: false, message: "Se ha eliminado el juego" };
        } catch (error) {
            return { data: null, status: error.response.status, error: true, message: error.response.data.message };
        }
    },
    updateGame: async(id, gameData) => {
        try {
            const response = await client.put(`/juegos/${id}`, gameData);
            return { data: response.data, status: response.status, error: false, message: "Se ha actualizado el juego" };
        } catch (error) {
            return { data: null, status: error.response.status, error: true, message: error.response.data.message };
        }
    }
}

export default gamesService;