
import React, { useState } from 'react';
import './Navbar.css';
import './NavbarResponsive.css';

import { LiaUsersSolid } from 'react-icons/lia';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <header className="main-nav">

            <div className="logo">
                <img src="/images/logo.svg" alt="PASHA Holding" />
            </div>

            <div className={`nav-top-bottom ${menuOpen ? 'menu-open' : ''}`}>

                <div className="nav-top">
                    <ul>
                        <li><a href="#">Xəbərlər</a></li>
                        <li><a href="#">Karyera</a></li>
                        <li><a href="#">Əlaqə</a></li>
                    </ul>

                    <div className="nav-top-right">
                        <LiaUsersSolid className="icon" />
                        <a href="#">Korporativ Sosial Məsuliyyət</a>
                    </div>
                </div>

                <nav className="nav-bottom">
                    <ul>

                        <li className={`dropdown-parent ${activeDropdown === 1 ? 'dropdown-open' : ''}`}>
                            <button className="dropdown-toggle" onClick={() => setActiveDropdown(activeDropdown === 1 ? null : 1)}>
                                Haqqımızda
                            </button>
                            <div className="dropdown"><a href="/icmal" onClick={() => {
                                setActiveDropdown(null);
                                setMenuOpen(false);
                            }}>
                                Paşa Qrup İcmalı
                            </a>
                                <a href="#">Direktorun Müraciəti</a>
                                <a href="#">Dəyərlərimiz, Məqsədlərimiz, Baxışımız və Missiyamız</a>
                                <a href="#">Liderlik DNT-miz</a>
                                <a href="#">Təşkilati Struktur</a>
                                <a href="#">Rəhbərlik</a>
                                <a href="#">Korporativ Tarix</a>
                            </div>
                        </li>

                        <li className={`dropdown-parent ${activeDropdown === 2 ? 'dropdown-open' : ''}`}>
                            <button className="dropdown-toggle" onClick={() => setActiveDropdown(activeDropdown === 2 ? null : 2)}>Bankçılıq</button>
                            <div className="dropdown">
                                <a href="#">PAŞA Bank Azərbaycan</a>
                                <a href="#">PAŞA Bank Gürcüstan</a>
                                <a href="#">PAŞA Bank Türkiyə</a>
                            </div>
                        </li>

                        <li className={`dropdown-parent ${activeDropdown === 3 ? 'dropdown-open' : ''}`}>
                            <button className="dropdown-toggle" onClick={() => setActiveDropdown(activeDropdown === 3 ? null : 3)}>Sığorta</button>
                            <div className="dropdown">
                                <a href="#">PAŞA Sığorta</a>
                                <a href="#">PAŞA Həyat Sığorta</a>
                            </div>
                        </li>

                        <li className={`dropdown-parent ${activeDropdown === 4 ? 'dropdown-open' : ''}`}>
                            <button className="dropdown-toggle" onClick={() => setActiveDropdown(activeDropdown === 4 ? null : 4)}>İnvestisiya və Brokerlik</button>
                            <div className="dropdown">
                                <a href="#">PAŞA Investments</a>
                                <a href="#">PAŞA Kapital</a>
                            </div>
                        </li>

                        <li className={`dropdown-parent ${activeDropdown === 5 ? 'dropdown-open' : ''}`}>
                            <button className="dropdown-toggle" onClick={() => setActiveDropdown(activeDropdown === 5 ? null : 5)}>Tikinti</button>
                            <div className="dropdown">
                                <a href="#">PAŞA İnşaat</a>
                                <a href="#">PAŞA Development</a>
                            </div>
                        </li>

                        <li className={`dropdown-parent ${activeDropdown === 6 ? 'dropdown-open' : ''}`}>
                            <button className="dropdown-toggle" onClick={() => setActiveDropdown(activeDropdown === 6 ? null : 6)}>Səyahət və Turizm</button>
                            <div className="dropdown">
                                <a href="#">PAŞA Travel</a>
                                <a href="#">Absheron Hotel Group</a>
                            </div>
                        </li>

                        <li className={`dropdown-parent ${activeDropdown === 7 ? 'dropdown-open' : ''}`}>
                            <button className="dropdown-toggle" onClick={() => setActiveDropdown(activeDropdown === 7 ? null : 7)}>Texnologiya</button>
                            <div className="dropdown">
                                <a href="#">PAŞA Technology</a>
                            </div>
                        </li>

                        <li className={`dropdown-parent ${activeDropdown === 8 ? 'dropdown-open' : ''}`}>
                            <button className="dropdown-toggle" onClick={() => setActiveDropdown(activeDropdown === 8 ? null : 8)}>Ekosistem</button>
                            <div className="dropdown">
                                <a href="#">Competo</a>
                                <a href="#">Birbank</a>
                                <a href="#">PashaPay</a>
                            </div>
                        </li>

                    </ul>
                </nav>
            </div>

            <div className="nav-right">
                <div className="language">
                    <span>EN</span>
                </div>

                <div className="search-icon">
                    <FiSearch />
                </div>
            </div>

            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Menyunu bağla' : 'Menyunu aç'}
                aria-expanded={menuOpen}
            >
                {menuOpen ? <FiX /> : <FiMenu />}
            </button>

        </header>
    );
}

export default Navbar;
