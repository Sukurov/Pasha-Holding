
import React from 'react';
import './Ceo.css';
import './CeoResponsive.css';

function Ceo() {
    return (
        <div className="ceo-page">
            <div className="ceo-content">

                <h1>Direktorun Müraciəti</h1>

                <div className="ceo-content-main">

                    <div className="ceo-text">
                        <p>
                            `
                            2006-cı ilin noyabr ayında yaradılan, baş ofisi Bakıda yerləşən "PAŞA Holding" MMC fəaliyyət göstərdiyi illər ərzində Azərbaycanın ən öndə gedən və korporativ idarəetmə təcrübəsini öz fəaliyyətində rəhbər tutan milli özəl biznes qruplarından birinə çevrilib. Holdinqin əsas investisiyaları maliyyə xidmətləri - bankçılıq və sığorta, tikinti, turizm və daşınmaz əmlak kimi qeyri-neft sektorlarında cəmlənib. Bir neçə il ərzində Holdinq, səhmdarların Korporativ Dəyərlərini və Baxışını nəzərə alaraq uğurlu korporativ idarəetmə təcrübəsi, biznes diversifikasiyasının tətbiqi və regional genişlənmə strategiyası sayəsində regionun mühüm və çoxtərəfli investisiya şirkətinə çevrilib.
                        </p>

                        <p>
                            Biz hazırkı gərgin biznes mühitində etimadlılığın əhəmiyyətinə qəti şəkildə inanırıq və Korporativ Dəyərlər üzərində qurulan strategiyamızın etibarlılığına əminik. Biz ən uğurlu korporativ təcrübənin, etimad və davamlılığın bariz nümunəsi olmaqla yanaşı, fəaliyyət göstərdiyimiz ölkələrə, səhmdarlarımıza, əməkdaşlarımıza, müştərilərimizə və tərəfdaşlarımıza xüsusi diqqət və qayğı ilə yanaşırıq.
                        </p>
                    </div>

                    <div className="ceo-img">
                        <img src="/images/ceo.png" alt="PASHA Holding CEO" />

                        <div className="ceo-img-info">
                            <h3>Cəlal Qasımov</h3>
                            <p>"PAŞA Holding"-in Baş İcraçı Direktoru"</p>
                        </div>
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
        </div>
    );
}

export default Ceo;
