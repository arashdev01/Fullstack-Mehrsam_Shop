import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const saleProducts = [
  { id: 1, img: '/images/products/p100.png', name: 'تی‌شرت ورزشی خارجی برند آدیداس مدل ۳۴۴۵', price: '۳,۹۹۰,۰۰۰', oldPrice: '۵,۷۰۰,۰۰۰', discount: 30 },
  { id: 2, img: '/images/products/p101.png', name: 'کلاه نقابدار مردانه مشکی نخ و پنبه درجه یک', price: '۳,۹۹۰,۰۰۰', oldPrice: '۵,۷۰۰,۰۰۰', discount: 30 },
  { id: 3, img: '/images/products/p102.png', name: 'کیف زنانه دستی مدل نرگس', price: '۳,۹۹۰,۰۰۰', oldPrice: '۵,۷۰۰,۰۰۰', discount: 30 },
  { id: 4, img: '/images/products/p103.png', name: 'کفش نایک مدل Air Max', price: '۳,۹۹۰,۰۰۰', oldPrice: '۵,۷۰۰,۰۰۰', discount: 30 },
];

function useCountdown(days = 0, hours = 12, minutes = 43, seconds = 0) {
  const [time, setTime] = useState({ days, hours, minutes, seconds });
  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) return { days, hours, minutes, seconds: seconds - 1 };
        if (minutes > 0) return { days, hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { days, hours: hours - 1, minutes: 59, seconds: 59 };
        if (days > 0) return { days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function SaleBanner() {
  const time = useCountdown(0, 12, 43, 0);

  return (
    <>
      {/* ─── بنر آبی ─── */}
      <style>{`
        .sale-banner-box { padding: 18px 28px; }
        @media (max-width: 767px) {
          .sale-banner-box {
            flex-direction: column !important;
            align-items: flex-end !important;
            padding: 40px 14px 14px !important;
            gap: 4px !important;
            text-align: right;
          }
          .sale-banner-box h3 { font-size: 15px !important; margin: 0 !important; }
          .disc-text { font-size: 15px !important; }
          .sale-banner-box a.banner-btn {
            padding: 7px 0 !important;
            font-size: 12px !important;
            width: 100% !important;
            text-align: center !important;
            border-radius: 6px !important;
            margin-top: 4px;
          }
        }
      `}</style>
      <section className="my-4">
        <div className="container-fluid px-3 px-lg-4">
          <div className="sale-banner-box" style={{
            background: 'linear-gradient(135deg, #1a237e 0%, #1565c0 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* برچسب فروش ویژه */}
            <div style={{
              background: '#f5a623',
              color: '#fff',
              padding: '4px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 'bold',
              position: 'absolute',
              top: 0,
              right: 0,
              borderBottomLeftRadius: '10px',
              borderTopRightRadius: '12px',
            }}>
              فروش ویژه
            </div>

            {/* متن */}
            <div style={{ color: '#fff', textAlign: 'right' }}>
              <h3 style={{ fontWeight: 900, fontSize: '22px', margin: 0 }}>
                انواع کیف و کفش زنانه
              </h3>
            </div>

            {/* تخفیف */}
            <div className="disc-text" style={{ color: '#f5a623', fontWeight: 900, fontSize: '26px'  , textAlign: 'left'}}>
              تا ۵۰٪ تخفیف
            </div>

            {/* دکمه */}
            <Link to="/products" className="banner-btn" style={{
              background: '#f5a623',
              color: '#fff',
              padding: '10px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px',
              whiteSpace: 'nowrap',
            }}>
              ‹ مشاهده محصولات
            </Link>
          </div>
        </div>
      </section>

      {/* ─── محصولات فروش ویژه + تایمر ─── */}
      <section className="mb-5">
        <div className="container-fluid px-3 px-lg-4">
          <div className="row g-3 align-items-stretch">

            {/* محصولات */}
            {saleProducts.map(p => (
              <div key={p.id} className="col-6 col-sm-6 col-md-3 col-lg-2">
                <div style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '16px 12px',
                  textAlign: 'center',
                  position: 'relative',
                  height: '100%',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                }}>
                  {/* برچسب تخفیف */}
                  <span style={{
                    position: 'absolute', top: '10px', right: '10px',
                    background: '#f5a623', color: '#fff',
                    fontSize: '11px', fontWeight: 'bold',
                    padding: '2px 8px', borderRadius: '6px',
                  }}>فروش ویژه</span>

                  <Link to={`/product/${p.id}`}>
                    <img src={p.img} alt={p.name}
                      onError={e => { e.target.onerror=null; e.target.src='/images/no-image.svg'; }}
                      style={{ width: '100%', maxHeight: '140px', objectFit: 'contain', marginBottom: '10px' }} />
                  </Link>

                  <p style={{ fontSize: '13px', color: '#333', marginBottom: '8px', lineHeight: 1.5 }}>
                    {p.name}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <span style={{
                      background: '#f5a623', color: '#fff',
                      fontSize: '11px', fontWeight: 'bold',
                      padding: '1px 6px', borderRadius: '4px',
                    }}>{p.discount}٪</span>
                    <span style={{ fontSize: '11px', color: '#aaa', textDecoration: 'line-through' }}>
                      {p.oldPrice}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginTop: '4px' }}>
                    {p.price} تومان
                  </div>

                  <Link to={`/product/${p.id}`} style={{
                    display: 'block',
                    marginTop: '10px',
                    background: '#f5f5f5',
                    color: '#333',
                    borderRadius: '6px',
                    padding: '6px',
                    fontSize: '12px',
                    textDecoration: 'none',
                    fontWeight: '600',
                  }}>
                    مشاهده محصول ›
                  </Link>
                </div>
              </div>
            ))}

            {/* تایمر */}
            <div className="col-6 col-sm-6 col-md-3 col-lg-2">
              <div style={{
                background: 'linear-gradient(135deg, #1a237e, #1565c0)',
                borderRadius: '12px',
                padding: '20px 16px',
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}>
                {/* آیکون درصد */}
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>
                  <span style={{ color: '#f5a623', fontWeight: 900 }}>٪</span>
                </div>

                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>پیشنهاد</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#f5a623', marginBottom: '16px' }}>
                  شگفت انگیز!
                </div>

                {/* تایمر */}
                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '16px', direction: 'ltr' }}>
                  {[
                    { val: time.days,    label: 'روز' },
                    { val: time.hours,   label: 'ساعت' },
                    { val: time.minutes, label: 'دقیقه' },
                    { val: time.seconds, label: 'ثانیه' },
                  ].map((t, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        minWidth: '34px',
                      }}>
                        {String(t.val).padStart(2, '0')}
                      </div>
                      <div style={{ fontSize: '10px', marginTop: '2px', opacity: 0.8 }}>{t.label}</div>
                    </div>
                  ))}
                </div>

                <Link to="/products" style={{
                  background: '#f5a623',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  width: '100%',
                  display: 'block',
                }}>
                  مشاهده محصولات ›
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
