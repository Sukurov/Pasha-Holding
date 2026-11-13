import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contacts.css';

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

function Contacts() {
    const [form, setForm] = useState({ fullName: '', email: '', phone: '+994 ', message: '' });
    const [status, setStatus] = useState('');
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });

        setTimeout(() => {
            setNotification((prev) => ({ ...prev, show: false }));
        }, 4500);
    };

    // Telefon nömrəsini avtomatik +994 və maska ilə formatlayan funksiya
    const handlePhoneChange = (e) => {
        let input = e.target.value;

        // Əgər istifadəçi səhvən başlanğıcdakı "+994 " prefiksini silməyə çalışırsa, yenidən bərpa edirik
        if (!input.startsWith('+994')) {
            input = '+994 ';
        }

        // Yalnız rəqəmləri götürürük (+994 xaric digər simvolları təmizləyirik)
        const numbers = input.replace(/\D/g, '').substring(3); // 994-dən sonrakı rəqəmlər

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

        setForm({ ...form, phone: formatted });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Ad, Soyad yoxlaması
        if (form.fullName.trim().length < 3) {
            showNotification('Ad və Soyad ən az 3 hərfdən ibarət olmalıdır!', 'error');
            return;
        }

        // 2. E-poçt formatının yoxlanması
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email.trim())) {
            showNotification('Zəhmət olmasa düzgün və tam e-poçt ünvanı daxil edin (məs: ad@gmail.com)!', 'error');
            return;
        }

        // 3. Telefon nömrəsinin tamlığı yoxlanması (+994 (XX) XXX-XX-XX)
        const cleanPhone = form.phone.replace(/\D/g, '');
        if (cleanPhone.length !== 12) { // 994 + 9 rəqəm = 12 rəqəm
            showNotification('Zəhmət olmasa nömrəni tam daxil edin (məs: +994 50 123 45 67)!', 'error');
            return;
        }

        // 4. Mesaj yoxlaması (ən az 15 simvol)
        if (form.message.trim().length < 15) {
            showNotification(`Mesajınız çox qısadır. Ən az 15 hərf yazmalısınız! (Hazırda: ${form.message.trim().length})`, 'error');
            return;
        }

        setStatus('Göndərilir...');

        const serviceID = 'service_3ke81u5';
        const templateID = 'template_kp3zpte';
        const publicKey = 'UsFjDizvbn5-Wwk78';

        const templateParams = {
            name: form.fullName,
            email: form.email,
            phone: form.phone,
            message: form.message,
        };

        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then(() => {
                showNotification(`Təşəkkür edirik, ${form.fullName}! Mesajınız uğurla göndərildi.`, 'success');
                setForm({ fullName: '', email: '', phone: '+994 ', message: '' });
                setStatus('');
            })
            .catch((error) => {
                console.error('Xəta baş verdi:', error);
                showNotification('Mesaj göndərilərkən xəta baş verdi. Yenidən cəhd edin.', 'error');
                setStatus('');
            });
    };

    return (
        <>
            <div className="contact-page">
                <div className={`floating-alert ${notification.type} ${notification.show ? 'show' : ''}`}>
                    <span>{notification.message}</span>
                </div>

                <div className="contact-container">
                    <div className="contact-header">
                        <span className="contact-subtitle">ƏLAQƏ MƏLUMATLARI</span>
                        <h1 className="contact-title">Bizimlə Əlaqə</h1>
                        <p className="contact-description">
                            Suallarınız və əməkdaşlıq təklifləriniz üçün ofislərimizlə əlaqə saxlaya və ya bizə birbaşa yaza bilərsiniz.
                        </p>
                    </div>

                    <div className="offices-grid">
                        {offices.map((office, index) => (
                            <div className="office-card" key={index}>
                                <div className="office-badge">{office.badge}</div>
                                <h2 className="office-city">{office.city}</h2>
                                <p className="office-company">{office.company}</p>

                                <div className="office-details">
                                    <div className="detail-item">
                                        <span className="detail-label">Ünvan:</span>
                                        <span className="detail-text">{office.address}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Telefon:</span>
                                        <a href={office.phoneHref} className="detail-link">{office.phone}</a>
                                    </div>
                                    {office.fax && (
                                        <div className="detail-item">
                                            <span className="detail-label">Faks:</span>
                                            <span className="detail-text">{office.fax}</span>
                                        </div>
                                    )}
                                    <div className="detail-item">
                                        <span className="detail-label">E-poçt:</span>
                                        <a href={`mailto:${office.email}`} className="detail-link">{office.email}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="contact-form-card">
                        <h3 className="form-title">Bizə Yazın</h3>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="fullName" className="form-label">Ad, Soyad</label>
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

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">E-poçt ünvanınız</label>
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

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">Əlaqə nömrəsi</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-input"
                                    placeholder="+994 (50) 000-00-00"
                                    value={form.phone}
                                    onChange={handlePhoneChange} // Xüsusi telefon funksiyası qoşuldu
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Mesajınız</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-textarea"
                                    placeholder="Müraciətinizi buraya yazın (ən az 15 hərf)..."
                                    rows="4"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="contact-btn">
                                {status || 'Göndər'}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
            <footer className="ceo-footer">
                <div className="ceo-footer-left">
                    <span>© 2026 PAŞA Holding</span>
                    <span>
                        Site by <a href="https://www.jis.az/" target="_blank" rel="noreferrer">JIS</a>
                    </span>
                </div>

                <div className="ceo-footer-right">
                    <div className="ceo-footer-socials">
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
            </footer>
        </>
    );
}

export default Contacts;