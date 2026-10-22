import { useState } from 'react';
import axios from 'axios';
import API_URL from '../api';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async event => { event.preventDefault(); setStatus('loading');
        try { await axios.post(API_URL + '/api/newsletter/', { email }); setEmail(''); setStatus('success'); }
        catch { setStatus('error'); }
    };

    return (
        <section className="newsletter py-3 border-top" style={{ background: 'linear-gradient(120deg, #ede4f5, #fbf7ef)' }} dir="rtl">
            <div className="container py-2">
                <div className="row align-items-center g-3">
                    <div className="col-lg-6">
                        <h6 className="fw-bold mb-1">عضویت در خبرنامه مهرسام</h6>
                        <p className="text-muted mb-lg-0">از تازه‌ترین کالکشن‌ها و تخفیف‌ها باخبر شوید.</p>
                        {status && <p className={status === 'success' ? 'text-success small mb-0' : 'text-danger small mb-0'} role="status">{status === 'success' ? 'عضویت شما ثبت شد.' : status === 'loading' ? 'در حال ثبت...' : 'ثبت عضویت انجام نشد؛ دوباره تلاش کنید.'}</p>}
                    </div>
                    <div className="col-lg-6">
                        <form className="d-flex gap-2" onSubmit={handleSubmit}>
                            <input type="email" className="form-control" placeholder="ایمیل شما" aria-label="ایمیل شما" value={email} onChange={event => setEmail(event.target.value)} required />
                            <button className="btn btn-primary flex-shrink-0" type="submit" disabled={status === 'loading'}>
                                {status === 'loading' ? 'در حال ثبت...' : 'عضویت'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;