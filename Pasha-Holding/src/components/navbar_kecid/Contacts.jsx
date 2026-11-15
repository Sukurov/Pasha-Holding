
import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

import './Contacts.css';


// =========================================
// OFİSLƏR HAQQINDA MƏLUMATLAR
// =========================================

const offices = [
    {
        badge: 'Baş Ofis',
        city: 'Azərbaycan, Bakı',
        company: '“PAŞA Holding” MMC',
        address: 'Port Baku 153, Neftçilər prospekti, AZ 1010, Bakı, Azərbaycan',
        phone: '(+994 12) 505 50 00',
        phoneHref: 'tel:+994125055000',
        fax: '(+994 12) 505 15 35',
        email: 'office@pasha-holding.az'
    },
    {
        badge: 'Nümayəndəlik',
        city: 'Türkiyə, İstanbul',
        company: '“PAŞA Holding” Türkiyə Nümayəndəliyi',
        address: 'PASHA Plaza, Sultan Selim Mahallesi, Eski Büyükdere Caddesi No:59 Kat:5, 34415, Kağıthane / İstanbul – Türkiye',
        phone: '(+90 212) 705 89 00',
        phoneHref: 'tel:+902127058900',
        email: 'office@pasha-holding.az'
    }
];


// =========================================
// CONTACTS KOMPONENTİ
// Əlaqə səhifəsinin əsas funksiyaları
// =========================================

