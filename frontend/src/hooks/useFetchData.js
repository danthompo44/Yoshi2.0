import { useState, useEffect } from 'react';

/**
 * A hook for fetching and setting data from a service function with appropriate loading and error state.
 *
 * The method passed to the hook must be called with no parameters, or the function will enter a forever loop.
 * See the below examples to see how to use a method with no parameters and a method with parameters.
 * @param {Promise<Function>} serviceMethod The service method to fetch data from.
 * @example <caption>How to the use the hook with a method that takes no parameters.</caption>
 * ```js
 * const [loading, data, error] = useFetchData(someMethodRef);
 * ```
 *
 * @example <caption>How to use the hook with a method that takes parameters.</caption>
 * ```js
 * // Wrap the method in a React.useCallback function.
 * const someMethodWithParams = useCallback(async () => {
 *     return await method(id);
 * }, [id]);
 *
 * const [loading, data, error] = useFetchData(someMethodWithParams);
 * ```
 *
 * @example <caption>You can destructure the values (either value or update) and name them what you like.</caption>
 * ```js
 * const [{value: loadingState}, {value: data, update: setData}, {value: error}] = useFetchData(someMethod);
 * // You can then use the named values as normal, e.g:
 * if (loadingState) ...
 * // Or something like this
 * data.map(value => <SomeComponent data={value} />)
 * ```
 */
function useFetchData(serviceMethod) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
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
