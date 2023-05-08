import axios from "axios";
import { constants } from "./constants";

export const getApi = () => {
    return axios.create({
        baseURL: constants.API_BASE_URL + '/api',
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
        },
    });
};
