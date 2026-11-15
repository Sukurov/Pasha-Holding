
// React hook-ları: state yaratmaq və komponentin həyat dövrünü idarə etmək üçün
import { useState, useEffect } from 'react';

// React Router: səhifələr arasında keçid və cari URL-i əldə etmək üçün
import { useLocation, Link } from 'react-router-dom';

// Navbar-ın əsas və responsive CSS faylları
import './Navbar.css';
import './NavbarResponsive.css';

// Navbar-da istifadə olunan ikonlar
import { LiaUsersSolid } from 'react-icons/lia';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

function Navbar() {

    // Mobil menyunun açıq və ya bağlı olmasını idarə edir
    const [menuOpen, setMenuOpen] = useState(false);

    // Hansı alt menyunun açıq olduğunu müəyyən edir
    const [activeDropdown, setActiveDropdown] = useState(null);

    // İstifadəçinin səhifəni aşağı sürüşdürməsini izləyir
    const [scrolled, setScrolled] = useState(false);

    // Hazırda açıq olan səhifənin URL ünvanını əldə edir
    const { pathname } = useLocation();

    // Ana səhifədən başqa bütün səhifələri daxili səhifə hesab edir
    const isInnerPage = pathname !== '/';

    // Səhifəyə uyğun logo seçir
    const logo = isInnerPage ? '/images/logo2.svg' : '/images/logo.svg';

    // Scroll hadisəsini izləyir və Navbar-ın görünüşünü dəyişir
    useEffect(() => {

        // İstifadəçi 50px-dən çox aşağı düşdükdə scrolled true olur
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        // Scroll hadisəsini dinləməyə başlayır
        window.addEventListener('scroll', handleScroll);

        // Səhifə açıldıqda mövcud scroll vəziyyətini yoxlayır
        handleScroll();

        // Komponent bağlandıqda hadisə dinləyicisini silir
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [pathname]);

    // Seçilmiş alt menyunu açır, yenidən kliklədikdə bağlayır
    const toggleDropdown = (id) => {
        setActiveDropdown(prev => prev === id ? null : id);
    };

    // Səhifə dəyişdikdə mobil və alt menyuları bağlayır
    const closeMenus = () => {
        setActiveDropdown(null);
        setMenuOpen(false);
    };

    // Navbar-da göstəriləcək alt menyuların məlumatları
    const dropdownItems = [
        {
            id: 1,
            title: 'Haqqımızda',
            links: [
                { title: 'Paşa Qrup İcmalı', path: '/icmal' },
                { title: 'Direktorun Müraciəti', path: '/ceo' },
                { title: 'Dəyərlərimiz, Məqsədlərimiz, Baxışımız və Missiyamız' },
                { title: 'Liderlik DNT-miz' },
                { title: 'Təşkilati Struktur' },
                { title: 'Rəhbərlik' },
                { title: 'Korporativ Tarix' }
            ]
        },
        {
            id: 2,
            title: 'Bankçılıq',
            links: [
                { title: 'PAŞA Bank Azərbaycan' },
                { title: 'PAŞA Bank Gürcüstan' },
                { title: 'PAŞA Bank Türkiyə' }
            ]
        },
        {
            id: 3,
            title: 'Sığorta',
            links: [
                { title: 'PAŞA Sığorta' },
                { title: 'PAŞA Həyat Sığorta' }
            ]
        },
        {
            id: 4,
            title: 'İnvestisiya və Brokerlik',
            links: [
                { title: 'PAŞA Investments' },
                { title: 'PAŞA Kapital' }
            ]
        },
        {
            id: 5,
            title: 'Tikinti',
            links: [
                { title: 'PAŞA İnşaat' },
                { title: 'PAŞA Development' }
            ]
        },
        {
            id: 6,
            title: 'Səyahət və Turizm',
            links: [
                { title: 'PAŞA Travel' },
                { title: 'Absheron Hotel Group' }
            ]
        },
        {
            id: 7,
            title: 'Texnologiya',
            links: [
                { title: 'PAŞA Technology' }
            ]
        },
        {
            id: 8,
            title: 'Ekosistem',
            links: [
                { title: 'Competo' },
                { title: 'Birbank' },
                { title: 'PashaPay' }
            ]
        }
    ];

    return (
        // Navbar-ın əsas konteyneri
        <header className={`main-nav ${isInnerPage ? 'inner-page' : 'home-page'} ${scrolled ? 'scrolled' : ''}`}>

            {/* Əsas logo: səhifəyə uyğun olaraq dəyişir */}
            <div className="logo">
                <Link to="/" onClick={closeMenus}>
                    <img src={logo} alt="PASHA Holding" />
                </Link>
            </div>

            {/* Yuxarı və aşağı menyu hissələrini birləşdirir */}
            <div className={`nav-top-bottom ${menuOpen ? 'menu-open' : ''}`}>

                {/* Mobil menyu açıldıqda göstərilən logo */}
                <div className="mobile-menu-logo">
                    <Link to="/" onClick={closeMenus}>
                        <img src={logo} alt="PASHA Holding" />
                    </Link>
                </div>

                {/* Navbar-ın yuxarı menyu hissəsi */}
                <div className="nav-top">
                    <ul>
                        <li><a href="#">Xəbərlər</a></li>
                        <li><a href="#">Karyera</a></li>

                        {/* Əlaqə səhifəsinə keçid */}
                        <li>
                            <Link to="/contacts" onClick={closeMenus}>
                                Əlaqə
                            </Link>
                        </li>
                    </ul>

                    {/* Korporativ sosial məsuliyyət bölməsi */}
                    <div className="nav-top-right">
                        <LiaUsersSolid className="icon" />
                        <a href="#">Korporativ Sosial Məsuliyyət</a>
                    </div>
                </div>

                {/* Navbar-ın əsas menyu hissəsi */}
                <nav className="nav-bottom">
                    <ul>

                        {/* Alt menyuları massiv vasitəsilə dinamik yaradır */}
                        {dropdownItems.map((item) => (
                            <li
                                key={item.id}
                                className={`dropdown-parent ${activeDropdown === item.id ? 'dropdown-open' : ''}`}
                            >

                                {/* Alt menyunu açıb-bağlayan düymə */}
                                <button
                                    className="dropdown-toggle"
                                    onClick={() => toggleDropdown(item.id)}
                                    aria-expanded={activeDropdown === item.id}
                                >
                                    {item.title}
                                </button>

                                {/* Seçilmiş bölməyə aid alt menyu linkləri */}
                                <div className="dropdown">
                                    {item.links.map((link, index) => (

                                        // path varsa daxili səhifəyə React Router ilə keçir
                                        link.path ? (
                                            <Link
                                                key={index}
                                                to={link.path}
                                                onClick={closeMenus}
                                            >
                                                {link.title}
                                            </Link>
                                        ) : (

                                            // Hələ səhifəsi olmayan bölmələr üçün müvəqqəti link
                                            <a href="#" key={index}>
                                                {link.title}
                                            </a>
                                        )
                                    ))}
                                </div>
                            </li>
                        ))}

                    </ul>
                </nav>
            </div>

            {/* Navbar-ın sağ tərəfindəki dil və axtarış ikonları */}
            <div className="nav-right">

                {/* Dil seçimi */}
                <div className="language">
                    <span>EN</span>
                </div>

                {/* Axtarış ikonu */}
                <div className="search-icon">
                    <FiSearch />
                </div>
            </div>

            {/* Mobil menyunu açıb-bağlayan düymə */}
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

// Navbar komponentini digər fayllarda istifadə etmək üçün ixrac edir
export default Navbar;
