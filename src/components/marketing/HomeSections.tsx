import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export function ServicesSection({ title, subtitle, items }: ServicesSectionProps) {
  return (
    <section className="section-padding border-t border-border bg-bg-primary">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading title={title} subtitle={subtitle} align="center" />
        </ScrollReveal>

        <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
          {items.map(({ icon: Icon, title: itemTitle, description }, i) => (
            <ScrollReveal key={itemTitle} delay={i * 0.1}>
              <div className="flex h-full flex-col bg-bg-primary p-8 md:p-10 lg:p-12">
                <Icon className="size-7 text-cyan" strokeWidth={1.25} />
                <h3 className="mt-6 font-display text-xl font-semibold text-text-primary">
                  {itemTitle}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                  {description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface RentalCtaSectionProps {
  rentalTitle: string;
  rentalSubtitle: string;
  rentalCta: string;
  salesTitle: string;
  salesSubtitle: string;
  salesCta: string;
}

export function RentalCtaSection({
  rentalTitle,
  rentalSubtitle,
  rentalCta,
  salesTitle,
  salesSubtitle,
  salesCta,
}: RentalCtaSectionProps) {
  return (
    <section className="section-padding bg-bg-elevated">
      <div className="container-page grid gap-px bg-border md:grid-cols-2">
        <ScrollReveal>
          <div className="flex min-h-[320px] flex-col justify-between bg-bg-elevated p-10 md:p-14">
            <div>
              <p className="editorial-eyebrow text-text-muted">Services</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-text-primary md:text-4xl">
                {rentalTitle}
              </h2>
              <p className="mt-4 max-w-md text-text-secondary">{rentalSubtitle}</p>
            </div>
            <Link
              href="/contact"
              className="mt-10 inline-flex h-12 w-fit items-center justify-center bg-accent px-8 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
            >
              {rentalCta}
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="flex min-h-[320px] flex-col justify-between bg-bg-subtle p-10 md:p-14">
            <div>
              <p className="editorial-eyebrow text-text-muted">Boutique</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-text-primary md:text-4xl">
                {salesTitle}
              </h2>
              <p className="mt-4 max-w-md text-text-secondary">{salesSubtitle}</p>
            </div>
            <Link
              href="/collections"
              className="mt-10 inline-flex h-12 w-fit items-center justify-center border border-border px-8 text-sm font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              {salesCta}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

interface ArticlesSectionProps {
  title: string;
  subtitle: string;
  articles: { title: string; excerpt: string; tag: string }[];
  readMoreLabel: string;
}

export function ArticlesSection({
  title,
  subtitle,
  articles,
  readMoreLabel,
}: ArticlesSectionProps) {
  return (
    <section className="section-padding border-t border-border bg-bg-primary">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading title={title} subtitle={subtitle} />
        </ScrollReveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {articles.map((article, i) => (
            <ScrollReveal key={article.title} delay={i * 0.1}>
              <article className="group flex h-full flex-col border border-border bg-bg-elevated p-8 transition-colors hover:border-border-focus">
                <p className="editorial-eyebrow text-text-muted">{article.tag}</p>
                <h3 className="mt-4 font-display text-xl font-semibold text-text-primary transition-colors group-hover:text-accent">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                  {article.excerpt}
                </p>
                <Link
                  href="/contact"
                  className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-cyan transition-colors hover:text-accent"
                >
                  {readMoreLabel}
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialsSectionProps {
  title: string;
  items: { quote: string; author: string; imageUrl: string; imageAlt: string }[];
}

export function TestimonialsSection({ title, items }: TestimonialsSectionProps) {
  return (
    <section className="section-padding bg-bg-elevated">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading title={title} align="center" />
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <ScrollReveal key={item.author} delay={i * 0.1}>
              <blockquote className="flex h-full flex-col border border-border bg-bg-primary p-8">
                <div className="relative mb-6 size-16 overflow-hidden rounded-full border border-border">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="64px"
                  />
                </div>
                <p className="flex-1 text-base leading-relaxed text-text-secondary">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-6 text-sm font-semibold text-text-primary">
                  {item.author}
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface NewsletterSectionProps {
  title: string;
  subtitle: string;
  cta: string;
  phone: string;
}

export function NewsletterSection({ title, subtitle, cta, phone }: NewsletterSectionProps) {
  return (
    <section className="section-padding bg-bg-primary">
      <div className="container-page">
        <ScrollReveal>
          <div className="relative overflow-hidden border border-border bg-bg-elevated px-8 py-16 text-center md:px-16 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(232_185_35_/_8%),transparent_55%)]" />
            <div className="relative mx-auto max-w-2xl">
              <p className="editorial-eyebrow">Newsletter</p>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-text-primary">
                {title}
              </h2>
              <p className="mt-4 text-text-secondary">{subtitle}</p>
              <Link
                href="/contact"
                className="mt-8 inline-flex h-12 items-center justify-center bg-accent px-10 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
              >
                {cta}
              </Link>
              <p className="mt-4 font-mono text-sm text-text-muted">{phone}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
