import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function BlogPost() {
    const { id } = useParams();
    const [comment, setComment] = useState({ name: '', text: '' });
    const [comments, setComments] = useState([
        // نظر نمونه حذف شد؛ فقط بازخورد واقعی باید نمایش داده شود.
        // از نمایش نظر ساختگی خودداری می‌شود.
    ]);

    const handleSubmit = e => {
        e.preventDefault();
        setComments([...comments, { id: Date.now(), name: comment.name, date: 'همین الان', text: comment.text }]);
        setComment({ name: '', text: '' });
    };

    return (
        <section className="inner-page blog-inner-page" id="blog-page" data-post-id={id}>
            <div className="container-fluid" id="page-hero">
                <div className="container py-3">
                    <h1>راهنمای انتخاب و نگهداری لباس جین</h1>
                    <p>در این مطلب با نکته‌های کاربردی انتخاب، شست‌وشو و نگهداری لباس‌های جین آشنا می‌شوید.</p>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
                            <li className="breadcrumb-item"><Link to="/blog">بلاگ آموزشی</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">راهنمای پوشاک جین</li>
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

                                        {/* عنوان و تاریخ */}
                                        <div className="row pt-2 px-3" id="post-title">
                                            <div className="col-12 col-md-8">
                                                <h1>راهنمای انتخاب و نگهداری لباس جین</h1>
                                            </div>
                                            <div className="col-12 col-md-4 text-md-end">
                                                <span className="date">راهنمای خرید مهرسام جینز</span>
                                            </div>
                                        </div>
                                        <hr />

                                        {/* جزئیات */}
                                        <div className="row py-0 px-3" id="post-details">
                                            <div className="col-8">
                                                <span>دسته بندی: <Link to="/blog">راهنمای پوشاک جین</Link></span>
                                            </div>
                                            <div className="col-4 text-end"><span>244 بازدید | {comments.length} نظر</span></div>
                                        </div>

                                        {/* محتوای پست */}
                                        <div className="row">
                                            <div className="col-12 pt-2 text-justify" id="post-html">
                                                <div className="text-center pt-2 pb-3">
                                                    <img src="/images/slider/jeans-shop.webp" alt="پست بلاگ" className="img-fluid rounded-3"
                                                        onError={e => e.target.src = '/images/products/green-hoodie.png'} />
                                                </div>
                                                <p>برای کمک به ماندگاری رنگ جین، برچسب شست‌وشو را رعایت کنید و تا حد امکان از شست‌وشوی غیرضروری پرهیز کنید.</p>
                                                <p>برای خشک‌کردن، از روش توصیه‌شده روی برچسب محصول پیروی کنید و لباس را دور از گرمای شدید نگه دارید.</p>
                                                <p>برای انتخاب فیت مناسب، راهنمای سایز و اندازه‌های بدن را با هم مقایسه کنید.</p>
                                            </div>

                                            {/* برچسب‌ها */}
                                            <div className="col-12">
                                                <hr />
                                                <div id="keywords">
                                                    <span>برچسب ها: </span>
                                                    {['انتخاب سایز', 'مراقبت از جین', 'استایل روزمره', 'مهرسام جینز'].map(tag => (
                                                        <a key={tag} href="#"><span className="keyword">{tag}</span></a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* اشتراک‌گذاری */}
                                        <div className="row pt-3 pb-4" id="share-links">
                                            <div className="col-12">
                                                <span>به اشتراک بگذارید در: </span>
                                                <a href="#" target="_blank"><span className="share-link"><img src="/images/social/twitter.png" alt="توئیتر" height="25px" /> توئیتر</span></a>
                                                <a href="#" target="_blank"><span className="share-link"><img src="/images/social/facebook.png" alt="فیس بوک" height="25px" /> فیس بوک</span></a>
                                                <a href="#" target="_blank"><span className="share-link"><img src="/images/social/linkedin.png" alt="لینکدین" height="25px" /> لینکدین</span></a>
                                            </div>
                                        </div>
                                        <hr />

                                        {/* نظرات */}
                                        <div className="row pt-3 pb-4" id="comments">
                                            <div className="col-12">
                                                <h2>نظرات کاربران</h2>
                                                {comments.map(c => (
                                                    <div key={c.id} className="comment p-3 my-2 bg-light rounded-3">
                                                        <div className="row">
                                                            <div className="col-2 col-md-1">
                                                                <img src="/images/user-no-image.jpg" alt="" className="rounded img-fluid"
                                                                    onError={e => e.target.src = 'https://via.placeholder.com/50?text=U'} />
                                                            </div>
                                                            <div className="col-10 col-md-11">
                                                                <div className="fw-bold">{c.name}</div>
                                                                <div className="text-muted small">{c.date}</div>
                                                                <p className="mt-2 mb-0">{c.text}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* فرم ارسال نظر */}
                                                <h5 className="mt-4 fw-bold">ارسال نظر</h5>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="mb-2">
                                                        <input type="text" className="form-control" placeholder="نام شما"
                                                            value={comment.name} onChange={e => setComment({ ...comment, name: e.target.value })} required />
                                                    </div>
                                                    <div className="mb-2">
                                                        <textarea className="form-control" rows="3" placeholder="متن نظر..."
                                                            value={comment.text} onChange={e => setComment({ ...comment, text: e.target.value })} required></textarea>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary rounded-pill px-4">ارسال نظر</button>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* ساید بار */}
                                <div className="col-12 col-lg-3">
                                    <div className="blog-container p-3">
                                        <h5 className="fw-bold border-bottom pb-2 mb-3">پست‌های اخیر</h5>
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><Link to="/blog/1" className="text-decoration-none small">بررسی آیفون 12 پرو مکس</Link></li>
                                            <li className="mb-2"><Link to="/blog/2" className="text-decoration-none small">سامسونگ گلکسی S21</Link></li>
                                            <li className="mb-2"><Link to="/blog/3" className="text-decoration-none small">گواهی بلوتوث گلکسی A03s</Link></li>
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