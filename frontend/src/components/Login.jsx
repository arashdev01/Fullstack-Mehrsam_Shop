import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        axios.post('http://127.0.0.1:8000/api/token/', { username, password })
            .then(res => {
                // ذخیره توکن در مرورگر
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                localStorage.setItem('username', username);
                navigate('/');
            })
            .catch(() => {
                setError('نام کاربری یا رمز عبور اشتباه است');
                setLoading(false);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="bg-white p-4 rounded-4 shadow-sm text-end">

                        <h4 className="fw-bold mb-4">ورود به حساب کاربری</h4>

                        {error && (
                            <div className="alert alert-danger rounded-3">{error}</div>
                        )}

                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">نام کاربری</label>
                                <input
                                    type="text"
                                    className="form-control text-end"
                                    placeholder="نام کاربری خود را وارد کنید"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">رمز عبور</label>
                                <input
                                    type="password"
                                    className="form-control text-end"
                                    placeholder="رمز عبور خود را وارد کنید"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
                                disabled={loading}
                            >
                                {loading ? 'در حال ورود...' : 'ورود'}
                            </button>
                        </form>

                        <hr />

                        <p className="text-center text-muted mb-0">
                            حساب کاربری ندارید؟{' '}
                            <Link to="/register" className="text-primary fw-bold">ثبت‌نام کنید</Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}