import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import type { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { EDITORIAL_EASING } from '../utils/motion';

interface ContactPageProps {
  language: Language;
}

type IconProps = {
  className?: string;
};

const ArrowUpRightIcon = ({ className = '' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const CheckIcon = ({ className = '' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12.5l4.2 4.2L19 2.5" />
  </svg>
);

const CopyIcon = ({ className = '' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const SendIcon = ({ className = '' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 12.5L20 3l-5 17-4.5-7.5L2.5 12.5z" />
    <path d="M20 3L9.5 13.5" />
  </svg>
);

const Loader2Icon = ({ className = '' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
    <path d="M12 2a10 10 0 0 1 10 10" />
    <path d="M21.5 15.5A10 10 0 1 1 12 2" opacity="0.5" />
  </svg>
);

const AlertCircleIcon = ({ className = '' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6" />
    <path d="M12 17h.01" />
  </svg>
);

const ExternalLinkIcon = ({ className = '' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 5h5v5" />
    <path d="M10 14L19 5" />
    <path d="M19 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
  </svg>
);

const MailIcon = ({ className = '' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export default function ContactPage({ language }: ContactPageProps) {
  const t = TRANSLATIONS[language].contact;
  const devEmail = 'bimaradensyahputra@gmail.com';

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: language === 'id' ? 'Pengembangan Web Full Stack' : 'Full Stack Web Development',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [needsActivation, setNeedsActivation] = useState(false);
  const [lastSentData, setLastSentData] = useState<{
    name: string;
    email: string;
    service: string;
    message: string;
  } | null>(null);

  // Respect prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(devEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDirectMailtoUrl = (customData?: typeof formData) => {
    const data = customData || formData;
    const subject = encodeURIComponent(`[Portofolio Bima Raden] ${data.name || 'Proyek Baru'} - ${data.service}`);
    const body = encodeURIComponent(
      `Halo Bima,\n\nNama: ${data.name}\nEmail: ${data.email}\nKebutuhan Proyek: ${data.service}\n\nPesan:\n${data.message}\n\n---\nDikirim dari Form Portofolio Bima Raden`
    );
    return `mailto:${devEmail}?subject=${subject}&body=${body}`;
  };

  const getGmailComposeUrl = (customData?: typeof formData) => {
    const data = customData || formData;
    const subject = encodeURIComponent(`[Portofolio Bima Raden] ${data.name || 'Proyek Baru'} - ${data.service}`);
    const body = encodeURIComponent(
      `Halo Bima,\n\nNama: ${data.name}\nEmail: ${data.email}\nKebutuhan Proyek: ${data.service}\n\nPesan:\n${data.message}\n\n---\nDikirim dari Form Portofolio Bima Raden`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${devEmail}&su=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setNeedsActivation(false);

    const submissionPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      service: formData.service,
      message: formData.message.trim(),
      _subject: `[Portofolio Bima Raden] Pesan Baru dari ${formData.name.trim()} - ${formData.service}`,
      _replyto: formData.email.trim(),
      _template: 'table',
      _captcha: 'false',
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${devEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(submissionPayload),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success === 'true') {
        setLastSentData({ ...formData });
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          service: language === 'id' ? 'Pengembangan Web Full Stack' : 'Full Stack Web Development',
          message: '',
        });
      } else if (result?.message && result.message.toLowerCase().includes('activation')) {
        setLastSentData({ ...formData });
        setNeedsActivation(true);
        setIsSubmitted(true);
      } else if (response.ok) {
        setLastSentData({ ...formData });
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          service: language === 'id' ? 'Pengembangan Web Full Stack' : 'Full Stack Web Development',
          message: '',
        });
      } else {
        throw new Error(result?.message || 'Gagal mengirim pesan');
      }
    } catch (err: unknown) {
      console.error('Error submitting form to email:', err);
      setSubmitError(
        language === 'id'
          ? 'Gagal terhubung otomatis ke server email. Jangan khawatir, Anda dapat mengirimkannya langsung lewat Gmail atau aplikasi email Anda di bawah.'
          : 'Failed to connect automatically to the email server. You can still send it directly via Gmail or your email app below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'in/bima-raden',
      url: 'https://id.linkedin.com/in/bimaradensyahputra',
      delay: 0,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@bimsraden',
      url: 'https://www.instagram.com/bimsraden',
      delay: 0.07,
    },
  ];

  return (
    <div
      id="contact-page"
      className="w-full bg-[#E8E4D8] text-[#111111] pt-10 sm:pt-14 lg:pt-18 pb-24 sm:pb-32 px-6 sm:px-8 md:px-12 overflow-x-hidden"
    >
      <div className="w-full max-w-6xl mx-auto">

        {/* ========================================================= */}
        {/* 1. HUGE EDITORIAL POSTER TITLE (KONTAK / CONTACT)        */}
        {/* ========================================================= */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-[#111111]/20 pb-6 sm:pb-10 mb-10 sm:mb-14"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-4">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#173C32] font-bold">
              BIMA RADEN &bull; {language === 'id' ? 'DIREKTORI KONTAK' : 'CONTACT DIRECTORY'}
            </span>
            <span className="text-xs font-mono text-[#111111]/55 tracking-wider">
              INDONESIA (WIB / UTC+7)
            </span>
          </div>

          {/* EDITORIAL POSTER HEADLINE IN SOFT BLACK (#111111) */}
          <h1
            className="font-editorial font-black text-[#111111] tracking-[-0.035em] leading-[0.82] select-none text-[clamp(70px,18vw,260px)] -ml-1 sm:-ml-2 uppercase cursor-default"
            style={{ fontVariationSettings: '"wght" 900, "opsz" 144' }}
            aria-label={t.pageTitle}
          >
            {t.pageTitle}
          </h1>
        </motion.div>

        {/* ========================================================= */}
        {/* 2. ASYMMETRIC EDITORIAL GRID: LEFT (INFO) & RIGHT (FORM) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">

          {/* ------------------------------------------------------- */}
          {/* LEFT COLUMN: STATEMENT, NETWORK ROWS, & PROMINENT EMAIL */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-5 space-y-12 lg:space-y-14">

            {/* HUMAN STATEMENT & DESCRIPTOR */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3 sm:space-y-4"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-[#111111] leading-tight">
                {t.heroStatement}
              </h2>
              <p className="text-sm sm:text-base text-[#111111]/80 font-sans leading-relaxed max-w-md">
                {t.heroDescriptor}
              </p>
            </motion.div>

            {/* EDITORIAL LINK ROWS: JEJARING (EDITORIAL PRINT STYLE) */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="group/sec border-b border-[#111111]/20 pb-2.5 mb-2 flex items-center justify-between select-none">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#173C32] font-bold">
                  {t.socialTitle}
                </span>
                <span className="text-[11px] font-mono text-[#111111]/40 group-hover/sec:text-[#173C32] transition-colors duration-200">
                  {language === 'id' ? 'KENALAN 👋' : 'SAY HELLO 👋'}
                </span>
              </div>

              <div className="divide-y divide-[#111111]/15">
                {socialLinks.map((item) => (
                  <motion.a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={reducedMotion ? {} : { opacity: 0, x: -8 }}
                    animate={reducedMotion ? {} : { opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.25 + item.delay,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group py-4 min-h-[52px] flex items-center justify-between transition-colors hover:text-[#173C32] cursor-pointer"
                  >
                    <div className="transition-transform duration-200 group-hover:translate-x-1">
                      <div className="text-lg sm:text-xl font-editorial font-bold text-[#111111] group-hover:text-[#173C32] group-hover:underline underline-offset-4 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-xs font-mono text-[#111111]/60 mt-0.5 tracking-wide">
                        {item.handle}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-[#173C32]/30 flex items-center justify-center text-[#173C32] group-hover:bg-[#173C32] group-hover:text-[#F7F5EE] group-hover:border-[#173C32] transition-all duration-200 group-hover:translate-x-1">
                      <ArrowUpRightIcon className="w-4 h-4" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* PROMINENT EMAIL SECTION (DIRECTLY ON WARM BONE PAPER) */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-[#111111]/20 pt-6 space-y-3"
            >
              <div className="group/email flex items-center justify-between select-none">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#173C32] font-bold block">
                  {t.emailTitle}
                </span>
                <span className="text-xs opacity-0 group-hover/email:opacity-100 transition-opacity duration-200">
                  👋
                </span>
              </div>

              <a
                href={`mailto:${devEmail}`}
                className="group inline-flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-[#111111] hover:text-[#173C32] hover:underline underline-offset-4 break-all leading-snug transition-colors"
              >
                <span>{devEmail}</span>
                <ArrowUpRightIcon className="w-5 h-5 text-[#173C32] opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </a>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#173C32] border-b border-[#173C32] pb-0.5 hover:text-[#111111] hover:border-[#111111] transition-colors duration-200 cursor-pointer select-none"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="w-3.5 h-3.5 text-[#173C32]" />
                      <span className="text-[#173C32] font-black">{language === 'id' ? '✓ TERSALIN' : '✓ COPIED'}</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="w-3.5 h-3.5" />
                      <span>{t.copyEmail}</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${devEmail}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#173C32] border-b border-[#173C32] pb-0.5 hover:text-[#111111] hover:border-[#111111] transition-colors duration-200"
                >
                  <span>{t.openEmail}</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

          </div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT COLUMN: FLAT EDITORIAL CONTACT FORM (NO DARK CARD) */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-7">
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="border-t lg:border-t-0 lg:border-l border-[#111111]/20 pt-10 lg:pt-0 lg:pl-12 xl:pl-16"
            >
              {/* FORM HEADER */}
              <div className="border-b border-[#111111]/20 pb-3 mb-8">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#173C32] font-bold block">
                  {t.quickMessage}
                </span>
              </div>

              {/* SUCCESS OR FORM VIEW */}
              {isSubmitted ? (
                needsActivation ? (
                  <div className="py-6 space-y-4 bg-[#F7F5EE] p-6 border border-[#173C32]/20">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#173C32] font-bold block">
                      {language === 'id' ? 'LANGKAH VERIFIKASI' : 'VERIFICATION REQUIRED'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-[#111111]">
                      {t.activationTitle}
                    </h3>
                    <p className="text-[#111111]/80 text-sm font-sans leading-relaxed max-w-lg">
                      {t.activationDesc}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-3">
                      <a
                        href="https://mail.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 bg-[#173C32] text-[#F7F5EE] text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#111111] transition-colors duration-200 inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>{t.openGmail}</span>
                        <ExternalLinkIcon className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className="text-xs font-mono font-bold uppercase tracking-widest text-[#173C32] border-b border-[#173C32] pb-0.5 hover:text-[#111111] transition-colors duration-200 cursor-pointer"
                      >
                        {t.sendAnother}
                      </button>
                    </div>

                    {lastSentData && (
                      <div className="mt-8 pt-6 border-t border-[#111111]/15 text-xs font-mono space-y-1 text-[#111111]/80">
                        <div className="text-[10px] uppercase tracking-widest text-[#111111]/50 mb-2">
                          {language === 'id' ? 'Data Pesan Pengunjung:' : 'Visitor Data:'}
                        </div>
                        <div><strong className="text-[#111111]">{lastSentData.name}</strong> &bull; {lastSentData.email}</div>
                        <div className="text-[#173C32] font-semibold">{lastSentData.service}</div>
                        <div className="italic text-[#111111]/90 pt-1">"{lastSentData.message}"</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-6 space-y-4 bg-[#F7F5EE] p-6 border border-[#173C32]/20">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#173C32] font-bold block">
                      {language === 'id' ? 'STATUS PENGIRIMAN' : 'DELIVERY STATUS'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-[#111111]">
                      {t.formSuccessTitle}
                    </h3>
                    <p className="text-[#111111]/80 text-sm font-sans leading-relaxed max-w-lg">
                      {t.formSuccess}
                    </p>

                    {lastSentData && (
                      <div className="my-6 pt-4 pb-2 border-y border-[#111111]/15 text-xs font-mono space-y-1 text-[#111111]/80">
                        <div className="text-[10px] uppercase tracking-widest text-[#111111]/50 mb-2">
                          {language === 'id' ? 'Ringkasan Pesan:' : 'Message Summary:'}
                        </div>
                        <div><strong className="text-[#111111]">{lastSentData.name}</strong> &bull; {lastSentData.email}</div>
                        <div className="text-[#173C32] font-semibold">{lastSentData.service}</div>
                        <div className="italic text-[#111111]/90 pt-1">"{lastSentData.message}"</div>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-3 bg-[#173C32] text-[#F7F5EE] text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#111111] transition-colors duration-200 cursor-pointer"
                      >
                        {t.sendAnother}
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">

                  {/* ERROR NOTIFICATION (IF NETWORK FAILS) */}
                  {submitError && (
                    <div className="p-4 border border-[#173C32]/30 bg-[#F7F5EE] text-[#111111] text-xs space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertCircleIcon className="w-4 h-4 text-[#173C32] shrink-0 mt-0.5" />
                        <span className="font-sans leading-relaxed">{submitError}</span>
                      </div>
                      <div className="flex items-center gap-4 pt-2 border-t border-[#111111]/15 font-mono text-[11px]">
                        <a
                          href={getGmailComposeUrl()}
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-[#173C32] font-bold inline-flex items-center gap-1 text-[#173C32]"
                        >
                          <span>Gmail Web</span>
                          <ExternalLinkIcon className="w-3 h-3" />
                        </a>
                        <span>&bull;</span>
                        <a
                          href={getDirectMailtoUrl()}
                          className="underline hover:text-[#173C32] font-bold inline-flex items-center gap-1 text-[#173C32]"
                        >
                          <span>Mail App</span>
                          <MailIcon className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* FLAT EDITORIAL INPUT: NAMA */}
                  <div className="group/field space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 group-focus-within/field:text-[#173C32] transition-colors duration-200 font-medium">
                      {t.formName} *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Raden Pratama"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-[#111111]/25 focus:border-[#173C32] text-[#111111] text-base py-2.5 px-0 placeholder-[#111111]/35 focus:outline-hidden font-sans rounded-none transition-colors duration-200"
                    />
                  </div>

                  {/* FLAT EDITORIAL INPUT: EMAIL */}
                  <div className="group/field space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 group-focus-within/field:text-[#173C32] transition-colors duration-200 font-medium">
                      {t.formEmail} *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. raden@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-[#111111]/25 focus:border-[#173C32] text-[#111111] text-base py-2.5 px-0 placeholder-[#111111]/35 focus:outline-hidden font-sans rounded-none transition-colors duration-200"
                    />
                  </div>

                  {/* FLAT EDITORIAL SELECT: KEBUTUHAN PROYEK */}
                  <div className="group/field space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 group-focus-within/field:text-[#173C32] transition-colors duration-200 font-medium">
                      {t.formInterest}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-[#111111]/25 focus:border-[#173C32] text-[#111111] text-base py-2.5 px-0 focus:outline-hidden font-sans rounded-none cursor-pointer transition-colors duration-200"
                    >
                      <option value={language === 'id' ? 'Pengembangan Web Full Stack' : 'Full Stack Web Development'} className="bg-[#F7F5EE] text-[#111111]">
                        {language === 'id' ? 'Pengembangan Web Full Stack' : 'Full Stack Web Development'}
                      </option>
                      <option value={language === 'id' ? 'Otomasi Alur Kerja n8n' : 'n8n Workflow Automation'} className="bg-[#F7F5EE] text-[#111111]">
                        {language === 'id' ? 'Otomasi Alur Kerja n8n' : 'n8n Workflow Automation'}
                      </option>
                      <option value={language === 'id' ? 'IoT & Sistem Tertanam' : 'IoT & Embedded Systems'} className="bg-[#F7F5EE] text-[#111111]">
                        {language === 'id' ? 'IoT & Sistem Tertanam' : 'IoT & Embedded Systems'}
                      </option>
                      <option value={language === 'id' ? 'Lainnya / Diskusi' : 'Other / General Inquiry'} className="bg-[#F7F5EE] text-[#111111]">
                        {language === 'id' ? 'Lainnya / Diskusi' : 'Other / General Inquiry'}
                      </option>
                    </select>
                  </div>

                  {/* FLAT EDITORIAL TEXTAREA: PESAN */}
                  <div className="group/field space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 group-focus-within/field:text-[#173C32] transition-colors duration-200 font-medium">
                      {t.formMessage} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={language === 'id' ? 'Tuliskan kebutuhan proyek atau pertanyaan Anda...' : 'Tell me about your project or inquiry...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-[#111111]/25 focus:border-[#173C32] text-[#111111] text-base py-2.5 px-0 placeholder-[#111111]/35 focus:outline-hidden font-sans rounded-none transition-colors duration-200 resize-y"
                    />
                  </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group px-8 py-4 bg-[#173C32] text-[#F7F5EE] font-syne font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-flex items-center gap-2.5 cursor-pointer disabled:opacity-60 shadow-xs"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2Icon className="w-3.5 h-3.5 animate-spin text-[#F7F5EE]" />
                            <span>{t.formSending}</span>
                          </>
                        ) : (
                          <>
                            <span>{t.formSubmit}</span>
                            <SendIcon className="w-3.5 h-3.5 text-[#F7F5EE] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                          </>
                        )}
                      </button>
                    </div>

                </form>
              )}

            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
}
