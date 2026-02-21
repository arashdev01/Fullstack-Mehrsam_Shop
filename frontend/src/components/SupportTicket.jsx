import React from 'react';

const SupportTicket = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">ارسال تیکت پشتیبانی</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3 text-end">
                  <label className="form-label">موضوع تیکت</label>
                  <input type="text" className="form-control" placeholder="مثلاً: سوال در مورد سفارش" />
                </div>
                
                <div className="mb-3 text-end">
                  <label className="form-label">دپارتمان</label>
                  <select className="form-select">
                    <option>پشتیبانی فروش</option>
                    <option>بخش فنی</option>
                    <option>مالی و حسابداری</option>
                  </select>
                </div>

                <div className="mb-3 text-end">
                  <label className="form-label">متن پیام</label>
                  <textarea className="form-control" rows="5" placeholder="مشکل خود را اینجا بنویسید..."></textarea>
                </div>

                <div className="mb-3 text-end">
                  <label className="form-label">پیوست فایل (اختیاری)</label>
                  <input type="file" className="form-control" />
                </div>

                <button type="submit" className="btn btn-success w-100">ارسال تیکت</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicket;