import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDebouncedCallback } from '../hooks/useDebounceCallback'

const SearchInput = () => {
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const useQuery = () => new URLSearchParams(location.search)

    const handleChange = (e) => {
        const v = e.target.value
        setSearchValue(v)
        search(v)
    }

    const handleKeyUp = (e) => {
        e.code === 'Enter' && !searchValue.trim() && navigate('/')
    }

    const search = useDebouncedCallback((v) => navigate(`/search?q=${v}`), 500)

    useEffect(() => {
        let query = useQuery();
        setSearchValue(query.get('q') || '')
    }, [])

    return <>
        <input
            type="text"
            value={searchValue}
            onChange={e => handleChange(e)}
            onKeyUp={e => handleKeyUp(e)}
            className="nav__input"
            placeholder='검색어를 입력해주세요.'
        />
    </>
}

export default SearchInput