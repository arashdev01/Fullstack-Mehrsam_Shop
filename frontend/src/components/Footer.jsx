import './Footer.css';
import React from 'react';
import { Link } from 'react-router-dom';
import useSiteSettings from '../useSiteSettings';

const Footer = () => {
  const config = useSiteSettings();
  return (
    <>
      <section className="custom-footer" id="footer" style={{ borderTop: 'none' }}>
        <div className="container">
          <div className="row py-3 mx-0">

            {/* بخش دسترسی، ناحیه کاربری و لوگو */}
            <div className="col-12 col-lg-6 mb-0">
              <div className="row align-items-start">
                {/* دسترسی سریع */}
                <div className="col-4">
                  <div className="title">دسترسی سریع</div>
                  <ul>
                    <li><Link to="/blog">بلاگ آموزشی</Link></li>
                    <li><Link to="/faq">راهنمای خرید</Link></li>
                    <li><Link to="/faq">شیوه پرداخت</Link></li>
                  </ul>
                </div>

                {/* ناحیه کاربری */}
                <div className="col-4">
                  <div className="title">ناحیه کاربری</div>
                  <ul>
                    <li><Link to="/login">ورود به سایت</Link></li>
                    <li><Link to="/cart">سبد خرید</Link></li>
                    <li><Link to="/checkout">پیش فاکتور</Link></li>
                  </ul>
                </div>

                {/* لوگو + اطلاعات تماس (فقط در موبایل زیر لوگو میاید) */}
                <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                  <img
                    src={config.logo}
                    alt={config.siteName}
                    className="footer-logo-img"
                  />
                  {/* این بخش فقط در موبایل زیر لوگو نمایش داده می‌شود */}
                  <div className="contact-info-mobile d-lg-none text-center mt-2">
                    <small>۷ روز هفته، ۲۴ ساعت شبانه روز</small>
                    <h6>{config.phone}</h6>
                  </div>
                </div>
              </div>
            </div>

            {/* بخش نمادها */}
            <div className="col-12 col-lg-6">
              <hr className="d-lg-none mb-3 text-center" />
              <div className="row justify-content-center">
                {/* شماره تماس قدیمی در دسکتاپ (در موبایل مخفی شده چون بالا نمایش دادیم) */}
                <div className="col-12 col-md-6 text-center p-2 d-none d-lg-block">
                  <small style={{ display: 'block', marginBottom: '6px' }}>۷ روز هفته،  ۲۴  ساعت شبانه روز</small>
                  <h6 className="m-1" style={{ fontSize: '16px', fontWeight: 'bold' }}>{config.phone}</h6>
                </div>

                {/* نمادها */}
                <div className="col-12 col-md-6 pt-2 pt-md-3">
                  <div className="row g-2 justify-content-center align-items-center trust-icons-row">
                    <div className="col-auto">
                      <a href="#" className="d-block">
                        <img src="/images/encode43vfbbbfb/enamad.png" alt="enamad" className="img-enamad" />
                      </a>
                    </div>
                    <div className="col-auto">
                      <a href="#" className="d-block">
                        <img src="/images/encode43vfbbbfb/neshanemeli.png" alt="neshan" className="img-neshan" />
                      </a>
                    </div>
                  </div>
                </div>


              </div>
            </div>

          </div>
        </div>
      </section>

      {/* بخش کپی‌رایت */}
      <section className="py-3 py-lg-9" id="copyright">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-sm-6 text-center text-sm-start mb-2 mb-sm-0" id="social-links">
              <span style={{ marginLeft: '7px', fontSize: '13px' }}>ما را دنبال کنید</span>
              <a href="#" className="d-inline-block mx-2"><img src="/images/social/insta.png" alt="اینستاگرام" /></a>
              <a href="#" className="d-inline-block mx-2"><img src="/images/social/linkedin.png" alt="لینکدین" /></a>
              <a href="#" className="d-inline-block mx-2"><img src="/images/social/twitter.png" alt="توییتر" /></a>
              <a href="#" className="d-inline-block mx-2"><img src="/images/social/youtube.png" alt="یوتیوب" /></a>
            </div>
            <div className="col-12 col-sm-6 text-center text-sm-end">
              <span style={{ display: 'block', marginBottom: '-9px', fontSize: '17px', textAlign: 'right' }}>
                کلیه حقوق وبسایت متعلق به پوشاک مـهرسام است ©
              </span>
              <span style={{ fontSize: '11px', opacity: 0.8 }}>❤ Designed : Arash.Alikhani</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;