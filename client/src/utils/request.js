import axios from 'axios';

const request = async ({url, method, params}) => {
    if(!params) params = {};
    try {
        const config = {
            method: method,
            url: url,
            ...(method.toLowerCase() === 'get' ? { params } : { data: params })
        };
        const response = await axios(config);
        return response;
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
};

export default request;