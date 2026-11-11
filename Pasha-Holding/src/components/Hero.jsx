
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './Hero.css';
import './HeroResponsive.css';

export default function Hero() {

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Əsas animasiya ardıcıllığı
            const tl = gsap.timeline({
                defaults: {
                    ease: 'power3.out'
                }
            });

            // Başlıq
            tl.from('.hero-text span', {
                x: -80,
                opacity: 0,
                duration: 1.2
            })

            // Açıqlama mətni
            .from('.hero-text p', {
                y: 35,
                opacity: 0,
                duration: 0.9
            }, '-=0.6')

            // Daha ətraflı
            .from('.hero-text-hover', {
                y: 25,
                opacity: 0,
                duration: 0.8
            }, '-=0.5')

            // Bina şəkli
            .from('.hero-img img', {
                x: 120,
                opacity: 0,
                duration: 1.5,
                ease: 'power2.out'
            }, '-=1')

            // Footer
            .from('.footer-main', {
                y: 25,
                opacity: 0,
                duration: 0.8
            }, '-=0.5')

            // Səhifə nöqtələri
            .from('.page-dots button', {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            }, '-=0.4');

        });

        return () => ctx.revert();

    }, []);

    const handleDotClick = (index) => {
        document.getElementById(`section-${index + 1}`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <>
            {/* Bulud animasiyası */}
            <div className="cloud-layer">
                <img
                    src="/images/bulud.png"
                    alt=""
                    className="cloud-image"
                />
            </div>

            {/* Əsas bölmə */}
            <div className="hero-main">

                <div className="hero-text">
                    <span>PAŞA Holding</span>

                    <p>
                        Bizə olan inamın önəmini duyaraq, dürüstlük, keyfiyyət,
                        gəlirlilik, əməkdaşlıq və sahibkarlıq üzərində qurulmuş
                        strategiyamıza güvənirik.
                    </p>

                    <div className="hero-text-hover">
                        <a href="#">D A H A E T R A F L I</a>
                        <div className="hero-text-hover-line"></div>
                    </div>
                </div>

                <div className="hero-img">
                    <img src="/images/bina.png" alt="PAŞA Holding" />
                </div>

            </div>

            {/* Footer */}
            <div className="footer-main">

                <div className="footer-left">
                    <span>© 2026 PAŞA Holding</span>

                    <span>
                        Site by <a href="#">JIS</a>
                    </span>
                </div>

                {/* Səhifə keçid nöqtələri */}
                <div className="page-dots">
                    {Array.from({ length: 7 }, (_, index) => (
                        <button
                            key={index}
                            className={index === 0 ? 'active' : ''}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Bölmə ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Sosial şəbəkələr */}
                <div className="footer-right">
                    <div className="footer-socials">
                        <span>Bizi izlə</span>

                        <a href="#" aria-label="LinkedIn">
                            <i className="bi bi-linkedin"></i>
                        </a>

                        <a href="#" aria-label="Facebook">
                            <i className="bi bi-facebook"></i>
                        </a>

                        <a
                            href="https://www.instagram.com/lifeatpashagroup?srtk=MXA2ZXNtYjdzcG1oMQ=="
                            aria-label="Instagram"
                        >
                            <i className="bi bi-instagram"></i>
                        </a>
                    </div>
                </div>

            </div>

            {/* Aşağı dekorativ şəkil */}
            <div className="white-div">
                <img src="/images/white.png" alt="" />
            </div>
        </>
    );
}
