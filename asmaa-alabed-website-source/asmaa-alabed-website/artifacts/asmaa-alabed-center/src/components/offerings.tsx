import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Compass, FlaskConical, ChefHat, Cake, ArrowUpRight, Sparkles } from 'lucide-react';
import { T, type Lang, waLink } from '@/content';

const IC: Record<string, typeof ChefHat> = { GraduationCap, BookOpen, Compass, FlaskConical };
const ease = [0.2, 0.7, 0.2, 1] as const;
const list = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };

export function Offerings({ lang }: { lang: Lang }) {
  const t = T[lang];
  const flip = lang === 'ar' ? '-scale-x-100' : '';
  return (
    <div className="mt-14 space-y-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease }} className="shimmer-card relative overflow-hidden rounded-[2rem] bg-primary p-8 text-primary-foreground md:p-12" data-testid="card-flagship">
        <div className="pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full bg-secondary/90 float-slow" aria-hidden="true" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-secondary-foreground"><Sparkles className="h-4 w-4" />{t.flag.k}</span>
            <h3 className="f-display mt-5 text-4xl leading-tight md:text-5xl">{t.flag.h}</h3>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/80">{t.flag.p}</p>
          </div>
          <div className="space-y-3 self-end">
            {t.flag.v.map(([n, s], i) => (
              <a key={n} href={waLink(t.inqMsg(n))} target="_blank" rel="noopener noreferrer" className="group flex min-h-16 items-center gap-4 rounded-2xl bg-background p-4 text-foreground transition-transform duration-300 hover:-translate-y-1" data-testid={`link-flagship-${i}`}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">{i === 0 ? <ChefHat className="h-5 w-5" /> : <Cake className="h-5 w-5" />}</span>
                <span className="flex-1"><span className="f-display block text-lg leading-snug text-primary">{n}</span><span className="text-sm text-foreground/70">{s}</span></span>
                <ArrowUpRight className={`h-5 w-5 text-accent transition-transform group-hover:scale-125 ${flip}`} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {t.cats.map((c, ci) => {
          const Icon = IC[c.icon];
          const wide = ci === 0;
          return (
            <motion.section key={c.k} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease }} className={`rounded-3xl border border-border bg-card p-7 md:p-9 ${wide ? 'md:col-span-2' : ''}`} data-testid={`section-category-${ci}`}>
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground"><Icon className="h-7 w-7" /></span>
                <div><span className="f-display text-sm text-accent">{c.k}</span><h3 className="f-display text-2xl leading-tight text-primary md:text-3xl">{c.h}</h3></div>
              </div>
              <motion.ul variants={list} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} className={`mt-7 grid gap-3 ${wide ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-1'}`}>
                {c.items.map((x, i) => {
                  const star = ci === 0 && i === 0;
                  return (
                    <motion.li key={x} variants={item} className={star ? 'sm:col-span-2' : ''}>
                      <a href={waLink(t.inqMsg(x))} target="_blank" rel="noopener noreferrer" className={`group flex min-h-14 h-full items-center gap-3 rounded-2xl px-4 py-3 font-medium transition-all duration-300 hover:-translate-y-0.5 ${star ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-foreground hover:bg-primary hover:text-primary-foreground'}`} data-testid={`link-offer-${ci}-${i}`}>
                        <span className="f-display w-6 shrink-0 text-sm opacity-60">{i + 1}</span>
                        <span className="flex-1 leading-snug">{x}</span>
                        {star && <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs text-primary-foreground">{t.star}</span>}
                        <ArrowUpRight className={`h-4 w-4 shrink-0 opacity-50 transition-opacity group-hover:opacity-100 ${flip}`} />
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>
              {'note' in c && c.note && <p className="mt-5 text-sm text-foreground/70">{c.note}</p>}
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
