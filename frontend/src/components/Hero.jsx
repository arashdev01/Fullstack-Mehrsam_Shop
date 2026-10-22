import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSlider() {
  const products = [
    { id: 1, title: 'هودی راحت و روزمره', price: 'پیشنهاد مهرسام', img: '/images/products/green-hoodie.png' },
    { id: 2, title: 'تی‌شرت مینیمال', price: 'استایل روزانه', img: '/images/products/imgi_20_shirt1.webp' },
    { id: 3, title: 'کفش برای استایل جین', price: 'انتخاب فصل', img: '/images/products/imgi_17_shoes1.webp' },
    { id: 4, title: 'کلاه و اکسسوری', price: 'جزئیات استایل', img: '/images/products/imgi_19_cap5.webp' },
  ];

  const rootRef = useRef(null);


  return (
    <section className="hero-root" ref={rootRef}>
      <style>{`
  @media (max-width: 767px) {
    .mobile-height { height: 60px !important; }
    .mobile-height img { height: 60px !important; width: 120px !important; }
  }
`}
      </style>
      <style>{`
        .hero-root {
          direction: rtl; 
          padding: 10px; 
          margin: 20px;
        }

        .hero-inner {
          display: grid; 
          grid-template-columns: 0.4fr 1fr;
          gap: 30px;
          max-width: 1450px; 
          margin: 0 auto;
        }

        /* ✅ hero-box بدون بکگراند */
        .hero-box {
          border-radius: 15px; 
          padding: 19px;
          margin: -10px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          min-height: 240px;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.3);
        }

        /* ✅ باکس راست - فقط رنگ جین */
        .box-text {
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

            /* ✅ رنگ + بافت جین */
            background-color: #275778;
            background-image: 
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.11) 2px,
                rgba(255, 255, 255, 0.1) 4px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 2px,
                rgba(0,0,0,0.1) 2px,
                rgba(0,0,0,0.1) 4px
              ),
              repeating-linear-gradient(
                90deg,
                rgba(255,255,255,0.03) 0px,
                rgba(255,255,255,0.03) 1px,
                transparent 1px,
                transparent 6px
              );
            background-size: 6px 6px, 6px 6px, 100% 100%;
          }

        /* ✅ باکس چپ - عکس جین‌شاپ */
        .box-slider {
          align-items: left;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          background-image: 
            radial-gradient(circle at top right, rgba(107, 69, 155, 0.18) 0%, rgba(242, 183, 159, 0.18) 60%),
            url('/images/slider/jeans-shop.webp');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        /* بخش اسلایدر */
        .slider-container {
          overflow: hidden; width: 100%;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .slider-track {
          display: flex; gap: 20px;
          animation: scroll 15s linear infinite;
        }

        .slider-track:hover { animation-play-state: paused; }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-200px * 2)); }
        }

        .premium-card {
          background: rgba(107, 69, 155, 0.07); backdrop-filter: blur(10px);
          border: 1px solid rgba(107, 69, 155, 0.20); border-radius: 25px;
          padding: 15px; min-width: 180px; text-align: center; text-decoration: none;
        }

        .card-media { background: rgba(107, 69, 155, 0.04); border-radius: 20px; height: 120px; display: flex; align-items: center; justify-content: center; }
        .card-media img { width: 70%; }

        @media (max-width: 1000px) {
          .hero-inner { grid-template-columns: 1fr; }
          .box-text { align-items: center; text-align: center; }
          .hero-box { min-height: 155px; }
        }
      `}
      </style>

      <div className="hero-inner">

        {/* جعبه اول: متن و دکمه */}
        <div className="hero-box box-text">
          <h5 className="hero-title">کالکشن <span>اختصاصی</span></h5>
          <p style={{ color: 'white', marginBottom: '25px' }}>محصولات را ورق بزنید...</p>
          <Link to="/products" style={{
            background: 'linear-gradient(90deg, #038817d6, #038d0a)',
            color: 'white', padding: '12px 65px', borderRadius: '9px', textDecoration: 'none', fontWeight: 'bold'
          }}>خرید سریع</Link>
        </div>

        {/* جعبه دوم: اسلایدر محصولات */}
        <div className="hero-box box-slider">
          <div className="slider-container">
            <div className="slider-track">
              {[...products, ...products].map((p, index) => (
                <Link key={index} to="/products" className="premium-card">
                  <div className="card-media">
                    <img src={p.img} alt={p.title} />
                  </div>
                  <div style={{ color: 'white', marginTop: '10px', fontSize: '13px' }}>{p.title}</div>
                  <div style={{ color: '#106e07', fontWeight: 'bold', fontSize: '14px' }}>{p.price}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}