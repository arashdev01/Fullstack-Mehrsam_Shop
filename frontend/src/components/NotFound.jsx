import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <section className="inner-page" id="contact-page">
            <div className="container-fluid" id="page-hero">
                <div className="container py-3">
                    <h1>صفحه مورد نظر یافت نشد!</h1>
                    <p>صفحه مورد نظر شما حذف شده یا اصلا وجود نداشته است!</p>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">خطای 404</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="content">
                            <div id="notfound">
                                <div className="notfound-bg">
                                    <div></div><div></div><div></div><div></div>
                                </div>
                                <div className="notfound text-center py-5">
                                    <div className="notfound-404">
                                        <h1 style={{ fontSize: '120px', fontWeight: 'bold', color: '#fcb941' }}>404</h1>
                                    </div>
                                    <h2 className="fw-bold">صفحه مورد نظر یافت نشد!</h2>
                                    <p className="text-muted">احتمالا صفحه مورد نظر شما حذف یا تغییر نام داده شده است.</p>
                                    <Link to="/" className="btn btn-primary rounded-pill px-5 py-2 mb-4">بازگشت به صفحه اصلی</Link>
                                    <div className="d-flex justify-content-center gap-3">
                                        <a href="#"><img src="/images/social/twitter.png" alt="توئیتر" width="25px" /></a>
                                        <a href="#"><img src="/images/social/insta.png" alt="اینستاگرام" width="25px" /></a>
                                        <a href="#"><img src="/images/social/linkedin.png" alt="لینکدین" width="25px" /></a>
                                        <a href="#"><img src="/images/social/facebook.png" alt="فیس بوک" width="25px" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}