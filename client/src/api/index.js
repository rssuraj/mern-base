import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

export const register = (data) => {
    return axios.post(`${REACT_APP_BASE_URL}/auth/signup`, data).then(e => e);
};