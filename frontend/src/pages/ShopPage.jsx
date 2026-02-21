import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider'
import CategoryBoxes from '../components/CategoryBoxes'
import SaleBanner from '../components/SaleBanner'

// ─── محصولات منتخب ───────────────────────────────────────
const featuredProducts = {
  featured: [
    { id: 1, img: 'p100.png', cat: 'گوشی موبایل', brand: 'سامسونگ', name: 'گوشی موبایل سامسونگ مدل Galaxy A51 دو سیم کارت', price: '6.000.000' },
    { id: 2, img: 'p200.png', cat: 'لپ تاپ', brand: 'ایسوس', name: 'لپ تاپ 15 اینچی ایسوس مدل VivoBook X543MA-DM905', price: '6.000.000' },
    { id: 3, img: 'p300.png', cat: 'جانبی موبایل', brand: 'سامسونگ', name: 'هدفون بی سیم سامسونگ مدل Galaxy Buds Live', price: '6.000.000' },
    { id: 4, img: 'p400.png', cat: 'دوربین', brand: 'کانن', name: 'دوربین دیجیتال کانن مدل EOS 2000D', price: '6.000.000' },
  ],
  'on-sale': [
    { id: 5, img: 'p303.png', cat: 'شبکه', brand: 'دی‌لینک', name: 'مودم روتر ADSL2 Plus بی‌سیم N300 دی-لینک', price: '4.500.000', oldPrice: '4.800.000', badge: true },
    { id: 6, img: 'p403.png', cat: 'دوربین', brand: 'آکسون', name: 'دوربین دیجیتال مدل AX6065', price: '4.500.000', oldPrice: '4.800.000', badge: true },
    { id: 7, img: 'p301.png', cat: 'جانبی', brand: '', name: 'هدفون بلوتوثی مدل P39 2021', price: '4.500.000', oldPrice: '4.800.000', badge: true },
    { id: 8, img: 'p402.png', cat: 'دوربین', brand: 'نیکون', name: 'دوربین دیجیتال نیکون مدل D3500', price: '4.500.000', oldPrice: '4.800.000', badge: true },
  ],
  'most-visited': [
    { id: 9, img: 'p403.png', cat: 'دوربین', brand: 'آکسون', name: 'دوربین دیجیتال مدل AX6065', price: '3.000.000' },
    { id: 10, img: 'p303.png', cat: 'شبکه', brand: 'دی‌لینک', name: 'مودم روتر ADSL2 Plus بی‌سیم N300 دی-لینک', price: '3.000.000' },
    { id: 11, img: 'p204.png', cat: 'لپ تاپ', brand: 'لنوو', name: 'لپ تاپ 15 اینچی لنوو مدل Lenovo Ideapad 330', price: '6.000.000' },
    { id: 12, img: 'p302.png', cat: 'جانبی', brand: '', name: 'اسپیکر بلوتوثی قابل حمل تی اند جی مدل Tg-113', price: '4.000.000' },
  ],
};

// ─── پرفروش‌ترین ─────────────────────────────────────────
const mostSalesProducts = {
  mobile: [
    { id: 20, img: 'p100.png', name: 'گوشی موبایل سامسونگ مدل Galaxy A51 دو سیم کارت', price: '6.000.000' },
    { id: 21, img: 'p101.png', name: 'گوشی موبایل شیائومی مدل POCO M3 دو سیم‌کارت', price: '5.000.000' },
    { id: 22, img: 'p102.png', name: 'گوشی موبایل سامسونگ مدل Galaxy A12 دو سیم کارت', price: '4.000.000' },
    { id: 23, img: 'p103.png', name: 'گوشی موبایل شیائومی مدل POCO X3 دو سیم‌کارت', price: '3.000.000' },
  ],
  laptop: [
    { id: 24, img: 'p200.png', name: 'لپ تاپ 15 اینچی ایسوس مدل VivoBook X543MA-DM905', price: '6.000.000' },
    { id: 25, img: 'p201.png', name: 'لپ تاپ 14 اینچی ایسوس مدل ZenBook UM433IQ', price: '5.000.000' },
    { id: 26, img: 'p202.png', name: 'لپ تاپ 15.6 اینچی ایسوس مدل R565JF-BQ078', price: '4.000.000' },
    { id: 27, img: 'p203.png', name: 'لپ تاپ 15 اینچی ایسوس مدل VivoBook X543MA - A', price: '3.000.000' },
  ],
  computer: [
    { id: 28, img: 'p300.png', name: 'هدفون بی سیم سامسونگ مدل Galaxy Buds Live', price: '6.000.000' },
    { id: 29, img: 'p301.png', name: 'هدفون بلوتوثی مدل P39 2021', price: '5.000.000' },
    { id: 30, img: 'p302.png', name: 'اسپیکر بلوتوثی قابل حمل تی اند جی مدل Tg-113', price: '4.000.000' },
    { id: 31, img: 'p303.png', name: 'مودم روتر ADSL2 Plus بی‌سیم N300 دی-لینک', price: '3.000.000' },
  ],
  camera: [
    { id: 32, img: 'p400.png', name: 'دوربین دیجیتال کانن مدل EOS 2000D', price: '6.000.000' },
    { id: 33, img: 'p401.png', name: 'دوربین دیجیتال آکسون مدل AX6062', price: '5.000.000' },
    { id: 34, img: 'p402.png', name: 'دوربین دیجیتال نیکون مدل D3500', price: '4.000.000' },
    { id: 35, img: 'p403.png', name: 'دوربین دیجیتال مدل AX6065', price: '3.000.000' },
  ],
};

