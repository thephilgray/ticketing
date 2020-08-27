import axios from 'axios';

export default ({ req }) => {
    const serverSideRequest = typeof window === 'undefined';
    const isDev = process?.env?.NODE_ENV === 'development';
    const serverSideBaseUrl = isDev ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local' : 'http://fauxios.com/';
    return axios.create({
        baseURL: serverSideRequest ? serverSideBaseUrl : '',
        ...serverSideRequest && {
            headers: req.headers
        }
    })
}