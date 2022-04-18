import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}api/`,
    timeout: 15_000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default instance;
