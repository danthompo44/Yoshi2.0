import { useState, useEffect } from 'react';

/**
 * A hook for fetching and setting data from a service function with appropriate loading and error state.
 * @param {Promise<Function>} serviceMethod The service method to fetch data from.
 */
function useFetchData(serviceMethod) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const data = await serviceMethod();
                setData(data.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError(err.message);
                setLoading(false);
            }
        }

        getData();
    }, [serviceMethod]);

    return [
        { value: loading, update: setLoading },
        { value: data, update: setData },
        { value: error, update: setError },
    ];
}

export default useFetchData;
