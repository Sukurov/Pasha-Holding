
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Əsas komponentlərin import edilməsi
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Digər səhifələrin import edilməsi
import Icmal from './components/navbar_kecid/icmal.jsx';
import Ceo from './components/navbar_kecid/Ceo.jsx';
import Contacts from './components/navbar_kecid/Contacts.jsx';


// Səhifələrə uyğun ümumi idarəetmə
function AppContent() {
    const { pathname } = useLocation();

    // Aktiv səhifəyə uyğun body görünüşünü dəyişir
    useEffect(() => {
        const isHomePage = pathname === '/';

        document.body.style.background = isHomePage
            ? '#608AC4'
            : 'transparent';

        document.body.style.overflow = isHomePage
            ? 'hidden'
            : 'auto';

        // Komponent bağlananda əvvəlki stilləri təmizləyir
        return () => {
            document.body.style.background = '';
            document.body.style.overflow = '';
        };
    }, [pathname]);

    return (
        <>
            {/* Bütün səhifələrdə görünən naviqasiya menyusu */}
            <Navbar />

            {/* URL-ə uyğun səhifənin göstərilməsi */}
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/icmal" element={<Icmal />} />
                <Route path="/ceo" element={<Ceo />} />
                <Route path="/contacts" element={<Contacts />} />
            </Routes>
        </>
    );
}


// Tətbiqin əsas komponenti
function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
