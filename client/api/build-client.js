import axios from 'axios';

export default ({ req }) => {
    const serverSideRequest = typeof window === 'undefined';
    return axios.create({
        baseURL: serverSideRequest ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local' : '',
        ...serverSideRequest && {
            headers: req.headers
        }
    })
}