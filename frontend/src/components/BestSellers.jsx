import { useState } from 'react';
import { Link } from 'react-router-dom';

const data = {
  mobile: [
    { id: 10, name: 'گوشی سامسونگ Galaxy A51', price: '6.000.000', img: '/images/products/p100.png', cat: 'گوشی موبایل' },
    { id: 11, name: 'گوشی شیائومی POCO M3',    price: '5.000.000', img: '/images/products/p101.png', cat: 'گوشی موبایل' },
    { id: 12, name: 'گوشی سامسونگ Galaxy A12', price: '4.000.000', img: '/images/products/p102.png', cat: 'گوشی موبایل' },
    { id: 13, name: 'گوشی شیائومی POCO X3',    price: '3.000.000', img: '/images/products/p103.png', cat: 'گوشی موبایل' },
  ],
  laptop: [
    { id: 20, name: 'لپ‌تاپ ایسوس VivoBook X543', price: '16.000.000', img: '/images/products/p200.png', cat: 'لپ تاپ' },
    { id: 21, name: 'لپ‌تاپ لنوو IdeaPad 3',      price: '18.000.000', img: '/images/products/p201.png', cat: 'لپ تاپ' },
    { id: 22, name: 'لپ‌تاپ اچ‌پی Pavilion',      price: '22.000.000', img: '/images/products/p202.png', cat: 'لپ تاپ' },
    { id: 23, name: 'لپ‌تاپ دل Inspiron 15',      price: '20.000.000', img: '/images/products/p203.png', cat: 'لپ تاپ' },
  ],
  computer: [
    { id: 30, name: 'مودم روتر دی-لینک',    price: '4.800.000', img: '/images/products/p303.png', cat: 'تجهیزات' },
    { id: 31, name: 'هارد اکسترنال سیگیت',  price: '2.500.000', img: '/images/products/p304.png', cat: 'تجهیزات' },
    { id: 32, name: 'رم کامپیوتر کینگستون', price: '1.200.000', img: '/images/products/p305.png', cat: 'تجهیزات' },
    { id: 33, name: 'کارت گرافیک گیگابایت', price: '8.000.000', img: '/images/products/p306.png', cat: 'تجهیزات' },
  ],
  camera: [
    { id: 40, name: 'دوربین کانن EOS 2000D', price: '12.000.000', img: '/images/products/p400.png', cat: 'دوربین' },
    { id: 41, name: 'دوربین سونی Alpha A6000', price: '18.000.000', img: '/images/products/p401.png', cat: 'دوربین' },
    { id: 42, name: 'دوربین نیکون D3500',    price: '14.000.000', img: '/images/products/p402.png', cat: 'دوربین' },
    { id: 43, name: 'دوربین دیجیتال AX6065', price: '9.000.000',  img: '/images/products/p403.png', cat: 'دوربین' },
  ],
};

const tabs = [
  { key: 'mobile',   label: 'گوشی موبایل' },
  { key: 'laptop',   label: 'لپ تاپ' },
  { key: 'computer', label: 'تجهیزات کامپیوتر' },
  { key: 'camera',   label: 'دوربین' },
];

const NO_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f5f5f5'/%3E%3C/svg%3E";

export default function BestSellers() {
  const [active, setActive] = useState('mobile');

  return (
    <section id="best-sellers" className="pt-4">
      <h1 className="section-title">پرفروش‌ترین محصولات</h1>
      <div className="container pt-4">

        {/* تب‌ها */}
        <div className="row pb-2 pb-sm-4">
          <div className="col-12 text-center">
            <div style={{display:'flex', flexWrap:'nowrap', overflowX:'auto', gap:'8px', paddingBottom:'4px', boxShadow:'10px'}}>


              {tabs.map(tab => (
               <button
                    key={tab.key}
                    type="button"
                    className={`btn most-sales-categories ${active === tab.key ? 'active' : ''}`}
                    onClick={() => setActive(tab.key)}
                    style={{
                      border: '1.5px solid #e0e0e0',
                      borderRadius: '20px',
                      padding: '6px 16px',
                      margin: '4px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                      background: active === tab.key ? '#fcb941' : '#fff',
                      color: active === tab.key ? '#fff' : '#333',
                      fontWeight: active === tab.key ? 'bold' : 'normal',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* محصولات */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-md-4">
          {data[active].map(product => (
            <div key={product.id} className="col">
              <div className="encode4326654321vfb">
                <Link to={`/product/${product.id}`}>
                  <div className="image"
                    style={{ backgroundImage: `url('${product.img}')` }}>
                  </div>
                </Link>
                <div className="details p-3">
                  <div className="category">
                    <Link to="/products">{product.cat}</Link>
                  </div>
                  <Link to={`/product/${product.id}`}><h2>{product.name}</h2></Link>
                  <div className="encode4365gbf265g43d">{product.price} تومان</div>
                  <div className="rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-alt"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
