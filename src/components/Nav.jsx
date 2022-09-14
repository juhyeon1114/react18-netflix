
import React, { useEffect, useMemo, useState } from 'react';
import './Nav.less';

const Nav = () => {
    const [show, setShow] = useState(false)

    const showClass = useMemo(() => {
        return show ? '-show' : '-hide'
    }, [show])

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

    const refresh = () => {
        window.location.reload()
    }

    

    useEffect(() => {
        setScrollEvent()
        return () => removeScrollEvent()
    })

    return <nav className={`nav ${showClass}`}>
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png"
            alt="logo" 
            className="nav__logo"
            onClick={() => refresh()}
        />
        <img
            src="https://i.pinimg.com/originals/34/62/d2/3462d27440aa255b1c314ff16f4032b4.png"
            className="nav__avatar"
        />
    </nav>
}

export default Nav