import { Link } from 'react-router-dom';
import useSiteContent from '../useSiteContent';

const posts = [
  { id: 1, title: 'بررسی آیفون 12 پرو مکس اپل', date: '30 خرداد 1400', img: '/images/blog/post100.jpg', excerpt: 'آیفون ۱۲ پرو مکس با ابعاد غول‌پیکر، دوربین توانمندتر و باتری حجمیش، تمام‌عیارترین پرچم‌دار کنونی اپل به‌حساب می‌آید.' },
  { id: 2, title: 'سامسونگ گلکسی S21 اولترا 5G', date: '30 خرداد 1400', img: '/images/blog/post101.jpg', excerpt: 'سامسونگ برای گوشی پرچم‌دارش، یعنی گلکسی S21 اولترا 5G، علاوه‌بر رنگ‌های قبلی، رنگ جدید سرمه‌ای را معرفی کرد.' },
  { id: 3, title: 'دریافت گواهی بلوتوث گلکسی A03s سامسونگ', date: '30 خرداد 1400', img: '/images/blog/post102.jpg', excerpt: 'ماه گذشته، برای اولین‌بار اطلاعاتی از گلکسی A03s فاش شد و اکنون با دریافت گواهی بلوتوث، به زمان رونمایی این گوشی نزدیک شده‌ایم.' },
];

export default function LatestPosts() {
  const content = useSiteContent();
  return (
    <>
      <style>{`
  .encode43bdsf23da .post-image {
    height: 160px;        
    background-size: cover;
    background-position: center;
    border-radius: 10px 10px 0 0;
  }

  .encode43bdsf23da .post-title {
    font-size: 14px;      /* کوچکتر */
    margin: 6px 0;
  }

  .encode43bdsf23da .encode43bbfb {
    font-size: 12px;      /* متن کوچکتر */
    display: -webkit-box;
    -webkit-line-clamp: 2; /* فقط 2 خط نشون بده */
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .encode43bdsf23da .details {
    padding: 10px 14px !important;
  }

  @media (max-width: 768px) {
    #blog .encode43bdsf23da .details {
      padding-top: 10px !important;
      padding-bottom: 10px !important;
    }
  }
`}</style>

      <section id="blog" className="pt-5">
        <h5 className="section-title">{content.latest_posts_title || 'جدیدترین مقالات آموزشی'}</h5>
        <div className="container pt-4">
          <div className="row row-cols-1 row-cols-md-3">
            {posts.map(post => (
              <div key={post.id} className="col">
                <div className="encode43bdsf23da">
                  <Link to={`/blog/${post.id}`}>
                    <div className="post-image" style={{ backgroundImage: `url('${post.img}')` }}></div>
                  </Link>
                  <div className="details py-3 px-4">
                    <div className="post-date">ارسال شده در {post.date}</div>
                    <Link to={`/blog/${post.id}`}>
                      <h6 className="post-title">{post.title}</h6>
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
          <div className="text-center mt-1">
            <Link to="/blog" className="btn btn-outline-primary rounded-pill px-5" style={{position: 'relative', top: '-4px'}}>
  مشاهده همه مقالات
</Link>
          </div>
        </div>
      </section>
    </>
  );
}