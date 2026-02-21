import React from 'react';

const Newsletter = () => {
    return (
        <section className="newsletter py-3 border-top" style={{ background: 'linear-gradient(90deg, #0505b29d, #1b3568)' }}>
            <div className="container  ">
                
                <div className="row align-items-center ">
                    
                    <div className="col-lg-6" >
                        <h6>عضویت در خبرنامه</h6>
                        <p className="text-muted mb-lg-0 "  style={{ color: '#c01818ed '}}>از جدیدترین تخفیف‌ها و محصولات زودتر از همه باخبر شوید.</p>
                    </div>
                    <div className="col-lg-6">
                        <form className="d-flex">
                            <input
                                type="email"
                                className="form-control me-3"
                                placeholder="ایمیل"
                                style={{ borderRadius: '8px 0 0 8px', background: '#b6c7e01a'}}
                            />
                            <button
                                className="btn btn-primary px-20"
                                type="button"
                                style={{ borderRadius: '0 8px 8px 0', background: '#1c29b8ef'}}
                            >
                                عضویت
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;