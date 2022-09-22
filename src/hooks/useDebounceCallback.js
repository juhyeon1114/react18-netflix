
import { debounce } from "lodash";
import { useCallback } from "react";

export const useDebouncedCallback = (func, delay) => {
    return useCallback(debounce((...args) => {
        func(...args)
    }, delay), [])
}