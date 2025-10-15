import { client } from "./constans"

const authService = {
    login: async (credentials) => {
        try {
            const response = await client.post("/auth/login", credentials)
            return {data:response.data, status: response.status, error:false, message: "ok"};
        } catch (error) {
            return {data:null, status: error.response.status, error:true, message: error.response.data.message};
        }
    }

}

export default authService;