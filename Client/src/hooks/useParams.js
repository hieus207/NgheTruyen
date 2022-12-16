import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useParams = (...arr) => {
    const [searchParams] = useSearchParams();
    const [params, setParams] = useState({page:1})
    useEffect(()=>{

        for(let val of arr){
            if(searchParams.get(val)){
                setParams(param => {
                    return {
                        ...param,
                        [val]: searchParams.get(val)
                    }
                })
            }
        }
        
    },[searchParams])

    return params
};

export default useParams;