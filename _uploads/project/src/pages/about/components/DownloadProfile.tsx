import { useState } from 'react';
import { Check, Download, Loader2, CircleCheck } from 'lucide-react';
import Reveal from '@/components/feature/Reveal';
import { DOWNLOAD_PROFILE } from '@/mocks/company-profile';

const COMPANY_PROFILE_PDF_URL = 'https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/0cef37ab-eb12-459d-9a34-6b6fa2f3d1b3_SINS_Technology_Company_Profile.pdf';

export default function DownloadProfile() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerDownload = () => {
    const a = document.createElement('a');
    a.href = COMPANY_PROFILE_PDF_URL;
    a.download = 'SINS-Technology-Company-Profile.pdf';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      window.open(COMPANY_PROFILE_PDF_URL, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
      triggerDownload();
    }, 1000);
  };

  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-hidden" id="download-profile">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <Reveal className="lg:col-span-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">
              {DOWNLOAD_PROFILE.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground-950 leading-[1.15] mb-4 text-balance">
              {DOWNLOAD_PROFILE.title}
            </h2>
            <p className="text-sm sm:text-base text-foreground-500 leading-relaxed mb-6 max-w-xl">
              {DOWNLOAD_PROFILE.description}
            </p>

            <ul className="space-y-2.5">
              {DOWNLOAD_PROFILE.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-foreground-600 text-xs sm:text-sm">
                  <Check className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="glass-card p-6 sm:p-8">
              {!submitted ? (
                <>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 shadow-lg shadow-accent-500/20 flex items-center justify-center flex-shrink-0">
                      <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-foreground-950">Get the Full Profile</h3>
                      <p className="text-xs text-foreground-400">Download as PDF (42 pages)</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="download-email" className="block text-xs font-medium text-foreground-600 mb-1.5">
                        Work Email
                      </label>
                      <input
                        id="download-email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-background-200 bg-background-50 text-sm text-foreground-950 placeholder:text-foreground-300 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:border-accent-300 transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="whitespace-nowrap cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                          Preparing Download...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" strokeWidth={2} />
                          Download Company Profile
                        </>
                      )}
                    </button>
                  </form>
                  <p className="text-xs text-foreground-400 mt-3 text-center">
                    We will not share your email. Used only to deliver the profile.
                  </p>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-4">
                    <CircleCheck className="w-7 h-7 text-accent-500" strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground-950 mb-2">Profile Ready!</h3>
                  <p className="text-xs text-foreground-500 mb-4">
                    The download should begin automatically. If it doesn&apos;t, check your inbox for the link.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="whitespace-nowrap cursor-pointer text-xs font-medium text-accent-500 hover:text-accent-600 transition-colors"
                  >
                    Send to a different email
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}