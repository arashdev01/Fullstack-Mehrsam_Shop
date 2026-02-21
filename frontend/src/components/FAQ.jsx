import { Link } from 'react-router-dom';

const faqs = [
    { id: 'One', q: 'محصولات این فروشگاه دارای چه مدت گارانتی و ضمانت بازگشت وجه هستند؟', open: true },
    { id: 'Two', q: 'آیا محصولات دارای ارسال رایگان هستند؟', open: false },
    { id: 'Three', q: 'گارانتی محصولات شامل چه مواردی می شود؟', open: false },
    { id: 'Four', q: 'آیا محصولات دارای ارسال رایگان برای تهران هستند؟', open: false },
    { id: 'Five', q: 'چه مدت پس از ثبت سفارش محصول به دست مشتری می رسد؟', open: false },
];

const answer = 'پاسخ این سوال به زودی توسط تیم پشتیبانی تکمیل خواهد شد. برای اطلاعات بیشتر با ما تماس بگیرید.';

export default function FAQ() {
    return (
        <section className="inner-page" id="faq-page">
            <div className="container-fluid" id="page-hero">
                <div className="container py-3">
                    <h1>سوالات متداول</h1>
                    <p>پاسخ به سوالاتی که برای اکثر کاربران پیش می آید.</p>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">سوالات متداول</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container mt-3 mb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="content">
                            <div className="accordion mt-3" id="accordionExample">
                                {faqs.map(faq => (
                                    <div key={faq.id} className="accordion-item">
                                        <h2 className="accordion-header" id={`heading${faq.id}`}>
                                            <button
                                                className={`accordion-button ${faq.open ? '' : 'collapsed'}`}
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${faq.id}`}
                                                aria-expanded={faq.open}
                                                aria-controls={`collapse${faq.id}`}
                                            >
                                                {faq.q}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${faq.id}`}
                                            className={`accordion-collapse collapse ${faq.open ? 'show' : ''}`}
                                            aria-labelledby={`heading${faq.id}`}
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                <p>{answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}