import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Clock, Loader2, Send, CircleCheck, CircleX } from 'lucide-react';
import Reveal from '@/components/feature/Reveal';
import { supabase } from '@/lib/supabase';

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Record<string, string>>({ name: '', email: '', company: '', phone: '', service: '', budget: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const serviceOptions = [
    t('contact.form.option.service0'), t('contact.form.option.service1'), t('contact.form.option.service2'),
    t('contact.form.option.service3'), t('contact.form.option.service4'), t('contact.form.option.service5'),
    t('contact.form.option.service6'), t('contact.form.option.service7'), t('contact.form.option.service8'),
  ];
  const budgetOptions = [
    t('contact.form.option.budget0'), t('contact.form.option.budget1'), t('contact.form.option.budget2'),
    t('contact.form.option.budget3'), t('contact.form.option.budget4'), t('contact.form.option.budget5'),
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) { setErrors((prev) => { const next = { ...prev }; delete next[name]; return next; }); }
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = t('contact.form.name_required');
    if (!formData.email.trim()) next.email = t('contact.form.email_required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = t('contact.form.email_invalid');
    if (!formData.message.trim()) next.message = t('contact.form.message_required');
    else if (formData.message.length > 500) next.message = t('contact.form.message_max');
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setStatus('submitting'); setErrors({});
    const { error } = await supabase!.from('contact_submissions').insert({ name: formData.name, email: formData.email, phone: formData.phone || '', company: formData.company || '', service_type: formData.service || '', message: formData.message, status: 'new' });
    if (error) { console.error('Contact form error:', error); setStatus('error'); }
    else { setStatus('success'); setFormData({ name: '', email: '', company: '', phone: '', service: '', budget: '', message: '' }); }
  };

  return (
    <section className="py-10 sm:py-20 lg:py-28 bg-circuit-white overflow-x-hidden" id="contact-form">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <div>
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-2 sm:mb-3 block">{t('contact.form.eyebrow')}</span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-navy dark:text-white leading-[1.15] mb-3 sm:mb-5 text-balance">{t('contact.form.title')}</h2>
              <p className="text-xs sm:text-base text-foreground-500 leading-relaxed mb-5 sm:mb-8">{t('contact.form.subtitle')}</p>
              <div className="space-y-3 sm:space-y-5">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#5b8cff] to-[#2563eb] shadow-md shadow-blue-500/25 flex items-center justify-center flex-shrink-0"><Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2} /></div>
                  <div className="min-w-0"><div className="text-[10px] sm:text-xs font-semibold text-foreground-400 uppercase tracking-wider mb-0.5">{t('contact.info.email')}</div><div className="text-xs sm:text-sm text-navy dark:text-white break-all">info@conquercomputers.com</div></div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#5b8cff] to-[#2563eb] shadow-md shadow-blue-500/25 flex items-center justify-center flex-shrink-0"><Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2} /></div>
                  <div className="min-w-0"><div className="text-[10px] sm:text-xs font-semibold text-foreground-400 uppercase tracking-wider mb-0.5">{t('contact.info.phone')}</div><div className="text-xs sm:text-sm text-navy dark:text-white">+971 54 343 3553</div></div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#5b8cff] to-[#2563eb] shadow-md shadow-blue-500/25 flex items-center justify-center flex-shrink-0"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2} /></div>
                  <div className="min-w-0"><div className="text-[10px] sm:text-xs font-semibold text-foreground-400 uppercase tracking-wider mb-0.5">{t('contact.info.hours')}</div><div className="text-xs sm:text-sm text-navy dark:text-white">{t('contact.info.mon_fri')}</div></div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-3" delay={0.1}>
            <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-10">
              <form id="contact-form" data-readdy-form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  <div>
                    <label className="block text-[11px] sm:text-sm font-semibold text-foreground-700 dark:text-slate-300 mb-1 sm:mb-1.5">{t('contact.form.name')}<span className="text-accent-500 ml-0.5">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('contact.form.name_placeholder')} className="form-input-glass w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm placeholder:text-slate-500" />
                    {errors.name && <p className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-sm font-semibold text-foreground-700 dark:text-slate-300 mb-1 sm:mb-1.5">{t('contact.form.email')}<span className="text-accent-500 ml-0.5">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('contact.form.email_placeholder')} className="form-input-glass w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm placeholder:text-slate-500" />
                    {errors.email && <p className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  <div>
                    <label className="block text-[11px] sm:text-sm font-semibold text-foreground-700 dark:text-slate-300 mb-1 sm:mb-1.5">{t('contact.form.company')}</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder={t('contact.form.company_placeholder')} className="form-input-glass w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-sm font-semibold text-foreground-700 dark:text-slate-300 mb-1 sm:mb-1.5">{t('contact.form.phone')}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('contact.form.phone_placeholder')} className="form-input-glass w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm placeholder:text-slate-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  <div>
                    <label className="block text-[11px] sm:text-sm font-semibold text-foreground-700 dark:text-slate-300 mb-1 sm:mb-1.5">{t('contact.form.service')}</label>
                    <select name="service" value={formData.service} onChange={handleChange} className="form-input-glass w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm appearance-none">
                      <option value="">{t('contact.form.service_select')}</option>
                      {serviceOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-sm font-semibold text-foreground-700 dark:text-slate-300 mb-1 sm:mb-1.5">{t('contact.form.budget')}</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} className="form-input-glass w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm appearance-none">
                      <option value="">{t('contact.form.budget_select')}</option>
                      {budgetOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] sm:text-sm font-semibold text-foreground-700 dark:text-slate-300 mb-1 sm:mb-1.5">{t('contact.form.message')}<span className="text-accent-500 ml-0.5">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder={t('contact.form.message_placeholder')} rows={4} maxLength={500} className="form-input-glass w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm placeholder:text-slate-500 resize-y" />
                  <div className="flex items-center justify-between mt-1">
                    {errors.message ? <p className="text-[10px] sm:text-xs text-red-500">{errors.message}</p> : <span />}
                    <span className="text-[10px] sm:text-xs text-foreground-400">{formData.message.length}/500</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <button type="submit" disabled={status === 'submitting'} className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-accent-500 text-white text-xs sm:text-sm font-medium hover:bg-accent-600 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto min-h-[44px]">
                    {status === 'submitting' ? (<><Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 animate-spin" strokeWidth={2} />{t('contact.form.sending')}</>) : (<>{t('contact.form.send')}<Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" strokeWidth={2} /></>)}
                  </button>
                  {status === 'success' && (<span className="text-xs sm:text-sm text-green-600 flex items-center gap-1"><CircleCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />{t('contact.form.success')}</span>)}
                  {status === 'error' && (<span className="text-xs sm:text-sm text-red-500 flex items-center gap-1"><CircleX className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />{t('contact.form.error')}</span>)}
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}