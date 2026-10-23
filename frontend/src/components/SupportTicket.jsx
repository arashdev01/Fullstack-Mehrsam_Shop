import { submitContactMessage } from '../api';

const SupportTicket = () => {
  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget; const values = new FormData(form);
    try { await submitContactMessage({ name: localStorage.getItem('username') || 'کاربر مهمان', email_or_phone: values.get('contact'), subject: '[پشتیبانی] ' + values.get('department') + ' - ' + values.get('subject'), message: values.get('message') }); window.alert('درخواست شما ثبت شد.'); form.reset(); }
    catch { window.alert('ارسال درخواست ناموفق بود؛ لطفاً دوباره تلاش کنید.'); }
  };
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white"><h5 className="mb-0">ارسال درخواست پشتیبانی</h5></div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 text-end">
                  <label className="form-label">موضوع تیکت</label>
                  <input type="text" name="subject" className="form-control" placeholder="مثلاً: سوال در مورد سفارش" required />
                </div>
                
                <div className="mb-3 text-end">
                  <label className="form-label">دپارتمان</label>
                  <select className="form-select" name="department" required>
                    <option>پشتیبانی فروش</option>
                    <option>بخش فنی</option>
                    <option>مالی و حسابداری</option>
                  </select>
                </div>
                <div className="mb-3 text-end">
                  <label className="form-label">متن پیام</label>
                  <textarea className="form-control" name="message" rows="5" placeholder="مشکل خود را اینجا بنویسید..." required></textarea>
                </div>
                <div className="mb-3 text-end">
                  <label className="form-label">شماره تماس یا ایمیل (الزامی)</label>
                  <input type="text" name="contact" className="form-control" placeholder="شماره تماس یا ایمیل" required />
                </div>
                <button type="submit" className="btn btn-success w-100">ارسال درخواست</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SupportTicket;