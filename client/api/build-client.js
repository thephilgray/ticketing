import axios from 'axios';

export default ({ req }) => {
    const serverSideRequest = typeof window === 'undefined';
    const serverSideBaseUrl = 'http://fauxios.com/';
    return axios.create({
        baseURL: serverSideRequest ? serverSideBaseUrl : '',
        ...serverSideRequest && {
            headers: req.headers
        }
    })
}