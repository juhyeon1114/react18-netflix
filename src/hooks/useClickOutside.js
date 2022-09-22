import { useEffect, useRef } from "react"

export const useClickOutside = (ref, handler, skipFirstClick = false) => {
    const clicked = useRef();

    const listener = (e) => {
        if (skipFirstClick && !clicked.current) {
            clicked.current = true
            return
        }
        ref.current && !ref.current.contains(e.target) && handler()
    }

    useEffect(() => {
        document.addEventListener('click', listener)
        return () => {
            document.removeEventListener('click', listener)
        }
    }, [])
}