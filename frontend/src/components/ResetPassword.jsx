import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <section className="inner-page" id="contact-page">
            <div className="container-fluid" id="page-hero">
                <div className="container py-3">
                    <h1>بازیابی رمز عبور</h1>
                    <p>رمز عبور خود را بازیابی کنید.</p>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">بازیابی رمز عبور</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container py-2 py-md-5">
                <div className="row">
                    <div className="col-12 col-sm-10 offset-sm-1">
                        <div className="content">
                            <div className="row">
                                <div className="col-12 col-lg-5 text-center">
                                    <img src="/images/reset-password.png" alt="بازیابی رمز عبور" className="img-fluid"
                                        onError={e => e.target.src = 'https://via.placeholder.com/400x300?text=Reset+Password'} />
                                </div>
                                <div className="col-12 col-lg-7 pt-5 pt-md-0 align-self-center">
                                    <div className="title">بازیابی رمز</div>
                                    <p>برای بازیابی رمز عبور، پست الکترونیک خود را وارد کنید.</p>

                                    {sent ? (
                                        <div className="alert alert-success rounded-3">
                                            ارسال خودکار لینک بازیابی در حال حاضر فعال نیست. لطفاً با پشتیبانی مهرسام تماس بگیرید.
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group mb-3">
                                                <label htmlFor="email">پست الکترونیک :</label>
                                                <input type="email" className="form-control" id="email"
                                                    value={email} onChange={e => setEmail(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-success rounded-pill px-4">
                                                    ارسال لینک بازیابی رمز عبور
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    <div className="mt-3">
                                        <Link to="/login" className="text-decoration-none">بازگشت به صفحه ورود</Link>
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