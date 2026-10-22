import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api';

const articleImage = image => !image ? '/images/products/green-hoodie.png' : /^https?:\/\//i.test(image) ? image : API_URL + (image.startsWith('/') ? image : '/' + image);
const articleDate = value => value ? new Date(value).toLocaleDateString('fa-IR') : '';

const postStyles = [
  '.post-image { height: 160px; background-size: contain; background-position: center; background-repeat: no-repeat; background-color: #fff; border-radius: 14px 14px 0 0; }',
  '.post-card { height: 100%; overflow: hidden; border: 1px solid #e8deed; border-radius: 16px; background: #fff; box-shadow: 0 5px 20px rgba(52,44,61,.05); }',
  '.post-title { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; min-height: 44px; margin: 6px 0; color: #342c3d; font-size: 14px; font-weight: 700; line-height: 1.7; }',
  '.post-excerpt { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; color: #716a78; font-size: 12px; line-height: 1.8; }',
  '.post-details { padding: 12px 14px; }',
  '.post-date { color: #8b8392; font-size: 11px; }',
  '@media (max-width: 575px) { .post-image { height: 132px; } .post-details { padding: 9px; } .post-title { font-size: 12px; min-height: 40px; } }'
].join('\n');

export default function LatestPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    axios.get(API_URL + '/api/blogs/')
      .then(response => {
        const data = response.data.results || response.data;
        const entries = Array.isArray(data) ? data : [];
        if (active) setPosts(entries.slice(0, 3).map(post => ({
          ...post,
          img: articleImage(post.image),
          date: articleDate(post.created_at),
          excerpt: post.excerpt || post.content || ''
        })));
      })
      .catch(() => { if (active) setPosts([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  if (!loading && posts.length === 0) return null;

  return (
    <>
      <style>{postStyles}</style>
      <section id="blog" className="pt-3 pt-md-4" dir="rtl">

        <div className="container">
          <div className="d-flex align-items-end justify-content-between gap-2 mb-3">
            <h5 className="section-title mb-0">تازه‌های دنیای استایل</h5>
            <Link to="/blog" className="small fw-bold text-decoration-none">همه مقالات ←</Link>
          </div>

          {loading && <p className="text-center text-muted py-3" role="status">در حال دریافت مقالات...</p>}

          <div className="row row-cols-1 row-cols-md-3 g-3">
            {posts.map(post => (
              <div key={post.id} className="col">
                <article className="post-card">
                  <Link to={'/blog/' + post.id} aria-label={post.title}>
                    <div className="post-image" role="img" aria-label={post.title} style={{ backgroundImage: 'url("' + post.img + '")' }} />
                  </Link>
                  <div className="post-details">
                    <div className="post-date">ارسال شده در {post.date || 'تازه‌ترین مقاله'}</div>
                    <Link to={'/blog/' + post.id} className="text-decoration-none">
                      <h6 className="post-title">{post.title}</h6>
                    </Link>
                    <div className="post-excerpt">{post.excerpt}</div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );

}