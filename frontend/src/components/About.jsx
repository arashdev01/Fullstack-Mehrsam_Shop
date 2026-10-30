import { Link } from 'react-router-dom';
import useSiteContent from '../useSiteContent';

function buildTeam(content) {
    return [
        { name: content.team1_name || 'مجید کیانی', role: content.team1_role || 'مدیر عامل', desc: content.team1_description || 'به عنوان مدیر عامل در تیم فعالیت دارد.', img: content.team1_image || '/images/team/team-person1.jpg' },
        { name: content.team2_name || 'پوریا طلایی', role: content.team2_role || 'برنامه نویس', desc: content.team2_description || 'به عنوان برنامه نویس در تیم فعالیت دارد.', img: content.team2_image || '/images/team/team-person2.jpg' },
        { name: content.team3_name || 'امیر جاوید', role: content.team3_role || 'تولید کننده محتوا', desc: content.team3_description || 'به عنوان تولید کننده محتوا در تیم فعالیت دارد.', img: content.team3_image || '/images/team/team-person3.jpg' },
        { name: content.team4_name || 'وحید کمالی', role: content.team4_role || 'دیجیتال مارکتر', desc: content.team4_description || 'به عنوان دیجیتال مارکتر در تیم فعالیت دارد.', img: content.team4_image || '/images/team/team-person4.jpg' },
    ];
}

export default function About() {
    const content = useSiteContent();
    const team = buildTeam(content);
    return (
        <section className="inner-page" id="contact-page">
            <div className="container-fluid" id="page-hero">
                <div className="container py-3">
                    <h1>{content.about_page_title || 'درباره ما'}</h1>
                    <p>{content.about_page_subtitle || 'با ما بیشتر آشنا شوید.'}</p>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">درباره ما</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="content">
                            <div className="row">

                                {/* متن معرفی */}
                                <div className="col-12 col-lg-7">
                                    <div className="title">{content.about_intro_title || 'معرفی فروشگاه'}</div>
                                    <p>{content.about_paragraph1 || 'روبیک مارکت یک فروشگاه اینترنتی است که با هدف ارائه بهترین محصولات با مناسب‌ترین قیمت فعالیت می‌کند.'}</p>
                                    <p>{content.about_paragraph2 || 'ما در روبیک مارکت همواره در تلاش هستیم تا بهترین تجربه خرید آنلاین را برای مشتریان خود فراهم کنیم.'}</p>
                                    <p>{content.about_paragraph3 || 'کیفیت، سرعت و اعتماد سه اصل اساسی فروشگاه ما هستند. با ما همراه باشید.'}</p>
                                </div>
                                <div className="col-12 col-lg-5 align-self-center">
                                    <img src={content.about_image || '/images/about-us.jpg'} alt="درباره ما" className="img-fluid rounded-3"
                                        onError={e => e.target.src = 'https://via.placeholder.com/500x350?text=About+Us'} />
                                </div>

                                {/* تیم */}
                                <div className="col-12 text-center pt-5 pb-3">
                                    <h2 className="center-title">{content.about_team_title || 'تیم ما'}</h2>
                                    <span className="sub-title">{content.about_team_subtitle || 'با تیم ما بیشتر آشنا شوید.'}</span>
                                </div>

                                {team.map((person, i) => (
                                    <div key={i} className="col-12 col-sm-6 col-lg-3">
                                        <figure className="team-person text-center">
                                            <div className="profile-image">
                                                <img src={person.img} alt={person.name} className="img-fluid rounded-circle"
                                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                                    onError={e => e.target.src = 'https://via.placeholder.com/120?text=' + person.name[0]} />
                                            </div>
                                            <figcaption className="mt-3">
                                                <h3 className="fw-bold">{person.name}</h3>
                                                <h4 className="text-muted small">{person.role}</h4>
                                                <p className="small">{person.desc}</p>
                                                <div className="icons d-flex justify-content-center gap-2">
                                                    <a href="#"><i className="ion-social-twitter"></i></a>
                                                    <a href="#"><i className="ion-social-linkedin"></i></a>
                                                </div>
                                            </figcaption>
                                        </figure>
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