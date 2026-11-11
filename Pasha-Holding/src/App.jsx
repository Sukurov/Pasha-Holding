import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Icmal from './components/navbar_kecid/icmal.jsx';

function AppContent() {
    const { pathname } = useLocation();

    // Səhifəyə uyğun body fon rəngini dəyişir
    useEffect(() => {
        document.body.style.background =
            pathname === '/' ? '#608AC4' : 'white';
    }, [pathname]);

    return (
        <>
            <Navbar />

            {/* Səhifələrin idarə olunması */}
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/icmal" element={<Icmal />} />
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