function Contacts() {

    // Form məlumatlarının saxlanılması
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '+994 ',
        message: ''
    });

    // Formun göndərilmə vəziyyəti
    const [status, setStatus] = useState('');

    // Bildiriş məlumatları
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: ''
    });

    // Bildiriş taymerinin idarə olunması
    const notificationTimer = useRef(null);


    // Komponent bağlandıqda taymeri təmizləyir
    useEffect(() => {
        return () => {
            clearTimeout(notificationTimer.current);
        };
    }, []);


    // =========================================
    // BİLDİRİŞ FUNKSİYASI
    // Uğur və xəta mesajlarını göstərir
    // =========================================

    const showNotification = (message, type) => {

        // Əvvəlki taymeri dayandırır
        clearTimeout(notificationTimer.current);

        // Yeni bildirişi göstərir
        setNotification({
            show: true,
            message,
            type
        });

        // 4.5 saniyədən sonra bildirişi gizlədir
        notificationTimer.current = setTimeout(() => {
            setNotification((prev) => ({
                ...prev,
                show: false
            }));
        }, 4500);
    };


    // =========================================
    // TELEFON NÖMRƏSİNİN FORMATLANMASI
    // +994 prefiksi avtomatik əlavə olunur
    // =========================================

    const handlePhoneChange = (e) => {

        // Daxil edilən nömrədən yalnız rəqəmləri götürür
        let numbers = e.target.value.replace(/\D/g, '');

        // Başlanğıcdakı 994 prefiksini ayırır
        numbers = numbers.replace(/^994/, '');

        // Maksimum 9 rəqəm qəbul edir
        numbers = numbers.substring(0, 9);

        // Telefon nömrəsinin formatlanması
        let formatted = '+994 ';

        if (numbers.length > 0) {
            formatted += `(${numbers.substring(0, 2)}`;
        }

        if (numbers.length >= 3) {
            formatted += `) ${numbers.substring(2, 5)}`;
        }

        if (numbers.length >= 6) {
            formatted += `-${numbers.substring(5, 7)}`;
        }

        if (numbers.length >= 8) {
            formatted += `-${numbers.substring(7, 9)}`;
        }

        // Form məlumatını yeniləyir
        setForm((prev) => ({
            ...prev,
            phone: formatted
        }));
    };


    // =========================================
    // FORM MƏLUMATLARININ DƏYİŞDİRİLMƏSİ
    // Input və textarea sahələrini idarə edir
    // =========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    // =========================================
    // FORMUN GÖNDƏRİLMƏSİ
    // Məlumatları yoxlayır və EmailJS-ə göndərir
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Göndərilmə davam edirsə, təkrar göndərməyə icazə vermir
        if (status) return;


        // 1. Ad və soyad yoxlanışı

        if (form.fullName.trim().length < 3) {
            showNotification(
                'Ad və Soyad ən az 3 hərfdən ibarət olmalıdır!',
                'error'
            );
            return;
        }


        // 2. E-poçt ünvanının yoxlanışı

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(form.email.trim())) {
            showNotification(
                'Zəhmət olmasa düzgün və tam e-poçt ünvanı daxil edin (məs: ad@gmail.com)!',
                'error'
            );
            return;
        }


        // 3. Telefon nömrəsinin tamlığının yoxlanışı

        const cleanPhone = form.phone.replace(/\D/g, '');

        if (cleanPhone.length !== 12) {
            showNotification(
                'Zəhmət olmasa nömrəni tam daxil edin (məs: +994 50 123 45 67)!',
                'error'
            );
            return;
        }


        // 4. Mesajın uzunluğunun yoxlanışı

        if (form.message.trim().length < 15) {
            showNotification(
                `Mesajınız çox qısadır. Ən az 15 hərf yazmalısınız! (Hazırda: ${form.message.trim().length})`,
                'error'
            );
            return;
        }


        // Formun göndərilmə vəziyyətini dəyişir
        setStatus('Göndərilir...');


        // =========================================
        // EMAILJS TƏNZİMLƏMƏLƏRİ
        // =========================================

        const serviceID = 'service_3ke81u5';
        const templateID = 'template_kp3zpte';
        const publicKey = 'UsFjDizvbn5-Wwk78';


        // EmailJS-ə göndəriləcək məlumatlar
        const templateParams = {
            name: form.fullName.trim(),
            email: form.email.trim(),
            phone: form.phone,
            message: form.message.trim()
        };


        // =========================================
        // EMAILJS İLƏ MESAJIN GÖNDƏRİLMƏSİ
        // =========================================

        try {

            await emailjs.send(
                serviceID,
                templateID,
                templateParams,
                publicKey
            );

            // Uğurlu göndəriş bildirişi
            showNotification(
                `Təşəkkür edirik, ${form.fullName}! Mesajınız uğurla göndərildi.`,
                'success'
            );

            // Form sahələrini ilkin vəziyyətə qaytarır
            setForm({
                fullName: '',
                email: '',
                phone: '+994 ',
                message: ''
            });

        } catch (error) {

            // Xəta baş verdikdə konsola məlumat yazır
            console.error('Xəta baş verdi:', error);

            // İstifadəçiyə xəta bildirişi göstərir
            showNotification(
                'Mesaj göndərilərkən xəta baş verdi. Yenidən cəhd edin.',
                'error'
            );

        } finally {

            // Göndərilmə vəziyyətini sıfırlayır
            setStatus('');
        }
    };


    // =========================================
    // SƏHİFƏNİN VİZUAL HİSSƏSİ
    // =========================================

    return (
        <>

            {/* Əlaqə səhifəsinin əsas konteyneri */}
            <div className="contact-page">

                {/* Bildiriş pəncərəsi */}
                <div
                    className={`floating-alert ${notification.type} ${notification.show ? 'show' : ''}`}
                    role="status"
                    aria-live="polite"
                >
                    <span>{notification.message}</span>
                </div>


                {/* Əsas məzmun */}
                <div className="contact-container">


                    {/* Səhifənin başlıq hissəsi */}
                    <div className="contact-header">

                        <span className="contact-subtitle">
                            ƏLAQƏ MƏLUMATLARI
                        </span>

                        <h1 className="contact-title">
                            Bizimlə Əlaqə
                        </h1>

                        <p className="contact-description">
                            Suallarınız və əməkdaşlıq təklifləriniz üçün ofislərimizlə əlaqə saxlaya və ya bizə birbaşa yaza bilərsiniz.
                        </p>

                    </div>


                    {/* =========================================
                        OFİSLƏRİN MƏLUMAT KARTLARI
                    ========================================= */}

                    <div className="offices-grid">

                        {offices.map((office) => (

                            <div className="office-card" key={office.city}>

                                <div className="office-badge">
                                    {office.badge}
                                </div>

                                <h2 className="office-city">
                                    {office.city}
                                </h2>

                                <p className="office-company">
                                    {office.company}
                                </p>


                                {/* Ofis əlaqə məlumatları */}
                                <div className="office-details">


                                    {/* Ünvan */}
                                    <div className="detail-item">

                                        <span className="detail-label">
                                            Ünvan:
                                        </span>

                                        <span className="detail-text">
                                            {office.address}
                                        </span>

                                    </div>


                                    {/* Telefon */}
                                    <div className="detail-item">

                                        <span className="detail-label">
                                            Telefon:
                                        </span>

                                        <a
                                            href={office.phoneHref}
                                            className="detail-link"
                                        >
                                            {office.phone}
                                        </a>

                                    </div>


                                    {/* Faks məlumatı varsa göstərilir */}
                                    {office.fax && (

                                        <div className="detail-item">

                                            <span className="detail-label">
                                                Faks:
                                            </span>

                                            <span className="detail-text">
                                                {office.fax}
                                            </span>

                                        </div>

                                    )}


                                    {/* E-poçt */}
                                    <div className="detail-item">

                                        <span className="detail-label">
                                            E-poçt:
                                        </span>

                                        <a
                                            href={`mailto:${office.email}`}
                                            className="detail-link"
                                        >
                                            {office.email}
                                        </a>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* =========================================
                        ƏLAQƏ FORMASI
                    ========================================= */}

                    <div className="contact-form-card">

                        <h3 className="form-title">
                            Bizə Yazın
                        </h3>


                        <form
                            onSubmit={handleSubmit}
                            className="contact-form"
                        >


                            {/* Ad və soyad sahəsi */}
                            <div className="form-group">

                                <label
                                    htmlFor="fullName"
                                    className="form-label"
                                >
                                    Ad, Soyad
                                </label>

                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    className="form-input"
                                    placeholder="Adınız və soyadınız (min. 3 hərf)"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* E-poçt sahəsi */}
                            <div className="form-group">

                                <label
                                    htmlFor="email"
                                    className="form-label"
                                >
                                    E-poçt ünvanınız
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="nümunə@gmail.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* Telefon sahəsi */}
                            <div className="form-group">

                                <label
                                    htmlFor="phone"
                                    className="form-label"
                                >
                                    Əlaqə nömrəsi
                                </label>

                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-input"
                                    placeholder="+994 (50) 000-00-00"
                                    value={form.phone}
                                    onChange={handlePhoneChange}
                                    required
                                />

                            </div>


                            {/* Mesaj sahəsi */}
                            <div className="form-group">

                                <label
                                    htmlFor="message"
                                    className="form-label"
                                >
                                    Mesajınız
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-textarea"
                                    placeholder="Müraciətinizi buraya yazın (ən az 15 hərf)..."
                                    rows="4"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* Formu göndərən düymə */}
                            <button
                                type="submit"
                                className="contact-btn"
                                disabled={Boolean(status)}
                            >
                                {status || 'Göndər'}
                            </button>

                        </form>

                    </div>

                </div>

            </div>


            {/* =========================================
                FOOTER
            ========================================= */}

            <footer className="ceo-footer">

                {/* Footer-in sol hissəsi */}
                <div className="ceo-footer-left">

                    <span>
                        © 2026 PAŞA Holding
                    </span>

                    <span>
                        Site by{' '}
                        <a
                            href="https://www.jis.az/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            JIS
                        </a>
                    </span>

                </div>


                {/* Sosial media linkləri */}
                <div className="ceo-footer-right">

                    <div className="ceo-footer-socials">

                        <span>
                            Bizi izlə
                        </span>


                        {/* LinkedIn */}
                        <a href="#" aria-label="LinkedIn">
                            <i className="bi bi-linkedin"></i>
                        </a>


                        {/* Facebook */}
                        <a href="#" aria-label="Facebook">
                            <i className="bi bi-facebook"></i>
                        </a>


                        {/* Instagram */}
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

            </footer>

        </>
    );
}

export default Contacts;
