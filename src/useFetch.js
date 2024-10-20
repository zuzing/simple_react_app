import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, {signal: abortCont.signal})
            .then((res) => {
                if (!res.ok) {
                    throw Error('Failed to fetch data.');
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
        return () => {
            abortCont.abort();
        }
        }, [url]);




    return {data, loading, error};
};

export default useFetch;

