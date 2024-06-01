import axios from 'axios';


export const BASE_URL ='http://localhost:8000/api/v1'

export const makeGetRequest = async (url, queryParams = {},  headers = {}) => {
    try {
        const response = await axios.get(
            BASE_URL + url,
            {
            params: queryParams,
            headers: {...headers,},
             });
        return response.data;
    } catch (error) {
        console.error(error?.response?.status);
    }
}

export const makePostRequest = async (url, queryParams, body, headers = {}) => {
    try {
        console.log('body', body);
        const response = await axios.post(
            BASE_URL + url,
            body,
            {
                params: queryParams,
                headers: {
                    
                    ...headers, 
                },
                mode: "no-cors",
            }
        );
        return response.data
    } catch (error) {
        console.error(error?.response?.status);
    }
}
