import { useEffect, useState } from 'react';
import { motion, MotionConfig, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HeroGraphics, WaveDivider, SectionOrbs } from '@/components/graphics';
import { Offerings } from '@/components/offerings';
import { AnimatedDivider } from '@/components/animated-divider';
import { ChefHat, Briefcase, Hotel, CalendarCheck, Phone, MessageCircle, Instagram, Facebook, MapPin, Menu, X, ArrowUpRight, ArrowUp, Check, Languages } from 'lucide-react';
import { T, type Lang, PHONE, TEL, waLink, IG, FB } from '@/content';

const ICONS: Record<string, typeof ChefHat> = { Briefcase, Hotel, CalendarCheck };
const MAPS = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Al-Madinah Al-Munawwarah Street, Amman, Jordan');

function Mark() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/center-logo.jpg`}
      alt="شعار مركز أسماء العابد للتدريب — Asmaa Al-Abed Training Center"
      width={225}
      height={225}
      className="h-12 w-12 shrink-0 rounded-full bg-white object-contain md:h-16 md:w-16"
    />
  );
}

const rise = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } } };
function Reveal({ children, className = '', d = 0 }: { children: React.ReactNode; className?: string; d?: number }) {
  return <motion.div className={className} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} transition={{ delay: d }}>{children}</motion.div>;
}
const Kick = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <p className={`mb-4 flex items-center gap-3 text-sm font-semibold tracking-wide ${dark ? 'text-secondary' : 'text-accent'}`}><span className="h-px w-10 bg-current" />{children}</p>
);
const btn = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';

export default function Site() {
  const [lang, setLang] = useState<Lang>('ar');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  const t = T[lang];
  const { scrollY } = useScroll();
  const ry = useTransform(scrollY, [0, 800], [0, 120]);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = lang === 'ar' ? 'مركز أسماء العابد للتدريب | Asmaa Alabed Training Center' : 'Asmaa Alabed Training Center | مركز أسماء العابد للتدريب';
  }, [lang]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const go = (id: string) => { setOpen(false); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50); };
  const toggleLang = () => setLang(lang === 'ar' ? 'en' : 'ar');
  const dk = !scrolled;
  const arrow = lang === 'ar' ? 'rotate-[-90deg]' : '';

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-[100dvh] overflow-x-clip">
      <motion.div style={{ scaleX: bar }} className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-1 origin-[0%_50%] bg-secondary rtl:origin-[100%_50%]" aria-hidden="true" />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-[100] focus:rounded focus:bg-secondary focus:p-3">Skip</a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 shadow-sm backdrop-blur-md' : ''}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 md:gap-4 md:px-10 md:py-3">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex min-w-0 shrink items-center gap-2 text-start md:gap-3" data-testid="link-home" aria-label={t.name}>
            <Mark />
            <span className={`f-display whitespace-nowrap text-[13px] font-semibold leading-tight md:hidden ${dk ? 'text-primary-foreground' : 'text-primary'}`}>{lang === 'ar' ? 'أسماء العابد' : 'Asmaa Alabed'}</span>
            <span className={`f-display hidden whitespace-nowrap text-base font-semibold leading-tight md:inline lg:text-lg ${dk ? 'text-primary-foreground' : 'text-primary'}`}>{t.name}</span>
          </button>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {t.nav.map(([id, l]) => (
              <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} className={`text-sm font-medium transition-colors ${dk ? 'text-primary-foreground hover:text-secondary' : 'text-foreground/80 hover:text-primary'}`} data-testid={`link-nav-${id}`}>{l}</a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
            <button onClick={toggleLang} className={`inline-flex min-h-10 items-center gap-1 rounded-full border px-2.5 text-sm font-semibold transition-colors md:min-h-11 md:gap-2 md:px-4 ${dk ? 'border-white/50 text-primary-foreground hover:bg-white/15' : 'border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground'}`} data-testid="button-lang" lang={lang === 'ar' ? 'en' : 'ar'}>
              <Languages className="h-4 w-4" />{t.langBtn}
            </button>
            <a href={waLink(t.waGeneral)} target="_blank" rel="noopener noreferrer" className={`${btn.replace('inline-flex ', '')} hidden sm:inline-flex min-h-11 ${dk ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'}`} data-testid="link-header-whatsapp"><MessageCircle className="h-4 w-4" />{t.wa}</a>
            <button onClick={() => setOpen(true)} className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${dk ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'}`} aria-label={t.menu} aria-expanded={open} data-testid="button-menu"><Menu className="h-5 w-5" /></button>
          </div>
        </div>
      </header>

      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[70] flex flex-col bg-primary p-6 text-primary-foreground" role="dialog" aria-modal="true" aria-label={t.menu}>
          <div className="flex justify-end"><button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-secondary-foreground" aria-label={t.close} data-testid="button-menu-close"><X className="h-5 w-5" /></button></div>
          <nav className="mt-6 flex flex-1 flex-col justify-center gap-2">
            {t.nav.map(([id, l], i) => (
              <motion.a key={id} initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} className="f-display border-b border-white/15 py-3 text-3xl" data-testid={`link-mobile-${id}`}>{l}</motion.a>
            ))}
          </nav>
          <a href={waLink(t.waGeneral)} target="_blank" rel="noopener noreferrer" className={`${btn} bg-secondary text-secondary-foreground`} data-testid="link-mobile-whatsapp"><MessageCircle className="h-5 w-5" />{t.cta1}</a>
        </motion.div>
      )}

      <main>
        {/* HERO */}
        <section className="relative flex min-h-0 items-center bg-primary pb-12 pt-24 text-primary-foreground md:min-h-[100dvh] md:pb-24 md:pt-28">
          <HeroGraphics />
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(38 50% 96%) 1px, transparent 0)', backgroundSize: '26px 26px' }} />
          <motion.div style={{ y: reducedMotion ? 0 : ry }} className="pointer-events-none absolute -bottom-40 end-[-8rem] hidden h-[34rem] w-[34rem] rounded-full bg-secondary md:block" aria-hidden="true" />
          <motion.div style={{ y: reducedMotion ? 0 : ry }} className="pointer-events-none absolute bottom-10 end-[8%] hidden h-48 w-48 rounded-full border-[18px] border-accent/70 float-slow md:block" aria-hidden="true" />
          <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 md:gap-10 md:px-10 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-sm"><MapPin className="h-4 w-4 text-secondary" />{t.eyebrow}</motion.p>
              <h1 className="f-display text-[clamp(2.6rem,7.5vw,6.5rem)] leading-[1.12]">
                {[t.h1a, t.h1b, t.h1c].map((w, i) => (
                  <motion.span key={lang + i} className={`block ${i === 2 ? 'text-secondary' : ''}`} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.14, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>{w}</motion.span>
                ))}
              </h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-7 max-w-xl text-lg leading-relaxed text-primary-foreground/85">{t.heroP}</motion.p>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="mt-9 flex flex-wrap gap-3">
                <a href={waLink(t.waGeneral)} target="_blank" rel="noopener noreferrer" className={`${btn} bg-secondary text-secondary-foreground`} data-testid="link-hero-whatsapp"><MessageCircle className="h-5 w-5" />{t.cta1}</a>
                <a href={TEL} className={`${btn} border border-white/40 text-primary-foreground hover:bg-white/10`} data-testid="link-hero-call"><Phone className="h-5 w-5" /><span dir="ltr">{PHONE}</span></a>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.92, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: -2 }} transition={{ delay: 0.6, duration: 0.9 }} className="relative z-10 self-end lg:mb-10">
              <div className="rounded-3xl bg-background p-5 text-foreground shadow-2xl md:p-7">
                <ChefHat className="mb-3 h-8 w-8 text-primary md:mb-4 md:h-9 md:w-9" />
                <p className="f-display text-xl leading-snug text-primary md:text-2xl">{t.badge}</p>
                <ul className="mt-4 space-y-2 text-sm md:mt-5">
                  {t.culList.slice(1).map((x) => <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" />{x}</li>)}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        <WaveDivider />
        {/* MARQUEE */}
        <div className="overflow-hidden bg-secondary py-4 text-secondary-foreground" aria-hidden="true">
          <div className="marq flex w-max gap-10 whitespace-nowrap">
            {[...t.marq, ...t.marq, ...t.marq, ...t.marq].map((m, i) => <span key={i} className="f-display flex items-center gap-10 text-xl">{m}<span className="h-2 w-2 rounded-full bg-primary" /></span>)}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="mx-auto grid max-w-7xl scroll-mt-20 gap-12 px-5 py-24 md:px-10 lg:grid-cols-2 lg:py-32">
          <Reveal>
            <Kick>{t.aboutK}</Kick>
            <h2 className="f-display text-4xl leading-tight text-primary md:text-5xl">{t.aboutH}</h2>
          </Reveal>
          <Reveal d={0.1} className="space-y-5 text-lg leading-loose text-foreground/80">
            {t.aboutP.map((p) => <p key={p}>{p}</p>)}
            <div className="rounded-2xl bg-muted p-6 text-base"><p className="f-display mb-3 text-xl text-primary">{t.factsH}</p><ul className="space-y-2">{t.facts.map((f) => <li key={f} className="flex items-start gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" />{f}</li>)}</ul></div>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border lg:col-span-2 md:grid-cols-3">
            {t.pillars.map(([h, p], i) => (
              <Reveal key={h} d={i * 0.1} className="bg-card p-8">
                <span className="f-display text-5xl text-secondary" style={{ WebkitTextStroke: '1px hsl(var(--primary))' }}>0{i + 1}</span>
                <h3 className="f-display mt-4 text-2xl text-primary">{h}</h3>
                <p className="mt-2 text-foreground/70">{p}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROGRAMS */}
        <AnimatedDivider text={t.dividerPhrases[0]} index={0} />
        <section id="programs" className="scroll-mt-20 bg-muted py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal><Kick>{t.progK}</Kick><h2 className="f-display max-w-3xl text-4xl leading-tight text-primary md:text-5xl">{t.progH}</h2></Reveal>
            <Offerings lang={lang} />
          </div>
        </section>

        {/* CULINARY */}
        <section id="culinary" className="relative scroll-mt-20 overflow-hidden bg-secondary py-24 text-secondary-foreground lg:py-32">
          <div className="pointer-events-none absolute -top-24 start-[-6rem] h-72 w-72 rounded-full border-[28px] border-primary/15" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <p className="mb-4 flex items-center gap-3 text-sm font-bold"><span className="h-px w-10 bg-current" />{t.culK}</p>
              <h2 className="f-display text-4xl leading-tight md:text-6xl">{t.culH}</h2>
              <p className="mt-6 max-w-xl text-lg leading-loose">{t.culP}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={waLink(t.inqMsg(t.flagName))} target="_blank" rel="noopener noreferrer" className={`${btn} bg-primary text-primary-foreground`} data-testid="link-culinary-whatsapp"><MessageCircle className="h-5 w-5" />{t.culCta}</a>
                <a href={IG} target="_blank" rel="noopener noreferrer" className={`${btn} border border-primary/40 text-primary`} data-testid="link-culinary-instagram"><Instagram className="h-5 w-5" />{t.culIg}</a>
              </div>
            </Reveal>
            <Reveal d={0.15}>
              <ul className="space-y-3">
                {t.culList.map((x, i) => (
                  <li key={x} className="flex items-center gap-4 rounded-2xl bg-background/70 p-5 backdrop-blur-sm">
                    <span className="f-display grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">{i + 1}</span>
                    <span className="text-lg font-medium">{x}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* PARTNERS */}
        <AnimatedDivider text={t.dividerPhrases[1]} index={1} />
        <section id="partners" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-10 lg:py-32">
          <Reveal><Kick>{t.partK}</Kick><h2 className="f-display max-w-2xl text-4xl leading-tight text-primary md:text-5xl">{t.partH}</h2></Reveal>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {t.partners.map((p, i) => (
              <Reveal key={p} d={i * 0.06}>
                <div className="group flex items-center justify-between gap-4 py-7 transition-all duration-300 hover:bg-muted hover:px-4" data-testid={`row-partner-${i}`}>
                  <span className="f-display w-12 text-xl text-accent">0{i + 1}</span>
                  <span className="f-display flex-1 text-2xl text-primary md:text-4xl">{p}</span>
                  <ArrowUp className={`h-6 w-6 text-secondary transition-transform group-hover:scale-125 ${lang === 'ar' ? '-rotate-45' : 'rotate-45'}`} />
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-foreground/70">{t.partN}</p>
        </section>

        {/* BENEFITS */}
        <section id="benefits" className="relative scroll-mt-20 overflow-hidden bg-primary py-24 text-primary-foreground lg:py-32">
          <SectionOrbs />
          <div className="relative mx-auto max-w-7xl px-5 md:px-10">
            <Reveal><Kick dark>{t.benK}</Kick><h2 className="f-display max-w-2xl text-4xl leading-tight md:text-5xl">{t.benH}</h2></Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {t.bens.map(([h, p, ic], i) => {
                const Icon = ICONS[ic];
                return (
                  <Reveal key={h} d={i * 0.1} className={i === 1 ? 'md:-translate-y-8' : ''}>
                    <div className="h-full rounded-3xl border border-white/15 bg-white/[0.06] p-8">
                      <Icon className="h-10 w-10 text-secondary" />
                      <h3 className="f-display mt-8 text-2xl">{h}</h3>
                      <p className="mt-3 leading-relaxed text-primary-foreground/75">{p}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* STEPS */}
        <AnimatedDivider text={t.dividerPhrases[2]} index={2} />
        <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 lg:py-32">
          <Reveal><Kick>{t.stepsK}</Kick><h2 className="f-display text-4xl text-primary md:text-5xl">{t.stepsH}</h2></Reveal>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {t.steps.map(([h, p], i) => (
              <Reveal key={h} d={i * 0.1}>
                <li className="list-none border-t-4 border-secondary pt-6">
                  <span className="f-display text-6xl text-accent">{i + 1}</span>
                  <h3 className="f-display mt-2 text-2xl text-primary">{h}</h3>
                  <p className="mt-2 text-foreground/70">{p}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* CTA + CONTACT */}
        <section id="contact" className="scroll-mt-20 bg-muted pb-16 pt-24 lg:pt-32">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-primary-foreground md:p-16">
              <div className="pointer-events-none absolute -bottom-24 end-[-4rem] h-72 w-72 rounded-full bg-secondary" aria-hidden="true" />
              <h2 className="f-display relative max-w-2xl text-4xl leading-tight md:text-6xl">{t.ctaH}</h2>
              <p className="relative mt-4 text-lg text-primary-foreground/80">{t.ctaP}</p>
              <div className="relative mt-8 flex flex-wrap gap-3">
                <a href={waLink(t.waGeneral)} target="_blank" rel="noopener noreferrer" className={`${btn} bg-secondary text-secondary-foreground`} data-testid="link-cta-whatsapp"><MessageCircle className="h-5 w-5" />{t.cta1}</a>
                <a href={TEL} className={`${btn} border border-white/40 hover:bg-white/10`} data-testid="link-cta-call"><Phone className="h-5 w-5" /><span dir="ltr">{PHONE}</span></a>
              </div>
            </Reveal>
            <div className="mt-16 grid gap-10 md:grid-cols-3">
              <Reveal>
                <p className="mb-2 text-sm font-semibold text-accent">{t.addrL}</p>
                <p className="f-display text-2xl text-primary">{t.addr}</p>
                <a href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4" data-testid="link-maps"><MapPin className="h-4 w-4" />{t.map}</a>
              </Reveal>
              <Reveal d={0.1}>
                <p className="mb-2 text-sm font-semibold text-accent">{t.phoneL}</p>
                <a href={TEL} className="f-display inline-block text-3xl text-primary" dir="ltr" data-testid="link-phone">{PHONE}</a>
                <div className="mt-3"><a href={waLink(t.waGeneral)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4" data-testid="link-contact-whatsapp"><MessageCircle className="h-4 w-4" />{t.wa}</a></div>
              </Reveal>
              <Reveal d={0.2}>
                <p className="mb-2 text-sm font-semibold text-accent">{t.socL}</p>
                <div className="flex flex-wrap gap-3">
                  <a href={IG} target="_blank" rel="noopener noreferrer" className={`${btn} border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground`} data-testid="link-instagram"><Instagram className="h-5 w-5" />{t.ig}</a>
                  <a href={FB} target="_blank" rel="noopener noreferrer" className={`${btn} border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground`} data-testid="link-facebook"><Facebook className="h-5 w-5" />{t.fb}</a>
                </div>
              </Reveal>
            </div>
            <aside id="feedback-note" aria-labelledby="feedback-heading" className="mt-12 rounded-3xl border border-primary/15 bg-background p-6 md:p-8" data-testid="feedback-note">
              <div className="flex items-center gap-3 text-primary">
                <MessageCircle className="h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
                <h3 id="feedback-heading" className="f-display text-2xl">{t.feedbackH}</h3>
              </div>
              <p className="mt-4 max-w-3xl text-lg leading-loose text-foreground/80">{t.feedbackNote}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={IG} target="_blank" rel="noopener noreferrer" className={`${btn} border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground`} data-testid="link-feedback-instagram"><Instagram className="h-5 w-5" aria-hidden="true" />{t.ig}</a>
                <a href={FB} target="_blank" rel="noopener noreferrer" className={`${btn} border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground`} data-testid="link-feedback-facebook"><Facebook className="h-5 w-5" aria-hidden="true" />{t.fb}</a>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="bg-foreground py-10 text-background/80">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center md:px-10">
          <div className="flex items-center gap-3"><Mark /><p className="f-display text-lg text-background">{t.name}</p></div>
          <p className="text-sm">&copy; {new Date().getFullYear()} {t.name}. {t.foot}.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-secondary" data-testid="button-top"><ArrowUp className={`h-4 w-4 ${arrow && ''}`} />{t.up}</button>
        </div>
      </footer>
    </div>
    </MotionConfig>
  );
}
