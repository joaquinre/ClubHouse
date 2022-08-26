import axios from "axios";


const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',

    },
    // http://localhost:5500/api/send-otp
})


// List of all endpoints

export const sendOtp = (data) => api.post('/api/send-otp', data)

export default api