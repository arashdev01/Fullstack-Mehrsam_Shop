import React from 'react';
import { Link } from 'react-router-dom';

const Compare = () => {
  return (
    <section className="inner-page" id="contact-page">
      <div className="container-fluid" id="page-hero">
        <div className="row">
          <div className="col-12">
            <div className="container">
              <div className="row">
                <div className="col-12 px-0">
                  <h1>مقایسه محصول</h1>
                  <p>محصولات را با هم مقایسه کنید.</p>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link hide-focus="true" to="/">صفحه نخست</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">مقایسه محصول</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-none d-lg-block" id="compare-table">
        <div className="row">
          <div className="col-12">
            <div className="content">
              <div className="row">
                <div className="col-12">
                  <div id="products-compared">
                    <div className="row mt-2 bg-white">
                      {/* محصول ۱ */}
                      <div className="col-3 px-2 pb-2 products-compare-item">
                        <div className="bg-light p-2 text-center">
                          <div className="btn btn-sm btn-outline-secondary btn-cancel-compare float-left rounded-circle">X</div>
                          <div><img src="/assets/images/products/p100.png" alt="" /></div>
                          <div className="title">گوشی موبایل سامسونگ مدل Galaxy A51</div>
                          <div className="encode4365gbf265g43d-container">
                            <span className="encode4365gbf265g43d">6.000.000 <span>تومان</span></span>
                          </div>
                          <div className="cta-container">
                            <Link to="/product/1">
                              <div className="btn btn-sm btn-primary px-3 px-lg-2 px-xl-4">مشاهده و خرید محصول</div>
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* محصول ۲ */}
                      <div className="col-3 px-2 pb-2 products-compare-item">
                        <div className="bg-light p-2 text-center">
                          <div className="btn btn-sm btn-outline-secondary btn-cancel-compare float-left rounded-circle">X</div>
                          <div><img src="/assets/images/products/p103.png" alt="" /></div>
                          <div className="title">گوشی موبایل شیائومی مدل POCO X3</div>
                          <div className="encode4365gbf265g43d-container">
                            <span className="encode4365gbf265g43d">3.000.000 <span>تومان</span></span>
                          </div>
                          <div className="cta-container">
                            <Link to="/product/2">
                              <div className="btn btn-sm btn-primary px-3 px-lg-2 px-xl-4">مشاهده و خرید محصول</div>
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* محصول ۳ */}
                      <div className="col-3 px-2 pb-2 products-compare-item">
                        <div className="bg-light p-2 text-center">
                          <div className="btn btn-sm btn-outline-secondary btn-cancel-compare float-left rounded-circle">X</div>
                          <div><img src="/assets/images/products/p102.png" alt="" /></div>
                          <div className="title">گوشی موبایل سامسونگ مدل Galaxy A12</div>
                          <div className="encode4365gbf265g43d-container">
                            <span className="encode4365gbf265g43d">4.000.000 <span>تومان</span></span>
                          </div>
                          <div className="cta-container">
                            <Link to="/product/3">
                              <div className="btn btn-sm btn-primary px-3 px-lg-2 px-xl-4">مشاهده و خرید محصول</div>
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* محصول ۴ */}
                      <div className="col-3 px-2 pb-2 products-compare-item">
                        <div className="bg-light p-2 text-center">
                          <div className="btn btn-sm btn-outline-secondary btn-cancel-compare float-left rounded-circle">X</div>
                          <div><img src="/assets/images/products/p102.png" alt="" /></div>
                          <div className="title">گوشی موبایل سامسونگ مدل Galaxy A12</div>
                          <div className="encode4365gbf265g43d-container">
                            <span className="encode4365gbf265g43d">4.000.000 <span>تومان</span></span>
                          </div>
                          <div className="cta-container">
                            <Link to="/product/4">
                              <div className="btn btn-sm btn-primary px-3 px-lg-2 px-xl-4">مشاهده و خرید محصول</div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" id="compare-table-details">
                <div className="col-12 px-lg-0">
                  <div className="row">
                    <div className="col-12 my-2">
                      <div className="bg-light-yellow px-2 py-1 rounded">
                        <span className="detail-title"><i className="fa fa-chevron-left small"></i> وزن</span>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-12 col-md-3 px-2"><div className="bg-light p-2">189 گرم</div></div>
                    <div className="col-12 col-md-3 px-2"><div className="bg-light p-2">179 گرم</div></div>
                    <div className="col-12 col-md-3 px-2"><div className="bg-light p-2">169 گرم</div></div>
                    <div className="col-12 col-md-3 px-2"><div className="bg-light p-2">174 گرم</div></div>
                  </div>

                  <div className="row">
                    <div className="col-12 my-2">
                      <div className="bg-light-yellow px-2 py-1 rounded">
                        <span className="detail-title"><i className="fa fa-chevron-left small"></i> اندازه</span>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-12 col-md-3 px-2"><div className="bg-light p-2">6.5 اینچ</div></div>
                    <div className="col-12 col-md-3 px-2"><div className="bg-light p-2">6.3 اینچ</div></div>
                    <div className="col-12 col-md-3 px-2"><div className="bg-light p-2">6.5 اینچ</div></div>
                    <div className="col-12 col-md-3 px-2"><div className="bg-light p-2">6.4 اینچ</div></div>
                  </div>

                  <div className="row">
                    <div className="col-12 my-2">
                      <div className="bg-light-yellow px-2 py-1 rounded">
                        <span className="detail-title"><i className="fa fa-chevron-left small"></i> پردازنده‌ی گرافیکی</span>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-12 col-md-3 px-2"><div className="bg-light p-2">Adreno 618 GPU</div></div>
                    <div className="col-12 col-md-3 px-2"><div className="bg-light p-2">Adreno 618 GPU</div></div>
                    <div className="col-12 col-md-3 px-2"><div className="bg-light p-2">Adreno 618 GPU</div></div>
                    <div className="col-12 col-md-3 px-2"><div className="bg-light p-2">Adreno 618 GPU</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="mobile-forbidden" className="d-lg-none">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="container px-lg-0">
                <div className="row mb-0 mb-sm-5">
                  <div className="col-12 px-0">
                    <div className="row">
                      <div className="col-12 p-5 text-center">
                        <span>این صفحه در موبایل قابل مشاهده نمی باشد.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Compare;