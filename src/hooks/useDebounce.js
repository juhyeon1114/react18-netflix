import { useEffect, useState } from "react"

export const useDebounce = (value = '', ms = 0) => {
    let handler = null
    const [val, setVal] = useState(value);
    
    useEffect(() => {
        handler = setTimeout(() => {
            setVal(value)
        }, ms);
        return () => clearTimeout(handler)
    }, [value]);

    return val;
}