
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './Navbar.css';
import './NavbarResponsive.css';

import { LiaUsersSolid } from 'react-icons/lia';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
    // Mobil menyunun açıq və ya bağlı olduğunu idarə edir
    const [menuOpen, setMenuOpen] = useState(false);

    // Hansı alt menyunun açıq olduğunu müəyyən edir
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Səhifənin aşağı sürüşdürülüb-sürüşdürülmədiyini izləyir
    const [scrolled, setScrolled] = useState(false);

    // Hazırda açıq olan səhifənin ünvanını əldə edir
    const { pathname } = useLocation();

    // Ana səhifədən başqa bütün səhifələr daxili səhifə hesab olunur
    const isInnerPage = pathname !== '/';

    // Scroll zamanı Navbar-ın görünüşünü dəyişir
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Alt menyuların açılıb-bağlanmasını idarə edir
    const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    // Səhifəyə keçid zamanı menyuları bağlayır
    const closeMenus = () => {
        setActiveDropdown(null);
        setMenuOpen(false);
    };

    return (
        <header
            className={`main-nav ${isInnerPage ? 'inner-page' : 'home-page'} ${scrolled ? 'scrolled' : ''}`}
        >
            {/* Logo */}
            <div className="logo">
                <a href="/">
                    <img
                        src={isInnerPage ? '/images/logo2.svg' : '/images/logo.svg'}
                        alt="PASHA Holding"
                    />
                </a>
            </div>

            {/* Yuxarı və aşağı menyu hissələri */}
            <div className={`nav-top-bottom ${menuOpen ? 'menu-open' : ''}`}>

                {/* Mobil menyu loqosu */}
                <div className="mobile-menu-logo">
                    <a href="/" onClick={closeMenus}>
                        <img
                            src={isInnerPage ? "/images/logo2.svg" : "/images/logo.svg"}
                            alt="PAŞA Holding"
                        />
                    </a>
                </div>

                {/* Yuxarı menyu */}
                <div className="nav-top">
                    <ul>
                        <li><a href="#">Xəbərlər</a></li>
                        <li><a href="#">Karyera</a></li>
                        <li><a href="/contacts" onClick={closeMenus}>Əlaqə</a></li>
                    </ul>

                    <div className="nav-top-right">
                        <LiaUsersSolid className="icon" />
                        <a href="#">Korporativ Sosial Məsuliyyət</a>
                    </div>
                </div>

                {/* Əsas menyu */}
                <nav className="nav-bottom">
                    <ul>

                        {/* Haqqımızda */}
                        <li className={`dropdown-parent ${activeDropdown === 1 ? 'dropdown-open' : ''}`}>
                            <button
                                className="dropdown-toggle"
                                onClick={() => toggleDropdown(1)}
                            >
                                Haqqımızda
                            </button>

                            <div className="dropdown">
                                <a href="/icmal" onClick={closeMenus}>
                                    Paşa Qrup İcmalı
                                </a>
                                <a href="/ceo" onClick={closeMenus}>Direktorun Müraciəti</a>
                                <a href="#">Dəyərlərimiz, Məqsədlərimiz, Baxışımız və Missiyamız</a>
                                <a href="#">Liderlik DNT-miz</a>
                                <a href="#">Təşkilati Struktur</a>
                                <a href="#">Rəhbərlik</a>
                                <a href="#">Korporativ Tarix</a>
                            </div>
                        </li>

                        {/* Bankçılıq */}
                        <li className={`dropdown-parent ${activeDropdown === 2 ? 'dropdown-open' : ''}`}>
                            <button
                                className="dropdown-toggle"
                                onClick={() => toggleDropdown(2)}
                            >
                                Bankçılıq
                            </button>

                            <div className="dropdown">
                                <a href="#">PAŞA Bank Azərbaycan</a>
                                <a href="#">PAŞA Bank Gürcüstan</a>
                                <a href="#">PAŞA Bank Türkiyə</a>
                            </div>
                        </li>

                        {/* Sığorta */}
                        <li className={`dropdown-parent ${activeDropdown === 3 ? 'dropdown-open' : ''}`}>
                            <button
                                className="dropdown-toggle"
                                onClick={() => toggleDropdown(3)}
                            >
                                Sığorta
                            </button>

                            <div className="dropdown">
                                <a href="#">PAŞA Sığorta</a>
                                <a href="#">PAŞA Həyat Sığorta</a>
                            </div>
                        </li>

                        {/* İnvestisiya və Brokerlik */}
                        <li className={`dropdown-parent ${activeDropdown === 4 ? 'dropdown-open' : ''}`}>
                            <button
                                className="dropdown-toggle"
                                onClick={() => toggleDropdown(4)}
                            >
                                İnvestisiya və Brokerlik
                            </button>

                            <div className="dropdown">
                                <a href="#">PAŞA Investments</a>
                                <a href="#">PAŞA Kapital</a>
                            </div>
                        </li>

                        {/* Tikinti */}
                        <li className={`dropdown-parent ${activeDropdown === 5 ? 'dropdown-open' : ''}`}>
                            <button
                                className="dropdown-toggle"
                                onClick={() => toggleDropdown(5)}
                            >
                                Tikinti
                            </button>

                            <div className="dropdown">
                                <a href="#">PAŞA İnşaat</a>
                                <a href="#">PAŞA Development</a>
                            </div>
                        </li>

                        {/* Səyahət və Turizm */}
                        <li className={`dropdown-parent ${activeDropdown === 6 ? 'dropdown-open' : ''}`}>
                            <button
                                className="dropdown-toggle"
                                onClick={() => toggleDropdown(6)}
                            >
                                Səyahət və Turizm
                            </button>

                            <div className="dropdown">
                                <a href="#">PAŞA Travel</a>
                                <a href="#">Absheron Hotel Group</a>
                            </div>
                        </li>

                        {/* Texnologiya */}
                        <li className={`dropdown-parent ${activeDropdown === 7 ? 'dropdown-open' : ''}`}>
                            <button
                                className="dropdown-toggle"
                                onClick={() => toggleDropdown(7)}
                            >
                                Texnologiya
                            </button>

                            <div className="dropdown">
                                <a href="#">PAŞA Technology</a>
                            </div>
                        </li>

                        {/* Ekosistem */}
                        <li className={`dropdown-parent ${activeDropdown === 8 ? 'dropdown-open' : ''}`}>
                            <button
                                className="dropdown-toggle"
                                onClick={() => toggleDropdown(8)}
                            >
                                Ekosistem
                            </button>

                            <div className="dropdown">
                                <a href="#">Competo</a>
                                <a href="#">Birbank</a>
                                <a href="#">PashaPay</a>
                            </div>
                        </li>

                    </ul>
                </nav>
            </div>

            {/* Sağ tərəfdəki ikonlar */}
            <div className="nav-right">
                <div className="language">
                    <span>EN</span>
                </div>

                <div className="search-icon">
                    <FiSearch />
                </div>
            </div>

            {/* Mobil menyu düyməsi */}
            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label={menuOpen ? 'Menyunu bağla' : 'Menyunu aç'}
                aria-expanded={menuOpen}
            >
                {menuOpen ? <FiX /> : <FiMenu />}
            </button>
        </header>
    );
}

export default Navbar;
