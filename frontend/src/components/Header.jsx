import { useState, useEffect, useRef } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import useSiteSettings from '../useSiteSettings';
import { useCart } from '../CartContext';
export default function Header() {
  const config = useSiteSettings();
  const username = localStorage.getItem('username');
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaTab, setMegaTab] = useState('digital');
  const megaRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const megaTabs = {
    digital: { label: 'شلوار جین', cols: [{ title: 'مدل‌ها', items: ['راسته', 'اسکینی', 'مام‌فیت', 'بگ', 'واید لگ'] }, { title: 'انتخاب بهتر', items: ['راهنمای سایز', 'فیت کلاسیک', 'فیت آزاد'] }], img: '/images/slider/jeans-shop.webp' },
    home: { label: 'بالاتنه', cols: [{ title: 'تی‌شرت و پیراهن', items: ['تی‌شرت ساده', 'پیراهن جین', 'پیراهن روزمره'] }, { title: 'لایه‌های گرم', items: ['هودی', 'سویشرت', 'کت جین'] }], img: '/images/products/green-hoodie.png' },
    fashion: { label: 'استایل زنانه', cols: [{ title: 'پوشاک', items: ['شلوار جین', 'تی‌شرت', 'هودی', 'کت جین'] }, { title: 'اکسسوری', items: ['کلاه', 'کیف', 'جوراب'] }], img: '/images/products/imgi_18_handbag3.webp' },
    art: { label: 'استایل مردانه', cols: [{ title: 'پوشاک جین', items: ['شلوار راسته', 'شلوار بگ', 'کت جین'] }, { title: 'روزمره', items: ['تی‌شرت', 'هودی', 'پیراهن'] }], img: '/images/products/imgi_20_shirt1.webp' },
    beauty: { label: 'اکسسوری', cols: [{ title: 'تکمیل استایل', items: ['کلاه', 'کیف', 'جوراب', 'کفش'] }, { title: 'انتخاب سریع', items: ['پرفروش‌ها', 'جدیدترین‌ها', 'تخفیف‌ها'] }], img: '/images/products/imgi_19_cap5.webp' },
    jewelry: { label: 'انتخاب مهرسام', cols: [{ title: 'کالکشن‌ها', items: ['روزمره', 'کژوال', 'جین کلاسیک'] }, { title: 'خرید آسان', items: ['همه محصولات', 'راهنمای سایز', 'پشتیبانی'] }], img: '/images/products/imgi_17_shoes1.webp' },
  };

  const navItems = [
    { label: 'صفحه نخست', to: '/' },
    { label: 'محصولات', to: '/products', sub: [{ label: 'همه محصولات', to: '/products' }, { label: 'شلوار جین', to: '/category/jeans' }, { label: 'هودی و تی‌شرت', to: '/category/tops' }] },
    { label: 'تماس با فروشگاه', to: '/contact', sub: [{ label: 'سوالات متداول', to: '/contact' }, { label: 'تماس با ما', to: '/contact' }] },
    { label: 'بلاگ آموزشی', to: '/blog', sub: [{ label: 'آرشیو مطالب', to: '/blog' }, { label: 'داخلی بلاگ', to: '/blog/1' }] },
    { label: 'خرید آسان', to: '/products', sub: [{ label: 'سبد خرید', to: '/cart' }, { label: 'تکمیل سفارش', to: '/checkout' }, { label: 'ورود', to: '/login' }, { label: 'ثبت‌نام', to: '/register' }] },
    { label: 'پروفایل کاربری', to: '/profile', sub: [{ label: 'مشخصات کاربری', to: '/profile' }, { label: 'سفارشات', to: '/profile/orders' }, { label: 'آدرس‌ها', to: '/profile/addresses' }, { label: 'علاقه‌مندی‌ها', to: '/profile/favorites' }] },
  ];

  const active = megaTabs[megaTab];

  return (
    <>


      <section id="header" dir="rtl">

        {/* نوار بالا */}
        <div id="encode4325436">
          <div className="container">
            <div className="row">
              <div className="col-8 d-none d-md-block">
                <ul>
                  <li><Link to="/">صفحه نخست</Link></li>
                  <li><Link to="/about">درباره ما</Link></li>
                  <li><Link to="/contact">تماس با ما</Link></li>
                </ul>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-center" id="top-encode43vfbb65gtabfb">
                <a href={`tel:${config.phone}`} style={{
                  display: 'inline-flex',
                  height: '32px',
                  alignItems: 'center',
                  background: '#f2b79f',
                  color: '#000',
                  padding: '2px 15px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  gap: '8px',
                  marginTop: '2px'
                }}>
                  <i className="fa fa-phone" style={{ fontSize: '14px' }}></i>
                  <span style={{ letterSpacing: '1px' }}>{config.phone}</span>
                  <span style={{ background: '#e6a08a', height: '32px', color: '#073403', padding: '1px 10px', borderRadius: '5px', fontSize: '11px' }}>تماس</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* نوار جستجو */}
        <div id="encode43254bvfb">
          <div className="container pt-1">
            <div className="row align-items-center">
              <div className="col-12 col-md-3 col-xl-2 text-center text-md-start pb-2" id="encode4326523bvfb">
                <Link to="/"><img src={config.logo} alt={config.siteName} style={{ height: '58px' }} /></Link>
              </div>
              <div className="col-12 col-md-5 col-xl-6">
                <div id="search-bar">
                  <i className="fa fa-search"></i>
                  <input type="search" aria-label="جستجوی محصولات" placeholder="جستجوی شلوار جین، هودی و ..." onKeyDown={(e) => { if (e.key === "Enter" && e.currentTarget.value.trim()) window.location.assign("/products?search=" + encodeURIComponent(e.currentTarget.value.trim())); }} />
                </div>
              </div>
              <div className="col-md-4 d-none d-lg-flex">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'nowrap' }}>
                  {username ? (
                    <div style={{ position: 'relative' }} className="account-dropdown">
                      <button style={{ background: 'linear-gradient(135deg,#6b459b,#8b66b3)', border: 'none', borderRadius: '8px', padding: '7px 16px', color: 'white', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', fontFamily: 'inherit' }}>
                        <i className="fa fa-user-circle"></i>{username}<i className="fa fa-chevron-down" style={{ fontSize: '10px' }}></i>
                      </button>
                      <div className="acc-menu">
                        <Link to="/profile"><i className="fa fa-user"></i> پروفایل</Link>
                        <Link to="/profile/orders"><i className="fa fa-box"></i> سفارشات</Link>
                        <hr style={{ margin: '4px 0' }} />
                        <a href="/" onClick={(e) => { e.preventDefault(); localStorage.clear(); window.location.reload() }} style={{ color: '#e74c3c' }}><i className="fa fa-sign-out-alt"></i> خروج</a>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <Link to="/login" style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #6b459b', color: '#6b459b', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>ورود</Link>
                      <Link to="/register" style={{ padding: '6px 14px', borderRadius: '20px', background: 'linear-gradient(135deg,#6b459b,#8b66b3)', color: 'white', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>عضویت</Link>
                    </div>
                  )}
                  <Link to="/cart" style={{ background: '#6b459b', color: 'white', borderRadius: '8px', padding: '7px 14px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
                    <i className="fa fa-shopping-cart"></i>
                    <span className="d-none d-lg-inline">سبد خرید</span>
                    <span style={{ background: '#e74c3c', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* نوار منو */}
        <div id="main-nav">
          <div className="container">
            {/* hamburger سمت راست */}
            <button className="mobile-toggle" onClick={() => setMobileOpen(true)}>
              <span /><span /><span />
            </button>

            {/* دکمه‌های موبایل */}
            <div className="d-flex d-lg-none ms-auto align-items-center" style={{ gap: '6px' }}>
              <Link to="/cart" className="mob-btn-cart" style={{ background: '#6b459b', color: 'white', borderRadius: '8px', height: '30px', padding: '0 10px', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold' }}>
                <i className="fa fa-shopping-cart"></i>
                <span style={{ background: '#e74c3c', color: 'white', borderRadius: '50%', width: '15px', height: '15px', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>
              </Link>
              {username ? (
                <Link to="/profile" className="mob-btn-user" style={{ background: 'linear-gradient(135deg,#6b459b,#8b66b3)', color: 'white', borderRadius: '8px', height: '30px', padding: '0 10px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold' }}>
                  <i className="fa fa-user-circle"></i> {username}
                </Link>
              ) : (
                <Link to="/login" className="mob-btn-user" style={{ background: 'linear-gradient(135deg,#6b459b,#8b66b3)', color: 'white', borderRadius: '8px', height: '30px', padding: '0 10px', display: 'flex', alignItems: 'center', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold' }}>ورود</Link>
              )}
            </div>

            {/* منوی دسکتاپ */}
            <ul className="nav-list" style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
              <li ref={megaRef} style={{ position: 'static' }} className="d-none d-lg-block">
                <a href="#" style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: '#0c0c0c' }} onClick={(e) => { e.preventDefault(); setMegaOpen(!megaOpen); }}>
                  <i className="fa fa-bars" style={{ marginLeft: '6px' }}></i>گروه های محصولات
                  <span className="arrow" style={{ fontSize: '10px', marginRight: '5px' }}>▼</span>
                </a>
                {megaOpen && (
                  <div className="mega-dropdown" style={{ position: 'absolute', minHeight: '350px', padding: '20px', top: '120%', right: 30, left: 0, width: '75%', display: 'flex', flexDirection: 'row', zIndex: 9999999 }}>
                    <div className="mega-tabs" style={{ width: '180px', display: 'flex', flexDirection: 'column' }}>
                      {Object.entries(megaTabs).map(([key, val]) => (
                        <button key={key} className={`mega-tab-btn ${megaTab === key ? 'active' : ''}`}
                          style={{ padding: '12px', textAlign: 'right', border: 'none', background: megaTab === key ? '#6b459b' : 'transparent', color: megaTab === key ? '#000' : '#282828', cursor: 'pointer', fontSize: '14px' }}
                          onMouseEnter={() => setMegaTab(key)} onClick={() => setMegaTab(key)}>{val.label}</button>
                      ))}
                    </div>
                    <div className="mega-content" style={{ flex: 1, display: 'flex', flexWrap: 'wrap', padding: '0 20px', gap: '20px' }}>
                      {active.cols.map((col, i) => (
                        <div key={i} className="mega-col" style={{ minWidth: '150px' }}>
                          <h5 style={{ fontSize: '15px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>{col.title}</h5>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {col.items.map((item, j) => (
                              <Link key={j} to="/products" style={{ color: '#444', textDecoration: 'none', fontSize: '13px', padding: '3px 0' }} onClick={() => setMegaOpen(false)}>{item}</Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mega-img d-none d-lg-block" style={{ width: '160px', height: '150px' }}>
                      <img src={active.img} alt={active.label} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                    </div>
                  </div>
                )}
              </li>
              {navItems.map((item, i) => (
                <li key={i} className="d-none d-lg-block">
                  <Link to={item.to}>{item.label}{item.sub && <span className="arrow">▼</span>}</Link>
                  {item.sub && <ul className="sub-menu">{item.sub.map((s, j) => <li key={j}><Link to={s.to}>{s.label}</Link></li>)}</ul>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className={`mob-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`mob-panel ${mobileOpen ? 'open' : ''}`}>
        <div className="mob-head">
          <h5>منو</h5>
          <button className="mob-close" onClick={() => setMobileOpen(false)}>✕</button>
        </div>
        <ul className="mob-nav">
          {[
            { label: 'صفحه نخست', to: '/' },
            { label: 'محصولات', to: '/products' },
            { label: 'درباره ما', to: '/about' },
            { label: 'تماس با ما', to: '/contact' },
            { label: 'بلاگ', to: '/blog' },
            { label: 'سبد خرید', to: '/cart' },
            ...(username ? [{ label: 'پروفایل', to: '/profile' }] : []),
            ...(username ? [{ label: 'خروج', to: '/', onClick: () => { localStorage.clear(); window.location.reload(); } }] : []),
          ].map((item, i) => (
            <li key={i}>
              <Link to={item.to} onClick={() => { setMobileOpen(false); if (item.onClick) item.onClick(); }}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}