import axios from 'axios';
import { useState } from 'react'

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async (props = {}) => {
        try {
            const response = await axios[method](url, { ...body, ...props });
            if (onSuccess) {
                onSuccess(response && response.data);
                setErrors(null);
            }
            return response && response.data;
        } catch (error) {
            console.log(error);
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oops....</h4>
                    <ul className="my-0">
                        {error.response.data.errors.map(err =>
                            <li key={err.message}>{err.message}</li>
                        )}
                    </ul>
                </div>
            )
        }
    }
    return { doRequest, errors };
}
