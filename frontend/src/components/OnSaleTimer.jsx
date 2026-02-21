import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SALE_END = new Date(Date.now() + 38 * 24 * 60 * 60 * 1000);

export default function OnSaleTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = SALE_END - new Date();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="on-sale" className="py-1 py-md-4" style={{ background: '#57575815', borderRadius: '7px', margin: '0px 15px' }}>
      <h2 className="section-title text-center" style={{ color: '#260101', fontWeight: 'bold' }}>فروش ویژه</h2>
      <div className="section-subtitle text-center" style={{ color: '#1c0000' }}>محصولات دارای تخفیف ویژه به مدت محدود</div>

      <div className="container pt-4">
        <div className="row g-3">

          {/* بخش محصول اصلی با کادر سفید و تایمر افقی */}
          <div className="col-12 col-lg-6">
            <div className="bg- h-100 p-3 py-0" style={{ background: '#fafdff91', borderRadius: '12px' }}>
              <div className="row align-items-center h-100">
                {/* عکس محصول در سمت چپ در دسکتاپ */}
                <div className="col-12 col-sm-5 order-sm-2 text-center">
                  <Link to="/product/1">
                    <img src="/images/products/slide(5).webp" className="img-fluid py-3" style={{ maxHeight: '180px' }} alt="phone" />
                  </Link>
                </div>

                {/* محتوا و تایمر در سمت راست */}
                <div className="col-12 col-sm-7 order-sm-1 ">
                  <div className="text-muted small">محصول ویژه امروز</div>
                  <div className="box-subtitle fw-bold">فروش به مدت محدود</div>
                  <Link to="/product/1" className="text-decoration-none">
                    <h6 className="product-title pt-3 text-dark">گوشی موبایل سامسونگ مدل Galaxy A51</h6>
                  </Link>
                  <div className="py-2">
                    <span className="text-danger fw-bold">4.500.000 تومان</span>
                    <del className="text-muted ms-2 small">4.800.000 تومان</del>
                  </div>

                  {/* تایمر افقی دقیقاً مثل دمو */}
                  <div className="d-flex gap-2 mt-2  text-center">
                    {[
                      { num: timeLeft.seconds, label: 'ثانیه' },
                      { num: timeLeft.minutes, label: 'دقیقه' },
                      { num: timeLeft.hours, label: 'ساعت' },
                      { num: timeLeft.days, label: 'روز' },
                    ].map((t, i) => (
                      <div key={i} className="flex-fill">
                        <div style={{ background: '#0ba708d2', color: 'white', borderRadius: '4px', padding: '4px 2px', fontSize: '16px', fontWeight: 'bold' }}>
                          {String(t.num).padStart(2, '0')}
                        </div>
                        <div style={{ fontSize: '13px', color: '#113e00', marginTop: '2px' }}>{t.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* محصولات کوچک کناری */}
          <div className="col-12 col-sm-6 col-lg-3 ">
            <div className="bg-white  h-100" style={{ borderRadius: '12px' }}>
              <Link to="/product/5">
                <div style={{ height: '180px', backgroundImage: "url('/images/products/33.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
              </Link>
              <div className="p-2 text-center">
                <h6 className="small fw-bold">مودم روتر دی-لینک</h6>
                <div className="text-danger small">4.500.000 تومان</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white h-100" style={{ borderRadius: '12px' }}>
              <Link to="/product/6">
                <div style={{ height: '180px', backgroundImage: "url('/images/products/green-hoodie.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
              </Link>
              <div className="p-2 text-center">
                <h6 className="small fw-bold">دوربین دیجیتال AX6065</h6>
                <div className="text-danger small">4.500.000 تومان</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
<style>{`
  @media (max-width: 768px) {
    #on-sale .on-sale-encode4326654321vfb {
      min-height: auto !important;
    }
    
    #on-sale .on-sale-encode4326654321vfb .image {
      height: 140px !important;
    }
    
    #on-sale .encode4326654321vfb {
      margin-bottom: 12px;
    }
    
    #on-sale .encode4326654321vfb .image {
      height: 150px !important;
    }
    
    #on-sale .details h2 {
      font-size: 13px !important;
    }
  }
`}</style>