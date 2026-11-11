
import React, { useEffect } from 'react';
import './Icmal.css';
import './IcmalResponsive.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Icmal() {
  useEffect(() => {
    const page = document.querySelector('.icmal-page');

    if (!page) return;

    let lastStep = -1;

    // Fon şəklinin Scale effekti
    const handleScroll = () => {
      const currentStep = Math.floor(window.scrollY / 100);

      if (currentStep === lastStep) return;

      lastStep = currentStep;

      const scale = Math.min(
        1 + currentStep * 0.018,
        1.8
      );

      page.style.setProperty('--bg-scale', scale);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    handleScroll();

    // GSAP animasiyaları
    const ctx = gsap.context(() => {

      // Başlıq animasiyası
      gsap.from('.icmal-content h1', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // İcmal mətnləri
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

      // Statistikalar
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

      // PAŞA şirkətlərinin loqoları
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

      // Footer animasiyası
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };

  }, []);

  return (
    <div className="icmal-page">

      <div className="icmal-content">

        <h1>Paşa Qrup İcmalı</h1>

        <div className="icmal-box">

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

          <div className="icmal-box-pul-vahid-main">

            <div className="icmal-box-pul-vahid">
              <span>20.5 mlrd. AZN</span>
              <p>31 dekabr 2023-cü il tarixi üçün Cəmi Aktivlər</p>
            </div>

            <div className="icmal-box-pul-vahid">
              <span>23.3 mlrd. AZN</span>
              <p>31 dekabr 2024-cü il tarixi üçün Cəmi Aktivlər</p>
            </div>

            <div className="icmal-box-pul-vahid">
              <span>2.83 mlrd. AZN</span>
              <p>31 dekabr 2023-cü il tarixi üçün Cəmi Kapital</p>
            </div>

            <div className="icmal-box-pul-vahid">
              <span>2.98 mlrd. AZN</span>
              <p>31 dekabr 2024-cü il tarixi üçün Cəmi Kapital</p>
            </div>

            <div className="icmal-box-pul-vahid">
              <span>2.4 mlrd. AZN</span>
              <p>31 dekabr 2023-cü il tarixi üçün Ümumi Gəlir</p>
            </div>

            <div className="icmal-box-pul-vahid">
              <span>3.07 mlrd. AZN</span>
              <p>31 dekabr 2024-cü il tarixi üçün Ümumi Gəlir</p>
            </div>

            <div className="icmal-box-pul-vahid">
              <span>35.2%</span>
              <p>
                31 dekabr 2023-cü il tarixi üçün Azərbaycanın
                bank sektorunda aktivlər üzrə Bazar Payı
              </p>
            </div>

            <div className="icmal-box-pul-vahid">
              <span>36.97%</span>
              <p>
                31 dekabr 2024-cü il tarixi üçün Azərbaycanın
                bank sektorunda aktivlər üzrə Bazar Payı
              </p>
            </div>

            <div className="icmal-box-pul-vahid">
              <span>20,000+</span>
              <p>
                31 dekabr 2023-cü il tarixi üçün Qrup üzrə
                Ümumi İşçi Sayı
              </p>
            </div>

            <div className="icmal-box-pul-vahid">
              <span>22,000+</span>
              <p>
                31 dekabr 2024-cü il tarixi üçün Qrup üzrə
                Ümumi İşçi Sayı
              </p>
            </div>

          </div>

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

      <div className="icmal-footer">

        <div className="icmal-footer-left">
          <span>© 2026 PAŞA Holding</span>

          <span>
            Site by <a href="https://www.jis.az/" target="_blank" rel="noreferrer">JIS</a>
          </span>
        </div>

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
