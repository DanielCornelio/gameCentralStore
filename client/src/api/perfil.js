import { client } from "./constans"

export const profileService = {
    getMe : async () => {
        try {
            const response = await client.get("/perfil")
            return { data: response.data, status: response.status, error: false, message: "ok" };
        } catch (error) {
            return { data: null, status: error.response.status, error: true, message: error.response.data.message };
        }
    }
}