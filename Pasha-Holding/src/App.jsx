import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Icmal from './components/navbar_kecid/icmal.jsx';
import Ceo from './components/navbar_kecid/Ceo.jsx';
import Contacts from './components/navbar_kecid/Contacts.jsx';

function AppContent() {
    const { pathname } = useLocation();

    // Səhifəyə uyğun body fon rəngini dəyişir
    useEffect(() => {
        document.body.style.background =
            pathname === '/' ? '#608AC4' : 'transparent';

        document.body.style.overflow =
            pathname === '/' ? 'hidden' : 'auto';
    }, [pathname]);

    return (
        <>
            <Navbar />

            {/* Səhifələrin idarə olunması */}
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/icmal" element={<Icmal />} />
                <Route path="/ceo" element={<Ceo />} />
                <Route path="/contacts" element={<Contacts />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
