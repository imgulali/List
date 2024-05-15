import axios from "axios";

const HOST = `${process.env.DOWNLOAD}`;

export const API = axios.create({
    baseURL: HOST,
});

export const handleApiError = (err) => {
    try {
        const error = err.response?.data?.error || "An unexpected error occurred.";
        const data = null;
        return { error, data };
    } catch (err) {
        console.error(err);
    }
};