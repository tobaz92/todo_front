import axios from 'axios'

export class UserApi {
    static async getUsers() {
        try {
            const config = {
                method: 'get',
                url: `http://localhost:3200/users`,
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'no-cors',
            }

            const response = await axios(config)

            return response.data
        } catch (error) {
            console.error('Error get users:', error)
            throw error
        }
    }
}
