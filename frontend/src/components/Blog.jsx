import { Link } from 'react-router-dom';

const posts = [
    { id: 1, title: 'بررسی آیفون 12 پرو مکس اپل', date: '30 خرداد 1400', img: '/images/blog/post100.jpg', excerpt: 'آیفون ۱۲ پرو مکس با ابعاد غول‌پیکر، دوربین توانمندتر و باتری حجمیش، تمام‌عیارترین پرچم‌دار کنونی اپل به‌حساب می‌آید.' },
    { id: 2, title: 'سامسونگ گلکسی S21 اولترا 5G', date: '30 خرداد 1400', img: '/images/blog/post101.jpg', excerpt: 'سامسونگ برای گوشی پرچم‌دارش، یعنی گلکسی S21 اولترا 5G، علاوه‌بر رنگ‌های قبلی، رنگ جدید سرمه‌ای را معرفی کرد.' },
    { id: 3, title: 'دریافت گواهی بلوتوث گلکسی A03s سامسونگ', date: '30 خرداد 1400', img: '/images/blog/post102.jpg', excerpt: 'ماه گذشته، برای اولین‌بار اطلاعاتی از گلکسی A03s فاش شد و اکنون با دریافت گواهی بلوتوث، به زمان رونمایی این گوشی نزدیک شده‌ایم.' },
    { id: 4, title: 'خرابی بی‌دلیل نمایشگرهای سری گلکسی S20', date: '30 خرداد 1400', img: '/images/blog/post103.jpg', excerpt: 'کاربران سری گلکسی S20 از خرابی ناگهانی نمایشگر گوشی‌های خود گزارش دادند. سامسونگ در حال بررسی این مشکل است.' },
];

export default function Blog() {
    return (
        <section className="inner-page" id="blog-page">
            <div className="container-fluid" id="page-hero">
                <div className="container py-3">
                    <h1>بلاگ</h1>
                    <p>بلاگ آموزشی روبیک مارکت</p>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">بلاگ آموزشی</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="content">
                            <div className="row">
                                <div className="col-12 col-lg-9">
                                    <div className="blog-container">
                                        <div className="row py-2 px-3">
                                            <div className="col"><h1 className="title">مرکز آموزش روبیک مارکت</h1></div>
                                        </div>
                                        <div className="container px-2 pb-3">
                                            <div className="row row-cols-1 row-cols-md-2">
                                                {posts.map(post => (
                                                    <div key={post.id} className="col">
                                                        <div className="encode43bdsf23da">
                                                            <Link to={`/blog/${post.id}`}>
                                                                <div className="post-image" style={{ backgroundImage: `url('${post.img}')` }}></div>
                                                            </Link>
                                                            <div className="details py-3 px-4">
                                                                <div className="post-date">ارسال شده در {post.date}</div>
                                                                <Link to={`/blog/${post.id}`}>
                                                                    <h2 className="post-title">{post.title}</h2>
                                                                </Link>
                                                                <div className="encode43bbfb">{post.excerpt}</div>
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
                                    </div>
                                </div>

                                {/* ساید بار */}
                                <div className="col-12 col-lg-3">
                                    <div className="blog-container p-3">
                                        <h5 className="fw-bold border-bottom pb-2 mb-3">دسته‌بندی‌ها</h5>
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><Link to="/blog" className="text-decoration-none">آموزش موبایل</Link></li>
                                            <li className="mb-2"><Link to="/blog" className="text-decoration-none">آموزش لپ‌تاپ</Link></li>
                                            <li className="mb-2"><Link to="/blog" className="text-decoration-none">اخبار تکنولوژی</Link></li>
                                            <li className="mb-2"><Link to="/blog" className="text-decoration-none">راهنمای خرید</Link></li>
                                        </ul>
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