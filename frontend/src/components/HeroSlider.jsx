import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    img: '/images/slider/slide1.png',
    tag: 'فروش ویژه جشنواره تابستانه',
    title: 'کفش‌های ورزشی',
    subtitle: 'شروع قیمت از ۹۰۰ هزار تومان',
    link: '/products',
  },
  {
    id: 2,
    img: '/images/slider/slide2.png',
    tag: 'جدیدترین محصولات',
    title: 'پوشاک زنانه',
    subtitle: 'تا ۵۰٪ تخفیف',
    link: '/products',
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setActive(p => (p - 1 + slides.length) % slides.length);
  const next = () => setActive(p => (p + 1) % slides.length);

  return (
    <section id="hero-slider" className="my-3">
      <style>{`
        #hero-slider .slide-wrap {
          position: relative;
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
          background: #f5f5f5;
        }
        #hero-slider .slide-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.6s ease;
        }
        #hero-slider .slide-content {
          position: absolute;
          right: 60px;
          top: 50%;
          transform: translateY(-50%);
          text-align: right;
          z-index: 2;
        }
        #hero-slider .slide-tag {
          font-size: 14px;
          color: #555;
          margin-bottom: 8px;
        }
        #hero-slider .slide-title {
          font-size: 42px;
          font-weight: 900;
          color: #1a1a2e;
          line-height: 1.2;
          margin-bottom: 10px;
        }
        #hero-slider .slide-sub {
          font-size: 16px;
          color: #f5a623;
          margin-bottom: 20px;
          font-weight: 600;
        }
        #hero-slider .slide-btn {
          background: #f5a623;
          color: #fff;
          border: none;
          padding: 10px 28px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: bold;
          text-decoration: none;
          display: inline-block;
        }
        #hero-slider .slide-btn:hover { background: #e09500; color: #fff; }
        #hero-slider .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          background: rgba(255,255,255,0.85);
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        #hero-slider .nav-btn:hover { background: #fff; }
        #hero-slider .nav-prev { right: 12px; }
        #hero-slider .nav-next { left: 12px; }
        #hero-slider .dots {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 3;
        }
        #hero-slider .dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          border: 1px solid #ccc;
          cursor: pointer;
          transition: background 0.3s;
        }
        #hero-slider .dot.active { background: #f5a623; border-color: #f5a623; }
      `}</style>

      <div className="container-fluid px-3 px-lg-4">
        <div id="slide-wrap" className="slide-wrap">
          {slides.map((slide, i) => (
            <div key={slide.id} style={{
              position: 'absolute', inset: 0,
              opacity: i === active ? 1 : 0,
              transition: 'opacity 0.6s ease',
              pointerEvents: i === active ? 'auto' : 'none',
            }}>
              <img src={slide.img} alt={slide.title} className="slide-img"
                onError={e => { e.target.style.display='none'; }} />
              <div className="slide-content">
                <div className="slide-tag">{slide.tag}</div>
                <div className="slide-title">{slide.title}</div>
                <div className="slide-sub">{slide.subtitle}</div>
                <Link to={slide.link} className="slide-btn">خرید کنید ›</Link>
              </div>
            </div>
          ))}

          <button className="nav-btn nav-prev" onClick={prev}>‹</button>
          <button className="nav-btn nav-next" onClick={next}>›</button>

          <div className="dots">
            {slides.map((_, i) => (
              <div key={i} className={`dot ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
