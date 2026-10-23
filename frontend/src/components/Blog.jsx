import { Link } from 'react-router-dom';

const posts = [
    { id: 1, title: 'راهنمای انتخاب شلوار جین متناسب با فرم بدن', date: 'راهنمای خرید', img: '/images/slider/jeans-shop.webp', excerpt: 'برای انتخاب فیت مناسب، به راحتی کمر، آزادی حرکت و اندازهٔ قد شلوار توجه کنید.' },
    { id: 2, title: 'چطور لباس جین را درست بشوییم و نگهداری کنیم؟', date: 'مراقبت از جین', img: '/images/products/green-hoodie.png', excerpt: 'شست‌وشوی کمتر، آب خنک و رعایت برچسب مراقبت می‌تواند به حفظ رنگ و فرم جین کمک کند.' },
    { id: 3, title: 'ترکیب کت جین با لباس‌های روزمره', date: 'استایل روزمره', img: '/images/products/imgi_20_shirt1.webp', excerpt: 'کت جین را با تی‌شرت ساده و کفش روزمره ترکیب کنید تا استایلی متعادل و کاربردی داشته باشید.' },
    { id: 4, title: 'راهنمای انتخاب سایز و فیت لباس جین', date: 'راهنمای سایز', img: '/images/products/imgi_19_cap5.webp', excerpt: 'جدول سایز را با اندازه‌های بدن مقایسه کنید و برای انتخاب دقیق‌تر، به فیت محصول و مدل پوشیده‌شده در عکس توجه کنید.' },
];

export default function Blog() {
    return (
        <section className="inner-page" id="blog-page">
            <div className="container-fluid" id="page-hero">
                <div className="container py-3">
                    <h1>بلاگ</h1>
                    <p>بلاگ مهرسام جینز</p>
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
                                            <div className="col"><h1 className="title">راهنمای استایل و نگهداری پوشاک جین</h1></div>
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
                                                                <div className="post-date">موضوع: {post.date}</div>
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