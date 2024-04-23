
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/image/logo.webp";

function Header({address}) {
    const [isOpen, setIsOpen] = useState(false);
    const [bgColor, setBgColor] = useState('bg-transparent');

    const closeMenu = () => {
        setIsOpen(false);
    };
    const openMenu = () => {
        setIsOpen(true);
    }

    useEffect(() => {
        const changeBackground = () => {
            if (window.scrollY >= 80) {
                setBgColor('bg-black');
            } else {
                setBgColor('bg-transparent');
            }
        };

        window.addEventListener('scroll', changeBackground);

        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, []);
    return (
        <>
            <nav className={`fixed z-50 w-full h-16 flex justify-between items-center px-8 md:px-48 ${bgColor}`}>
                <Link to='/' className='w-full flex items-center'>
                    <img className='w-52' src={logo} alt="Website Logo" />
                </Link>
                <button
                    className='w-full flex justify-end items-center text-white '
                    type="button"
                    aria-controls="offcanvasRight"
                    onClick={openMenu}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>

                </button>
            </nav>

            <div className={`fixed top-0 z-50 h-screen w-96 max-md:w-80 bg-white shadow-lg transition-all duration-500 ${isOpen ? 'right-0' : '-right-96'}`}>
                <button
                    className='w-full flex justify-end p-8'
                    onClick={closeMenu}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className='flex justify-start pl-4 text-black text-lg mb-2 mt-0'>{address.city}, {address.country.name}</div>
                <hr className="h-px w-48 mx-auto bg-gray-200 border-0" />
                <div className="offcanvas-body flex items-center justify-start overflow-y-auto pl-8">
                    <ul className="py-2 text-black text-lg">
                        <li>
                            <Link to='/' className="block px-4 py-2 hover:text-gray-800">Bugün</Link>
                            <Link to='/' className="block px-4 py-2 hover:text-gray-800">Saat Başı</Link>
                            <Link to='/' className="block px-4 py-2 hover:text-gray-800">Günlük</Link>
                            <Link to='/' className="block px-4 py-2 hover:text-gray-800">Aylık</Link>
                        </li>

                    </ul>
                </div>
            </div>

        </>
    );
}

export default Header;
