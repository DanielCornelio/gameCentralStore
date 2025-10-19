import { client } from "./constans"

const usuariosService = {
    me: async () => {
        try {
            const response = await client.get("/usuarios/me")
            return {data:response.data, status: response.status, error:false, message: "ok"};
        } catch (error) {
            return {data:null, status: error.response.status, error:true, message: error.response.data.message};
        }
    },
    updateUser: async() => {
        register: async (id, data) => {
        try {
            const response = await client.put(`/usuarios/${id}`, data);
            return { data: response.data, status: response.status, error: false, message: "Se ha actualizado el juego" };
        } catch (error) {
            return { data: null, status: error.response.status, error: true, message: error.response.data.message };
        }
    }

}
}

export default usuariosService;