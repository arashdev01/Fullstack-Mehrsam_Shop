import useSiteContent from '../useSiteContent';

export default function Slider() {
  const content = useSiteContent();
  return (
    <section id="slider" className="mt-3">
      <style>{`
  #carouselExampleCaptions {
    height: 400px;
    background: #f0f0f0a5;
    border-radius: 5px;
    overflow: hidden;
  }
  #carouselExampleCaptions .carousel-inner {
    border-radius: 5px;
    overflow: hidden;
    height: 100%;
  }
  #carouselExampleCaptions .carousel-item {
    height: 400px;
    opacity: 0;
    display: block !important;
    transition: opacity 0.6s ease;
    position: relative;
  }
  #carouselExampleCaptions .carousel-item.active {
    opacity: 1;
  }
  #carouselExampleCaptions img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  /* ✅ دکمه CTA - پایین اسلایدر (وسط افقی) */
  .slider-cta-btn {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #ddd207, #d4d405);
    color: white;
    padding: 12px 28px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
    text-decoration: none;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.31);
    transition: all 0.3s ease;
    z-index: 10;
  }
  
  .slider-cta-btn:hover {
    transform: translateX(-50%) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.24);
  }

  /* ✅ دکمه‌های جهت‌دهی - پایین اسلایدر */
  #carouselExampleCaptions .carousel-control-prev,
  #carouselExampleCaptions .carousel-control-next {
    width: 40px !important;
    height: 40px !important;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    top: auto !important;
    bottom: 15px !important;
    background: rgba(0, 0, 0, 0.18);
    border-radius: 7%;
  }
  
  #carouselExampleCaptions .carousel-control-prev {
    left: 15px !important;
    right: auto !important;
  }
  
  #carouselExampleCaptions .carousel-control-next {
    right: 15px !important;
    left: auto !important;
  }
  
  #carouselExampleCaptions:hover .carousel-control-prev,
  #carouselExampleCaptions:hover .carousel-control-next {
    opacity: 1;
    background: rgba(0, 0, 0, 0.09);
  }
  
  #carouselExampleCaptions .carousel-control-prev-icon,
  #carouselExampleCaptions .carousel-control-next-icon {
    width: 20px;
    height: 20px;
    background-size: contain;
  }

  #slider-side-banners img {
    height: auto;
    max-height: 130px;
    object-fit: cover;
    border-radius: 5px;
  }

  /*  موبایل - ارتفاع اسلایدر */
  @media (max-width: 767px) {
    #carouselExampleCaptions {
      height: 250px !important;
    }
    
    #carouselExampleCaptions .carousel-item {
      height: 250px !important;
    }

    /* دکمه CTA - موبایل */
    .slider-cta-btn {
      padding: 10px 20px !important;
      font-size: 12px !important;
      bottom: 15px !important;
    }

    /* دکمه‌های navigation - موبایل */
    #carouselExampleCaptions .carousel-control-prev,
    #carouselExampleCaptions .carousel-control-next {
      width: 35px !important;
      height: 35px !important;
      bottom: 12px !important;
    }
    
    #carouselExampleCaptions .carousel-control-prev {
      left: 12px !important;
    }
    
    #carouselExampleCaptions .carousel-control-next {
      right: 12px !important;
    }
    
    #carouselExampleCaptions .carousel-control-prev-icon,
    #carouselExampleCaptions .carousel-control-next-icon {
      width: 18px !important;
      height: 18px !important;
    }
  }

  /* افزایش ارتفاع بنرهای کناری فقط در دسکتاپ */
  @media (min-width: 768px) {
    #slider-side-banners {
      height: 397px; /* هم‌ارتفاع با اسلایدر */
    }
    
    #slider-side-banners .row {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    #slider-side-banners img {
      height: 160px; /* افزایش ارتفاع */
      max-height: none;
    }
    
    #slider-side-banners .col:first-child {
      flex: 0 0 auto;
    }
    
    #slider-side-banners .col:nth-child(2) {
      flex: 0 0 auto;
      margin-top: auto; /* هل دادن به پایین */
    }
    
    #slider-side-banners .col:last-child {
      display: none; /* حذف col خالی */
    }
  }
`}
      </style>

      <div className="container">
        <div className="row">

          {/* اسلایدر اصلی */}
          <div className="col-12 col-md-9">
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">

              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
                <button type="button" data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1" aria-label="Slide 2" />
              </div>

              <div className="carousel-inner">
                {/* اسلاید اول */}
                <div className="carousel-item active">
                  <img src={content.slider_slide1_image || '/images/slider/slide (2).webp'} className="d-block w-100" alt="اسلاید ۱" />
                  <a href="/products" className="slider-cta-btn">
                    {content.slider_slide1_button || 'ورود به فروشگاه'}
                  </a>
                </div>

                {/* اسلاید دوم */}
                <div className="carousel-item">
                  <img src={content.slider_slide2_image || '/images/slider/slide (1).webp'} className="d-block w-100" alt="اسلاید ۲" />
                  <a href="/products" className="slider-cta-btn">
                    {content.slider_slide2_button || 'دیدن محصولات'}
                  </a>
                </div>
              </div>

              <button className="carousel-control-prev" type="button"
                data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">قبلی</span>
              </button>
              <button className="carousel-control-next" type="button"
                data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">بعدی</span>
              </button>

            </div>
          </div>

          {/* بنرهای کناری */}
          <div className="col-12 col-md-3" id="slider-side-banners">
            <div className="row row-cols-1 row-cols-sm-3 row-cols-md-1 h-100 gy-2 g-sm-1 g-md-0">

              {/* بنر اول - خرید عمده */}
              <div className="col">
                <div style={{ position: 'relative' }}>
                  <img src={content.slider_side1_image || '/images/slider/slide (3).webp'} alt="بنر ۱" width="100%" />
                  <a
                    href="/products"
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'linear-gradient(135deg, #fff423, #f5a623)',
                      color: 'white',
                      padding: '7px 18px',
                      borderRadius: '18px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      boxShadow: '0 7px 10px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    {content.slider_side1_button || 'خرید عمده'}
                  </a>
                </div>
              </div>

              {/* بنر دوم - خرید تکی */}
              <div className="col">
                <div style={{ position: 'relative' }}>
                  <img src={content.slider_side2_image || '/images/slider/slide (4).webp'} alt="بنر ۲" width="100%" />
                  <a
                    href="/products"
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'linear-gradient(135deg, #3498db, #2980b9)',
                      color: 'white',
                      padding: '7px 18px',
                      borderRadius: '18px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      boxShadow: '0 3px 10px rgba(0,0,0,0.25)',
                    }}
                  >
                    {content.slider_side2_button || 'خرید تکی'}
                  </a>
                </div>
              </div>

              <div className="col">
                {/* خالی - برای موبایل/تبلت */}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}