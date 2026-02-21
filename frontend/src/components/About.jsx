import { Link } from 'react-router-dom';

const team = [
    { name: 'مجید کیانی', role: 'مدیر عامل', desc: 'به عنوان مدیر عامل در تیم فعالیت دارد.', img: '/images/team/team-person1.jpg' },
    { name: 'پوریا طلایی', role: 'برنامه نویس', desc: 'به عنوان برنامه نویس در تیم فعالیت دارد.', img: '/images/team/team-person2.jpg' },
    { name: 'امیر جاوید', role: 'تولید کننده محتوا', desc: 'به عنوان تولید کننده محتوا در تیم فعالیت دارد.', img: '/images/team/team-person3.jpg' },
    { name: 'وحید کمالی', role: 'دیجیتال مارکتر', desc: 'به عنوان دیجیتال مارکتر در تیم فعالیت دارد.', img: '/images/team/team-person4.jpg' },
];

export default function About() {
    return (
        <section className="inner-page" id="contact-page">
            <div className="container-fluid" id="page-hero">
                <div className="container py-3">
                    <h1>درباره ما</h1>
                    <p>با ما بیشتر آشنا شوید.</p>
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
                                    <div className="title">معرفی فروشگاه</div>
                                    <p>روبیک مارکت یک فروشگاه اینترنتی است که با هدف ارائه بهترین محصولات با مناسب‌ترین قیمت فعالیت می‌کند.</p>
                                    <p>ما در روبیک مارکت همواره در تلاش هستیم تا بهترین تجربه خرید آنلاین را برای مشتریان خود فراهم کنیم.</p>
                                    <p>کیفیت، سرعت و اعتماد سه اصل اساسی فروشگاه ما هستند. با ما همراه باشید.</p>
                                </div>
                                <div className="col-12 col-lg-5 align-self-center">
                                    <img src="/images/about-us.jpg" alt="درباره ما" className="img-fluid rounded-3"
                                        onError={e => e.target.src = 'https://via.placeholder.com/500x350?text=About+Us'} />
                                </div>

                                {/* تیم */}
                                <div className="col-12 text-center pt-5 pb-3">
                                    <h2 className="center-title">تیم ما</h2>
                                    <span className="sub-title">با تیم ما بیشتر آشنا شوید.</span>
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