import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Icmal from './components/navbar_kecid/icmal.jsx';

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/icmal" element={<Icmal />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;