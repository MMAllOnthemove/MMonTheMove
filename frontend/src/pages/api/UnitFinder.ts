import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:3001/hhp/api/v1/management",
})