// ─── کامپوننت کارت محصول ─────────────────────────────────
function ProductCard({ product }) {
  return (
    <div className="encode4326654321vfb">
      <Link to={`/product/${product.id}`}>
        <div className="image" style={{ backgroundImage: `url('/images/products/${product.img}')` }}>
          {product.badge && <span className="badge on-sale-badge">فروش ویژه</span>}
        </div>
      </Link>
      <div className="icons">
        <div className="btn btn-outline-secondary encode43243d"></div>
        <div className="btn btn-outline-secondary encode43bf243d"></div>
      </div>
      <div className="details p-3">
        {product.cat && (
          <div className="category">
            <Link to="/products">{product.cat}</Link>
            {product.brand && <>&nbsp;/&nbsp;<Link to="/products">{product.brand}</Link></>}
          </div>
        )}
        <Link to={`/product/${product.id}`}><h2>{product.name}</h2></Link>
        <div>
          {product.oldPrice && <span className="discounted">{product.oldPrice} تومان &nbsp;</span>}
          <span className="encode4365gbf265g43d">{product.price} تومان</span>
        </div>
        <div className="rate">
          <i className="fa fa-star-half-alt"></i>
          <i className="fa fa-star"></i><i className="fa fa-star"></i>
          <i className="fa fa-star"></i><i className="fa fa-star"></i>
          <span className="encode43bf265g43d">(14 رای دهنده)</span>
        </div>
      </div>
    </div>
  );
}

