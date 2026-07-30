import React, { useState } from 'react';
import { FiUser, FiPhone, FiBookOpen, FiMessageSquare, FiSend, FiCheckCircle, FiChevronDown } from 'react-icons/fi';
import { inquiryService } from '../utils/inquiryService';

export const INQUIRY_PROGRAMS = [
  '8th to 10th Coaching',
  '11th & 12th Science (GSEB)',
  '11th & 12th Science (CBSE)',
  'NEET Preparation Batch',
  'JEE Preparation Batch',
  'GUJCET Preparation',
  'Diploma Engineering Coaching',
  'Degree Engineering (Sem Coaching)',
  'DDCET Entrance Preparation',
  'MSU Special Batch',
  'Parul University (PU) Special Batch',
  'Career Guidance & Counseling',
];

/**
 * InquiryForm – Fully reusable admission inquiry form component.
 *
 * Props:
 *   compact    {boolean}  – Smaller single-column layout (for sidebars / Home CTA)
 *   title      {string}   – Override heading
 *   subtitle   {string}   – Override subtitle
 *   darkBg     {boolean}  – Dark-themed styling (for dark section backgrounds)
 *   onSuccess  {function} – Callback after successful submission
 */
export default function InquiryForm({
  compact = false,
  title = 'Send Admission Inquiry',
  subtitle = 'Fill in your details and our advisor will contact you shortly.',
  darkBg = false,
  onSuccess,
}) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    program: INQUIRY_PROGRAMS[0],
    message: '',
  });
  const [errors, setErrors] = useState({});

  const set = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter student name';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) errs.phone = 'Enter valid 10-digit Indian mobile number';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    inquiryService.saveInquiry(form);
    setLoading(false);
    setSent(true);
    onSuccess?.();
  };

  const handleReset = () => {
    setSent(false);
    setForm({ name: '', phone: '', program: INQUIRY_PROGRAMS[0], message: '' });
    setErrors({});
  };

  // ── Colour tokens ──────────────────────────────────────────────────────
  const T = darkBg
    ? {
        card: 'bg-white/5 border border-white/10 backdrop-blur-sm',
        title: 'text-white',
        sub: 'text-zinc-400',
        label: 'text-zinc-300',
        input: 'bg-white/10 border-white/20 text-white placeholder-zinc-500 focus:border-blue-400 focus:ring-blue-400/20',
        error: 'text-red-400',
        btn: 'bg-[#DC2626] hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]',
        success: 'bg-green-900/40 border-green-500/40 text-green-300',
        privacy: 'text-zinc-500',
      }
    : {
        card: 'bg-white border border-slate-200 shadow-md',
        title: 'text-[#0F172A]',
        sub: 'text-zinc-500',
        label: 'text-[#0F172A]',
        input: 'bg-slate-50 border-slate-200 text-[#1E293B] placeholder-zinc-400 focus:border-blue-600 focus:ring-blue-600/20',
        error: 'text-red-600',
        btn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-blue-600/30',
        success: 'bg-green-50 border-green-200 text-green-800',
        privacy: 'text-zinc-400',
      };

  const inputCls = `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:ring-2 ${T.input}`;

  // ── Success screen ─────────────────────────────────────────────────────
  if (sent) {
    return (
      <div className={`${T.card} rounded-3xl p-8 text-center`}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/15 text-green-500 text-3xl mb-4 mx-auto">
          <FiCheckCircle />
        </div>
        <h3 className={`text-xl font-extrabold mb-2 ${T.title}`}>Inquiry Received! 🎉</h3>
        <p className={`text-sm mb-6 leading-relaxed ${T.sub}`}>
          Thank you! Our academic advisor will call you within <strong>24 hours</strong> to discuss the best program for you.
        </p>
        <div className={`text-xs rounded-2xl p-4 border mb-6 text-left ${T.success}`}>
          <strong className="block mb-1">What happens next?</strong>
          ① Our advisor reviews your inquiry<br />
          ② We call your registered number<br />
          ③ Free guidance session is scheduled
        </div>
        <button
          onClick={handleReset}
          className={`text-xs font-bold py-2 px-6 rounded-xl border transition-all ${darkBg ? 'border-white/20 text-zinc-300 hover:bg-white/10' : 'border-slate-200 text-zinc-600 hover:bg-slate-100'}`}
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────
  return (
    <div className={`${T.card} rounded-3xl ${compact ? 'p-6' : 'p-8'}`}>
      <h3 className={`font-extrabold mb-1 ${compact ? 'text-lg' : 'text-xl'} ${T.title}`}>{title}</h3>
      <p className={`text-xs mb-6 leading-relaxed ${T.sub}`}>{subtitle}</p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Name + Phone */}
        <div className={compact ? 'flex flex-col gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
          {/* Name */}
          <div>
            <label className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${T.label}`}>
              Student Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none" />
              <input
                type="text"
                placeholder="e.g. Raj Patel"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                className={`${inputCls} pl-9`}
              />
            </div>
            {errors.name && <p className={`text-xs mt-1 ${T.error}`}>{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${T.label}`}>
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none" />
              <input
                type="tel"
                placeholder="e.g. 9876543210"
                value={form.phone}
                onChange={e => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                className={`${inputCls} pl-9`}
                inputMode="numeric"
                maxLength={10}
              />
            </div>
            {errors.phone && <p className={`text-xs mt-1 ${T.error}`}>{errors.phone}</p>}
          </div>
        </div>

        {/* Program */}
        <div>
          <label className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${T.label}`}>
            Interested Program
          </label>
          <div className="relative">
            <FiBookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none" />
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none" />
            <select
              value={form.program}
              onChange={e => set('program', e.target.value)}
              className={`${inputCls} pl-9 pr-9 appearance-none cursor-pointer`}
            >
              {INQUIRY_PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* Message – hidden in compact mode */}
        {!compact && (
          <div>
            <label className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${T.label}`}>
              Message / Query{' '}
              <span className={`font-normal normal-case tracking-normal ${T.sub}`}>(Optional)</span>
            </label>
            <div className="relative">
              <FiMessageSquare className="absolute left-3 top-3.5 text-zinc-400 text-sm pointer-events-none" />
              <textarea
                rows={3}
                placeholder="Any specific subject, standard, or query..."
                value={form.message}
                onChange={e => set('message', e.target.value)}
                className={`${inputCls} pl-9 resize-none`}
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 font-extrabold py-3.5 px-8 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${T.btn}`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <FiSend />
              {compact ? 'Submit Inquiry' : 'Submit — Get Free Guidance Call'}
            </>
          )}
        </button>

        <p className={`text-[10px] text-center leading-relaxed ${T.privacy}`}>
          🔒 Your information is kept private and used only to respond to your inquiry.
        </p>
      </form>
    </div>
  );
}
