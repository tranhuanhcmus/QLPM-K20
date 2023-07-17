import axios from 'axios';

const REST_API_SERVER = 'http://localhost:2014';

export function loginApi(email, password) {
    return axios.post(`${REST_API_SERVER}/api/v1/auth/login`, { email, password });
}

export function registerApi(email, password) {
    return axios.post(`${REST_API_SERVER}/api/v1/auth/register`, { email, password });
}

export function checkLoginApi(authToken) {
    return axios.post(`${REST_API_SERVER}/api/v1/auth/checkLogin`, null, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
    });
}