
import { useEffect } from 'react';
import './Icmal.css';
import './IcmalResponsive.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP üçün ScrollTrigger plaginini aktivləşdiririk
gsap.registerPlugin(ScrollTrigger);

function Icmal() {

    useEffect(() => {

        // İcmal səhifəsinin əsas elementi
        const page = document.querySelector('.icmal-page');

        // Səhifə mövcud deyilsə animasiyaları başladmırıq
        if (!page) return;

        // Fon animasiyasının son vəziyyətini yadda saxlayır
        let lastStep = -1;

        // Scroll zamanı fon şəklinin böyüməsini idarə edir
        const handleScroll = () => {

            // Scroll məsafəsinə əsasən cari mərhələni hesablayır
            const currentStep = Math.floor(window.scrollY / 100);

            // Eyni mərhələdə təkrar hesablamanın qarşısını alır
            if (currentStep === lastStep) return;

            lastStep = currentStep;

            // Fon şəklinin böyümə əmsalı
            const scale = Math.min(
                1 + currentStep * 0.018,
                1.8
            );

            // CSS dəyişəninə yeni ölçünü ötürür
            page.style.setProperty('--bg-scale', scale);
        };

        // Scroll hadisəsini dinləyirik
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });

        // Səhifə ilk açıldıqda fon ölçüsünü hesablayırıq
        handleScroll();


        // =====================================
        // GSAP ANİMASİYALARI
        // =====================================

        // Animasiya və ScrollTrigger-ləri səhifə daxilində məhdudlaşdırır
        const ctx = gsap.context(() => {

            // Başlığın aşağıdan görünmə animasiyası
            gsap.from('.icmal-content h1', {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });


            // İcmal mətnlərinin animasiyası
            gsap.from('.icmal-box-top > *', {
                y: 40,
                opacity: 0,
                duration: 0.9,
                stagger: 0.2,
                ease: 'power2.out',

                scrollTrigger: {
                    trigger: '.icmal-box-top',
                    start: 'top 85%',
                    once: true
                }
            });


            // Statistik blokların görünmə animasiyası
            gsap.from('.icmal-box-pul-vahid', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power2.out',

                scrollTrigger: {
                    trigger: '.icmal-box-pul-vahid-main',
                    start: 'top 85%',
                    once: true
                }
            });


            // Statistik rəqəmlərin 0-dan artması
            const counters = gsap.utils.toArray(
                '.icmal-box-pul-vahid span'
            );

            counters.forEach((counter) => {

                // HTML data atributlarından məlumatları götürürük
                const target = Number(counter.dataset.count);
                const decimals = Number(counter.dataset.decimals || 0);
                const suffix = counter.dataset.suffix || '';

                // Başlanğıc rəqəmi
                const value = { number: 0 };

                // Rəqəmi hədəf qiymətə qədər artırırıq
                gsap.to(value, {
                    number: target,
                    duration: 2,
                    ease: 'power2.out',

                    scrollTrigger: {
                        trigger: counter,
                        start: 'top 85%',
                        once: true
                    },

                    // Animasiya davam etdikcə rəqəmi yeniləyir
                    onUpdate: () => {

                        counter.textContent =
                            value.number.toLocaleString('en-US', {
                                minimumFractionDigits: decimals,
                                maximumFractionDigits: decimals
                            }) + suffix;
                    }
                });
            });


            // PAŞA Qrup şirkətlərinin loqolarının animasiyası
            gsap.from('.pasha-bank', {
                y: 40,
                opacity: 0,
                scale: 0.95,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power2.out',

                scrollTrigger: {
                    trigger: '.pasha-box-main',
                    start: 'top 85%',
                    once: true
                }
            });


            // Footer-in görünmə animasiyası
            gsap.from('.icmal-footer', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',

                scrollTrigger: {
                    trigger: '.icmal-footer',
                    start: 'top 95%',
                    once: true
                }
            });

        }, page);


        // Komponent səhifədən çıxanda hadisələri və animasiyaları təmizləyirik
        return () => {
            window.removeEventListener('scroll', handleScroll);
            ctx.revert();
        };

    }, []);


    return (
        <div className="icmal-page">

            {/* İcmal səhifəsinin əsas məzmunu */}
            <div className="icmal-content">

                <h1>Paşa Qrup İcmalı</h1>

                <div className="icmal-box">

                    {/* Holdinq haqqında məlumat */}
                    <div className="icmal-box-top">

                        <span>
                            “PAŞA Holding” Məhdud Məsuliyyətli Cəmiyyət
                            (PAŞA Holdinq və ya “PAŞA Holding” MMC) öz törəmə
                            şirkətləri vasitəsi ilə bankçılıq, sığorta, tikinti,
                            informasiya texnologiyaları, daşınmaz əmlak və
                            turizm sektorlarına sərmayə yatırır.
                        </span>

                        <p>
                            Holdinq fəaliyyətə başladığı 2006-cı ildən etibarən
                            öz biznesini effektiv menecment, korporativ
                            idarəetmə və düşünülmüş investisiya qərarları
                            əsasında qurur.
                        </p>

                        <p>
                            Holdinqdə iki növ investisiya portfeli mövcuddur:
                            PAŞA Holdinq və törəmə şirkətlərində (PAŞA Qrup)
                            səhmlərin nəzarət payı və kiçik özəl kapital
                            investisiyaları.
                        </p>

                    </div>


                    {/* Statistik məlumatlar */}
                    <div className="icmal-box-pul-vahid-main">

                        <div className="icmal-box-pul-vahid">
                            <span data-count="20.5" data-decimals="1" data-suffix=" mlrd. AZN">0 mlrd. AZN</span>
                            <p>31 dekabr 2023-cü il tarixi üçün Cəmi Aktivlər</p>
                        </div>

                        <div className="icmal-box-pul-vahid">
                            <span data-count="23.3" data-decimals="1" data-suffix=" mlrd. AZN">0 mlrd. AZN</span>
                            <p>31 dekabr 2024-cü il tarixi üçün Cəmi Aktivlər</p>
                        </div>

                        <div className="icmal-box-pul-vahid">
                            <span data-count="2.83" data-decimals="2" data-suffix=" mlrd. AZN">0 mlrd. AZN</span>
                            <p>31 dekabr 2023-cü il tarixi üçün Cəmi Kapital</p>
                        </div>

                        <div className="icmal-box-pul-vahid">
                            <span data-count="2.98" data-decimals="2" data-suffix=" mlrd. AZN">0 mlrd. AZN</span>
                            <p>31 dekabr 2024-cü il tarixi üçün Cəmi Kapital</p>
                        </div>

                        <div className="icmal-box-pul-vahid">
                            <span data-count="2.4" data-decimals="1" data-suffix=" mlrd. AZN">0 mlrd. AZN</span>
                            <p>31 dekabr 2023-cü il tarixi üçün Ümumi Gəlir</p>
                        </div>

                        <div className="icmal-box-pul-vahid">
                            <span data-count="3.07" data-decimals="2" data-suffix=" mlrd. AZN">0 mlrd. AZN</span>
                            <p>31 dekabr 2024-cü il tarixi üçün Ümumi Gəlir</p>
                        </div>

                        <div className="icmal-box-pul-vahid">
                            <span data-count="35.2" data-decimals="1" data-suffix="%">0%</span>
                            <p>
                                31 dekabr 2023-cü il tarixi üçün Azərbaycanın
                                bank sektorunda aktivlər üzrə Bazar Payı
                            </p>
                        </div>

                        <div className="icmal-box-pul-vahid">
                            <span data-count="36.97" data-decimals="2" data-suffix="%">0%</span>
                            <p>
                                31 dekabr 2024-cü il tarixi üçün Azərbaycanın
                                bank sektorunda aktivlər üzrə Bazar Payı
                            </p>
                        </div>

                        <div className="icmal-box-pul-vahid">
                            <span data-count="20000" data-suffix="+">0+</span>
                            <p>
                                31 dekabr 2023-cü il tarixi üçün Qrup üzrə
                                Ümumi İşçi Sayı
                            </p>
                        </div>

                        <div className="icmal-box-pul-vahid">
                            <span data-count="22000" data-suffix="+">0+</span>
                            <p>
                                31 dekabr 2024-cü il tarixi üçün Qrup üzrə
                                Ümumi İşçi Sayı
                            </p>
                        </div>

                    </div>


                    {/* PAŞA Qrup şirkətlərinin loqoları */}
                    <div className="pasha-box-main">

                        <a href="https://www.pashabank.az/" target="_blank" rel="noreferrer" className="pasha-bank">
                            <img src="/images/pasha-bank.svg" alt="PAŞA Bank" />
                        </a>

                        <a href="https://www.kapitalbank.az/" target="_blank" rel="noreferrer" className="pasha-bank">
                            <img src="/images/kapital-bank.svg" alt="Kapital Bank" />
                        </a>

                        <a href="https://www.pasha-insurance.az/" target="_blank" rel="noreferrer" className="pasha-bank">
                            <img src="/images/pasha-insurance.svg" alt="PAŞA Sığorta" />
                        </a>

                        <a href="https://www.pasha-life.az/" target="_blank" rel="noreferrer" className="pasha-bank">
                            <img src="/images/pasha-life.svg" alt="PAŞA Həyat" />
                        </a>

                        <a href="https://www.pashaconstruction.az/" target="_blank" rel="noreferrer" className="pasha-bank">
                            <img src="/images/pasha-construction.svg" alt="PAŞA İnşaat" />
                        </a>

                        <a href="https://www.pashadevelopment.az/" target="_blank" rel="noreferrer" className="pasha-bank">
                            <img src="/images/pasha-development.svg" alt="PAŞA Development" />
                        </a>

                        <a href="https://www.pashatravel.az/" target="_blank" rel="noreferrer" className="pasha-bank">
                            <img src="/images/pasha-travel.svg" alt="PAŞA Travel" />
                        </a>

                        <a href="https://www.pashacapital.az/" target="_blank" rel="noreferrer" className="pasha-bank">
                            <img src="/images/pasha-capital.svg" alt="PAŞA Kapital" />
                        </a>

                        <a href="https://www.absheronhotelgroup.az/" target="_blank" rel="noreferrer" className="pasha-bank">
                            <img src="/images/abseron-hotel-group.svg" alt="Abşeron Hotel Group" />
                        </a>

                        <a href="https://www.pashainvestments.az/" target="_blank" rel="noreferrer" className="pasha-bank">
                            <img src="/images/pasha-investments.svg" alt="PAŞA Investments" />
                        </a>

                        <a href="https://www.pashatechnology.az/" target="_blank" rel="noreferrer" className="pasha-bank">
                            <img src="/images/pasha-technology.svg" alt="PAŞA Technology" />
                        </a>

                        <a href="https://www.competo.az/" target="_blank" rel="noreferrer" className="pasha-bank">
                            <img src="/images/pasha-competo.svg" alt="Competo" />
                        </a>

                    </div>

                </div>
            </div>


            {/* Səhifənin aşağı hissəsi */}
            <div className="icmal-footer">

                {/* Footer-in sol hissəsi */}
                <div className="icmal-footer-left">

                    <span>© 2026 PAŞA Holding</span>

                    <span>
                        Site by <a href="https://www.jis.az/" target="_blank" rel="noreferrer">JIS</a>
                    </span>

                </div>


                {/* Sosial media linkləri */}
                <div className="icmal-footer-right">

                    <div className="icmal-footer-socials">

                        <span>Bizi izlə</span>

                        <a href="#" aria-label="LinkedIn">
                            <i className="bi bi-linkedin"></i>
                        </a>

                        <a href="#" aria-label="Facebook">
                            <i className="bi bi-facebook"></i>
                        </a>

                        <a
                            href="https://www.instagram.com/lifeatpashagroup/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                        >
                            <i className="bi bi-instagram"></i>
                        </a>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Icmal;
