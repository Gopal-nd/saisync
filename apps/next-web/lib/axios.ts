import axios from "axios";

export const axiosFrontend = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    withCredentials: true,
});