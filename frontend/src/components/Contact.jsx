import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSiteContent from '../useSiteContent';

export default function Contact() {
    const content = useSiteContent();
    const [form, setForm] = useState({ name: '', tel: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.id]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setForm({ name: '', tel: '', email: '', subject: '', message: '' });
    };

    return (
        <section className="inner-page" id="contact-page">
            <div className="container-fluid" id="page-hero">
                <div className="container py-3">
                    <h1>{content.contact_page_title || 'تماس با ما'}</h1>
                    <p>{content.contact_page_subtitle || 'با ما در ارتباط باشید.'}</p>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">تماس با ما</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="content p-0 p-sm-3">
                            <div className="row">

                                {/* اطلاعات تماس */}
                                <div className="col-12 col-lg-5 text-center" id="contact-page-info">
                                    <div className="info">
                                        <i className="fa fa-map-marked"></i>
                                        <div className="title">{content.contact_address_label || 'آدرس فروشگاه:'}</div>
                                        <div>{content.contact_address || 'ایران، تهران، جردن'}</div>
                                    </div>
                                    <div className="info">
                                        <i className="fa fa-phone"></i>
                                        <div className="title">{content.contact_phone_label || 'تلفن تماس:'}</div>
                                        <div>{content.contact_phone1 || '02112345678'}</div>
                                        <div>{content.contact_phone2 || '09351234567'}</div>
                                    </div>
                                    <div className="info">
                                        <i className="fa fa-envelope"></i>
                                        <div className="title">{content.contact_email_label || 'پست الکترونیک:'}</div>
                                        <div>{content.contact_email || 'info@rubik.com'}</div>
                                    </div>
                                </div>

                                {/* فرم ارسال پیام */}
                                <div className="col-12 col-lg-7 p-4">
                                    <div className="title">{content.contact_form_title || 'ارسال پیام'}</div>
                                    <p>{content.contact_form_intro || 'نظرات، پیشنهادات و انتقادات سازنده خود را از طریق فرم زیر با ما در میان بگذارید.'}</p>

                                    {sent && <div className="alert alert-success">پیام شما با موفقیت ارسال شد!</div>}

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mb-2">
                                            <label htmlFor="name">نام شما :</label>
                                            <input type="text" className="form-control" id="name" value={form.name} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="tel">تلفن تماس :</label>
                                            <input type="text" className="form-control" id="tel" value={form.tel} onChange={handleChange} />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="email">پست الکترونیک :</label>
                                            <input type="text" className="form-control" id="email" value={form.email} onChange={handleChange} />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="subject">موضوع پیام :</label>
                                            <input type="text" className="form-control" id="subject" value={form.subject} onChange={handleChange} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="message">متن پیام :</label>
                                            <textarea className="form-control" id="message" rows="3" value={form.message} onChange={handleChange} required></textarea>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-success rounded-pill px-4">ارسال پیام</button>
                                        </div>
                                    </form>
                                </div>

                                {/* نقشه */}
                                <div className="col-12 mt-4 px-0">
                                    <iframe
                                        src={content.contact_map_url || 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13877.455761926274!2d52.5714962!3d29.5931048!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcc3a67871fb07f53!2z2YjYqCDYsdmI2KjbjNqpIC0gV2ViUnViaWs!5e0!3m2!1sen!2sca!4v1600581121318!5m2!1sen!2sca'}
                                        width="100%"
                                        height="400"
                                        className="rounded"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        title="نقشه"
                                    ></iframe>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}