// ─── تایمر کانت‌داون ──────────────────────────────────────
function Countdown() {
  const target = new Date();
  target.setDate(target.getDate() + 3);

  const [time, setTime] = useState({ days: 3, hours: 13, minutes: 59, seconds: 30 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return prev;
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="counter mt-3">
      <div className="time-counter">
        <div className="seconds count"><div className="num">{String(time.seconds).padStart(2, '0')}</div><div className="label">ثانیه</div></div>
        <div className="minutes count"><div className="num">{String(time.minutes).padStart(2, '0')}</div><div className="label">دقیقه</div></div>
        <div className="hours count"><div className="num">{String(time.hours).padStart(2, '0')}</div><div className="label">ساعت</div></div>
        <div className="days count"><div className="num">{time.days}</div><div className="label">روز</div></div>
      </div>
    </div>
  );
}

// ─── صفحه اصلی ───────────────────────────────────────────
export default function ShopPage() {
  const [featuredTab, setFeaturedTab] = useState('featured');
  const [salesTab, setSalesTab] = useState('mobile');

  return (
    <main>
      <HeroSlider />
      <CategoryBoxes />
      <SaleBanner />

      {/* ─── محصولات منتخب ─── */}
      <section id="featured-products" className="my-5">
        <div className="container">
          <div className="row pb-2 pb-sm-4">
            <div className="col-12 text-center">
              <div className="btn-group" role="group" id="featured-products-nav">
                {[['featured', 'محصولات منتخب'], ['on-sale', 'تخفیف خورده'], ['most-visited', 'پربازدیدترین']].map(([val, label]) => (
                  <button key={val} type="button"
                    className={`btn featured-categories ${featuredTab === val ? 'active' : ''}`}
                    onClick={() => setFeaturedTab(val)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-md-4">
            {featuredProducts[featuredTab].map(p => (
              <div key={p.id} className="col"><ProductCard product={p} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── فروش ویژه ─── */}
      <section id="encode4365gbf2vfc65g43d" className="py-5 mt-5">
        <h1 className="section-title">فروش ویژه</h1>
        <div className="section-subtitle">محصولات دارای تخفیف ویژه به مدت محدود</div>
        <div className="container pt-4">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="on-sale-encode4326654321vfb h-100 p-3">
                <div className="row h-100">
                  <div className="col-12 col-sm-4 col-lg-5">
                    <Link to="/product/1">
                      <div className="image h-100" style={{ backgroundImage: "url('/images/products/p1000.png')" }}></div>
                    </Link>
                  </div>
                  <div className="col-12 col-sm-8 col-lg-7 py-3">
                    <div className="encode4365gbf2vrf">محصول ویژه امروز</div>
                    <div className="box-subtitle">فروش به مدت محدود</div>
                    <Link to="/product/1">
                      <div className="product-title pt-4">گوشی موبایل سامسونگ مدل Galaxy A51 دو سیم کارت</div>
                    </Link>
                    <div className="encode4365gbf265g43d py-2">
                      <span className="discounted">4.500.000 تومان</span>
                      <br className="d-sm-none" />
                      <span className="pre">4.800.000 تومان</span>
                    </div>
                    <div className="cta pt-2">
                      <Link to="/product/1" className="hvr-icon-back">
                        همین حالا بخرید <i className="fa fa-arrow-left hvr-icon"></i>
                      </Link>
                    </div>
                    <Countdown />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <ProductCard product={{ id: 5, img: 'p303.png', cat: 'شبکه', brand: 'دی‌لینک', name: 'مودم روتر ADSL2 Plus بی‌سیم N300 دی-لینک', price: '4.500.000', oldPrice: '4.800.000', badge: true }} />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <ProductCard product={{ id: 6, img: 'p403.png', cat: 'دوربین', brand: 'آکسون', name: 'دوربین دیجیتال مدل AX6065', price: '4.500.000', oldPrice: '4.800.000', badge: true }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── مزایا ─── */}
      <section id="benefits" className="pt-4">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-3 text-center">
            {[
              { img: 'benefit1.png', text: 'پشتیبانی 24 ساعته' },
              { img: 'benefit2.png', text: 'ضمانت اصالت کالا' },
              { img: 'benefit3.png', text: 'ضمانت بازگشت وجه' },
              { img: 'benefit4.png', text: 'ارسال سریع و رایگان' },
            ].map((b, i) => (
              <div key={i} className="col">
                <img src={`/images/benefits/${b.img}`} alt={b.text} />
                <span>{b.text}</span>
              </div>
            ))}
          </div>
          <div className="row pt-2"><div className="col"><hr /></div></div>
        </div>
      </section>

      {/* ─── پرفروش‌ترین ─── */}
      <section id="encode436bvf2vrf" className="pt-4">
        <h1 className="section-title">پرفروش ترین محصولات</h1>
        <div className="container pt-4">
          <div className="row pb-2 pb-sm-4">
            <div className="col-12 text-center">
              <div className="btn-group" role="group">
                {[['mobile', 'گوشی موبایل'], ['laptop', 'لپ تاپ'], ['computer', 'تجهیزات کامپیوتر'], ['camera', 'دوربین']].map(([val, label]) => (
                  <button key={val} type="button"
                    className={`btn most-sales-categories ${salesTab === val ? 'active' : ''}`}
                    onClick={() => setSalesTab(val)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-md-4">
            {mostSalesProducts[salesTab].map(p => (
              <div key={p.id} className="col"><ProductCard product={p} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── بنرهای تبلیغاتی ─── */}
      <div className="container my-4">
        <div className="row">
          <div className="col-12 col-md-4 pt-2 text-center">
            <Link to="/products">
              <img src="/images/promo-image1.png" alt="تبلیغ ۱" className="w-100" />
            </Link>
          </div>
          <div className="col-12 col-md-8 pt-2 text-center">
            <Link to="/products">
              <img src="/images/promo-image2.png" alt="تبلیغ ۲" className="w-100" />
            </Link>
          </div>
        </div>
      </div>

      {/* ─── مقالات ─── */}
      <section id="blog" className="pt-5">
        <h1 className="section-title">جدیدترین مقالات آموزشی</h1>
        <div className="container pt-4">
          <div className="row row-cols-1 row-cols-md-3">
            {[
              { id: 1, img: 'post100.jpg', date: '30 خرداد 1400', title: 'بررسی آیفون 12 پرو مکس اپل', text: 'آیفون ۱۲ پرو مکس با ابعاد غول‌پیکر، دوربین توانمندتر و باتری حجمیش، تمام‌عیارترین پرچم‌دار کنونی اپل به‌حساب می‌آید.' },
              { id: 2, img: 'post101.jpg', date: '30 خرداد 1400', title: 'سامسونگ گلکسی S21 اولترا 5G', text: 'سامسونگ برای گوشی پرچم‌دارش، یعنی گلکسی S21 اولترا 5G، علاوه‌بر رنگ‌های قبلی، رنگ جدید سرمه‌ای را معرفی کرد.' },
              { id: 3, img: 'post102.jpg', date: '30 خرداد 1400', title: 'دریافت گواهی بلوتوث گلکسی A03s سامسونگ', text: 'ماه گذشته، برای اولین‌بار اطلاعاتی از گلکسی A03s فاش شد و اکنون با دریافت گواهی بلوتوث، به زمان رونمایی این گوشی نزدیک شده‌ایم.' },
            ].map(post => (
              <div key={post.id} className="col">
                <div className="encode43bdsf23da">
                  <Link to={`/blog/${post.id}`}>
                    <div className="post-image" style={{ backgroundImage: `url('/images/blog/${post.img}')` }}></div>
                  </Link>
                  <div className="details py-3 px-4">
                    <div className="post-date">ارسال شده در {post.date}</div>
                    <Link to={`/blog/${post.id}`}><h2 className="post-title">{post.title}</h2></Link>
                    <Link to={`/blog/${post.id}`}><div className="encode43bbfb">{post.text}</div></Link>
                    <div className="read-more">
                      <Link to={`/blog/${post.id}`} className="hvr-icon-back">
                        بیشتر خوانید <i className="fa fa-arrow-left hvr-icon"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
