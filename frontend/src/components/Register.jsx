import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/register/', { username, password })
      .then(() => alert("ثبت‌نام موفق! حالا می‌توانید وارد شوید."))
      .catch(() => alert("خطا در ثبت‌نام"));
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleRegister} className="col-md-4 mx-auto bg-white p-4 rounded shadow">
        <h3 className="mb-3">عضویت در سایت</h3>
        <input type="text" placeholder="نام کاربری" className="form-control mb-2" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="رمز عبور" className="form-control mb-3" onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100">ثبت‌نام</button>
      </form>
    </div>
  );
}