
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.less';
import SearchInput from './SearchInput';

const Nav = () => {
    const logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png'
    const avatarIcon = 'https://i.pinimg.com/originals/34/62/d2/3462d27440aa255b1c314ff16f4032b4.png'
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const showClass = useMemo(() => show ? '-show' : '-hide', [show])

    const setScrollEvent = () => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                setShow(true)
            } else {
                setShow(false)
            }
        }, [])
    }

    const removeScrollEvent = () => {
        window.removeEventListener('scroll', () => {})
    }
    
    /**
     * useEffect()의 return function은 이 컴포넌트가 unmount될 때 실행된다.
     */
    useEffect(() => {
        setScrollEvent()
        return () => removeScrollEvent()
    }, [])

    return <>
        <nav className={`nav ${showClass}`}>
            <img src={logo} alt="logo" className="nav__logo" onClick={() => navigate('/')} />

            <SearchInput></SearchInput>

            <img src={avatarIcon} className="nav__avatar" />
        </nav>
    </>
}

export default Nav